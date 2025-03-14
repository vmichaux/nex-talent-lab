
import { Network } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactsList() {
  // Sample contacts data
  const contacts = [
    {
      id: 1,
      name: "Emma Wilson",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg",
      initials: "EW",
      status: "online"
    },
    {
      id: 2,
      name: "Marcus Rivera",
      role: "Backend Developer",
      avatar: "/placeholder.svg",
      initials: "MR",
      status: "offline"
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Product Manager",
      avatar: "/placeholder.svg",
      initials: "SC",
      status: "online"
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
          View All
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="p-0">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.initials}</AvatarFallback>
                  </Avatar>
                  {contact.status === "online" && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Message</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
