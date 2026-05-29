import Link from "next/link";
import { ChevronLeft, Mail, Phone, MessageSquare } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";

export default function ContactUs() {
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Contact Us</h1>
            <p className="text-primary-foreground/80">
              Humse judiye! Agar aapko portal ke baare mein koi sawal ya sujhav hai, toh humein contact karein.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-2xl border flex items-center gap-4 group hover:border-primary/50 transition-colors">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Support</p>
                    <a href="mailto:rraj285281@gmail.com" className="font-bold hover:text-primary">rraj285281@gmail.com</a>
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-2xl border flex items-center gap-4 group hover:border-primary/50 transition-colors">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp Only</p>
                    <a href="https://wa.me/91728099772" className="font-bold hover:text-primary">728099772</a>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-primary text-primary-foreground rounded-full">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">24/7 AI Assistance</h3>
                <p className="text-sm text-muted-foreground">
                  Quick help ke liye hamare **Smart Bharat Concierge** ka upyog karein jo har page ke niche right corner mein uplabd hai.
                </p>
              </div>
            </div>

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
