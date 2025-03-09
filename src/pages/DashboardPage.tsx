
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Users, FileText, CheckCircle, Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient - Same as other pages */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-16">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Welcome to your NexTalent Lab dashboard
              </p>
            </div>

            {/* User Profile Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium">Jane Doe</h3>
                      <p className="text-muted-foreground">UX Designer & Developer</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge>UI/UX</Badge>
                        <Badge>Design</Badge>
                        <Badge>React</Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full mt-4">
                        <div className="h-2 bg-primary rounded-full w-[65%]"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Profile completion: 65%</p>
                    </div>
                    <Button className="mt-4 md:mt-0">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Projects Section */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription>
                      Projects you've created or joined
                    </CardDescription>
                  </div>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span>Post New Project</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Project 1 */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Mobile App Design</h3>
                          <p className="text-sm text-muted-foreground">Created 2 days ago</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">Design</Badge>
                            <Badge variant="outline" className="text-green-600 bg-green-50">5 Applicants</Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-amber-600 bg-amber-50">Pending Approval</Badge>
                      </div>
                    </div>
                    
                    {/* Project 2 */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Web Development</h3>
                          <p className="text-sm text-muted-foreground">Created 1 week ago</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">Development</Badge>
                            <Badge variant="outline" className="text-green-600 bg-green-50">3 Applicants</Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 bg-green-50">Approved</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Projects</Button>
                </CardFooter>
              </Card>

              {/* Notifications & Approval System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                      <p className="font-medium text-amber-800">Project Approval Pending</p>
                      <p className="text-sm text-amber-700">Your Mobile App Design project is under review</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <p className="font-medium text-green-800">Application Approved</p>
                      <p className="text-sm text-green-700">Your application to "UX Research" was approved</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">New Message</p>
                      <p className="text-sm text-muted-foreground">From Alex in Web Development project</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View All Notifications</Button>
                </CardFooter>
              </Card>

              {/* Messaging System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=33" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Alex Smith</p>
                        <p className="text-sm text-muted-foreground truncate">Hey, about the project timeline...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=44" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Maria Johnson</p>
                        <p className="text-sm text-muted-foreground truncate">I've finished the wireframes for...</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Open Messaging</Button>
                </CardFooter>
              </Card>

              {/* Talent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Your Applications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">UX Research Project</p>
                        <Badge variant="outline" className="text-green-600 bg-green-50">Approved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Applied 3 days ago</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">Video Editing</p>
                        <Badge variant="outline" className="text-amber-600 bg-amber-50">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Applied yesterday</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Find Projects to Apply</Button>
                </CardFooter>
              </Card>

              {/* Matching System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    <span>Recommended Matches</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">UI Animation Project</p>
                      <p className="text-sm text-muted-foreground">98% match with your skills</p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">E-commerce Redesign</p>
                      <p className="text-sm text-muted-foreground">85% match with your skills</p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Matches</Button>
                </CardFooter>
              </Card>

              {/* Approval System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Approval Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-medium">Profile Verification</p>
                        <p className="text-sm text-muted-foreground">Your profile has been verified</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 bg-green-50">Approved</Badge>
                    </div>
                    <div className="p-3 border rounded-md flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-medium">Mobile App Design Project</p>
                        <p className="text-sm text-muted-foreground">Submitted 2 days ago</p>
                      </div>
                      <Badge variant="outline" className="text-amber-600 bg-amber-50">In Review</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground w-full text-center">All content is reviewed before going live on the platform</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
