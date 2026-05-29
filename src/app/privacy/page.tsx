import Link from "next/link";
import { ChevronLeft, ShieldCheck, Lock, Eye, Globe } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

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
          <div className="bg-primary p-8 md:p-12 text-primary-foreground relative overflow-hidden">
            <ShieldCheck className="absolute right-[-20px] top-[-20px] w-64 h-64 opacity-10 rotate-12" />
            <div className="relative z-10 space-y-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold">Privacy Policy</h1>
              <p className="text-primary-foreground/80 max-w-xl">
                We value your trust. This policy explains how JobIndians handles your information and ensures a safe experience on our official portal.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                JobIndians is a public information portal. We do not require users to create accounts or provide personal identity information for basic browsing. If you interact with our <strong>Smart Bharat Concierge (AI)</strong>, the queries are processed in real-time to provide guidance and are not stored permanently for tracking purposes.
              </p>
            </section>

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">2. Google AdSense & Cookies</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We use Google AdSense to serve advertisements. To make these ads relevant, Google uses cookies:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
                  <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary font-bold hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
                  <li>We do not have access to or control over these cookies that are used by third-party advertisers.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">3. Data Security</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We implement a variety of security measures to maintain the safety of your information. Our portal uses industry-standard encryption (SSL/TLS) to ensure that all data transmitted between your browser and our servers is secure.
              </p>
            </section>

            <div className="pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
              <p className="text-muted-foreground italic">
                © {currentYear} JobIndians. Professional Citizen Notification Service.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-primary font-bold hover:underline">Home</Link>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">Official Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
