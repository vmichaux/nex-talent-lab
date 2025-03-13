
import { useState, useEffect } from "react";
import { Briefcase, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db, getUserFullName } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "@/types/project"; // Import Project type

export function DashboardProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        // Get projects created by the current user, limited to 3
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(projectsQuery);
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects as Project[]);
        } else {
          // Get the user's full name for sample projects
          const userFullName = await getUserFullName(currentUser.uid);
          
          // Fallback to sample data if no projects yet
          setProjects([
            {
              id: "1",
              title: "Eco-Friendly Mobile App",
              description: "A mobile application that helps users track and reduce their carbon footprint.",
              progress: 65,
              deadline: "June 15, 2025",
              duration: "3 months",
              status: "Open" as "Open",
              skills: ["Mobile Development", "React Native", "UI/UX"],
              category: "Environment",
              owner: userFullName,
              userId: currentUser.uid,
              ownerEmail: currentUser.email || "",
              featured: false,
              applicants: 3,
              createdAt: new Date(),
              // New required fields
              projectType: "Short-term",
              skillsWithLevel: [
                { skill: "Mobile Development", level: "Intermediate" },
                { skill: "React Native", level: "Intermediate" },
                { skill: "UI/UX", level: "Beginner" }
              ],
              deliverables: ["Wireframes", "MVP", "Final App"],
              timeline: "3 months",
              compensation: "Volunteer",
              perks: ["Portfolio piece", "Environmental impact"],
              tools: ["React Native", "Firebase"],
              collaboratorsNeeded: 2,
              projectGoal: "Help users reduce their environmental impact",
              targetAudience: "Environmentally conscious individuals",
              location: "Remote",
              desiredProfiles: ["Mobile Developer", "UI/UX Designer", "Environmental Enthusiast"]
            },
            {
              id: "2",
              title: "Community Garden Platform",
              description: "Web platform connecting urban gardeners with available land and resources.",
              progress: 30,
              deadline: "August 20, 2025",
              duration: "4 months",
              status: "Open" as "Open",
              skills: ["Web Development", "React", "Firebase"],
              category: "Community",
              owner: userFullName,
              userId: currentUser.uid,
              ownerEmail: currentUser.email || "",
              featured: false,
              applicants: 5,
              createdAt: new Date(),
              // New required fields
              projectType: "Long-term mission",
              skillsWithLevel: [
                { skill: "Web Development", level: "Advanced" },
                { skill: "React", level: "Intermediate" },
                { skill: "Firebase", level: "Beginner" }
              ],
              deliverables: ["Website", "User Dashboard", "Interactive Map"],
              timeline: "4 months",
              compensation: "Fixed payment",
              compensationDetails: "Based on milestones",
              perks: ["Networking", "Community impact"],
              tools: ["React", "Firebase", "MapBox"],
              collaboratorsNeeded: 3,
              projectGoal: "Connect urban gardeners with available resources",
              targetAudience: "Urban gardeners and landowners",
              location: "Hybrid",
              budget: "$2000-$5000",
              desiredProfiles: ["Web Developer", "UX Designer", "Community Manager"]
            },
            {
              id: "3", 
              title: "Educational VR Experience",
              description: "Virtual reality modules for high school science curriculum.",
              progress: 85,
              deadline: "May 10, 2025",
              duration: "2 months",
              status: "Urgent" as "Urgent",
              skills: ["VR Development", "Unity3D", "Education"],
              category: "Education",
              owner: userFullName,
              userId: currentUser.uid,
              ownerEmail: currentUser.email || "",
              featured: true,
              applicants: 4,
              createdAt: new Date(),
              // New required fields
              projectType: "Portfolio-building",
              skillsWithLevel: [
                { skill: "VR Development", level: "Expert" },
                { skill: "Unity3D", level: "Advanced" },
                { skill: "Education", level: "Intermediate" }
              ],
              deliverables: ["VR Modules", "Documentation", "Teacher Training Materials"],
              timeline: "2 months",
              compensation: "Revenue share",
              perks: ["Educational impact", "Portfolio piece", "Mentorship"],
              tools: ["Unity3D", "Oculus SDK", "Blender"],
              collaboratorsNeeded: 2,
              projectGoal: "Create immersive learning experiences for science education",
              targetAudience: "High school students and educators",
              location: "In-person",
              legalConstraints: "Educational content licensing",
              desiredProfiles: ["VR Developer", "3D Artist", "Educational Content Writer"]
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [currentUser]);
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Active Projects
        </h2>
        <Button variant="outline" className="gap-1" onClick={() => navigate('/explore-projects')}>
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <Card key={skeleton} className="overflow-hidden shadow-md">
              <CardHeader>
                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{project.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600">
                    <Clock className="inline-block h-3 w-3 mr-1" />
                    Deadline: {project.deadline}
                  </div>
                  <Badge className={
                    project.status === "Urgent" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                    project.status === "Closed" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                    "bg-green-100 text-green-800 hover:bg-green-100"
                  }>
                    {project.status}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="default" className="w-full" onClick={() => navigate(`/project/${project.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
