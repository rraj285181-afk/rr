import Link from "next/link";
import { ChevronLeft, Target, Users, Info } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";

export default function AboutUs() {
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">About JobIndians</h1>
            <p className="text-primary-foreground/80 text-lg">
              India's premium unified portal for government exam notifications, results, and citizen services.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <section className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  JobIndians ka maqsad har bhartiya nagrik ko official sarkari naukri aur pariksha ki jankari sahi samay par aur asan tarike se pahunchana hai. Hum verify karte hain har link ko taaki aap hamesha official source par hi jayein.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold">Who We Serve</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Hum un lakhon students aur aspirants ki madad karte hain jo SSC, UPSC, Railway, aur State Board exams ki taiyari kar rahe hain. Hamara portal mobile-friendly aur super-fast hai.
                </p>
              </div>
            </section>

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

            <section className="bg-muted/30 p-8 rounded-2xl space-y-4 border border-dashed">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Why Choose JobIndians?</h2>
              </div>
              <ul className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">✅ Verified Official Links</li>
                <li className="flex items-center gap-2">✅ Real-time Status Tracker</li>
                <li className="flex items-center gap-2">✅ Smart AI Concierge Help</li>
                <li className="flex items-center gap-2">✅ Zero Ads Interference</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
