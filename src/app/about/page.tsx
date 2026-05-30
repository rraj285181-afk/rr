import Link from "next/link";
import { ChevronLeft, Target, Users, Info, ShieldCheck, Globe, Star } from "lucide-react";
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
          <div className="bg-primary p-8 md:p-12 text-primary-foreground relative overflow-hidden">
            <ShieldCheck className="absolute right-[-20px] top-[-20px] w-64 h-64 opacity-10 rotate-12" />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">About JobIndians Portal</h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">
                India's most trusted unified gateway for official government notifications, enabling transparency and career growth for every citizen.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-16">
            <section className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Core Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  JobIndians ka ek hi uddeshya hai: Har aspirant tak sahi aur verified jankari pahunchana. Digital Bharat ke is daur mein, galat links aur fake news se bachakar, hum aapko seedha official source se jodte hain. Hum verify karte hain har SSC, UPSC, aur State Board link ko taaki aapka samay aur bharosa dono safe rahein.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold">Who We Empower</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Hum un karodon vidyarthiyon aur job seekers ke liye kaam karte hain jo remote areas se lekar shahron tak sarkari naukri ka sapna dekhte hain. Hamara platform unke liye ek "Digital Sahayak" hai jo unhe har pariksha ki date aur result se update rakhta hai, wo bhi bina kisi confusing ads ke.
                </p>
              </div>
            </section>

            <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">What Sets Us Apart?</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Verified Ecosystem", desc: "Hum sirf .gov.in aur official institutional domains ko hi index karte hain." },
                  { title: "Zero Data Harvesting", desc: "Aapka personal data humare liye pavitra hai. Hum bina login ke information provide karte hain." },
                  { title: "Real-time AI Concierge", desc: "Hamara advanced AI aapke queries ka turant Hinglish mein jawab deta hai." },
                  { title: "Mobile Precision", desc: "Hamara portal har screen par tezi se load hota hai, taaki aap kahin bhi update rahein." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-muted/30 rounded-2xl border hover:border-primary/30 transition-colors">
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">Publisher Commitment</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                JobIndians is dedicated to providing high-value editorial content. Our team manually reviews each entry in our directory to ensure technical accuracy and source validity. We adhere to the highest standards of digital journalism and public information services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
