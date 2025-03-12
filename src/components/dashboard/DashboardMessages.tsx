
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Sample data for messages - in a real app, this would come from Firebase
const messages = [
  {
    id: 1,
    sender: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
      initials: "EW"
    },
    preview: "J'ai téléchargé les fichiers de conception pour l'application éco. Dites-moi ce que vous en pensez !",
    timestamp: "Il y a 2 heures",
    unread: true,
    project: "Eco-Friendly Mobile App"
  },
  {
    id: 2,
    sender: {
      name: "Marcus Rivera",
      avatar: "/placeholder.svg",
      initials: "MR"
    },
    preview: "Pouvons-nous planifier un appel pour discuter du calendrier de la plateforme de jardinage ?",
    timestamp: "Hier",
    unread: false,
    project: "Community Garden Platform"
  },
  {
    id: 3,
    sender: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      initials: "SC"
    },
    preview: "Les simulations VR sont prêtes à être testées. Voulez-vous les essayer ?",
    timestamp: "Il y a 2 jours",
    unread: true,
    project: "Educational VR Experience"
  }
];

export function DashboardMessages() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Messages récents
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/messages')}>
          Voir tout <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {messages.map((message) => (
          <div key={message.id} className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${message.unread ? 'bg-primary/5' : ''}`}>
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium flex items-center gap-2">
                    {message.sender.name}
                    {message.unread && <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>}
                  </div>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                {message.project && (
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {message.project}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
