"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function GetLocation() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedLat = localStorage.getItem("userLat");
    const storedLon = localStorage.getItem("userLon");

    if (storedLat) setLatitude(storedLat);
    if (storedLon) setLongitude(storedLon);
  }, []);

  const saveCoordinates = () => {
    localStorage.setItem("userLat", latitude);
    localStorage.setItem("userLon", longitude);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLatitude(lat.toString());
          setLongitude(lon.toString());

          localStorage.setItem("userLat", lat.toString());
          localStorage.setItem("userLon", lon.toString());
        },
        (error) => {
          setErrorMessage("Error getting location: " + error.message);
          setOpenErrorDialog(true);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
      setOpenErrorDialog(true);
    }
  };

  return (
    <div className="">
      <p className="text-xl pb-2">Input your forecast location</p>
      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          placeholder="35.731692"
          type="number"
          step="0.000001"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Latitude ranges from -90° to 90°. Positive for North, negative for
          South.
        </p>
      </div>
      <div className="space-y-2 pt-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          placeholder="139.782956"
          type="number"
          step="0.000001"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Longitude ranges from -180° to 180°. Positive for East, negative for
          West.
        </p>
      </div>

      <Button className="mt-2" onClick={getCurrentLocation}>
        Get current location
      </Button>
      <Button className="mt-2 ml-2" onClick={saveCoordinates}>
        Save location
      </Button>

      <AlertDialog open={openErrorDialog} onOpenChange={setOpenErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[family-name:var(--font-geist-sans)] font-normal">Failed to get location</AlertDialogTitle>
            <AlertDialogDescription className="font-[family-name:var(--font-geist-mono)]">
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenErrorDialog(false)} className="font-[family-name:var(--font-geist-sans)] font-normal">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
