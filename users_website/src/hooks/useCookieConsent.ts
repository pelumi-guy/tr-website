// hooks/useCookieConsent.ts
'use client';

import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

interface ConsentStatus {
  hasConsented: boolean | null; // null means not yet determined
  isLoading: boolean;
}

export const useCookieConsent = (): ConsentStatus => {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consentCookie = getCookie('lpc-cookie-consent');
    if (consentCookie === 'true') {
      setConsent(true);
    } else if (consentCookie === 'false') {
      setConsent(false);
    } else {
      setConsent(null); // No choice has been made
    }
    setIsLoading(false);
  }, []);

  return { hasConsented: consent, isLoading };
};