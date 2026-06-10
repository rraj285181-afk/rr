"use client";

import { MessageSquare, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialAlertsProps {
  className?: string;
}

export function SocialAlerts({ className }: SocialAlertsProps) {
  // Mock channel invite links (user can replace them easily)
  const WHATSAPP_URL = "https://whatsapp.com/channel/0029VaZ84bN60eBf5w4aP82d"; // Mock channel
  const TELEGRAM_URL = "https://t.me/JobIndiansOfficial"; // Mock group

  return (
    <div className={cn("fixed bottom-6 left-6 z-[100] flex flex-col gap-3.5", className)}>
      
      {/* WhatsApp Sticky Floating Button */}
      <div className="relative group">
        {/* Animated outer pulsing rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-[4px] opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 animate-ping pointer-events-none" />
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 opacity-60 blur-[2px] group-hover:scale-105 transition-all duration-300 pointer-events-none" />
        
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.25)] bg-gradient-to-tr from-emerald-600 to-emerald-400 dark:from-emerald-700 dark:to-emerald-500 flex items-center justify-center text-white border-2 border-white dark:border-zinc-950 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        >
          <MessageCircle className="w-6 h-6 fill-white stroke-none shrink-0" />
        </a>

        {/* Hover Tooltip - Glass styled */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-background/85 dark:bg-zinc-900/90 backdrop-blur-md border border-emerald-500/20 text-foreground px-4 py-2 rounded-2xl shadow-xl w-48 text-xs font-bold leading-normal">
          <span className="text-emerald-500 dark:text-emerald-400 block mb-0.5">WhatsApp Channel</span>
          Join for instant Job Alerts 📢
        </div>
      </div>

      {/* Telegram Sticky Floating Button */}
      <div className="relative group">
        {/* Animated outer pulsing rings */}
        <span className="absolute -inset-1 rounded-full bg-sky-500/30 blur-[4px] opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 animate-ping pointer-events-none" style={{ animationDelay: '0.4s' }} />
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 opacity-60 blur-[2px] group-hover:scale-105 transition-all duration-300 pointer-events-none" />
        
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 rounded-full shadow-[0_8px_30px_rgba(14,165,233,0.25)] bg-gradient-to-tr from-sky-500 to-sky-400 dark:from-sky-600 dark:to-sky-400 flex items-center justify-center text-white border-2 border-white dark:border-zinc-950 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        >
          <Send className="w-5 h-5 fill-white stroke-none shrink-0 translate-x-[-1px] translate-y-[0.5px]" />
        </a>

        {/* Hover Tooltip - Glass styled */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-background/85 dark:bg-zinc-900/90 backdrop-blur-md border border-sky-500/20 text-foreground px-4 py-2 rounded-2xl shadow-xl w-48 text-xs font-bold leading-normal">
          <span className="text-sky-500 dark:text-sky-400 block mb-0.5">Telegram Group</span>
          Join for Daily GK & PYQs ⚡
        </div>
      </div>

    </div>
  );
}
