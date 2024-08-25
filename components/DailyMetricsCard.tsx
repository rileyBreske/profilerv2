"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SmileIcon } from "lucide-react";
import { createClient } from "../utils/supabase/client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of cards to show per page

  useEffect(() => {
    const fetchMetrics = async () => {
      const supabase = createClient();

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

      const { data: athlete_daily_metrics, error } = await supabase
        .from("athlete_daily_metrics")
        .select("*")
        .eq("athlete_id", user.id)
        .order("date", { ascending: false }); // Order by date, most recent first

      if (error) {
        console.error("Error fetching daily metrics:", error);
        return;
      }

      setMetrics(athlete_daily_metrics as DailyMetric[]);
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

  return (
    <div className="flex flex-col gap-4 h-4/5">
      <div className="flex-1 grid gap-4 md:grid-cols-3 lg:grid-cols-3 justify-between">
        {currentMetrics.map((metric, index) => (
          <Card key={index} className="flex flex-col w-fit">
            <CardHeader>
              <CardTitle>{metric.date}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 grid gap-6">
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
              <div className="flex items-center justify-between gap-12">
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
      {metrics.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                isActive={currentPage > 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                isActive={currentPage < 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DailyMetricsCard;
