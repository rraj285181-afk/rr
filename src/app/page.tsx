import { StatusTracker } from "@/components/StatusTracker";
import { ServiceGrid } from "@/components/ServiceGrid";
import { AdBanner } from "@/components/AdBanner";
import { Marquee } from "@/components/Marquee";
import { Concierge } from "@/components/Concierge";
import { Calendar, Briefcase, Award, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const calendarItems = [
    { title: "SSC CGL 2024", date: "Sept-Oct 2024", icon: <Briefcase className="w-5 h-5" />, status: "Upcoming", url: "https://ssc.gov.in" },
    { title: "UPSC Prelims", date: "May 2024", icon: <Award className="w-5 h-5" />, status: "Concluded", url: "https://upsc.gov.in" },
    { title: "IBPS PO", date: "Oct 2024", icon: <Bell className="w-5 h-5" />, status: "Active", url: "https://ibps.in" },
    { title: "CTET 2024", date: "July 2024", icon: <Calendar className="w-5 h-5" />, status: "Concluded", url: "https://ctet.nic.in" },
    { title: "RRB NTPC", date: "TBA 2024", icon: <Briefcase className="w-5 h-5" />, status: "Awaited", url: "https://indianrailways.gov.in" },
    { title: "JEE Advanced", date: "June 2024", icon: <Award className="w-5 h-5" />, status: "Concluded", url: "https://jeeadv.ac.in" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation - Optimized for Mobile */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-lg md:text-xl leading-none">J</span>
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-primary">JobIndians</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-wider">
              <a href="#directory" className="hover:text-primary transition-colors">Directory</a>
              <a href="#calendar" className="hover:text-primary transition-colors">Calendar</a>
            </div>
            <StatusTracker />
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <main className="max-w-7xl w-full mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-24">
          <section id="directory" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Official Service Directory</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                Direct access to Board Results, Admit Cards, and Latest Recruitment notifications from verified official sources.
              </p>
            </div>

            <div className="max-w-4xl mx-auto w-full px-2">
              <Marquee />
            </div>

            <ServiceGrid />
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-4" />

          <section id="calendar" className="space-y-8 py-4">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Sarkari Exam Calendar</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Stay ahead with the latest upcoming exam schedules and notification dates.
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
                      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
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
                    <p className="text-xs md:text-sm text-muted-foreground">Expected: {item.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-4" />
        </main>
      </div>

      <footer className="border-t bg-card py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">J</span>
              </div>
              <span className="text-lg font-bold text-primary">JobIndians</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simplifying access to official Indian government recruitment notifications.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary/80">Official Services</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><Link href="/?category=Results#directory" className="hover:text-primary transition-colors">Exam Results</Link></li>
              <li><Link href="/?category=Admit Cards#directory" className="hover:text-primary transition-colors">Admit Cards</Link></li>
              <li><Link href="/?category=Latest Jobs#directory" className="hover:text-primary transition-colors">Latest Notifications</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary/80">Quick Links</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t text-center text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} JobIndians. Professional Citizen Notification Service.
        </div>
      </footer>

      <Concierge />
    </div>
  );
}