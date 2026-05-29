
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
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AI Concierge Widget - Career and Exam Assistant.
 * Fixed to the bottom right corner of the screen.
 */
export function Concierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Namaste! I'm your Smart Bharat Concierge. How can I help you with your career or exams today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
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
      setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting to my intelligence core. Please try again in a few moments." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-110 flex items-center justify-center group"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-12 right-0 bg-primary text-white text-[10px] font-bold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Ask Smart AI
          </span>
        </Button>
      )}

      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-card border shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Smart Bharat Concierge</h3>
                <p className="text-[10px] opacity-70">Official Career & Exam Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 text-primary-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-primary/10 border border-primary/20 rounded-tr-none" : "bg-muted/50 border rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse ml-12">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs font-medium">Thinking...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-card/50">
            <div className="flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about exams or jobs..."
                className="rounded-full bg-background"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="rounded-full px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
