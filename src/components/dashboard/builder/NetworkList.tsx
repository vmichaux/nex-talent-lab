
import { Network, ArrowRight } from "lucide-react";
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
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Network className="h-4 w-4 text-primary" />
          My Network
        </h2>
        <Button variant="outline" size="sm" className="gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {networkContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.role} • {contact.company}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 py-1">Profile</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs px-2 py-1">Connect</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
