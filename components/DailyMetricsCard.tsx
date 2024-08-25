"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SmileIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

// interface DailyMetricsCardProps {
//   date: string;
//   mood: string;
//   energy: number;
//   soreness: number;
//   sleep: string;
//   reflection: string;
//   jump1: number;
//   jump2: number;
//   jump3: number;
//   squatVelocity: number;
// }

// export default function DailyMetricsCard({
//   date,
//   mood,
//   energy,
//   soreness,
//   sleep,
//   reflection,
//   jump1,
//   jump2,
//   jump3,
//   squatVelocity,
// }: DailyMetricsCardProps) {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader>
//         <CardTitle>{date}</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 grid gap-4">
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Mood</span>
//           <div className="flex items-center gap-2">
//             <SmileIcon className="w-5 h-5 text-green-500" />
//             <span className="text-sm">{mood}</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Energy</span>
//           <div className="flex items-center gap-2">
//             <Progress value={energy} className="w-20" />
//             <span className="text-sm">{energy}%</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Soreness</span>
//           <div className="flex items-center gap-2">
//             <Progress value={soreness} className="w-20" />
//             <span className="text-sm">{soreness}%</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Sleep</span>
//           <div className="flex items-center gap-2">
//             <SmileIcon className="w-5 h-5 text-green-500" />
//             <span className="text-sm">{sleep}</span>
//           </div>
//         </div>
//         <div>
//           <span className="text-sm font-medium">Reflection</span>
//           <p className="text-sm text-muted-foreground">{reflection}</p>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Jump 1</span>
//           <div className="flex items-center gap-2">
//             <span className="text-sm">{jump1} inches</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Jump 2</span>
//           <div className="flex items-center gap-2">
//             <span className="text-sm">{jump2} inches</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Jump 3</span>
//           <div className="flex items-center gap-2">
//             <span className="text-sm">{jump3} inches</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">Squat Velocity</span>
//           <div className="flex items-center gap-2">
//             <span className="text-sm">{squatVelocity} m/s</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

interface DailyMetric {
  date: string;
  mood: number;
  energy: number;
  soreness: number;
  sleep: number;
  reflection: string;
  jump1: number;
  jump2: number;
  jump3: number;
  squatVelocity: number;
}

const DailyMetricsCard = () => {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const supabase = createClient();

      // Fetch the current authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      if (!user) {
        console.log("No user logged in");
        return;
      }

      // Fetch daily metrics for the authenticated user from the athlete_daily_metrics table
      const { data: athlete_daily_metrics, error } = await supabase.from("athlete_daily_metrics").select("*").eq("athlete_id", user.id); // Filter by the authenticated user's ID

      if (error) {
        console.error("Error fetching daily metrics:", error);
        return;
      }

      // Set the fetched metrics to the state
      setMetrics(athlete_daily_metrics as DailyMetric[]);
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      {metrics.map((metric) => (
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{metric.date}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mood</span>
              <div className="flex items-center gap-2">
                <SmileIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm">{metric.mood}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Energy</span>
              <div className="flex items-center gap-2">
                <Progress value={metric.energy} className="w-20" />
                <span className="text-sm">{metric.energy}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Soreness</span>
              <div className="flex items-center gap-2">
                <Progress value={metric.soreness} className="w-20" />
                <span className="text-sm">{metric.soreness}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sleep</span>
              <div className="flex items-center gap-2">
                <SmileIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm">{metric.sleep}</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">Reflection</span>
              <p className="text-sm text-muted-foreground">{metric.reflection}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Jump 1</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{metric.jump1} inches</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Jump 2</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{metric.jump2} inches</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Jump 3</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{metric.jump3} inches</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Squat Velocity</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{metric.squatVelocity} m/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DailyMetricsCard;
