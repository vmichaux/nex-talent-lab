// Application-status notifications for the applicant.
//
// When a builder accepts or rejects an application, the applicant must get an
// in-app notification — every status-change UI already tells the builder "the
// applicant will be notified", but nothing wrote to the `notifications`
// collection. This is the single writer for that notification, shared by every
// status-change path (useApplicationsData, ApplicationModal, ApplicationsTable).

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ApplicationStatusNotificationInput {
  /** uid of the applicant who should receive the notification */
  applicantId: string;
  applicationId: string;
  projectId: string;
  projectTitle: string;
  status: "accepted" | "rejected";
  feedback?: string;
}

/**
 * Write an in-app notification to the applicant when their application is
 * accepted or rejected. Best-effort: any failure is logged and swallowed so a
 * notification error never blocks the status update the builder just made.
 */
export async function notifyApplicationStatus({
  applicantId,
  applicationId,
  projectId,
  projectTitle,
  status,
  feedback,
}: ApplicationStatusNotificationInput): Promise<void> {
  if (!applicantId) return;

  try {
    await addDoc(collection(db, "notifications"), {
      userId: applicantId,
      type: "application",
      title: status === "accepted" ? "Application Accepted" : "Application Declined",
      content:
        status === "accepted"
          ? `Your application for "${projectTitle}" has been accepted${feedback ? ": " + feedback : ""}`
          : `Your application for "${projectTitle}" has been declined${feedback ? ": " + feedback : ""}`,
      read: false,
      createdAt: serverTimestamp(),
      link: `/project/${projectId}`,
      relatedId: applicationId,
    });
  } catch (error) {
    console.error("Error creating application status notification:", error);
  }
}
