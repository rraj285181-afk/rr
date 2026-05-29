"use client";

import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { TickerConfig } from "@/lib/services-data";
import { Sparkles } from "lucide-react";

const DEFAULT_UPDATES = [
  { name: "🔥 Welcome to JobIndians - India's Premium Career Portal", url: "#" },
  { name: "📢 Check Latest Government Exam Results Live", url: "/?category=Results#directory" },
  { name: "🚀 Download Official Admit Cards in One Click", url: "/?category=Admit Cards#directory" },
  { name: "✅ Verified Recruitment Notifications from Official Sources", url: "/?category=Latest Jobs#directory" },
  { name: "⚡ Fastest Updates for Competitive Aspirants", url: "#" }
];

export function Marquee() {
  const db = useFirestore();
  
  const tickerRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, "config", "tickerMessages");
  }, [db]);

  const { data: config, loading } = useDoc<TickerConfig>(tickerRef);

  const updates = useMemoFirebase(() => {
    if (!config) return DEFAULT_UPDATES;
    const items = [];
    for (let i = 1; i <= 5; i++) {
      const name = config[`name${i}` as keyof TickerConfig];
      const url = config[`url${i}` as keyof TickerConfig];
      if (name && typeof name === 'string' && name.trim() !== '') {
        items.push({ name, url: url || "#" });
      }
    }
    return items.length > 0 ? items : DEFAULT_UPDATES;
  }, [config]);

  if (loading) return <div className="h-10 md:h-12 bg-primary/5 border rounded-full animate-pulse mx-auto max-w-7xl" />;

  return (
    <div className="w-full bg-card border shadow-sm rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-6 overflow-hidden whitespace-nowrap backdrop-blur-sm group">
      <div className="flex animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
        {[...updates, ...updates, ...updates, ...updates].map((item, i) => (
          <a 
            key={i} 
            href={item.url} 
            target={item.url.startsWith('http') ? "_blank" : "_self"}
            rel={item.url.startsWith('http') ? "noopener noreferrer" : ""}
            className="mx-8 md:mx-12 text-[11px] md:text-sm font-bold text-foreground/80 flex items-center gap-2 md:gap-3 hover:text-primary transition-all uppercase tracking-wide"
          >
            <Sparkles className="w-3 h-3 text-primary animate-pulse shrink-0" />
            {item.name}
          </a>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}