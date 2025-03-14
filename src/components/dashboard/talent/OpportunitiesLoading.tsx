
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OpportunitiesLoading() {
  return (
    <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4">
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="min-w-[280px] max-w-[350px] flex-1">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-3 w-full">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex flex-wrap gap-2 my-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-8 w-24 rounded-full mb-2" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
