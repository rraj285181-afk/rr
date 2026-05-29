"use client";

import { useEffect, useState } from "react";
import { Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MONITORED_SERVICES = [
  { name: "SSC", status: "online" },
  { name: "NTA", status: "online" },
  { name: "UPSC", status: "online" },
  { name: "CBSE", status: "online" },
  { name: "Govt", status: "online" },
];

export function StatusTracker() {
  const [statuses, setStatuses] = useState(MONITORED_SERVICES);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setStatuses(prev => prev.map(s => {
        if (Math.random() > 0.98) {
          return { ...s, status: Math.random() > 0.5 ? "online" : "warning" };
        }
        return { ...s, status: "online" };
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-xs font-bold py-1.5 px-3 md:px-5 rounded-full bg-muted/40 border border-primary/10 shadow-sm overflow-hidden">
        <div className="hidden xs:flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-3 md:w-3.5 h-3 md:h-3.5" />
          <span className="hidden lg:inline uppercase tracking-widest opacity-60">Status</span>
        </div>
        
        <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
          {statuses.map((service) => (
            <div key={service.name} className="flex items-center gap-1 md:gap-1.5 shrink-0">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-700",
                service.status === "online" ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" : "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
              )} />
              <span className="text-foreground/70 uppercase tracking-tighter sm:tracking-normal">{service.name}</span>
            </div>
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-3 h-3 cursor-help opacity-40 hover:opacity-100 transition-opacity hidden sm:block" />
          </TooltipTrigger>
          <TooltipContent className="bg-primary text-white border-0 text-[10px] font-bold">
            <p>Monitoring official government servers</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}