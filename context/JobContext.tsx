import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '@/types/Job';

interface JobContextType {
  availableJobs: Job[];
  selectedJobs: Job[];
  rejectedJobs: Job[];
  filteredSelectedJobs: Job[];
  selectJob: (job: Job) => void;
  rejectJob: (job: Job) => void;
  removeFromAvailable: (jobId: string) => void;
  filterJobs: (filters: any) => void;
  filterSelectedJobs: (filters: any) => void;
  resetFilters: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: '倉庫軽作業',
    company: 'ABC物流株式会社',
    phone: '+81901234567',
    category: 'warehouse',
    hourlyWage: { min: 1000, max: 1200 },
    japaneseLevel: 'N4',
    commuteTime: 25,
    location: '東京都渋谷区',
    workingDays: [0, 1, 2, 3, 4],
    highlights: ['shiftAdjustable', 'mealProvided', 'uniformProvided'],
    rating: 4.5,
    postedDate: '2025-01-01',
  },
  {
    id: '2',
    title: 'レストラン調理補助',
    company: '美味しいレストラン',
    phone: '+81901234568',
    category: 'cooking',
    hourlyWage: { min: 1100, max: 1400 },
    japaneseLevel: 'N3',
    commuteTime: 15,
    location: '東京都新宿区',
    workingDays: [1, 2, 3, 4, 5, 6],
    highlights: ['experienceNotRequired', 'mealProvided'],
    rating: 4.2,
    postedDate: '2025-01-02',
  },
  {
    id: '3',
    title: 'オフィス清掃',
    company: '清掃サービス',
    phone: '+81901234569',
    category: 'cleaning',
    hourlyWage: { min: 950, max: 1100 },
    japaneseLevel: 'N5',
    commuteTime: 30,
    location: '東京都港区',
    workingDays: [0, 1, 2, 3, 4],
    highlights: ['earlyMorning', 'quietWork'],
    rating: 4.0,
    postedDate: '2025-01-03',
  },
  {
    id: '4',
    title: 'デリバリードライバー',
    company: '配達サービス',
    phone: '+81901234570',
    category: 'delivery',
    hourlyWage: { min: 1200, max: 1800 },
    japaneseLevel: 'N4',
    commuteTime: 20,
    location: '東京都世田谷区',
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    highlights: ['flexibleHours', 'bikeProvided'],
    rating: 4.3,
    postedDate: '2025-01-04',
  },
  {
    id: '5',
    title: 'コンビニスタッフ',
    company: 'セブンイレブン',
    phone: '+81901234571',
    category: 'customer_service',
    hourlyWage: { min: 1000, max: 1300 },
    japaneseLevel: 'N3',
    commuteTime: 12,
    location: '東京都中野区',
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    highlights: ['nightShift', 'transportation'],
    rating: 4.1,
    postedDate: '2025-01-05',
  },
  {
    id: '6',
    title: 'ホテル客室清掃',
    company: '東京ホテル',
    phone: '+81901234572',
    category: 'hotel',
    hourlyWage: { min: 1050, max: 1250 },
    japaneseLevel: 'N4',
    commuteTime: 35,
    location: '東京都豊島区',
    workingDays: [1, 2, 3, 4, 5],
    highlights: ['morningWork', 'uniformProvided'],
    rating: 4.4,
    postedDate: '2025-01-06',
  },
];

