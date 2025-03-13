
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ApplicationFilter } from "./ApplicationTypes";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationSummary } from "./ApplicationTypes";

interface ApplicationTabsProps {
  applications: ApplicationSummary[];
  loading: boolean;
  error: string | null;
  onViewDetails: (application: ApplicationSummary) => void;
}

export function ApplicationTabs({ 
  applications, 
  loading, 
  error, 
  onViewDetails 
}: ApplicationTabsProps) {
  const pendingApplications = applications.filter(app => app.status === "pending");
  const reviewedApplications = applications.filter(app => app.status !== "pending");

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="all">All Applications</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ApplicationsTable 
          applications={applications} 
          loading={loading} 
          error={error}
          onViewDetails={onViewDetails}
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <ApplicationsTable 
          applications={pendingApplications} 
          loading={loading} 
          error={error}
          onViewDetails={onViewDetails}
          hiddenColumns={["status"]}
        />
      </TabsContent>
      
      <TabsContent value="reviewed">
        <ApplicationsTable 
          applications={reviewedApplications} 
          loading={loading} 
          error={error}
          onViewDetails={onViewDetails}
        />
      </TabsContent>
    </Tabs>
  );
}
