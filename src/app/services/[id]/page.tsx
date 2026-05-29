
"use client";

import { useParams } from "next/navigation";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { IndianService } from "@/lib/services-data";
import { AdBanner } from "@/components/AdBanner";
import { Concierge } from "@/components/Concierge";
import { 
  ChevronLeft, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Clock,
  Briefcase,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          <p className="font-bold uppercase tracking-widest text-xs">Fetching Link Details...</p>
        </div>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Service Not Found</h1>
        <p className="text-muted-foreground mb-6">The link you are looking for might have been moved or removed.</p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xs">J</span>
            </div>
            <span className="text-sm font-bold text-primary tracking-tight">JobIndians Details</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12 space-y-8">
        <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

        <div className="bg-card border shadow-xl rounded-3xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-primary p-8 md:p-12 text-primary-foreground relative overflow-hidden">
            <ShieldCheck className="absolute right-[-20px] top-[-20px] w-48 h-48 opacity-10 rotate-12" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Official Portal Link
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

          {/* Details Content */}
          <div className="p-8 md:p-12 space-y-10">
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                About this Portal
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {service?.description || `${service?.name} provides official notifications for ${service?.category.toLowerCase()} across ${service?.state || "India"}. Use the official button below to access the secure government portal.`}
              </p>
            </section>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-muted/30 rounded-2xl border flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</p>
                  <p className="font-bold">{service?.category}</p>
                </div>
              </div>

              {service?.lastDate && (
                <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10 flex items-center gap-4">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-600/70">Last Date / Status</p>
                    <p className="font-bold text-red-600">{service?.lastDate}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8 border-t flex flex-col items-center gap-6">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto px-12 py-7 rounded-2xl text-lg font-bold shadow-2xl hover:scale-105 transition-all"
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
              <p className="text-[10px] md:text-xs text-muted-foreground text-center max-w-md">
                Aap JobIndians ke verified link dwara official portal par ja rahe hain. Hamesha official notifications ko dhyaan se padhein.
              </p>
            </div>
          </div>
        </div>

        <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />
      </main>

      <Concierge />
    </div>
  );
}
