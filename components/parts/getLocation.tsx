"use client";

import React, { useState, useEffect, useRef } from "react";
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
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function GetLocation() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const lng = 0;
  const lat = 0;
  const zoom = 1;

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      boxZoom: true,
      dragRotate: false,
      touchPitch: false,
      touchZoomRotate: false,
      maplibreLogo: true,
    });

    map.current.addControl(new maplibregl.NavigationControl());

    map.current.on("click", (e) => {
      const lat = e.lngLat.lat;
      const lon = e.lngLat.lng;

      setLatitude(lat.toString());
      setLongitude(lon.toString());

      localStorage.setItem("userLat", lat.toString());
      localStorage.setItem("userLon", lon.toString());

      if (marker.current) {
        marker.current.setLngLat([lon, lat]);
      } else {
        marker.current = new maplibregl.Marker()
          .setLngLat([lon, lat])
          .addTo(map.current!);
      }
      if (map.current) {
        const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

        // use easeTo with the easing function and duration
        // maybe this is just a placebo effect but it feels smoother
        map.current.easeTo({
          center: [lon, lat],
          duration: 500,
          easing: easeOutQuint,
        });
      }
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    const storedLat = localStorage.getItem("userLat");
    const storedLon = localStorage.getItem("userLon");

    if (storedLat && storedLon) {
      const lat = parseFloat(storedLat);
      const lon = parseFloat(storedLon);

      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        setLatitude(storedLat);
        setLongitude(storedLon);

        if (map.current) {
          if (marker.current) {
            marker.current.setLngLat([lon, lat]);
          } else {
            marker.current = new maplibregl.Marker()
              .setLngLat([lon, lat])
              .addTo(map.current);
          }
          map.current.setCenter([lon, lat]);
        }
      }
    }
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

          if (map.current) {
            if (marker.current) {
              marker.current.setLngLat([lon, lat]);
            } else {
              marker.current = new maplibregl.Marker()
                .setLngLat([lon, lat])
                .addTo(map.current);
            }
            map.current.setCenter([lon, lat]);
          }
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
      <p className="text-xl pb-2">Enter your location manually or select it on the map.</p>
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

      <div className="map-wrap w-full mt-1">
        <div ref={mapContainer} className="map rounded-lg" />
      </div>

      <Button className="mt-2" onClick={getCurrentLocation}>
        Get current location (GPS)
      </Button>
      <Button className="mt-2 ml-2" onClick={saveCoordinates}>
        Save location
      </Button>

      <AlertDialog open={openErrorDialog} onOpenChange={setOpenErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[family-name:var(--font-geist-sans)] font-normal">
              Failed to get location
            </AlertDialogTitle>
            <AlertDialogDescription className="font-[family-name:var(--font-geist-mono)]">
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setOpenErrorDialog(false)}
              className="font-[family-name:var(--font-geist-sans)] font-normal"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}