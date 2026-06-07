"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { IndianService } from "@/lib/services-data";
import { AdBanner } from "@/components/AdBanner";
import { Concierge } from "@/components/Concierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  ChevronLeft, 
  ExternalLink, 
  ShieldCheck, 
  Briefcase,
  AlertCircle,
  Info,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Unified helper to parse URLs, emails, and phone numbers, turning them into beautiful links.
 */
function parseTextSegments(text: string, prefixKey: string) {
  if (!text) return "";
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  // A robust phone regex matching mobile (+91 9876543210), toll free (1800-11-243), and landline/helplines starting with 0 with or without hyphens (e.g. 011-23385271, 01124300607)
  const phoneRegex = /(\+91[\-\s]?)?[6-9]\d{9}\b|\b0\d{2,4}[\-\s]?\d{6,8}\b|\b1800[\-\s]?\d{2,3}[\-\s]?\d{3,4}\b/g;

  let parts: (string | React.ReactNode)[] = [text];

  // 1. Parse URLs
  parts = parts.flatMap((part, idx) => {
    if (typeof part !== "string") return part;
    return part.split(urlRegex).map((subPart, subIdx) => {
      if (subPart.match(urlRegex)) {
        return (
          <a 
            key={`${prefixKey}-url-${idx}-${subIdx}`} 
            href={subPart} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 mx-1.5 text-primary hover:text-primary/80 font-black hover:underline bg-primary/10 dark:bg-sky-400/10 px-3 py-1 rounded-xl border border-primary/20 transition-all text-xs md:text-sm shadow-sm align-middle"
          >
            Click Here
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        );
      }
      return subPart;
    });
  });

  // 2. Parse Emails
  parts = parts.flatMap((part, idx) => {
    if (typeof part !== "string") return part;
    return part.split(emailRegex).map((subPart, subIdx) => {
      if (subPart.match(emailRegex)) {
        return (
          <a 
            key={`${prefixKey}-email-${idx}-${subIdx}`} 
            href={`mailto:${subPart}`} 
            className="text-blue-600 dark:text-sky-400 font-extrabold hover:underline mx-1 align-middle"
          >
            {subPart}
          </a>
        );
      }
      return subPart;
    });
  });

  // 3. Parse Phone Numbers
  parts = parts.flatMap((part, idx) => {
    if (typeof part !== "string") return part;
    return part.split(phoneRegex).map((subPart, subIdx) => {
      if (subPart.match(phoneRegex)) {
        return (
          <a 
            key={`${prefixKey}-phone-${idx}-${subIdx}`} 
            href={`tel:${subPart.replace(/[\s\-]/g, '')}`} 
            className="text-blue-600 dark:text-sky-400 font-extrabold hover:underline mx-1 align-middle"
          >
            {subPart}
          </a>
        );
      }
      return subPart;
    });
  });

  return parts;
}

/**
 * Helper to parse inline cell content and turn URLs, emails, and phones into clickable badges/links.
 */
function formatCellContent(text: string) {
  return parseTextSegments(text, "cell");
}

/**
 * Helper to turn text, Markdown tables, and headings into beautiful HTML.
 */
