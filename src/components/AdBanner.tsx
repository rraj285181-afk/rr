"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
  adSlot?: string;
}

export function AdBanner({ className, variant = 'horizontal', adSlot = "3693488562" }: AdBannerProps) {
  const [adStatus, setAdStatus] = useState<'loading' | 'filled' | 'unfilled'>('loading');
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Standard AdSense push logic with safety check
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        setAdStatus('unfilled');
      }
    }
  }, []);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    // Detect when AdSense fills the ad slot (either via state attribute or inserting an iframe)
    const checkStatus = () => {
      const status = el.getAttribute("data-ad-status");
      const hasIframe = el.querySelector("iframe") !== null;
      if (status === "filled" || hasIframe) {
        setAdStatus('filled');
        return true;
      } else if (status === "unfilled") {
        setAdStatus('unfilled');
        return true;
      }
      return false;
    };

    if (checkStatus()) return;

    const observer = new MutationObserver(() => {
      if (checkStatus()) {
        observer.disconnect();
      }
    });

    observer.observe(el, { attributes: true, childList: true, subtree: true });

    // Fallback: If still loading after 4 seconds, collapse the ad
    const timeout = setTimeout(() => {
      const status = el.getAttribute("data-ad-status");
      const hasIframe = el.querySelector("iframe") !== null;
      if (status === "filled" || hasIframe) {
        setAdStatus('filled');
      } else {
        setAdStatus('unfilled');
      }
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const dimensions = {
    horizontal: "w-full min-h-[100px] max-h-[150px]",
    vertical: "w-[160px] min-h-[600px]",
    square: "w-full max-w-[336px] min-h-[280px]"
  };

  return (
    <>
      <style>{`
        .adsbygoogle,
        .adsbygoogle iframe,
        ins.adsbygoogle > iframe {
          background: transparent !important;
        }
      `}</style>
      <div className={cn(
        "transition-all duration-500 ease-in-out",
        adStatus === 'filled'
          ? "relative overflow-hidden flex items-center justify-center mx-auto my-8 rounded-2xl " + dimensions[variant]
          : "w-0 h-0 min-h-0 min-w-0 border-none bg-transparent overflow-hidden my-0 py-0 opacity-0",
        className
      )}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{
            display: adStatus === 'unfilled' ? 'none' : 'block',
            background: 'transparent',
            textAlign: "center",
            width: "100%",
            height: "100%"
          }}
          data-ad-client="ca-pub-5471667535888198"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
}
