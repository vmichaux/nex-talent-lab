
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type ProficiencyLevel = "Basic" | "Intermediate" | "Advanced" | "Native";
export type CompanyStage = "Startup" | "Scale-up" | "Enterprise" | "Any";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Language {
  name: string;
  proficiency: ProficiencyLevel;
  certificate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate?: string;
  verificationLink?: string;
}

export interface ProjectPreference {
  teamSize?: string;
  companyStage?: CompanyStage;
  projectDuration?: string;
  roleLevel?: string;
}

export interface RemoteWorkSetup {
  hasWorkspace: boolean;
  hasHighSpeedInternet: boolean;
  hasWebcamMic: boolean;
  hasMultipleMonitors: boolean;
  timezone?: string;
  workingHours?: string;
  remoteExperience?: string;
}

export interface Portfolio {
  title: string;
  link: string;
  description?: string;
}

export interface Resume {
  filename: string;
  url: string;
  uploadDate: Date;
}
