import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge } from "@/components/ui/gauge";
import { Activity, Brain, Droplet, Moon } from "lucide-react";
import dynamic from "next/dynamic";
import AuthButton from "@/components/AuthButton";
import PFV2 from "@/components/PFV2";
import Link from "next/link";

const JumpPerformanceChart = dynamic(() => import("@/components/JumpPerformanceChart"), { ssr: false });

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: metric, error } = await supabase.from("athlete_daily_metrics").select("*").eq("id", params.id).single();

  if (error) {
    console.error("Error fetching athlete data:", error);
    return <p className="text-red-500">Error loading athlete data</p>;
  }

  if (!metric) {
    notFound();
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const jumpData = [
    { name: "Jump 1", height: metric.jump1 },
    { name: "Jump 2", height: metric.jump2 },
    { name: "Jump 3", height: metric.jump3 },
  ];

  return (
    <div className="p-4 space-y-4">
      <nav className="w-full flex justify-between items-center h-16 px-5 sm:px-10">
        <div className="text-lg font-semibold text-primary">
          <Link
            href="/protected"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
          </Link>
        </div>
        <div className="flex space-x-6">
          <PFV2 />
        </div>
        <AuthButton />
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Athlete Name</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.name || "Unnamed Athlete"}</div>
            <p className="text-xs text-muted-foreground">ID: {metric.id}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(metric.date)}</div>
            <p className="text-xs text-muted-foreground">Last updated: {new Date(metric.updated_at).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.mood || "Not specified"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.sleep || "Not specified"}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Energy & Soreness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Energy</span>
                <span className="text-sm font-medium">{metric.energy}%</span>
              </div>
              <Progress value={metric.energy} max={100} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Soreness</span>
                <span className="text-sm font-medium">{metric.soreness}%</span>
              </div>
              <Progress value={metric.soreness} max={100} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Squat Velocity</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[200px]">
            <Gauge value={metric.squat_velocity} max={5} label={`${metric.squat_velocity} m/s`} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jump Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <JumpPerformanceChart data={jumpData} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{metric.reflection || "No reflection provided"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
