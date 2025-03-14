
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Talent {
  id: number;
  name: string;
  role: string;
  skills: string[];
  matchScore: number;
  availability: string;
  location: string;
}

export function RecommendedTalents() {
  const recommendedTalents: Talent[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      matchScore: 95,
      availability: "Available now",
      location: "Remote"
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "UI/UX Designer",
      skills: ["Figma", "User Research", "Wireframing"],
      matchScore: 92,
      availability: "Available in 2 weeks",
      location: "Hybrid"
    },
    {
      id: 3,
      name: "Marcus Rivera",
      role: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB"],
      matchScore: 88,
      availability: "Available now",
      location: "Remote"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Recommended Talent
        </h2>
        <Button variant="outline" className="gap-1">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendedTalents.map(talent => (
          <Card key={talent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{talent.name}</h3>
                  <p className="text-gray-600 mb-2">{talent.role}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.slice(0, 2).map(skill => (
                      <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Availability:</span> {talent.availability}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Location:</span> {talent.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center w-full">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 w-full text-center">
                    {talent.matchScore}% Match
                  </div>
                  <Button className="w-full">View Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
