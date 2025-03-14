
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, isEqual, isValid, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DayContent } from "react-day-picker";

interface Deadline {
  id: number;
  projectName: string;
  milestone: string;
  deadline: string; // format: "May 15, 2023" etc.
  progress: number;
  status: string;
  description: string;
  assignedTo: string;
}

interface DeadlinesCalendarViewProps {
  deadlines: Deadline[];
  filteredDeadlines: Deadline[];
}

export function DeadlinesCalendarView({ deadlines, filteredDeadlines }: DeadlinesCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Convert string deadlines to Date objects
  const deadlineDates = filteredDeadlines.map(deadline => {
    const date = new Date(deadline.deadline);
    return {
      ...deadline,
      dateObj: isValid(date) ? date : new Date(),
    };
  });
  
  // Get all days that have deadlines
  const daysWithDeadlines = deadlineDates.map(d => d.dateObj);
  
  // Get deadlines for selected date
  const selectedDateDeadlines = deadlineDates.filter(deadline => 
    selectedDate && 
    isEqual(
      new Date(deadline.dateObj.getFullYear(), deadline.dateObj.getMonth(), deadline.dateObj.getDate()),
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    )
  );
  
  // Navigate to previous month
  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  // Navigate to next month
  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // Reset to current month
  const resetToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Get status color for badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "At Risk": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Behind Schedule": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  
  // Custom day render function for the calendar
  const renderDay = (props: React.ComponentPropsWithRef<typeof DayContent>) => {
    const date = props.date;
    if (!date) return null;
    
    // Check if the day has any deadlines
    const hasDeadlines = daysWithDeadlines.some(deadline => 
      isEqual(
        new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate()),
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      )
    );
    
    // Get all deadlines for this day
    const dayDeadlines = deadlineDates.filter(deadline => 
      isEqual(
        new Date(deadline.dateObj.getFullYear(), deadline.dateObj.getMonth(), deadline.dateObj.getDate()),
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      )
    );
    
    // Determine dot color based on deadline status
    let dotColor = "bg-gray-400";
    if (dayDeadlines.length > 0) {
      if (dayDeadlines.some(d => d.status === "Behind Schedule")) {
        dotColor = "bg-red-500";
      } else if (dayDeadlines.some(d => d.status === "At Risk")) {
        dotColor = "bg-yellow-500";
      } else {
        dotColor = "bg-green-500";
      }
    }
    
    return (
      <div
        className={cn(
          "relative p-0 flex items-center justify-center",
          hasDeadlines && "font-medium"
        )}
      >
        {hasDeadlines && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span>{format(date, "d")}</span>
                <div className={cn("w-1.5 h-1.5 rounded-full mt-0.5", dotColor)} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 p-0" align="center">
              <div className="flex flex-col divide-y">
                <div className="px-3 py-2 bg-muted/50 font-medium">
                  {format(date, "MMMM d, yyyy")} ({dayDeadlines.length} {dayDeadlines.length === 1 ? 'deadline' : 'deadlines'})
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {dayDeadlines.map((deadline) => (
                    <div key={deadline.id} className="p-2 hover:bg-muted/30">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">{deadline.projectName}</span>
                        <Badge className={cn("text-xs px-1 py-0", getStatusColor(deadline.status))}>
                          {deadline.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{deadline.milestone}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{deadline.progress}%</span>
                        </div>
                        <Progress value={deadline.progress} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
        
        {!hasDeadlines && <span>{format(date, "d")}</span>}
      </div>
    );
  };
  
  // Get the first and last day of the current month
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  
  // Get all days of the current month
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  // Count deadlines by status for this month
  const monthDeadlinesCount = deadlineDates.filter(d => 
    d.dateObj.getMonth() === currentMonth.getMonth() && 
    d.dateObj.getFullYear() === currentMonth.getFullYear()
  );
  
  const onTrackCount = monthDeadlinesCount.filter(d => d.status === "On Track").length;
  const atRiskCount = monthDeadlinesCount.filter(d => d.status === "At Risk").length;
  const behindCount = monthDeadlinesCount.filter(d => d.status === "Behind Schedule").length;
  
  const upcomingDeadlines = deadlineDates
    .filter(d => d.dateObj >= new Date())
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={previousMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={resetToToday}>
                Today
              </Button>
            </div>
            
            <div className="p-3 pb-0">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    {onTrackCount} On Track
                  </span>
                  <span className="flex items-center text-xs">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    {atRiskCount} At Risk
                  </span>
                  <span className="flex items-center text-xs">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    {behindCount} Behind
                  </span>
                </div>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              showOutsideDays={true}
              modifiers={{
                hasMilestone: daysWithDeadlines
              }}
              modifiersClassNames={{
                hasMilestone: "font-medium relative"
              }}
              className="p-3 pointer-events-auto"
              components={{
                DayContent: renderDay
              }}
            />
          </CardContent>
        </Card>
        
        <div className="w-full lg:w-72 space-y-4">
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="p-3 border-b font-medium text-sm">
                {selectedDate ? (
                  <span>Deadlines for {format(selectedDate, "MMMM d, yyyy")}</span>
                ) : (
                  <span>Select a date</span>
                )}
              </div>
              <div className="divide-y max-h-72 overflow-y-auto">
                {selectedDateDeadlines.length > 0 ? (
                  selectedDateDeadlines.map((deadline) => (
                    <div key={deadline.id} className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">{deadline.projectName}</span>
                        <Badge className={cn("text-xs px-1 py-0", getStatusColor(deadline.status))}>
                          {deadline.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{deadline.milestone}</p>
                      <p className="text-xs text-muted-foreground mb-2">{deadline.description}</p>
                      <div className="text-xs text-muted-foreground mb-2">Assigned to: {deadline.assignedTo}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{deadline.progress}%</span>
                        </div>
                        <Progress value={deadline.progress} className="h-1.5" />
                      </div>
                    </div>
                  ))
                ) : selectedDate ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No deadlines on this date
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Select a date to view deadlines
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="p-3 border-b font-medium text-sm">Upcoming Deadlines</div>
              <div className="divide-y max-h-72 overflow-y-auto">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className="p-3 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedDate(deadline.dateObj)}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-xs">{deadline.projectName}</span>
                        <span className="text-xs text-muted-foreground">{format(deadline.dateObj, "MMM d")}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{deadline.milestone}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No upcoming deadlines
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
