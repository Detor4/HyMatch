import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ja: {
    // Navigation
    jobList: '仕事一覧',
    chooseList: '選択リスト',
    refusalList: '拒否リスト',
    
    // Job details
    perHour: '時給',
    japaneseLevel: '日本語レベル',
    availableDays: '勤務可能日',
    highlights: 'おすすめポイント',
    
    // Actions
    noMoreJobs: 'すべてのアルバイトを確認しました',
    noSelectedJobs: '選択したアルバイトがありません',
    noRejectedJobs: '拒否したアルバイトがありません',
    swipeRightToSelect: '右にスワイプして選択',
    swipeLeftToReject: '左にスワイプして拒否',
    
    // Categories
    warehouse: '倉庫作業',
    cooking: '調理',
    cleaning: '清掃',
    delivery: '配達',
    customer_service: '接客',
    hotel: 'ホテル',
    
    // Highlights
    shiftAdjustable: 'シフト調整可',
    mealProvided: '食事付き',
    uniformProvided: '制服貸与',
    experienceNotRequired: '未経験歓迎',
    earlyMorning: '早朝勤務',
    quietWork: '静かな環境',
    flexibleHours: '時間選択自由',
    bikeProvided: 'バイク貸与',
    nightShift: '夜勤あり',
    transportation: '交通費支給',
    morningWork: '午前中勤務',
    
    // Profile
    profile: 'プロフィール',
    language: '言語設定',
    settings: '設定',
    
    // Contact
    contact: 'お問い合わせ',
    phone: '電話',
    email: 'メール',
    
    // Sort
    sortBy: '並び替え',
    sortByWage: '時給順',
    sortByCommuteHome: '自宅からの通勤時間',
    sortByCommuteSchool: '学校からの通勤時間',
    sortByPostDate: '投稿日時',
    
    // Profile Form
    name: '名前',
    age: '年齢',
    nationality: '国籍',
    gender: '性別',
    male: '男性',
    female: '女性',
    other: 'その他',
    commuteTimeHome: '自宅からの通勤時間',
    commuteTimeBuilding: '学校からの通勤時間',
    postalCode: '郵便番号',
    jobPreference: '希望職種',
    address: '住所',
    phone: '電話番号',
    email: 'メールアドレス',
    visaType: '在留資格',
    plannedVisaChange: '在留資格の変更予定',
    japaneseLevel: '日本語レベル',
    currentStatus: '現在の状況',
    workExperience: '職歴',
    selectAge: '年齢を選択',
    selectNationality: '国籍を選択',
    selectCommuteTime: '通勤時間を選択',
    selectJobType: '職種を選択',
    selectVisaType: '在留資格を選択',
    selectPlannedVisaChange: '変更予定を選択',
    selectJapaneseLevel: '日本語レベルを選択',
    selectCurrentStatus: '現在の状況を選択',
    enterName: '名前を入力',
    enterPostalCode: '郵便番号を入力',
    enterAddress: '住所を入力',
    enterPhoneNumber: '電話番号を入力',
    enterEmail: 'メールアドレスを入力',
    enterWorkExperience: '職歴を入力',
    autoAddress: '住所自動入力',
    save: '保存',
    edit: '編集',
    success: '成功',
    error: 'エラー',
    profileSavedMessage: 'プロフィールが保存されました',
    requiredFieldsMessage: '必須項目を入力してください',
    permissionDenied: '権限が拒否されました',
    
    // Accepted Jobs
    acceptedJobs: '受諾した仕事',
    accepted: '受諾済み',
    noAcceptedJobs: '受諾した仕事がありません',
    
    // Contact
    makeCall: '電話をかける',
    cancel: 'キャンセル',
    callConfirmation: '電話をかけますか？',
    noJobsAvailable: '現在表示できる仕事がありません',
    backToJobList: '仕事一覧に戻る',
    tel: '電話番号',
    
    // Favorites
    favorites: 'お気に入り',
    favoritesScreen: 'お気に入り画面',
    noFunctionality: '機能なし',
    
    // Search
    search: '検索',
    searchJobs: '仕事を検索',
    searchPlaceholder: '仕事を検索...',
    noJobsFound: '仕事が見つかりませんでした',
    tryDifferentSearch: '別の検索を試してください',
    

  },
  en: {
    // Navigation
    jobList: 'Job List',
    chooseList: 'Selected Jobs',
    refusalList: 'Rejected Jobs',
    
    // Job details
    perHour: 'per hour',
    japaneseLevel: 'Japanese Level',
    availableDays: 'Available Days',
    highlights: 'Highlights',
    
    // Actions
    noMoreJobs: 'No more jobs available',
    noSelectedJobs: 'No selected jobs',
    noRejectedJobs: 'No rejected jobs',
    swipeRightToSelect: 'Swipe right to select',
    swipeLeftToReject: 'Swipe left to reject',
    
    // Categories
    warehouse: 'Warehouse',
    cooking: 'Cooking',
    cleaning: 'Cleaning',
    delivery: 'Delivery',
    customer_service: 'Customer Service',
    hotel: 'Hotel',
    
    // Highlights
    shiftAdjustable: 'Flexible Shifts',
    mealProvided: 'Meals Provided',
    uniformProvided: 'Uniform Provided',
    experienceNotRequired: 'No Experience Required',
    earlyMorning: 'Early Morning',
    quietWork: 'Quiet Environment',
    flexibleHours: 'Flexible Hours',
    bikeProvided: 'Bike Provided',
    nightShift: 'Night Shift Available',
    transportation: 'Transportation Allowance',
    morningWork: 'Morning Work',
    
    // Profile
    profile: 'Profile',
    language: 'Language',
    settings: 'Settings',
    
    // Contact
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    
    // Sort
    sortBy: 'Sort By',
    sortByWage: 'Hourly Wage',
    sortByCommuteHome: 'Commute from Home',
    sortByCommuteSchool: 'Commute from School',
    sortByPostDate: 'Post Date',
    
    // Profile Form
    name: 'Name',
    age: 'Age',
    nationality: 'Nationality',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    commuteTimeHome: 'Commute Time (Home)',
    commuteTimeBuilding: 'Commute Time (Building)',
    postalCode: 'Postal Code',
    jobPreference: 'Job Preference',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    visaType: 'Visa Type',
    plannedVisaChange: 'Planned Visa Change',
    japaneseLevel: 'Japanese Level',
    currentStatus: 'Current Status',
    workExperience: 'Work Experience',
    selectAge: 'Select Age',
    selectNationality: 'Select Nationality',
    selectCommuteTime: 'Select Commute Time',
    selectJobType: 'Select Job Type',
    selectVisaType: 'Select Visa Type',
    selectPlannedVisaChange: 'Select Planned Visa Change',
    selectJapaneseLevel: 'Select Japanese Level',
    selectCurrentStatus: 'Select Current Status',
    enterName: 'Enter Name',
    enterPostalCode: 'Enter Postal Code',
    enterAddress: 'Enter Address',
    enterPhoneNumber: 'Enter Phone Number',
    enterEmail: 'Enter Email',
    enterWorkExperience: 'Enter Work Experience',
    autoAddress: 'Auto Address',
    save: 'Save',
    edit: 'Edit',
    success: 'Success',
    error: 'Error',
    profileSavedMessage: 'Profile saved successfully',
    requiredFieldsMessage: 'Please fill in all required fields',
    permissionDenied: 'Permission denied',
    
    // Accepted Jobs
    acceptedJobs: 'Accepted Jobs',
    accepted: 'Accepted',
    noAcceptedJobs: 'No accepted jobs yet',
    
    // Contact
    makeCall: 'Make Call',
    cancel: 'Cancel',
    callConfirmation: 'Make a call?',
    noJobsAvailable: 'No jobs available to display',
    backToJobList: 'Back to job list',
    tel: 'Tel',
    
    // Favorites
    favorites: 'Favorites',
    favoritesScreen: 'Favorites Screen',
    noFunctionality: 'No functionality',
    
    // Search
    search: 'Search',
    searchJobs: 'Search Jobs',
    searchPlaceholder: 'Search jobs...',
    noJobsFound: 'No jobs found',
    tryDifferentSearch: 'Try a different search',
    

  },
  uz: {
    // Navigation
    jobList: 'Ish ro\'yxati',
    chooseList: 'Tanlangan ishlar',
    refusalList: 'Rad etilgan ishlar',
    
    // Job details
    perHour: 'soatiga',
    japaneseLevel: 'Yapon tili darajasi',
    availableDays: 'Mavjud kunlar',
    highlights: 'Asosiy xususiyatlar',
    
    // Actions
    noMoreJobs: 'Boshqa ishlar yo\'q',
    noSelectedJobs: 'Tanlangan ishlar yo\'q',
    noRejectedJobs: 'Rad etilgan ishlar yo\'q',
    swipeRightToSelect: 'Tanlash uchun o\'ngga suring',
    swipeLeftToReject: 'Rad etish uchun chapga suring',
    
    // Categories
    warehouse: 'Omborxona',
    cooking: 'Oshpazlik',
    cleaning: 'Tozalash',
    delivery: 'Yetkazib berish',
    customer_service: 'Mijozlarga xizmat',
    hotel: 'Mehmonxona',
    
    // Highlights
    shiftAdjustable: 'Moslashuvchan smena',
    mealProvided: 'Ovqat bilan ta\'minlash',
    uniformProvided: 'Forma beriladi',
    experienceNotRequired: 'Tajriba talab etilmaydi',
    earlyMorning: 'Erta ertalab',
    quietWork: 'Sokin muhit',
    flexibleHours: 'Moslashuvchan vaqt',
    bikeProvided: 'Velosiped beriladi',
    nightShift: 'Tungi smena mavjud',
    transportation: 'Transport to\'lovi',
    morningWork: 'Ertalabki ish',
    
    // Profile
    profile: 'Profil',
    language: 'Til',
    settings: 'Sozlamalar',
    
    // Contact
    contact: 'Aloqa',
    phone: 'Telefon',
    email: 'Elektron pochta',
    
    // Sort
    sortBy: 'Saralash',
    sortByWage: 'Soatlik maosh bo\'yicha',
    sortByCommuteHome: 'Uydan yo\'l vaqti',
    sortByCommuteSchool: 'Maktabdan yo\'l vaqti',
    sortByPostDate: 'E\'lon sanasi',
    
    // Profile Form
    name: 'Ism',
    age: 'Yosh',
    nationality: 'Millat',
    gender: 'Jinsi',
    male: 'Erkak',
    female: 'Ayol',
    other: 'Boshqa',
    commuteTimeHome: 'Uydan yo\'l vaqti',
    commuteTimeBuilding: 'Maktabdan yo\'l vaqti',
    postalCode: 'Pochta indeksi',
    jobPreference: 'Ish turi',
    address: 'Manzil',
    phone: 'Telefon',
    email: 'Elektron pochta',
    visaType: 'Viza turi',
    plannedVisaChange: 'Rejalashtirilgan viza o\'zgarishi',
    japaneseLevel: 'Yapon tili darajasi',
    currentStatus: 'Hozirgi holat',
    workExperience: 'Ish tajribasi',
    selectAge: 'Yoshni tanlang',
    selectNationality: 'Millatni tanlang',
    selectCommuteTime: 'Yo\'l vaqtini tanlang',
    selectJobType: 'Ish turini tanlang',
    selectVisaType: 'Viza turini tanlang',
    selectPlannedVisaChange: 'Rejalashtirilgan o\'zgarishni tanlang',
    selectJapaneseLevel: 'Yapon tili darajasini tanlang',
    selectCurrentStatus: 'Hozirgi holatni tanlang',
    enterName: 'Ismni kiriting',
    enterPostalCode: 'Pochta indeksini kiriting',
    enterAddress: 'Manzilni kiriting',
    enterPhoneNumber: 'Telefon raqamini kiriting',
    enterEmail: 'Elektron pochtani kiriting',
    enterWorkExperience: 'Ish tajribasini kiriting',
    autoAddress: 'Avtomatik manzil',
    save: 'Saqlash',
    edit: 'Tahrirlash',
    success: 'Muvaffaqiyatli',
    error: 'Xato',
    profileSavedMessage: 'Profil muvaffaqiyatli saqlandi',
    requiredFieldsMessage: 'Barcha majburiy maydonlarni to\'ldiring',
    permissionDenied: 'Ruxsat rad etildi',
    
    // Accepted Jobs
    acceptedJobs: 'Qabul qilingan ishlar',
    accepted: 'Qabul qilindi',
    noAcceptedJobs: 'Hali qabul qilingan ish yo\'q',
    
    // Contact
    makeCall: 'Telefon qilish',
    cancel: 'Bekor qilish',
    callConfirmation: 'Telefon qilmoqchimisiz?',
    noJobsAvailable: 'Hozircha ko\'rsatiladigan ish yo\'q',
    backToJobList: 'Ishlar ro\'yxatiga qayting',
    tel: 'Tel',
    
    // Favorites
    favorites: 'Sevimli ishlar',
    favoritesScreen: 'Sevimli ishlar ekrani',
    noFunctionality: 'Funksionallik yo\'q',
    
    // Search
    search: 'Qidirish',
    searchJobs: 'Ishlarni qidirish',
    searchPlaceholder: 'Ishlarni qidirish...',
    noJobsFound: 'Ish topilmadi',
    tryDifferentSearch: 'Boshqa qidiruvni sinab ko\'ring',

  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}