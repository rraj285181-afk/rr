"use client";

import { useParams } from "next/navigation";
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
  Clock,
  Briefcase,
  AlertCircle,
  Info,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  CreditCard,
  UserRound,
  FileDigit
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Helper to turn URLs in text into clickable links.
 */
function formatDescription(text: string) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary font-bold hover:underline break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ServiceDetails() {
  const { id } = useParams();
  const db = useFirestore();

  const serviceRef = useMemoFirebase(() => {
    if (!db || !id) return null;
    return doc(db, "services", id as string);
  }, [db, id]);

  const { data: service, loading, exists } = useDoc<IndianService>(serviceRef);

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
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Portal Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xs">J</span>
              </div>
              <span className="text-sm font-bold text-primary tracking-tight hidden xs:inline">JobIndians</span>
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
            {/* Last Date Highlight */}
            {service?.lastDate && service.lastDate.trim() !== "" && (
              <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10 flex items-center gap-5 shadow-sm">
                <div className="p-4 bg-red-500/10 rounded-2xl text-red-600 animate-pulse">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-red-600/70 mb-1">Submission Deadline</p>
                  <p className="font-black text-xl md:text-2xl text-red-600">{service?.lastDate}</p>
                </div>
              </div>
            )}

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

            {/* Structured Info Grid (Controlled by Firebase) */}
            {(service?.importantDates || service?.applicationFee || service?.ageLimit || service?.totalPosts) && (
              <div className="grid grid-cols-1 md:grid-cols-2 border border-primary/20 rounded-2xl overflow-hidden shadow-sm bg-card">
                {/* Important Dates */}
                <div className="border-b md:border-r border-primary/10 flex flex-col">
                  <div className="bg-primary/5 p-3.5 flex items-center justify-center gap-2 border-b border-primary/10">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-primary">Important Dates</h4>
                  </div>
                  <div className="p-6 flex-1 text-sm md:text-base font-medium text-foreground whitespace-pre-wrap leading-relaxed">
                    {service.importantDates || "Check official notification"}
                  </div>
                </div>
                {/* Application Fee */}
                <div className="border-b border-primary/10 flex flex-col">
                  <div className="bg-primary/5 p-3.5 flex items-center justify-center gap-2 border-b border-primary/10">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-primary">Application Fee</h4>
                  </div>
                  <div className="p-6 flex-1 text-sm md:text-base font-medium text-foreground whitespace-pre-wrap leading-relaxed">
                    {service.applicationFee || "As per official rules"}
                  </div>
                </div>
                {/* Age Limit */}
                <div className="border-b md:border-b-0 md:border-r border-primary/10 flex flex-col">
                  <div className="bg-primary/5 p-3.5 flex items-center justify-center gap-2 border-b border-primary/10">
                    <UserRound className="w-4 h-4 text-primary" />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-primary">Age Limit</h4>
                  </div>
                  <div className="p-6 flex-1 text-sm md:text-base font-medium text-foreground whitespace-pre-wrap leading-relaxed">
                    {service.ageLimit || "Refer to detailed notification"}
                  </div>
                </div>
                {/* Total Post */}
                <div className="flex flex-col">
                  <div className="bg-primary/5 p-3.5 flex items-center justify-center gap-2 border-b border-primary/10">
                    <FileDigit className="w-4 h-4 text-primary" />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-primary">Total Posts</h4>
                  </div>
                  <div className="p-8 flex-1 flex flex-col items-center justify-center min-h-[120px]">
                    <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{service.totalPosts || "—"}</span>
                    <span className="text-[10px] uppercase font-black text-muted-foreground opacity-40 mt-1 tracking-widest">Vacancies</span>
                  </div>
                </div>
              </div>
            )}

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

            {/* Safety Guidance */}
            <section className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-card border rounded-2xl space-y-4">
                  <h4 className="font-bold text-sm text-primary flex items-center gap-2 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4" /> Step-by-Step
                  </h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-3 leading-relaxed">
                    <li className="flex gap-2"><span>1.</span> Click on the "Visit Official Website" button.</li>
                    <li className="flex gap-2"><span>2.</span> Search for reference: {service?.name}.</li>
                    <li className="flex gap-2"><span>3.</span> Keep documents ready for official submission.</li>
                  </ul>
                </div>
                <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-2xl space-y-4">
                  <h4 className="font-bold text-sm text-orange-600 flex items-center gap-2 uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4" /> Safety Info
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic">
                    Always confirm the site URL ends in **.gov.in** or **.nic.in**. Avoid sharing sensitive personal data on unverified third-party platforms.
                  </p>
                </div>
              </div>
            </section>

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