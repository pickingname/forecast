"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InputKey() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apikey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem("apikey", apiKey);
  };

  return (
    <div className="pt-2">
      <p className="text-xl">Input your API key [S]</p>
      <Input
        type="email"
        placeholder="API key"
        className="mt-2"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        disabled
      />
      <p className="py-2 text-neutral-500 text-sm">
        Note: API key will only be stored in your browser's localstorage, and
        will only be used for requesting only
      </p>
      <Button className="" onClick={saveApiKey} disabled>
        Save
      </Button>
    </div>
  );
}