export function JobProvider({ children }: { children: ReactNode }) {
  const [availableJobs, setAvailableJobs] = useState<Job[]>(mockJobs);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [rejectedJobs, setRejectedJobs] = useState<Job[]>([]);
  const [filteredSelectedJobs, setFilteredSelectedJobs] = useState<Job[]>([]);

  const selectJob = (job: Job) => {
    setSelectedJobs(prev => [...prev, job]);
    removeFromAvailable(job.id);
  };

  const rejectJob = (job: Job) => {
    setRejectedJobs(prev => [...prev, job]);
    removeFromAvailable(job.id);
  };

  const removeFromAvailable = (jobId: string) => {
    setAvailableJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const filterJobs = (filters: any) => {
    let filteredJobs = [...mockJobs];

    // Sort by selected option
    if (filters.sort) {
      switch (filters.sort) {
        case 'salary':
          if (filters.salaryTypes && filters.salaryTypes.length > 0) {
            // Sort by specific salary types
            filteredJobs.sort((a, b) => {
              const aValue = a.hourlyWage.max;
              const bValue = b.hourlyWage.max;
              return bValue - aValue; // Higher salary first
            });
          } else {
            // Default sort by hourly wage
            filteredJobs.sort((a, b) => b.hourlyWage.max - a.hourlyWage.max);
          }
          break;
        case 'commuteHome':
        case 'commuteSchool':
          filteredJobs.sort((a, b) => a.commuteTime - b.commuteTime);
          break;
      }
    }

    // Apply filters
    if (filters.filters && filters.filters.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        return filters.filters.every((filter: string) => {
          switch (filter) {
            case 'jobType':
              // Check if specific job types are selected
              if (filters.jobTypes && filters.jobTypes.length > 0) {
                return filters.jobTypes.includes(job.category);
              }
              return true; // If no specific types selected, show all
            case 'japaneseLevel':
              // Check if specific Japanese levels are selected
              if (filters.japaneseLevels && filters.japaneseLevels.length > 0) {
                return filters.japaneseLevels.includes(job.japaneseLevel);
              }
              return true; // If no specific levels selected, show all
            case 'commuteConvenient':
              // Check if specific transports are selected
              if (filters.transports && filters.transports.length > 0) {
                return job.transports && job.transports.some(transport => 
                  filters.transports.includes(transport)
                );
              }
              return true; // If no specific transports selected, show all
            case 'workImportant':
              // Check if specific work important factors are selected
              if (filters.workImportant && filters.workImportant.length > 0) {
                return job.highlights && job.highlights.some(highlight => 
                  filters.workImportant.some(important => 
                    highlight.toLowerCase().includes(important.toLowerCase())
                  )
                );
              }
              return true; // If no specific work important factors selected, show all

            case 'employmentType':
              return job.workingDays.length >= 5;
            case 'employmentPeriod':
              return job.highlights.includes('flexibleHours');
            case 'salary':
              return job.hourlyWage.max >= 1200;
            case 'company':
              return job.company && job.company.length > 0;
            default:
              return true;
          }
        });
      });
    }

    setAvailableJobs(filteredJobs);
  };

  const filterSelectedJobs = (filters: any) => {
    console.log('Filtering selected jobs with:', filters);
    
    // If no filters are applied, clear filtered results
    if (!filters || !filters.filters || filters.filters.length === 0) {
      setFilteredSelectedJobs([]);
      return;
    }

    let filteredJobs = [...selectedJobs];

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'hourlyWage':
          if (filters.sortOrder === 'asc') {
            filteredJobs.sort((a, b) => {
              const aValue = a.hourlyWage.max;
              const bValue = b.hourlyWage.max;
              return aValue - bValue; // Lower salary first
            });
          } else {
            filteredJobs.sort((a, b) => {
              const aValue = a.hourlyWage.max;
              const bValue = b.hourlyWage.max;
              return bValue - aValue; // Higher salary first
            });
          }
          break;
        case 'commuteHome':
        case 'commuteSchool':
          filteredJobs.sort((a, b) => a.commuteTime - b.commuteTime);
          break;
      }
    }

    // Apply filters
    filteredJobs = filteredJobs.filter(job => {
      return filters.filters.every((filter: string) => {
        switch (filter) {
          case 'jobType':
            if (filters.jobTypes && filters.jobTypes.length > 0) {
              return filters.jobTypes.includes(job.category);
            }
            return true;
          case 'japaneseLevel':
            if (filters.japaneseLevels && filters.japaneseLevels.length > 0) {
              return filters.japaneseLevels.includes(job.japaneseLevel);
            }
            return true;
          case 'commuteConvenient':
            if (filters.transports && filters.transports.length > 0) {
              return job.transports && job.transports.some(transport => 
                filters.transports.includes(transport)
              );
            }
            return true;
          case 'workImportant':
            if (filters.workImportant && filters.workImportant.length > 0) {
              return job.highlights && job.highlights.some(highlight => 
                filters.workImportant.some(important => 
                  highlight.toLowerCase().includes(important.toLowerCase())
                )
              );
            }
            return true;
          case 'employmentType':
            return job.workingDays.length >= 5;
          case 'employmentPeriod':
            return job.highlights.includes('flexibleHours');
          case 'salary':
            return job.hourlyWage.max >= 1200;
          case 'company':
            return job.company && job.company.length > 0;
          default:
            return true;
        }
      });
    });

    setFilteredSelectedJobs(filteredJobs);
  };

  const resetFilters = () => {
    setAvailableJobs(mockJobs);
    setFilteredSelectedJobs([]);
  };

  return (
    <JobContext.Provider
      value={{
        availableJobs,
        selectedJobs,
        rejectedJobs,
        filteredSelectedJobs,
        selectJob,
        rejectJob,
        removeFromAvailable,
        filterJobs,
        filterSelectedJobs,
        resetFilters,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}