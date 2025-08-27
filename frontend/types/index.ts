
export interface Skill {
  id: string;
  name: string;
  jobId: string;
}

export interface Application {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  extraData?: Record<string, any>;
  job: Job;
  applicant: { id: string; fullName: string; email: string };
  salaryExpectation?: string;                   // Optional salary expectation
  noticePeriod?: string;                          // Optional notice period

  
}
export interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  aboutCompany: string;
  companyName:string,
  logo: string;
  salary: string;
  posted: string;      // ISO date string
  updatedAt: string;   // ISO date string
  category: string;
  featured: boolean;
    skills: Skill[];
  userId: string;
  createdBy: {
    id: string;
    fullName: string;
    email: string;
  };
  _count: {
    applications: number;
  };
  applications: Application[];
  status?: JobStatus;



}

 enum JobStatus {
   OPEN = "OPEN",
   CLOSED = "CLOSED"
}
export interface CreatedBy {
  id: string;
  fullName: string;
  email: string;
}


export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  coverLetter: string;
  salaryExpectation: string;
  noticePeriod: string;
  source: string;
}

export interface Resume {
  // add fields if you know them (e.g., url, fileName, etc.)
  [key: string]: unknown;
}

export interface JobApplication {
  job: Job;
  data: ApplicationData;
  resume: Resume;
}



export interface AdminJob {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  aboutCompany: string;
  logo?: string;
  category: string;
  featured: boolean;
  posted: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  createdBy: {
    id: string;
    fullName: string;
    email: string;
  };
  _count: {
    applications: number;
  };
}

export interface AdminApplication {
  id: string;
  status: ApplicationStatus
  createdAt: string;
  updatedAt: string;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  salaryExpectation?: string;
  noticePeriod?: string;
  job: {
    id: string;
    title: string;
    createdBy: {
      id: string;
      fullName: string;
    };
  };
  applicant: {
    id: string;
    fullName: string;
    email: string;
  };
}

export enum ApplicationStatus {
     APPLIED = "APPLIED",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED",
    INTERVIEW = "INTERVIEW",
    HIRED = "HIRED",
}


export enum Role {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  EMPLOYER = 'EMPLOYER',
}