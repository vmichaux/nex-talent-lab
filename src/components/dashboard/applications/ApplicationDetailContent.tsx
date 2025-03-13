
import { ExternalLink } from "lucide-react";
import { ApplicationSummary, formatDate } from "./ApplicationTypes";

interface ApplicationDetailContentProps {
  application: ApplicationSummary;
}

export function ApplicationDetailContent({ application }: ApplicationDetailContentProps) {
  return (
    <div className="space-y-6 py-4">
      {application.coverLetter && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
          <p className="mt-1 bg-gray-50 p-3 rounded">{application.coverLetter}</p>
        </div>
      )}
      
      {application.relevantExperience && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Relevant Experience</h4>
          <p className="mt-1 bg-gray-50 p-3 rounded">{application.relevantExperience}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {application.availabilityDate && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Availability</h4>
            <p className="mt-1 bg-gray-50 p-3 rounded">{application.availabilityDate}</p>
          </div>
        )}
        
        {application.timeCommitment && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Time Commitment</h4>
            <p className="mt-1 bg-gray-50 p-3 rounded">{application.timeCommitment}</p>
          </div>
        )}
      </div>
      
      {application.portfolioLink && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
          <a 
            href={application.portfolioLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-1 inline-flex items-center gap-1 bg-gray-50 p-3 rounded w-full"
          >
            {application.portfolioLink}
            <ExternalLink size={14} />
          </a>
        </div>
      )}
      
      <div>
        <h4 className="text-sm font-medium text-gray-500">Contact</h4>
        <p className="mt-1 bg-gray-50 p-3 rounded">{application.userEmail}</p>
      </div>
      
      {application.feedback && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Your Feedback</h4>
          <p className="mt-1 bg-gray-50 p-3 rounded">{application.feedback}</p>
        </div>
      )}
    </div>
  );
}
