
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
}

export interface Certification {
  name: string;
  issuer: string;
  dateObtained: string;
  expirationDate?: string;
  verificationLink?: string;
}

export interface ProjectPreference {
  teamSize: string;
  companyStage: CompanyStage;
  projectDuration: string;
  roleLevel: string;
}

export interface RemoteWorkSetup {
  hasWorkspace: boolean;
  hasHighSpeedInternet: boolean;
  hasWebcamMic: boolean;
  hasMultipleMonitors: boolean;
  timezone: string;
  workingHours: string;
  remoteExperience: string;
}

export interface Portfolio {
  title: string;
  link: string;
  description?: string;
}

export interface Resume {
  fileName: string;
  fileUrl: string;
  uploadDate: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  fullName?: string;
  title: string;
  location: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: Date | null;
  email: string;
  phoneNumber: string;
  sex: string;
  interests: string[];
  business: {
    companyName: string;
    foundedYear: string;
    description: string;
    employees: string;
    industry: string;
    projectNeeds: string;
    billingDetails: string;
  };
  skills: Skill[];
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; position: string; duration: string }[];
  languages: Language[];
  certifications: Certification[];
  
  // These fields are placeholders for future enhancements
  resume?: Resume | null;
  portfolios?: Portfolio[];
  projectPreferences?: ProjectPreference;
  remoteWorkSetup?: RemoteWorkSetup;
}
