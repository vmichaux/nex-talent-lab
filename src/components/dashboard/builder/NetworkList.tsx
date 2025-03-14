
import { Network } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NetworkList() {
  // Sample network data
  const networkContacts = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      avatar: "/placeholder.svg",
      initials: "AJ",
      company: "TechInnovate"
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg",
      initials: "SC",
      company: "DesignHub"
    },
    {
      id: 3,
      name: "Marcus Rivera",
      role: "Project Manager",
      avatar: "/placeholder.svg",
      initials: "MR",
      company: "BuildersFuture"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          My Network
        </h2>
        <Button variant="outline" className="gap-1">
          Expand Network
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="p-0">
          {networkContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.role} • {contact.company}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Profile</Button>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
