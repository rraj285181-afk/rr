import { StatusTracker } from "@/components/StatusTracker";
import { ServiceGrid } from "@/components/ServiceGrid";
import { AdBanner } from "@/components/AdBanner";
import { Marquee } from "@/components/Marquee";
import { Concierge } from "@/components/Concierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Calendar, Briefcase, Award, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const calendarItems = [
    { title: "SSC CGL 2026", date: "June-July 2026", icon: <Briefcase className="w-5 h-5" />, status: "Upcoming", url: "https://ssc.gov.in" },
    { title: "UPSC Prelims 2026", date: "May 2026", icon: <Award className="w-5 h-5" />, status: "Upcoming", url: "https://upsc.gov.in" },
    { title: "IBPS PO 2026", date: "Oct 2026", icon: <Bell className="w-5 h-5" />, status: "Active", url: "https://ibps.in" },
    { title: "CTET Jan 2026", date: "January 2026", icon: <Calendar className="w-5 h-5" />, status: "Active", url: "https://ctet.nic.in" },
    { title: "RRB NTPC 2026", date: "TBA 2026", icon: <Briefcase className="w-5 h-5" />, status: "Awaited", url: "https://indianrailways.gov.in" },
    { title: "JEE Advanced 2026", date: "June 2026", icon: <Award className="w-5 h-5" />, status: "Upcoming", url: "https://jeeadv.ac.in" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation - Optimized for all screen sizes */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-2 md:px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 group cursor-pointer">
              <div className="w-7 h-7 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-base md:text-xl leading-none">J</span>
              </div>
              <span className="text-base md:text-xl font-bold tracking-tight text-primary hidden xs:block">JobIndians</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-1.5 md:gap-4 overflow-hidden">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest mr-4 opacity-70">
              <a href="#directory" className="hover:text-primary transition-colors">Directory</a>
              <a href="#calendar" className="hover:text-primary transition-colors">Calendar</a>
            </div>
            <StatusTracker />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <main className="max-w-7xl w-full mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-24">
          <section id="directory" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight px-2">Official Service Directory</h2>
              <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto px-6">
                Direct access to Board Results, Admit Cards, and Latest Recruitment notifications from verified official sources.
              </p>
            </div>

            <div className="max-w-4xl mx-auto w-full px-1">
              <Marquee />
            </div>

            <ServiceGrid />
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-4" />

          <section id="calendar" className="space-y-8 py-4">
            <div className="text-center space-y-3 px-4">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Sarkari Exam Calendar 2026</h2>
              <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
                Stay ahead with the latest upcoming exam schedules and notification dates for the 2026 session.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {calendarItems.map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-card border rounded-2xl p-5 space-y-4 hover:shadow-md hover:border-primary/50 transition-all cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                        item.status === 'Active' ? 'bg-green-500/10 text-green-600' : 
                        item.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-600' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.status}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-[10px] md:text-sm text-muted-foreground">Expected: {item.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-4" />
        </main>
      </div>

      <footer className="border-t bg-card py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Brand Identity */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">J</span>
              </div>
              <span className="text-xl font-bold text-primary tracking-tight">JobIndians</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto lg:mx-0">
              Verified access to official Indian government recruitment notifications, exam results, and citizen services.
            </p>
          </div>

          {/* Links Container - Side by Side on Mobile and Desktop */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-primary/80 border-b pb-2">Official Services</h4>
              <ul className="text-xs md:text-sm space-y-3 text-muted-foreground font-medium">
                <li><Link href="/?category=Results#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Exam Results</Link></li>
                <li><Link href="/?category=Admit Cards#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Admit Cards</Link></li>
                <li><Link href="/?category=Latest Jobs#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Latest Jobs</Link></li>
                <li><Link href="/?category=Scholarships#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Scholarships</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest text-primary/80 border-b pb-2">Quick Links</h4>
              <ul className="text-xs md:text-sm space-y-3 text-muted-foreground font-medium">
                <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t text-center space-y-2">
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} JobIndians Portal
          </p>
          <p className="text-[8px] md:text-[10px] text-muted-foreground/60 uppercase tracking-widest italic">
            Official Citizen Notification Service • All Rights Reserved
          </p>
        </div>
      </footer>
      <Concierge />
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}