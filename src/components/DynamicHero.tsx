
"use client";

import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { AppConfig } from "@/lib/services-data";
import { Marquee } from "@/components/Marquee";

/**
 * Minimal Dynamic Hero section.
 * Removed static and dynamic titles/subtitles to focus purely on the interactive ticker.
 */
export function DynamicHero() {
  const db = useFirestore();
  
  const configRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, "config", "home");
  }, [db]);

  const { loading } = useDoc<AppConfig>(configRef);

  return (
    <section className="relative overflow-hidden pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="max-w-4xl mx-auto">
            <div className="h-12 w-full bg-muted/20 rounded-full animate-pulse" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* 
               Title and Subtitle removed as per user request. 
               The Marquee ticker is now the primary element.
            */}
            <div className="w-full">
              <Marquee />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
