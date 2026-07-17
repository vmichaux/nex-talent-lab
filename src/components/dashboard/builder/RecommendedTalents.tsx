
import { useMemo } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/useProjects";
import { useTalents } from "@/hooks/useTalents";
import { computeBestMatchPercentage } from "@/lib/matching";

export function RecommendedTalents() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { talents, loading: talentsLoading, error: talentsError } = useTalents();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  // The builder's own still-recruiting projects define which skills a talent is
  // scored against. Without them there is nothing real to score, so no score is
  // shown (VISION.md:53-55, VISION.md:56).
  const requiredTagsPerProject = useMemo(
    () =>
      projects
        .filter(
          (project) =>
            project.userId &&
            project.userId === currentUser?.uid &&
            project.status !== "Closed"
        )
        .map((project) => project.skills ?? []),
    [projects, currentUser?.uid]
  );

  const recommendedTalents = useMemo(
    () =>
      talents
        // A builder is not a recommendation for their own project.
        .filter((talent) => talent.id !== currentUser?.uid)
        .map((talent) => ({
          talent,
          matchScore: computeBestMatchPercentage(
            [...(talent.skills ?? []), ...(talent.interests ?? [])],
            requiredTagsPerProject
          ),
        }))
        .sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1))
        .slice(0, 3),
    [talents, requiredTagsPerProject, currentUser?.uid]
  );

  const loading = talentsLoading || projectsLoading;
  const error = talentsError || projectsError;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Recommended Talent
        </h2>
        <Button
          variant="outline"
          className="gap-1"
          onClick={() => navigate("/explore-talents")}
        >
          View All
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((key) => (
            <Card key={key}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex flex-wrap gap-2 my-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Could not load talent</h3>
          <p className="text-gray-500">{error}</p>
        </Card>
      ) : recommendedTalents.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No talent to recommend yet</h3>
          <p className="text-gray-500 mb-4">
            As people join and complete their profiles, they will show up here.
          </p>
          <Button onClick={() => navigate("/explore-talents")}>
            Explore Talent
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recommendedTalents.map(({ talent, matchScore }) => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{talent.name}</h3>
                    <p className="text-gray-600 mb-2">
                      {talent.title || "Professional"}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(talent.skills ?? []).slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Availability:</span>{" "}
                        {talent.availability || "Check availability"}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Location:</span>{" "}
                        {talent.location || "Remote"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    {/* Only a real score is shown — no invented number. */}
                    {matchScore !== undefined && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 w-full text-center">
                        {matchScore}% Match
                      </div>
                    )}
                    {/* Not wired: there is no per-talent profile route yet, and
                        sending the builder to the generic directory would not be
                        "view this profile". Left for its own change. */}
                    <Button className="w-full">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
