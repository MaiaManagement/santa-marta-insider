'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSense({ slot, format = 'auto', style, className }: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    const pushAd = () => {
      const consentApi = (window as Window & {
        MaiaConsent?: { getConsent?: () => { ad_storage?: boolean } };
      }).MaiaConsent;

      if (pushed.current || !consentApi?.getConsent?.().ad_storage || !window.adsbygoogle) return;

      try {
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        // AdSense can reject duplicate or blocked slots; keep page rendering clean.
      }
    };

    pushAd();
    window.addEventListener('ruta-adsense-ready', pushAd);
    window.addEventListener('ruta-consent-updated', pushAd);

    return () => {
      window.removeEventListener('ruta-adsense-ready', pushAd);
      window.removeEventListener('ruta-consent-updated', pushAd);
    };
  }, []);

  return (
    <div className={`adsense-container ${className || ''}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...(style || {}) }}
        data-ad-client="ca-pub-2469196723812841"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
