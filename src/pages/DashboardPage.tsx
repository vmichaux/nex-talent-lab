
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient - Same as other pages */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
                <p className="text-xl text-muted-foreground mt-2">
                  Welcome to your NexTalent Lab dashboard
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>
                      Complete your profile to increase your visibility to potential collaborators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-muted rounded-full mb-4">
                      <div className="h-2 bg-primary rounded-full w-[35%]"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Complete Your Profile</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Virtual Networking</p>
                      <p className="text-sm text-muted-foreground">July 22, 2023 • 6:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Workshop: Portfolio Building</p>
                      <p className="text-sm text-muted-foreground">July 28, 2023 • 4:00 PM</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">See All Events</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
