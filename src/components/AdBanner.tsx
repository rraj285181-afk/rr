"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
  adSlot?: string;
}

export function AdBanner({ className, variant = 'horizontal', adSlot = "3693488562" }: AdBannerProps) {
  const adInited = useRef(false);

  useEffect(() => {
    // Standard AdSense push logic with safety check
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        // Silently fail if AdSense is blocked or fails to load
      }
    }
  }, []);

  const dimensions = {
    horizontal: "w-full min-h-[100px] max-h-[150px]",
    vertical: "w-[160px] min-h-[600px]",
    square: "w-full max-w-[336px] min-h-[280px]"
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-muted/10 border border-dashed flex items-center justify-center mx-auto my-8 rounded-2xl",
      dimensions[variant],
      className
    )}>
      <div className="absolute top-0 right-0 bg-muted/50 px-2 py-0.5 text-[8px] font-bold text-muted-foreground uppercase tracking-widest z-10 rounded-bl border-l border-b backdrop-blur-sm">
        ADVERTISEMENT
      </div>

      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-5471667535888198"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
