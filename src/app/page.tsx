
import { StatusTracker } from "@/components/StatusTracker";
import { ServiceGrid } from "@/components/ServiceGrid";
import { AdBanner } from "@/components/AdBanner";
import { Marquee } from "@/components/Marquee";
import { Concierge } from "@/components/Concierge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Calendar, Briefcase, Award, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const calendarItems = [
    { 
      title: "SSC CGL 2026", 
      date: "June-July 2026", 
      icon: <Briefcase className="w-5 h-5" />, 
      status: "Upcoming", 
      url: "https://ssc.gov.in",
      description: "Combined Graduate Level Examination for various Group B and C administrative posts in central ministries."
    },
    { 
      title: "UPSC Prelims 2026", 
      date: "May 2026", 
      icon: <Award className="w-5 h-5" />, 
      status: "Upcoming", 
      url: "https://upsc.gov.in",
      description: "Civil Services Preliminary Examination for recruitment to prestigious services like IAS, IPS, and IFS."
    },
    { 
      title: "IBPS PO 2026", 
      date: "Oct 2026", 
      icon: <Bell className="w-5 h-5" />, 
      status: "Active", 
      url: "https://ibps.in",
      description: "Probationary Officers recruitment drive for participating public sector banks across India."
    },
    { 
      title: "CTET Jan 2026", 
      date: "January 2026", 
      icon: <Calendar className="w-5 h-5" />, 
      status: "Active", 
      url: "https://ctet.nic.in",
      description: "Central Teacher Eligibility Test for candidates aspiring for teaching positions in central government schools."
    },
    { 
      title: "RRB NTPC 2026", 
      date: "TBA 2026", 
      icon: <Briefcase className="w-5 h-5" />, 
      status: "Awaited", 
      url: "https://indianrailways.gov.in",
      description: "Non-Technical Popular Categories recruitment for various station and commercial roles in Indian Railways."
    },
    { 
      title: "JEE Advanced 2026", 
      date: "June 2026", 
      icon: <Award className="w-5 h-5" />, 
      status: "Upcoming", 
      url: "https://jeeadv.ac.in",
      description: "Joint Entrance Examination for admission to undergraduate courses in Indian Institutes of Technology (IITs)."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation - Optimized for all screen sizes */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-base md:text-xl leading-none">J</span>
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-primary">JobIndians</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
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
        <main className="max-w-7xl w-full mx-auto px-4 py-8 md:py-16 space-y-16 md:space-y-32">
          {/* Main Directory Hub */}
          <section id="directory" className="space-y-12">
            <div className="text-center space-y-4 pt-4">
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight px-2 leading-tight">
                Official Service Directory
              </h2>
              <p className="text-xs md:text-lg text-muted-foreground max-w-3xl mx-auto px-6 font-medium leading-relaxed">
                Direct access to Board Results, Admit Cards, and Latest Recruitment notifications from official sources.
              </p>
            </div>

            <div className="max-w-4xl mx-auto w-full px-2">
              <Marquee />
            </div>

            <ServiceGrid />
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-8" />

          {/* Exam Calendar Section */}
          <section id="calendar" className="space-y-12 py-4">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight">Sarkari Exam Calendar 2026</h2>
              <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Stay ahead with the latest upcoming exam schedules and notification dates for the 2026 session.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-2">
              {calendarItems.map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-card border rounded-3xl p-6 md:p-8 space-y-6 hover:shadow-2xl hover:border-primary/50 transition-all cursor-pointer relative flex flex-col h-full overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="scale-[4] origin-top-right">{item.icon}</div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full",
                        item.status === 'Active' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 
                        item.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 
                        'bg-muted text-muted-foreground border'
                      )}>
                        {item.status}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 relative z-10">
                    <div>
                      <h4 className="font-bold text-lg md:text-2xl group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                      <p className="text-[11px] md:text-sm text-primary/80 font-bold mt-1.5 uppercase tracking-widest">Expected: {item.date}</p>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-8" />
        </main>
      </div>

      <footer className="border-t bg-card py-16 mt-32">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-base">J</span>
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">JobIndians</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mx-0 font-medium">
              Access to official Indian government recruitment notifications, exam results, and citizen services.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-6">
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-3">Official Services</h4>
              <ul className="text-sm space-y-4 text-muted-foreground font-semibold">
                <li><Link href="/?category=Results#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Exam Results</Link></li>
                <li><Link href="/?category=Admit Cards#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Admit Cards</Link></li>
                <li><Link href="/?category=Latest Jobs#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Latest Jobs</Link></li>
                <li><Link href="/?category=Scholarships#directory" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Scholarships</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-3">Quick Links</h4>
              <ul className="text-sm space-y-4 text-muted-foreground font-semibold">
                <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 pt-12 mt-16 border-t text-center space-y-3">
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] font-black">
            © {new Date().getFullYear()} JobIndians Portal
          </p>
          <p className="text-[8px] md:text-[10px] text-muted-foreground/40 uppercase tracking-[0.1em] italic font-bold">
            Professional Citizen Notification Service • All Rights Reserved
          </p>
        </div>
      </footer>
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
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
