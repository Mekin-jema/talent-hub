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
