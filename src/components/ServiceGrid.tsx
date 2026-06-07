"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCategory, INDIAN_STATES, IndianService } from "@/lib/services-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, Link as LinkIcon, Filter, MapPin, ChevronRight, ChevronLeft, CalendarDays, Award, CreditCard, Briefcase, GraduationCap, School } from "lucide-react";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DISPLAY_CATEGORIES: {
  id: ServiceCategory;
  title: string;
  colorClass: string;
  bgGrad: string;
  iconBg: string;
  icon: React.ReactNode;
}[] = [
    {
      id: "Current Jobs",
      title: "Current Jobs",
      colorClass: "text-rose-500",
      bgGrad: "from-rose-500/5 to-orange-500/5",
      iconBg: "bg-rose-500 dark:bg-rose-600",
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      id: "Admit Cards",
      title: "Admit Cards",
      colorClass: "text-blue-500",
      bgGrad: "from-blue-500/5 to-indigo-500/5",
      iconBg: "bg-blue-500 dark:bg-blue-600",
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "Results",
      title: "Exam Results",
      colorClass: "text-emerald-500",
      bgGrad: "from-emerald-500/5 to-teal-500/5",
      iconBg: "bg-emerald-500 dark:bg-emerald-600",
      icon: <Award className="w-4 h-4" />
    },
    {
      id: "Upcoming Jobs",
      title: "Upcoming Jobs",
      colorClass: "text-violet-500",
      bgGrad: "from-violet-500/5 to-purple-500/5",
      iconBg: "bg-violet-500 dark:bg-violet-600",
      icon: <CalendarDays className="w-4 h-4" />
    },
    {
      id: "Scholarships",
      title: "Scholarships",
      colorClass: "text-amber-500",
      bgGrad: "from-amber-500/5 to-yellow-500/5",
      iconBg: "bg-amber-500 dark:bg-amber-600",
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      id: "Admissions",
      title: "Admissions",
      colorClass: "text-cyan-500",
      bgGrad: "from-cyan-500/5 to-sky-500/5",
      iconBg: "bg-cyan-500 dark:bg-cyan-600",
      icon: <School className="w-4 h-4" />
    }
  ];

const MONTHS: { [key: string]: number } = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

function extractDate(description: string | undefined | null): string | null {
  if (!description) return null;

  const patterns = [
    /Admit Card Release Date:\s*([^\n\r\-|]+)/i,
    /Exam Date:\s*([^\n\r\-|]+)/i,
    /Release Date:\s*([^\n\r\-|]+)/i,
    /Last Date:\s*([^\n\r\-|]+)/i,
    /Date:\s*([^\n\r\-|]+)/i
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const dateStr = match[1].trim();
      const cleaned = dateStr.replace(/\s*\([^)]*\)/g, "").trim();
      if (cleaned.length > 2 && cleaned.length < 50) {
        return cleaned;
      }
    }
  }

  const monthYearPattern = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}/i;
  const match = description.match(monthYearPattern);
  if (match) {
    return match[0].trim();
  }

  return null;
}

