export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  salary: {
    min: number;
    max: number;
  };
  japaneseLevel: JapaneseLevel;
  commuteTime: number;
  workDays: WorkDay[];
  benefits: string[];
  description: string;
  location: string;
  postedDate: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profileImage?: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  nearestStations: string[];
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
  };
  email: string;
  phone: string;
  visa: {
    type: string;
    document?: string;
  };
  japaneseLevel: JapaneseLevel;
  availableDays: WorkDay[];
  status: 'student' | 'worker';
  experience: string;
}

export type JobCategory = 'warehouse' | 'restaurant' | 'cleaning' | 'hotel' | 'retail' | 'delivery';

export type JapaneseLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export type WorkDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type Language = 'ja' | 'en' | 'uz';

export interface AppState {
  jobs: Job[];
  acceptedJobs: Job[];
  rejectedJobs: Job[];
  currentUser?: User;
  currentLanguage: Language;
  sortBy: SortOption;
}

export type SortOption = 'salary' | 'distance' | 'date';