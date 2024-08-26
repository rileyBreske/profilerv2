"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from "../utils/supabase/client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AlertCircle } from "lucide-react";

interface DailyMetric {
  id: string;
  date: string;
  mood: string;
  energy: number;
  soreness: number;
  sleep: string;
  reflection: string;
  jump1: number;
  jump2: number;
  jump3: number;
  squat_velocity: number;
}

const NoDataPlaceholder = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-center">No Data Available</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center p-6">
      <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-center text-muted-foreground">
        There are currently no daily metrics to display. Start logging your daily metrics to see them here!
      </p>
    </CardContent>
  </Card>
);

const MetricItem = ({ label, value, icon, progress }: { label: string; value: string; icon?: React.ReactNode; progress?: number }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex items-center gap-2">
      {icon && icon}
      {progress !== undefined ? (
        <>
          <Progress value={progress} className="w-20" />
          <span className="text-sm">{value}</span>
        </>
      ) : (
        <span className="text-sm">{value}</span>
      )}
    </div>
  </div>
);

const DailyMetricsCard = () => {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      if (!user) {
        console.log("No user logged in");
        setLoading(false);
        return;
      }

      const { data: athlete_daily_metrics, error } = await supabase
        .from("athlete_daily_metrics")
        .select("*")
        .eq("athlete_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching daily metrics:", error);
        setLoading(false);
        return;
      }

      setMetrics(athlete_daily_metrics as DailyMetric[]);
      setLoading(false);
    };

    fetchMetrics();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMetrics = metrics.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(metrics.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (metrics.length === 0) {
    return <NoDataPlaceholder />;
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 overflow-x-auto">
        <div className="inline-flex gap-4 pb-4">
          {currentMetrics.map((metric, index) => (
            <Link href={`/protected/${metric.id}`} key={index} passHref>
              <Card key={index} className="flex flex-col w-[300px] h-[600px] shrink-0">
                <CardHeader>
                  <CardTitle>{metric.date}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 grid gap-4 grid-cols-1">
                  <MetricItem label="Mood" value={metric.mood} icon={<SmileIcon className={`w-5 h-5 ${getMoodColor(metric.mood)}`} />} />
                  <MetricItem label="Energy" value={`${metric.energy}%`} progress={metric.energy} />
                  <MetricItem label="Soreness" value={`${metric.soreness}%`} progress={metric.soreness} />
                  <MetricItem label="Sleep" value={metric.sleep} icon={<FlagIcon className={`w-5 h-5 ${getSleepColor(metric.sleep)}`} />} />
                  <div>
                    <span className="text-sm font-medium">Reflection</span>
                    <p className="text-sm text-muted-foreground">{metric.reflection}</p>
                  </div>
                  <MetricItem label="Jump 1" value={`${metric.jump1} inches`} />
                  <MetricItem label="Jump 2" value={`${metric.jump2} inches`} />
                  <MetricItem label="Jump 3" value={`${metric.jump3} inches`} />
                  <MetricItem label="Squat Velocity" value={`${metric.squat_velocity} m/s`} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      {metrics.length > itemsPerPage && (
        <Pagination className="self-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} isActive={currentPage > 1} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} isActive={currentPage < totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

const getMoodColor = (mood: string) => {
  //color for icon based on mood
  switch (mood) {
    case "good":
      return "text-green-500";
    case "neutral":
      return "text-yellow-500";
    case "bad":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const getSleepColor = (sleep: string) => {
  //color for icon based on sleep
  switch (sleep) {
    case "good":
      return "text-green-500";
    case "average":
      return "text-yellow-500";
    case "poor":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  //icon for sleep
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  //icon for mood
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

export default DailyMetricsCard;
