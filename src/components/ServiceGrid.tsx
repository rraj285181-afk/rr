
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
    <div className="space-y-6 md:space-y-8 px-2 md:px-0">
      {/* Mobile-Optimized Unified Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch rounded-2xl border bg-card/40 backdrop-blur-md shadow-sm divide-y lg:divide-y-0 lg:divide-x overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/10">
        
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Board or Exam Name..."
            className="pl-11 h-14 md:h-12 border-0 bg-transparent focus-visible:ring-0 font-medium text-sm md:text-base"
          />
        </div>

        <div className="w-full lg:w-64 flex items-center px-4 bg-muted/5 group h-14 md:h-12">
          <Filter className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors shrink-0" />
          <Select value={category} onValueChange={(v) => setCategory(v as any)}>
            <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-wider p-0 w-full">
              <SelectValue placeholder="CATEGORY" />
            </SelectTrigger>
            <SelectContent>
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

        <div className="w-full lg:w-60 flex items-center px-4 bg-muted/5 group h-14 md:h-12">
          <MapPin className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors shrink-0" />
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-wider p-0 w-full">
              <SelectValue placeholder="STATE" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All States">ALL INDIA</SelectItem>
              {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results List - Now linking to detail page */}
      <div className="border rounded-2xl bg-card overflow-hidden shadow-md">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, i) => (
            <Link 
              key={service.id}
              href={`/services/${service.id}`}
              className={`group flex items-center justify-between px-5 md:px-8 py-5 md:py-6 hover:bg-primary/[0.03] transition-all ${i !== filteredServices.length - 1 ? 'border-b' : ''}`}
            >
              <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-sm md:text-lg group-hover:text-primary transition-colors line-clamp-1">{service.name}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-primary/70">
                    {service.state || "All India"}
                  </div>
                  <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-50">
                    {service.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {service.lastDate && (
                  <span className="text-[9px] md:text-xs font-bold text-red-600 bg-red-500/10 px-2 md:px-3 py-1.5 rounded-lg border border-red-500/20 whitespace-nowrap hidden xs:inline">
                    Till: {service.lastDate}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))
        ) : (
          <div className="py-24 text-center opacity-30">
            <LinkIcon className="w-12 h-12 mx-auto mb-4" />
            <p className="font-bold text-xs md:text-sm uppercase tracking-[0.2em]">No official links found</p>
          </div>
        )}
      </div>
    </div>
  );
}
