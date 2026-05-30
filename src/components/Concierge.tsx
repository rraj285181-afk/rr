"use client";

import { useState, useRef, useEffect } from "react";
import { smartBharatConcierge } from "@/ai/flows/smart-bharat-concierge-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  X, 
  Loader2, 
  Sparkles,
  User,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Advanced AI Concierge Widget with Enhanced Input and Tool Search Status.
 */
export function Concierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Namaste! Main aapka Smart Bharat Concierge hoon. Aaj main aapki career ya exams mein kaise madad kar sakta hoon?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = ["SSC Results kab aayenge?", "Latest Admit Cards", "UPSC 2026 Calendar", "Bihar Jobs"];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen, isLoading]);

  async function handleSend(overrideInput?: string) {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await smartBharatConcierge({
        message: userMessage,
        history: messages
      });
      setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Network issue ki wajah se response nahi mil paya. Kripya dobara koshish karein." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-110 flex items-center justify-center group relative"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
          <span className="absolute -left-32 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask Smart AI Assistant
          </span>
        </Button>
      )}

      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] bg-card border shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Bharat Concierge AI</h3>
                <p className="text-[10px] opacity-70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online • Hinglish Support
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 text-primary-foreground rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-muted/5" ref={scrollRef}>
            <div className="space-y-6 pb-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "p-2 rounded-xl shrink-0 shadow-sm",
                    msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-card border"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 ml-12">
                  <div className="bg-card border p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Searching Directory...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length < 3 && !isLoading && (
            <div className="px-4 py-2 flex flex-wrap gap-2 bg-muted/5">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(s)}
                  className="text-[10px] font-bold bg-card border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type or paste your query here..."
                className="rounded-full bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary h-12 text-sm"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="rounded-full w-12 h-12 p-0 shadow-lg shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[9px] text-center text-muted-foreground mt-3 uppercase tracking-tighter">
              AI generated answers • Verify from official sources
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
