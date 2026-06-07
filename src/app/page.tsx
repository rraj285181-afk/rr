
import { StatusTracker } from "@/components/StatusTracker";
import { ServiceGrid } from "@/components/ServiceGrid";
import { AdBanner } from "@/components/AdBanner";
import { Marquee } from "@/components/Marquee";
import { Concierge } from "@/components/Concierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-background bg-grid-pattern relative overflow-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none animate-blob-float z-0" />
      <div className="absolute top-[20%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] pointer-events-none animate-blob-float-reverse z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none animate-blob-float z-0" />

      {/* Navigation - Ultra Premium Glass */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/65 backdrop-blur-xl border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-lg md:text-xl leading-none">J</span>
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-indigo-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400">JobIndians</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest mr-4 opacity-80">
              <a href="#directory" className="hover:text-primary transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Directory</a>
            </div>
            <StatusTracker />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="pt-16 z-10 relative">
        <main className="max-w-4xl w-full mx-auto md:px-4 py-12 space-y-12">

          <div className="bg-card border shadow-2xl rounded-none md:rounded-3xl overflow-hidden">
            {/* Hero Header */}
            <div className="bg-primary p-8 md:p-12 text-primary-foreground text-center relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-64 h-64 opacity-10 rotate-12 bg-white rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <h1 className="text-3xl md:text-5xl font-headline font-bold leading-tight text-white">
                  Official Service Directory
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/80 max-w-2xl mx-auto px-6 font-medium leading-relaxed">
                  Direct access to Board Results, Admit Cards, and Latest Recruitment notifications from official sources.
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-12 space-y-12">
              <Marquee />
              <ServiceGrid />
              <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />
            </div>

            {/* Footer inside the card */}
            <div className="border-t border-border/40 bg-muted/30 px-8 md:px-12 py-12">
              <div className="flex flex-row flex-nowrap justify-between gap-3 sm:gap-6 md:gap-12">
                <div className="space-y-3 w-[36%] md:w-1/3 text-left">
                  <div className="flex items-center justify-start gap-1.5 md:gap-2.5">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-tr from-primary to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0">
                      <span className="text-white font-black text-xs md:text-base">J</span>
                    </div>
                    <span className="text-sm md:text-xl font-black text-foreground tracking-tight truncate">JobIndians</span>
                  </div>
                  <p className="text-[12px] md:text-[15px] text-muted-foreground leading-relaxed font-medium">
                    Access to official Indian government recruitment notifications, exam results, and citizen services.
                  </p>
                </div>

                <div className="space-y-1.5 w-[30%] md:w-1/3 text-left">
                  <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-primary/90 dark:text-sky-400 border-b border-primary/10 pb-1.5 md:pb-2 whitespace-nowrap">Quick Links</h4>
                  <ul className="text-[12px] md:text-[15px] space-y-0.5 md:space-y-1 text-muted-foreground font-semibold">
                    <li><Link href="/?category=Results#directory" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Exam Results</Link></li>
                    <li><Link href="/?category=Admit Cards#directory" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Admit Cards</Link></li>
                    <li><Link href="/?category=Current Jobs#directory" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Current Jobs</Link></li>
                    <li><Link href="/?category=Scholarships#directory" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Scholarships</Link></li>
                  </ul>
                </div>

                <div className="space-y-1.5 w-[30%] md:w-1/3 text-left">
                  <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-primary/90 dark:text-sky-400 border-b border-primary/10 pb-1.5 md:pb-2 whitespace-nowrap">Official Services</h4>
                  <ul className="text-[12px] md:text-[15px] space-y-0.5 md:space-y-1 text-muted-foreground font-semibold">
                    <li><Link href="/about" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />About Us</Link></li>
                    <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Contact Us</Link></li>
                    <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center group"><ChevronRightIcon className="w-0 opacity-0 group-hover:w-3.5 md:group-hover:w-4 group-hover:mr-1 md:group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 shrink-0" />Terms & Conditions</Link></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-border/40 text-center space-y-2">
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] font-black">
                  © {new Date().getFullYear()} JobIndians Portal
                </p>
                <p className="text-[8px] md:text-[10px] text-muted-foreground/45 uppercase tracking-[0.15em] italic font-bold">
                  Professional Citizen Notification Service • All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Concierge />
    </div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
