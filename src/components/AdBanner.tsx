"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
  adSlot?: string;
  onStatusChange?: (status: 'loading' | 'filled' | 'unfilled') => void;
}

export function AdBanner({ className, variant = 'horizontal', adSlot = "3693488562", onStatusChange }: AdBannerProps) {
  const [adStatus, setAdStatus] = useState<'loading' | 'filled' | 'unfilled'>('loading');
  const [isDev, setIsDev] = useState(false);
  const insRef = useRef<HTMLModElement>(null);

  const dimensions = {
    horizontal: "w-full min-h-[100px] max-h-[150px]",
    vertical: "w-[160px] min-h-[600px]",
    square: "w-full max-w-[336px] min-h-[280px]"
  };

  const updateStatus = (status: 'loading' | 'filled' | 'unfilled') => {
    setAdStatus(status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      // Regex to detect IPv4 addresses (e.g. 10.218.245.241 or 192.168.1.1)
      const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);
      
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local") ||
        isIpAddress ||
        hostname.includes("cloudworkstations.dev") ||
        hostname.includes("idx.google.internal")
      ) {
        setIsDev(true);
        updateStatus('unfilled');
      }
    }
  }, []);

  useEffect(() => {
    if (isDev) return;

    // Standard AdSense push logic with safety check
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        updateStatus('unfilled');
      }
    }
  }, [isDev]);

  useEffect(() => {
    if (isDev) return;

    const el = insRef.current;
    if (!el) return;

    // Detect when AdSense fills the ad slot
    // We only disconnect when we get a definitive status from AdSense
    const checkStatus = () => {
      const status = el.getAttribute("data-ad-status");
      
      if (status === "unfilled") {
        updateStatus('unfilled');
        return true;
      }
      if (status === "filled") {
        updateStatus('filled');
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
      
      if (status === "unfilled") {
        updateStatus('unfilled');
      } else if (status === "filled") {
        updateStatus('filled');
      } else if (hasIframe) {
        updateStatus('filled');
      } else {
        updateStatus('unfilled');
      }
      observer.disconnect();
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [isDev]);

  return (
    <>
      <style>{`
        .adsbygoogle,
        .adsbygoogle iframe,
        ins.adsbygoogle > iframe {
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>
      <div className={cn(
        "transition-all duration-500 ease-in-out",
        adStatus === 'filled'
          ? "relative overflow-hidden flex items-center justify-center mx-auto my-4 rounded-2xl " + dimensions[variant]
          : "w-0 h-0 min-h-0 min-w-0 border-none bg-transparent overflow-hidden my-0 py-0 opacity-0",
        className
      )}>
        {!isDev && (
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
        )}
      </div>
    </>
  );
}
