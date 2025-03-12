
import { UserPlus, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Sample data for collaboration requests - in a real app, this would come from Firebase
const requests = [
  {
    id: 1,
    user: {
      name: "Thomas Laurent",
      role: "UX Designer",
      avatar: "/placeholder.svg",
      initials: "TL"
    },
    project: "Eco-Friendly Mobile App",
    message: "Je souhaite rejoindre votre équipe en tant que designer UX. J'ai 5 ans d'expérience dans la conception d'applications durables.",
    createdAt: "Il y a 1 jour"
  },
  {
    id: 2,
    user: {
      name: "Marie Dubois",
      role: "Développeur Frontend",
      avatar: "/placeholder.svg",
      initials: "MD"
    },
    project: "Community Garden Platform",
    message: "Passionnée de jardinage urbain et développeuse React, je serais ravie de contribuer à ce projet.",
    createdAt: "Il y a 3 jours"
  },
  {
    id: 3,
    user: {
      name: "Alexandre Martin",
      role: "Spécialiste VR",
      avatar: "/placeholder.svg",
      initials: "AM"
    },
    project: "Educational VR Experience",
    message: "Expert en réalité virtuelle éducative avec un background en pédagogie. Disponible immédiatement.",
    createdAt: "Il y a 1 semaine"
  }
];

export function DashboardRequests() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Demandes de collaboration
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/requests')}>
          Voir tout <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={request.user.avatar} alt={request.user.name} />
                  <AvatarFallback>{request.user.initials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <div>
                      <h3 className="font-medium">{request.user.name}</h3>
                      <div className="text-sm text-gray-500">{request.user.role}</div>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {request.project}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{request.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{request.createdAt}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <X className="h-4 w-4" />
                        Refuser
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Check className="h-4 w-4" />
                        Accepter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