function parseMonthYear(dateStr: string | null): number {
  if (!dateStr) return 0;
  const cleaned = dateStr.toLowerCase();
  const yearMatch = cleaned.match(/\d{4}/);
  if (!yearMatch) return 0;
  const year = parseInt(yearMatch[0]);

  let month = 0;
  for (const [mName, mVal] of Object.entries(MONTHS)) {
    if (cleaned.includes(mName)) {
      month = mVal;
      break;
    }
  }

  return new Date(year, month, 1).getTime();
}

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

  const resultsQuery = useMemoFirebase(() => db ? query(collection(db, "results"), orderBy("name", "asc")) : null, [db]);
  const admitCardsQuery = useMemoFirebase(() => db ? query(collection(db, "admit_cards"), orderBy("name", "asc")) : null, [db]);
  const currentJobsQuery = useMemoFirebase(() => db ? query(collection(db, "current_jobs"), orderBy("name", "asc")) : null, [db]);
  const upcomingJobsQuery = useMemoFirebase(() => db ? query(collection(db, "upcoming_jobs"), orderBy("name", "asc")) : null, [db]);
  const scholarshipsQuery = useMemoFirebase(() => db ? query(collection(db, "scholarships"), orderBy("name", "asc")) : null, [db]);
  const admissionsQuery = useMemoFirebase(() => db ? query(collection(db, "admissions"), orderBy("name", "asc")) : null, [db]);

  const { data: results, loading: loadingResults } = useCollection<IndianService>(resultsQuery as any);
  const { data: admitCards, loading: loadingAdmitCards } = useCollection<IndianService>(admitCardsQuery as any);
  const { data: currentJobs, loading: loadingCurrentJobs } = useCollection<IndianService>(currentJobsQuery as any);
  const { data: upcomingJobs, loading: loadingUpcomingJobs } = useCollection<IndianService>(upcomingJobsQuery as any);
  const { data: scholarships, loading: loadingScholarships } = useCollection<IndianService>(scholarshipsQuery as any);
  const { data: admissions, loading: loadingAdmissions } = useCollection<IndianService>(admissionsQuery as any);

  const services = useMemo(() => {
    const list: IndianService[] = [];
    results.forEach(s => list.push({ ...s, category: 'Results' }));
    admitCards.forEach(s => list.push({ ...s, category: 'Admit Cards' }));
    currentJobs.forEach(s => list.push({ ...s, category: 'Current Jobs' }));
    upcomingJobs.forEach(s => list.push({ ...s, category: 'Upcoming Jobs' }));
    scholarships.forEach(s => list.push({ ...s, category: 'Scholarships' }));
    admissions.forEach(s => list.push({ ...s, category: 'Admissions' }));
    return list;
  }, [results, admitCards, currentJobs, upcomingJobs, scholarships, admissions]);

  const loading = loadingResults || loadingAdmitCards || loadingCurrentJobs || loadingUpcomingJobs || loadingScholarships || loadingAdmissions;

  const normalizedServices = useMemo(() => {
    return services;
  }, [services]);

  const availableStates = useMemo(() => {
    const statesSet = new Set<string>();
    normalizedServices.forEach(s => {
      if (s.state && s.state.trim() !== "") {
        const trimmedState = s.state.trim();
        const matchedState = INDIAN_STATES.find(
          is => is.toLowerCase() === trimmedState.toLowerCase()
        );
        if (matchedState && matchedState.toLowerCase() !== "all india") {
          statesSet.add(matchedState);
        }
      }
    });
    return Array.from(statesSet).sort((a, b) => a.localeCompare(b));
  }, [normalizedServices]);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      if (catParam === 'Latest Jobs') {
        setCategory('Current Jobs');
      } else {
        setCategory(catParam as any);
      }
    }
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    const filtered = normalizedServices.filter(service => {
      const matchesSearch = (service.name?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesCategory = category === 'All' || service.category === category;
      const matchesState = state === 'All States' || service.state === state || service.state === 'All India';
      return matchesSearch && matchesCategory && matchesState;
    });

    return filtered.sort((a, b) => {
      const dateA = extractDate(a.description);
      const dateB = extractDate(b.description);
      const timeA = parseMonthYear(dateA);
      const timeB = parseMonthYear(dateB);

      if (timeB !== timeA) return timeB - timeA;
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [normalizedServices, search, category, state]);

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
      <div className="w-full mx-auto px-1">
        <div className="flex flex-col lg:flex-row items-stretch rounded-2xl md:rounded-[2rem] glass-card shadow-[0_8px_32px_rgba(0,0,0,0.03)] border-border/40 hover:border-primary/20 dark:hover:border-sky-400/25 transition-all duration-300 focus-within:shadow-[0_8px_32px_rgba(99,102,241,0.05)] focus-within:border-primary/30 divide-y lg:divide-y-0 lg:divide-x divide-border/40 overflow-hidden">

          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground group-focus-within:text-primary dark:group-focus-within:text-sky-400 transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Board or Exam Name..."
              className="pl-12 md:pl-14 h-14 md:h-16 border-0 bg-transparent focus-visible:ring-0 font-medium text-[14px] md:text-lg placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="flex flex-row divide-x divide-border/40 w-full lg:w-auto">
            <div className="flex-1 lg:w-60 flex items-center px-4 md:px-5 bg-muted/5 group h-14 md:h-16 transition-colors hover:bg-muted/10">
              <Filter className="w-4 h-4 text-muted-foreground mr-2 md:mr-3 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors shrink-0" />
              <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-widest p-0 w-full truncate text-foreground/80 hover:text-foreground">
                  <SelectValue placeholder="CATEGORY" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-2xl border border-border/40 bg-background/95 backdrop-blur-xl">
                  <SelectItem value="All">ALL CATEGORIES</SelectItem>
                  <SelectItem value="Results">EXAM RESULTS</SelectItem>
                  <SelectItem value="Admit Cards">ADMIT CARDS</SelectItem>
                  <SelectItem value="Current Jobs">CURRENT JOBS</SelectItem>
                  <SelectItem value="Upcoming Jobs">UPCOMING JOBS</SelectItem>
                  <SelectItem value="Scholarships">SCHOLARSHIPS</SelectItem>
                  <SelectItem value="Admissions">ADMISSIONS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 lg:w-60 flex items-center px-4 md:px-5 bg-muted/5 group h-14 md:h-16 transition-colors hover:bg-muted/10">
              <MapPin className="w-4 h-4 text-muted-foreground mr-2 md:mr-3 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors shrink-0" />
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-full border-0 bg-transparent focus:ring-0 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-widest p-0 w-full truncate text-foreground/80 hover:text-foreground">
                  <SelectValue placeholder="STATE" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-2xl border border-border/40 bg-background/95 backdrop-blur-xl max-h-[300px]">
                  <SelectItem value="All States">ALL INDIA</SelectItem>
                  {availableStates.map(s => <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="w-full mx-auto px-1">
        <div className="border border-border/40 rounded-[1.5rem] md:rounded-[2rem] bg-card/65 backdrop-blur-xl overflow-hidden shadow-xl">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={cn(
                  "group flex items-center justify-between px-5 md:px-10 py-5 md:py-8 transition-all duration-300 hover:bg-primary/[0.02] dark:hover:bg-sky-400/[0.015]",
                  i !== filteredServices.length - 1 ? 'border-b border-border/30' : ''
                )}
              >
                <div className="space-y-3 flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap sm:flex-nowrap">
                    <h3 className="font-bold text-[14px] md:text-xl group-hover:text-primary dark:group-hover:text-sky-400 transition-colors truncate tracking-tight text-foreground">
                      {service.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-1.5 opacity-80">
                    <div className="text-[9px] md:text-[11px] uppercase font-bold tracking-[0.12em] text-primary/80 dark:text-sky-400/80 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-primary dark:text-sky-400" />
                      {service.state || "All India"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 shrink-0">
                  <div className="p-2 md:p-3 bg-muted/30 border border-border/45 rounded-full group-hover:bg-gradient-to-tr group-hover:from-primary group-hover:to-indigo-600 group-hover:text-white group-hover:border-primary group-hover:rotate-12 transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-32 text-center">
              <div className="w-16 h-16 bg-muted/30 border border-border/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LinkIcon className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground/60">No official links found in directory</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
