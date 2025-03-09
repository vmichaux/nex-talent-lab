
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Welcome to your NexTalent Lab dashboard
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <p className="text-muted-foreground mb-4">
              Complete your profile to increase your visibility to potential collaborators.
            </p>
            <div className="h-2 bg-muted rounded-full mb-4">
              <div className="h-2 bg-primary rounded-full w-[35%]"></div>
            </div>
            <Button>Complete Your Profile</Button>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Projects</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Mobile App Design</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Web Development</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>UX Research</span>
                <Button variant="outline" size="sm">View</Button>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium">New message from Sarah</p>
                <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium">Project invite: E-commerce Platform</p>
                <p className="text-sm text-muted-foreground">July 15, 2023</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Virtual Networking</p>
                <p className="text-sm text-muted-foreground">July 22, 2023 • 6:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Workshop: Portfolio Building</p>
                <p className="text-sm text-muted-foreground">July 28, 2023 • 4:00 PM</p>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">See All Events</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
