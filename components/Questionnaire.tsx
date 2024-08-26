"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DailyMetricsCard from "./DailyMetricsCard";
import { createClient } from "@/utils/supabase/client";

export function Questionnaire() {
  const [formData, setFormData] = useState({
    mood: "good",
    energy: 50,
    soreness: 25,
    sleep: "good",
    reflection: "",
    jump1: "",
    jump2: "",
    jump3: "",
    squat_velocity: "",
    opt_out_squat: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("athlete_daily_metrics").insert({
        athlete_id: user.id,
        date: new Date().toISOString().split("T")[0],
        mood: formData.mood,
        energy: formData.energy,
        soreness: formData.soreness,
        sleep: formData.sleep,
        reflection: formData.reflection,
        jump1: formData.jump1 ? parseFloat(formData.jump1) : null,
        jump2: formData.jump2 ? parseFloat(formData.jump2) : null,
        jump3: formData.jump3 ? parseFloat(formData.jump3) : null,
        squat_velocity: formData.opt_out_squat ? null : formData.squat_velocity ? parseFloat(formData.squat_velocity) : null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your daily metrics have been submitted.",
      });
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 p-3 md:p-8 gap-8">
      <div className="md:w-1/3 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Daily Questionnaire</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mood">Mood</Label>
                <Select value={formData.mood} onValueChange={(value) => handleChange("mood", value)}>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="bad">Bad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="energy">Energy Level</Label>
                <Slider
                  id="energy"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.energy]}
                  onValueChange={(value) => handleChange("energy", value[0])}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="soreness">Soreness</Label>
                <Slider
                  id="soreness"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.soreness]}
                  onValueChange={(value) => handleChange("soreness", value[0])}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sleep">Sleep Quality</Label>
                <Select value={formData.sleep} onValueChange={(value) => handleChange("sleep", value)}>
                  <SelectTrigger id="sleep">
                    <SelectValue placeholder="Select sleep quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reflection">Reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder="How are you feeling today?"
                  className="min-h-[100px]"
                  value={formData.reflection}
                  onChange={(e) => handleChange("reflection", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jump1">Jump 1</Label>
                <Input
                  id="jump1"
                  type="number"
                  step="0.01"
                  placeholder="Enter jump 1 height"
                  value={formData.jump1}
                  onChange={(e) => handleChange("jump1", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jump2">Jump 2</Label>
                <Input
                  id="jump2"
                  type="number"
                  step="0.01"
                  placeholder="Enter jump 2 height"
                  value={formData.jump2}
                  onChange={(e) => handleChange("jump2", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jump3">Jump 3</Label>
                <Input
                  id="jump3"
                  type="number"
                  step="0.01"
                  placeholder="Enter jump 3 height"
                  value={formData.jump3}
                  onChange={(e) => handleChange("jump3", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="squat-velocity">Squat Velocity</Label>
                <Input
                  id="squat-velocity"
                  type="number"
                  step="0.01"
                  placeholder="Enter squat velocity"
                  value={formData.squat_velocity}
                  onChange={(e) => handleChange("squat_velocity", e.target.value)}
                  disabled={formData.opt_out_squat}
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="opt-out-squat"
                    checked={formData.opt_out_squat}
                    onCheckedChange={(checked) => handleChange("opt_out_squat", checked)}
                  />
                  <Label htmlFor="opt-out-squat">Opt out of squat velocity</Label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <DailyMetricsCard />
      </div>
    </div>
  );
}
