"use client";
import React, { useEffect, useState } from "react";

const BrowserWarningBanner = () => {
  const [isChromeBased, setIsChromeBased] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isChrome =
      /Chrome|Chromium/.test(userAgent) && !/Edg/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);

    if (isChrome || isEdge) {
      setIsChromeBased(true);
    }
  }, []);

  if (!isChromeBased) {
    return null;
  }

  return (
    <div className="bg-neutral-800 text-white font-outfit text-center p-1.5 top-0 left-0 right-0 z-50">
      <p className="m-0 text-lg">
        Did you know? This website&apos;s user interface isn&apos;t rendering correctly in
        Chrome-based browsers.{" "}
        <span className="text-red-500">It seems you&apos;re using one.</span> Please
        consider switching to Firefox or Safari.
      </p>
    </div>
  );
};

export default BrowserWarningBanner;
