
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ManageReviewsRecommendationsProps {
  role?: "talent" | "builder" | "both";
}

export function ManageReviewsRecommendations({
  role = "talent"
}: ManageReviewsRecommendationsProps) {
  const navigate = useNavigate();

  // Sample reviews data
  const reviews = [{
    id: 1,
    from: "Alex Johnson",
    project: "Mobile App Development",
    content: "Great communication and delivered on time. Would work with again!",
    rating: 5,
    date: "2 days ago"
  }, {
    id: 2,
    from: "Sarah Miller",
    project: "Website Redesign",
    content: "Outstanding attention to detail and very responsive to feedback.",
    rating: 5,
    date: "1 week ago"
  }, {
    id: 3,
    from: "David Chen",
    project: "UI/UX Design",
    content: "Creative solutions and professional work ethic.",
    rating: 4,
    date: "2 weeks ago"
  }];
  
  return <div>
      <div className="flex justify-between items-center mb-4 rounded-2xl">
        <h2 className="font-semibold category-title-gradient text-3xl">
          Manage Reviews & Recommendations
        </h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/reviews')}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {reviews.slice(0, 3).map(review => <div key={review.id} className="flex flex-col p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">{review.from}</span>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Project: {review.project}</p>
              <p className="text-xs italic text-gray-600">"{review.content.length > 100 ? review.content.substring(0, 100) + '...' : review.content}"</p>
              <div className="flex mt-1">
                {Array(review.rating).fill(0).map((_, i) => <ThumbsUp key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />)}
              </div>
            </div>)}
        </CardContent>
      </Card>
    </div>;
}
