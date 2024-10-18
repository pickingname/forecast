import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function GetLocation() {
  return (
    <div className="pt-5">
      <p className="text-xl pb-2">Input your forecast location</p>
      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          placeholder="35.731692"
          type="number"
          step="0.000001"
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
        />
        <p className="text-sm text-muted-foreground">
          Longitude ranges from -180° to 180°. Positive for East, negative for
          West.
        </p>
      </div>

      <Button className="mt-2">Submit Coordinates</Button>
      <Button className="mt-2 ml-2">Get current location</Button>
    </div>
  );
}
