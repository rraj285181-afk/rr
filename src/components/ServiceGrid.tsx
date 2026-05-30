
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCategory, INDIAN_STATES, IndianService } from "@/lib/services-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, Link as LinkIcon, Filter, MapPin, ChevronRight } from "lucide-react";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ServiceGrid() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-muted-foreground font-bold italic">Connecting to Directory...</div>}>
      <ServiceGridContent />
    </Suspense>
  );
}

function ServiceGridContent() {
  const searchParams = useSearchParams();
  const db = useFirestore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ServiceCategory | 'All'>('All');
  const [state, setState] = useState<string>('All States');

  const servicesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "services"), orderBy("name", "asc"));
  }, [db]);

  const { data: services, loading } = useCollection<IndianService>(servicesQuery);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) setCategory(catParam as any);
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = (service.name?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesCategory = category === 'All' || service.category === category;
      const matchesState = state === 'All States' || service.state === state || service.state === 'All India';
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [services, search, category, state]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest">Accessing Official Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Premium Unified Filter Hub */}
      <div className="max-w-5xl mx-auto px-1">
        <div className="flex flex-col lg:flex-row items-stretch rounded-2xl md:rounded-[2rem] border bg-card/60 backdrop-blur-xl shadow-2xl divide-y lg:divide-y-0 lg:divide-x overflow-hidden transition-all focus-within:ring-4 focus-within:ring-primary/5 hover:border-primary/20">
          
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Board or Exam Name..."
              className="pl-12 md:pl-14 h-14 md:h-16 border-0 bg-transparent focus-visible:ring-0 font-medium text-[14px] md:text-lg placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="w-full lg:w-60 flex items-center px-5 bg-muted/5 group h-14 md:h-16 transition-colors hover:bg-muted/10">
            <Filter className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors shrink-0" />
            <Select value={category} onValueChange={(v) => setCategory(v as any)}>
              <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-widest p-0 w-full truncate">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-2xl border-primary/10">
                <SelectItem value="All">ALL CATEGORIES</SelectItem>
                <SelectItem value="Results">EXAM RESULTS</SelectItem>
                <SelectItem value="Admit Cards">ADMIT CARDS</SelectItem>
                <SelectItem value="Latest Jobs">LATEST JOBS</SelectItem>
                <SelectItem value="Upcoming Jobs">UPCOMING JOBS</SelectItem>
                <SelectItem value="Scholarships">SCHOLARSHIPS</SelectItem>
                <SelectItem value="Admissions">ADMISSIONS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full lg:w-60 flex items-center px-5 bg-muted/5 group h-14 md:h-16 transition-colors hover:bg-muted/10">
            <MapPin className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors shrink-0" />
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-widest p-0 w-full truncate">
                <SelectValue placeholder="STATE" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-2xl border-primary/10">
                <SelectItem value="All States">ALL INDIA</SelectItem>
                {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-5xl mx-auto px-1">
        <div className="border rounded-[1.5rem] md:rounded-[2rem] bg-card overflow-hidden shadow-xl">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, i) => (
              <Link 
                key={service.id}
                href={`/services/${service.id}`}
                className={cn(
                  "group flex items-center justify-between px-5 md:px-10 py-5 md:py-8 transition-all hover:bg-primary/[0.02]",
                  i !== filteredServices.length - 1 ? 'border-b border-border/50' : ''
                )}
              >
                <div className="space-y-2 flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <h3 className="font-bold text-[14px] md:text-xl group-hover:text-primary transition-colors truncate tracking-tight">
                      {service.name}
                    </h3>
                    {service.isPopular && (
                      <span className="bg-primary/10 text-primary text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0 border border-primary/20">Trending</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-1 opacity-70">
                    <div className="text-[9px] md:text-[11px] uppercase font-bold tracking-[0.1em] text-primary/80 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {service.state || "All India"}
                    </div>
                    <div className="text-[9px] md:text-[11px] uppercase font-medium tracking-[0.1em] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
                      {service.category}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6 shrink-0">
                  {service.lastDate && service.lastDate.trim() !== "" && (
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[9px] md:text-xs font-black text-red-600 bg-red-500/5 px-3 py-1.5 rounded-lg border border-red-500/10 whitespace-nowrap shadow-sm">
                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter opacity-60 mr-1.5">Ends:</span>
                        {service.lastDate}
                      </span>
                    </div>
                  )}
                  <div className="p-2 md:p-3 bg-muted/30 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-32 text-center">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <LinkIcon className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="font-bold text-[11px] md:text-base uppercase tracking-[0.2em] text-muted-foreground/60">No official links found in directory</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
