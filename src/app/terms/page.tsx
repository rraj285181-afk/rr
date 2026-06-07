import Link from "next/link";
import { ChevronLeft, FileText, Scale, ShieldCheck } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 md:py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold group"
        >
          <div className="p-1 bg-primary/10 rounded-full group-hover:-translate-x-1 transition-transform">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>
        
        <div className="bg-card border shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-primary p-8 md:p-12 text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Terms & Conditions</h1>
            <p className="text-primary-foreground/80">
              Rules and guidelines for using JobIndians portal.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <FileText className="w-5 h-5 text-primary" />
                <h2>1. Usage Policy</h2>
              </div>
              <p>JobIndians ek information aggregator portal hai. Hum koshish karte hain ki sari jankari sahi ho, lekin users ko hamesha official government notifications se verify karne ki salah di jati hai.</p>
            </section>

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-4" />

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Scale className="w-5 h-5 text-primary" />
                <h2>2. No Guarantee</h2>
              </div>
              <p>Hum kisi bhi pariksha ya result ki guarantee nahi lete. Hum sirf official portals ke links pradan karte hain. Kisi bhi galat link ya website ke liye JobIndians zimmedar nahi hoga.</p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2>3. Intellectual Property</h2>
              </div>
              <p>Portal ka design aur AI Concierge hamari sampatti hai. Ise unauthorized tarike se copy karna ya use karna mana hai.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
