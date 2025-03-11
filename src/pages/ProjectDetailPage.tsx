
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <PageHeader 
              label="Project details"
              title="Project Name" // This would be dynamic based on project data
              description="Complete project information and application details."
            />
            
            {/* Project details content would go here */}
            <div className="max-w-4xl mx-auto">
              <p>Project ID: {id}</p>
              {/* More project details would be displayed here */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
