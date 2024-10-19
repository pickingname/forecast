import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WeatherArg() {
  return (
    <div className="pt-5">
      <p className="text-xl">Forecast settings</p>
      <div className="flex items-center space-x-2 mt-3">
        <Checkbox id="autoDetectTZ" disabled checked />
        <label
          htmlFor="autoDetectTZ"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Auto detect timezone
        </label>
      </div>
      <div className="mt-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select forecast days" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Forecast days</SelectLabel>
              <SelectItem value="apple">1 day</SelectItem>
              <SelectItem value="banana">3 days</SelectItem>
              <SelectItem value="blueberry">7 days</SelectItem>
              <SelectItem value="grapes">14 days</SelectItem>
              <SelectItem value="pineapple">16 days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3">
        <p className="">Forecast parameters</p>
        <div className="flex flex-wrap items-center space-x-2 mt-3">

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Checkbox id="Temperature" />
            <label
              htmlFor="Temperature"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Temperature
            </label>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Checkbox id="RH" />
            <label
              htmlFor="RH"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Dewpoint 
            </label>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Checkbox id="AT" />
            <label
              htmlFor="AT"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apparent Temperature (Feels like)
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}
