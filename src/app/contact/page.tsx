import Link from "next/link";
import { ChevronLeft, Mail, MessageSquare } from "lucide-react";
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
                {/* Email Section */}
                <a 
                  href="mailto:rraj285281@gmail.com"
                  className="p-6 bg-muted/30 rounded-2xl border flex items-center gap-4 group hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Support</p>
                    <p className="font-bold">rraj285281@gmail.com</p>
                  </div>
                </a>

                {/* WhatsApp Section */}
                <a 
                  href="https://wa.me/917280909772" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-muted/30 rounded-2xl border flex items-center gap-4 group hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer"
                >
                  <div className="p-3 bg-green-500/10 rounded-xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 fill-current" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp Support</p>
                    <p className="font-bold">7280909772</p>
                  </div>
                </a>

                {/* Telegram Section */}
                <a 
                  href="https://t.me/jobindianss" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-muted/30 rounded-2xl border flex items-center gap-4 group hover:border-blue-400/50 hover:bg-blue-400/5 transition-all cursor-pointer"
                >
                  <div className="p-3 bg-blue-400/10 rounded-xl text-blue-500 group-hover:bg-blue-400 group-hover:text-white transition-colors">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 fill-current" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Telegram Channel</p>
                    <p className="font-bold">jobindianss</p>
                  </div>
                </a>
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