function formatDescription(text: string) {
  if (!text) return null;
  
  const lines = text.split('\n');
  
  const elements: React.ReactNode[] = [];
  let currentTableLines: string[] = [];

  const flushTable = (key: number) => {
    if (currentTableLines.length === 0) return;
    
    // Parse table rows
    const rawRows = currentTableLines.map(line => {
      const trimmedLine = line.trim();
      // Strip outer pipes and split by pipe
      const content = trimmedLine.substring(1, trimmedLine.length - 1);
      return content.split('|').map(cell => cell.trim());
    });

    const headerRow = rawRows[0];
    const dataRows = rawRows.slice(1).filter(row => {
      // Filter out Markdown separator rows (like |---|---|)
      return !row.every(cell => cell.match(/^[-:]+$/));
    });

    elements.push(
      <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-md">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              {headerRow.map((cell, idx) => (
                <th key={idx} className="p-3 md:p-4 font-black uppercase text-primary dark:text-sky-400 tracking-wider">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {dataRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-primary/[0.015] dark:hover:bg-sky-400/[0.01] transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="p-3 md:p-4 font-medium text-foreground">
                    {formatCellContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    currentTableLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if line starts and ends with "|" (Table line)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      currentTableLines.push(trimmed);
    } else {
      // If we were building a table, flush it first
      if (currentTableLines.length > 0) {
        flushTable(i);
      }

      // Check for Markdown-style headings (e.g. ### Heading)
      const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        const headingText = headingMatch[2];
        elements.push(
          <h3 
            key={`heading-${i}`} 
            className="font-extrabold text-base md:text-lg text-primary dark:text-sky-400 mt-7 mb-3 pb-1.5 border-b border-primary/10 dark:border-sky-400/10 tracking-tight"
          >
            {headingText}
          </h3>
        );
      } else {
        // Process links, emails, and phones in regular text lines
        const parts = parseTextSegments(line, `line-${i}`);

        elements.push(
          <div key={`line-${i}`} className="min-h-[1.5rem] my-1">
            {parts}
          </div>
        );
      }
    }
  }

  // Flush any remaining table at the end of text
  if (currentTableLines.length > 0) {
    flushTable(lines.length);
  }

  return elements;
}

export default function ServiceDetails() {
  const { id } = useParams();
  const db = useFirestore();

  const refResults = useMemoFirebase(() => db && id ? doc(db, "results", id as string) : null, [db, id]);
  const refAdmitCards = useMemoFirebase(() => db && id ? doc(db, "admit_cards", id as string) : null, [db, id]);
  const refCurrentJobs = useMemoFirebase(() => db && id ? doc(db, "current_jobs", id as string) : null, [db, id]);
  const refUpcomingJobs = useMemoFirebase(() => db && id ? doc(db, "upcoming_jobs", id as string) : null, [db, id]);
  const refScholarships = useMemoFirebase(() => db && id ? doc(db, "scholarships", id as string) : null, [db, id]);
  const refAdmissions = useMemoFirebase(() => db && id ? doc(db, "admissions", id as string) : null, [db, id]);

  const { data: docResults, loading: l1, exists: e1 } = useDoc<IndianService>(refResults as any);
  const { data: docAdmitCards, loading: l2, exists: e2 } = useDoc<IndianService>(refAdmitCards as any);
  const { data: docCurrentJobs, loading: l3, exists: e3 } = useDoc<IndianService>(refCurrentJobs as any);
  const { data: docUpcomingJobs, loading: l4, exists: e4 } = useDoc<IndianService>(refUpcomingJobs as any);
  const { data: docScholarships, loading: l5, exists: e5 } = useDoc<IndianService>(refScholarships as any);
  const { data: docAdmissions, loading: l6, exists: e6 } = useDoc<IndianService>(refAdmissions as any);

  const service = useMemo(() => {
    if (e1 && docResults) return { ...docResults, category: 'Results' as const };
    if (e2 && docAdmitCards) return { ...docAdmitCards, category: 'Admit Cards' as const };
    if (e3 && docCurrentJobs) return { ...docCurrentJobs, category: 'Current Jobs' as const };
    if (e4 && docUpcomingJobs) return { ...docUpcomingJobs, category: 'Upcoming Jobs' as const };
    if (e5 && docScholarships) return { ...docScholarships, category: 'Scholarships' as const };
    if (e6 && docAdmissions) return { ...docAdmissions, category: 'Admissions' as const };
    return null;
  }, [e1, e2, e3, e4, e5, e6, docResults, docAdmitCards, docCurrentJobs, docUpcomingJobs, docScholarships, docAdmissions]);

  const loading = l1 || l2 || l3 || l4 || l5 || l6;
  const exists = e1 || e2 || e3 || e4 || e5 || e6;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="font-bold uppercase tracking-widest text-[10px]">Loading Content...</p>
        </div>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Content Not Found</h1>
        <p className="text-muted-foreground mb-6">Ye page abhi uplabd nahi hai ya hta diya gaya hai.</p>
        <Button asChild>
          <Link href="/">Return to Directory</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Portal Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xs">J</span>
              </div>
              <span className="text-sm font-bold text-primary tracking-tight">JobIndians</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12 space-y-8">
        <div className="bg-card border shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-primary p-8 md:p-12 text-primary-foreground relative overflow-hidden">
            <ShieldCheck className="absolute right-[-20px] top-[-20px] w-48 h-48 opacity-10 rotate-12" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Career Intelligence
              </div>
              <h1 className="text-3xl md:text-5xl font-headline font-bold leading-tight">
                {service?.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{service?.state || "All India"}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                  <Briefcase className="w-4 h-4" />
                  <span>{service?.category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">


            {/* Official Description */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Notification Summary
              </h2>
              <div className="p-6 bg-muted/30 rounded-2xl border border-dashed text-muted-foreground leading-relaxed text-sm md:text-base">
                {service?.description ? (
                  <div className="whitespace-pre-wrap">{formatDescription(service.description)}</div>
                ) : (
                  <p>Is notification ke baare mein vistarit jankari official document mein uplabd hai. Hum koshish karte hain ki har link sahi ho taaki aap sahi source tak pahunch sakein.</p>
                )}
              </div>
            </section>



            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

            <div className="pt-8 border-t flex flex-col items-center gap-6">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto px-12 py-8 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-all"
              >
                <a 
                  href={service?.url?.startsWith('http') ? service.url : `https://${service?.url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  Visit Official Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Concierge />
    </div>
  );
}