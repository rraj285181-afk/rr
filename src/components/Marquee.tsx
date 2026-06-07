"use client";

import { useState, useEffect, useMemo } from "react";
import { useFirestore, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { doc, collection, query } from "firebase/firestore";
import { IndianService } from "@/lib/services-data";
import { Sparkles } from "lucide-react";

export interface TickerConfig {
  name1?: string;
  url1?: string;
  name2?: string;
  url2?: string;
  name3?: string;
  url3?: string;
  name4?: string;
  url4?: string;
  name5?: string;
  url5?: string;
}

const DEFAULT_UPDATES = [
  { name: "🔥 Welcome to JobIndians - India's Premium Career Portal", url: "#" },
  { name: "📢 Check Latest Government Exam Results Live", url: "/?category=Results#directory" },
  { name: "🚀 Download Official Admit Cards in One Click", url: "/?category=Admit Cards#directory" },
  { name: "✅ Verified Recruitment Notifications from Official Sources", url: "/?category=Current Jobs#directory" },
  { name: "⚡ Fastest Updates for Competitive Aspirants", url: "#" }
];

export function Marquee() {
  const db = useFirestore();
  const [forceShow, setForceShow] = useState(false);

  // 1. Fetch custom config ticker messages
  const tickerRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, "config", "tickerMessages");
  }, [db]);
  const { data: config, loading: configLoading } = useDoc<TickerConfig>(tickerRef);

  // 2. Fetch all services to extract dynamic ticker updates from category collections
  const resultsRef = useMemoFirebase(() => db ? query(collection(db, "results")) : null, [db]);
  const admitCardsRef = useMemoFirebase(() => db ? query(collection(db, "admit_cards")) : null, [db]);
  const currentJobsRef = useMemoFirebase(() => db ? query(collection(db, "current_jobs")) : null, [db]);
  const upcomingJobsRef = useMemoFirebase(() => db ? query(collection(db, "upcoming_jobs")) : null, [db]);
  const scholarshipsRef = useMemoFirebase(() => db ? query(collection(db, "scholarships")) : null, [db]);
  const admissionsRef = useMemoFirebase(() => db ? query(collection(db, "admissions")) : null, [db]);

  const { data: results, loading: loadingResults } = useCollection<IndianService>(resultsRef as any);
  const { data: admitCards, loading: loadingAdmitCards } = useCollection<IndianService>(admitCardsRef as any);
  const { data: currentJobs, loading: loadingCurrentJobs } = useCollection<IndianService>(currentJobsRef as any);
  const { data: upcomingJobs, loading: loadingUpcomingJobs } = useCollection<IndianService>(upcomingJobsRef as any);
  const { data: scholarships, loading: loadingScholarships } = useCollection<IndianService>(scholarshipsRef as any);
  const { data: admissions, loading: loadingAdmissions } = useCollection<IndianService>(admissionsRef as any);

  const services = useMemo(() => {
    const list: IndianService[] = [];
    results.forEach(s => list.push({ ...s, category: 'Results' }));
    admitCards.forEach(s => list.push({ ...s, category: 'Admit Cards' }));
    currentJobs.forEach(s => list.push({ ...s, category: 'Current Jobs' }));
    upcomingJobs.forEach(s => list.push({ ...s, category: 'Upcoming Jobs' }));
    scholarships.forEach(s => list.push({ ...s, category: 'Scholarships' }));
    admissions.forEach(s => list.push({ ...s, category: 'Admissions' }));
    return list;
  }, [results, admitCards, currentJobs, upcomingJobs, scholarships, admissions]);

  const servicesLoading = loadingResults || loadingAdmitCards || loadingCurrentJobs || loadingUpcomingJobs || loadingScholarships || loadingAdmissions;

  // A 2-second timeout to guarantee the ticker shows up even if Firestore has connection/auth issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const loading = (configLoading || servicesLoading) && !forceShow;

  const updates = useMemoFirebase(() => {
    const items: { name: string; url: string }[] = [];

    // First, find services with ticker fields enabled
    if (services && services.length > 0) {
      const serviceTickers = services
        .filter(s => !!s.isTicker)
        .map(s => ({
          name: s.name || s.id || "Untitled Service",
          url: `/services/${s.id}`
        }))
        .slice(0, 5);

      items.push(...serviceTickers);
    }

    // If we have less than 5 items, fill in the rest using custom /config/tickerMessages
    if (items.length < 5 && config) {
      for (let i = 1; i <= 5; i++) {
        if (items.length >= 5) break;
        const name = config[`name${i}` as keyof TickerConfig];
        const url = config[`url${i}` as keyof TickerConfig];
        if (name && typeof name === 'string' && name.trim() !== '') {
          // Avoid duplicate items
          if (!items.some(existing => existing.name === name)) {
            items.push({ name, url: url || "#" });
          }
        }
      }
    }

    // Fallback to DEFAULT_UPDATES if absolutely nothing is configured
    return items.length > 0 ? items : DEFAULT_UPDATES;
  }, [config, services]);

  if (loading) return <div className="h-10 md:h-12 bg-primary/5 border rounded-full animate-pulse mx-auto max-w-4xl" />;

  return (
    <div 
      className="w-full glass-card border border-border/40 shadow-lg rounded-2xl md:rounded-[1.5rem] py-3.5 md:py-4 px-4 overflow-hidden relative group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)'
      }}
    >
      <div className="flex animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
        {[...updates, ...updates, ...updates, ...updates].map((item, i) => (
          <a 
            key={i} 
            href={item.url} 
            target={item.url.startsWith('http') ? "_blank" : "_self"}
            rel={item.url.startsWith('http') ? "noopener noreferrer" : ""}
            className="mx-8 md:mx-14 text-[10px] md:text-xs font-black text-foreground/80 flex items-center gap-2 md:gap-3 hover:text-primary dark:hover:text-sky-400 transition-colors uppercase tracking-widest shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary dark:text-sky-400 animate-pulse shrink-0" />
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