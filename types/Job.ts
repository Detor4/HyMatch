export interface Job {
  id: string;
  title: string;
  company: string;
  phone: string;
  category: 'warehouse' | 'cooking' | 'cleaning' | 'delivery' | 'customer_service' | 'hotel';
  hourlyWage: {
    min: number;
    max: number;
  };
  salaryType: 'hourly' | 'monthly' | 'daily' | 'weekly'; // Salary payment type
  japaneseLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
  commuteTime: number; // minutes
  location: string;
  workingDays: number[]; // 0-6 (Sunday-Saturday)
  highlights: string[];
  transports: string[]; // Available transport options
  rating: number;
  postedDate: string;
}



export interface SortOption {
  key: 'wage' | 'commuteHome' | 'commuteSchool' | 'postDate';
  order: 'asc' | 'desc';
}