export interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  aboutCompany: string;
  logo: string;
  salary: string;
  posted: string;      // ISO date string
  updatedAt: string;   // ISO date string
  category: string;
  featured: boolean;
    skills: string[];
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



export interface Skill {
  id: string;
  name: string;
  jobId: string;
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

