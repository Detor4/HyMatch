import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileData {
  name: string;
  age: string;
  nationality: string;
  gender: string;
  commuteTimeHome: string;
  commuteTimeBuilding: string;
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  preferences: string[];
  profileImage: string | null;
  cvFile: string | null;
  // Visa information
  visaType: string;
  visaImage: string | null;
  plannedVisaChange: string;
  visaChangeDocument: string | null;
  // Other information
  japaneseLevel: string;
  workingDays: string[];
  currentStatus: string;
  workExperience: string;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: ProfileData) => void;
  isProfileComplete: boolean;
}

const defaultProfileData: ProfileData = {
  name: '',
  age: '',
  nationality: '',
  gender: '',
  commuteTimeHome: '',
  commuteTimeBuilding: '',
  postalCode: '',
  address: '',
  phone: '',
  email: '',
  preferences: ['', ''],
  profileImage: null,
  cvFile: null,
  // Visa information
  visaType: '',
  visaImage: null,
  plannedVisaChange: '',
  visaChangeDocument: null,
  // Other information
  japaneseLevel: '',
  workingDays: [],
  currentStatus: '',
  workExperience: ''
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);

  const updateProfile = (data: ProfileData) => {
    setProfileData(data);
  };

  const isProfileComplete = Boolean(
    profileData.name &&
    profileData.age &&
    profileData.nationality &&
    profileData.gender &&
    profileData.postalCode &&
    profileData.address &&
    profileData.phone &&
    profileData.email
  );

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, isProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
