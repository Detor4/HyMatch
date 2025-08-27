import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Globe, 
  Home, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Leaf,
  Check,
  X,
  Edit3,
  Upload,
  ChevronDown
} from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useProfile } from '@/context/ProfileContext';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileFormScreen() {
  const { t } = useLanguage();
  const { profileData, updateProfile } = useProfile();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    ...profileData,
    preferences: profileData.preferences.slice(0, 2),
    profileImage: profileData.profileImage
  });

  const [selectedGender, setSelectedGender] = useState(profileData.gender || '');
  const [profileImage, setProfileImage] = useState<string | null>(profileData.profileImage);
  const [showAgePicker, setShowAgePicker] = useState(false);
  const [showNationalityPicker, setShowNationalityPicker] = useState(false);
  const [showCommuteHomePicker, setShowCommuteHomePicker] = useState(false);
  const [showCommuteBuildingPicker, setShowCommuteBuildingPicker] = useState(false);
  const [showPreference1Picker, setShowPreference1Picker] = useState(false);
  const [showPreference2Picker, setShowPreference2Picker] = useState(false);
  const [showVisaTypePicker, setShowVisaTypePicker] = useState(false);
  const [showPlannedVisaChangePicker, setShowPlannedVisaChangePicker] = useState(false);
  const [showJapaneseLevelPicker, setShowJapaneseLevelPicker] = useState(false);
  const [showCurrentStatusPicker, setShowCurrentStatusPicker] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const nationalities = ['Japan', 'Uzbekistan', 'USA', 'China', 'Korea'];
  const ageOptions = Array.from({length: 83}, (_, i) => (i + 18).toString());
  const commuteOptions = ['5分', '10分', '15分', '20分', '30分', '45分', '60分'];
  const preferenceOptions = ['倉庫', 'レストラン', '清掃', 'ホテル', '小売', '配達'];
  const visaTypeOptions = ['Student Visa', 'Work Visa', 'Tourist Visa', 'Spouse Visa', 'Permanent Resident'];
  const plannedVisaChangeOptions = ['Student to Work', 'Work to Permanent', 'Tourist to Student', 'No Change'];
  const japaneseLevelOptions = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const currentStatusOptions = ['Student', 'Worker', 'Unemployed', 'Part-time', 'Other'];
  const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSave = () => {
    const requiredFields = ['name', 'age', 'nationality', 'gender', 'commuteTimeHome', 'commuteTimeBuilding', 'postalCode', 'address', 'phone', 'email', 'visaType', 'japaneseLevel', 'currentStatus'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert(t('error'), t('requiredFieldsMessage'));
      return;
    }
    
    // Save profile data to context including profile image
    const profileDataWithImage = {
      ...formData,
      profileImage: profileImage,
      // Include new fields
      visaType: formData.visaType,
      plannedVisaChange: formData.plannedVisaChange,
      japaneseLevel: formData.japaneseLevel,
      workingDays: formData.workingDays,
      currentStatus: formData.currentStatus,
      workExperience: formData.workExperience,
    };
    updateProfile(profileDataWithImage);
    setIsReadOnly(true);
    Alert.alert(t('success'), t('profileSavedMessage'));
  };

  // Check if profile is complete on component mount and load profile image
  React.useEffect(() => {
    const isComplete = Boolean(
      formData.name &&
      formData.age &&
      formData.nationality &&
      formData.gender &&
      formData.commuteTimeHome &&
      formData.commuteTimeBuilding &&
      formData.postalCode &&
      formData.address &&
      formData.phone &&
      formData.email &&
      formData.visaType &&
      formData.japaneseLevel &&
      formData.currentStatus
    );
    
    if (isComplete) {
      setIsReadOnly(true);
    }

    // Load profile image from context
    if (profileData.profileImage) {
      setProfileImage(profileData.profileImage);
    }


  }, [profileData.profileImage]);

  // Update formData when profileData changes
  React.useEffect(() => {
    setFormData({
      ...profileData,
      preferences: profileData.preferences.slice(0, 2),
      profileImage: profileData.profileImage
    });
  }, [profileData]);

  const handleEdit = () => {
    setIsReadOnly(false);
  };

  const updateFormData = (field: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreference = (index: number, value: string) => {
    const newPreferences = [...formData.preferences];
    newPreferences[index] = value;
    setFormData(prev => ({ ...prev, preferences: newPreferences }));
  };

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(t('error'), t('permissionDenied'));
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };





  const renderPickerModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    options: string[],
    onSelect: (value: string) => void,
    currentValue?: string
  ) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <X size={24} color="#D8A362" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalOptions}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  currentValue === option && styles.modalOptionSelected
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  currentValue === option && styles.modalOptionTextSelected
                ]}>
                  {option}
                </Text>
                {currentValue === option && <Check size={20} color="#D8A362" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
             <View style={styles.header}>
         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <ArrowLeft size={24} color="#D8A362" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>{t('profile')}</Text>
         {isReadOnly && (
           <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
             <Edit3 size={24} color="#D8A362" />
           </TouchableOpacity>
         )}
         {!isReadOnly && <View style={styles.placeholder} />}
       </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                 {/* Profile Image */}
                   <View style={styles.profileImageContainer}>
            <TouchableOpacity 
              onPress={isReadOnly ? undefined : pickImage}
              style={[styles.profileImagePlaceholder, isReadOnly && styles.readOnlyImage]}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <>
                  <User size={60} color="#D8A362" />
                </>
              )}
            </TouchableOpacity>
 
          </View>

                 {/* Name */}
         <View style={styles.inputGroup}>
           <View style={styles.nameRow}>
             <View style={styles.nameIconContainer}>
               <Image
                 source={require('@/assets/icons/profile.png')}
                 style={styles.nameIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('name')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.name || '-'}</Text>
                 </View>
               </View>
             ) : (
               <>
                                                  <TextInput
                   style={styles.nameInput}
                   placeholder={t('enterName')}
                   value={formData.name}
                   onChangeText={(value) => updateFormData('name', value)}
                 />
                 <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                   <Image
                     source={require('@/assets/icons/man.png')}
                     style={styles.addPhotoIcon}
                     resizeMode="contain"
                   />
                 </TouchableOpacity>
               </>
             )}
           </View>
         </View>

                         {/* Age */}
         <View style={styles.inputGroup}>
           <View style={styles.ageRow}>
             <View style={styles.ageIconContainer}>
               <Image
                 source={require('@/assets/icons/cake.png')}
                 style={styles.ageIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('age')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.age || '-'}</Text>
                 </View>
               </View>
             ) : (
                               <TouchableOpacity 
                  style={styles.ageDropdown}
                  onPress={() => setShowAgePicker(true)}
                >
                                     <Text style={styles.dropdownText}>
                     {formData.age || t('selectAge')}
                   </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
             )}
           </View>
         </View>

                         {/* Nationality */}
         <View style={styles.inputGroup}>
           <View style={styles.nationalityRow}>
             <View style={styles.nationalityIconContainer}>
               <Image
                 source={require('@/assets/icons/earth.png')}
                 style={styles.nationalityIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('nationality')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.nationality || '-'}</Text>
                 </View>
               </View>
             ) : (
                               <TouchableOpacity 
                  style={styles.nationalityDropdown}
                  onPress={() => setShowNationalityPicker(true)}
                >
                                     <Text style={styles.dropdownText}>
                     {formData.nationality || t('selectNationality')}
                   </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
             )}
           </View>
         </View>

                 {/* Gender */}
         <View style={styles.inputGroup}>
           <View style={styles.genderRow}>
             <View style={styles.genderIconContainer}>
               <Image
                 source={require('@/assets/icons/gender.png')}
                 style={styles.genderIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('gender')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>
                     {formData.gender === 'male' ? t('male') : 
                      formData.gender === 'female' ? t('female') : 
                      formData.gender === 'other' ? t('other') : '-'}
                   </Text>
                 </View>
               </View>
             ) : (
               <View style={styles.genderContainer}>
                 <View style={styles.genderOptionWrapper}>
                   <Image
                     source={require('@/assets/icons/male.png')}
                     style={styles.genderOptionIcon}
                     resizeMode="contain"
                   />
                   <TouchableOpacity 
                     style={[styles.genderOption, selectedGender === 'male' && styles.genderSelected]}
                     onPress={() => {
                       setSelectedGender('male');
                       updateFormData('gender', 'male');
                     }}
                   >
                     {selectedGender === 'male' && <Check size={16} color="#FFF" />}
                   </TouchableOpacity>
                 </View>
                 <View style={styles.genderOptionWrapper}>
                   <Image
                     source={require('@/assets/icons/femenine.png')}
                     style={styles.genderOptionIcon}
                     resizeMode="contain"
                   />
                   <TouchableOpacity 
                     style={[styles.genderOption, selectedGender === 'female' && styles.genderSelected]}
                     onPress={() => {
                       setSelectedGender('female');
                       updateFormData('gender', 'female');
                     }}
                   >
                     {selectedGender === 'female' && <Check size={16} color="#FFF" />}
                   </TouchableOpacity>
                 </View>
                 <View style={styles.genderOptionWrapper}>
                   <Text style={styles.genderOptionText}>Other</Text>
                   <TouchableOpacity 
                     style={[styles.genderOption, selectedGender === 'other' && styles.genderSelected]}
                     onPress={() => {
                       setSelectedGender('other');
                       updateFormData('gender', 'other');
                     }}
                   >
                     {selectedGender === 'other' && <Check size={16} color="#FFF" />}
                   </TouchableOpacity>
                 </View>
               </View>
             )}
           </View>
         </View>

                 {/* Commute Time Home */}
         <View style={styles.inputGroup}>
           <View style={styles.commuteHomeRow}>
             <View style={styles.commuteHomeIconContainer}>
               <Image
                 source={require('@/assets/icons/house.png')}
                 style={styles.commuteHomeIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('commuteTimeHome')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.commuteTimeHome || '-'}</Text>
                 </View>
               </View>
             ) : (
               <View style={styles.commuteContainer}>
                 <TextInput style={styles.commuteInput} placeholder={t('distance')} />
                 <View style={styles.footprintContainer}>
                   <View style={styles.footstepIconContainer}>
                     <Image
                       source={require('@/assets/icons/footstep.png')}
                       style={styles.footstepIcon}
                       resizeMode="contain"
                     />
                   </View>
                 </View>
                 <TouchableOpacity 
                   style={styles.commuteDropdown}
                   onPress={() => setShowCommuteHomePicker(true)}
                 >
                   <Text style={styles.dropdownText}>
                     {formData.commuteTimeHome || t('selectCommuteTime')}
                   </Text>
                   <ChevronDown size={16} color="#6B7280" />
                 </TouchableOpacity>
               </View>
             )}
           </View>
         </View>

                 {/* Commute Time Building */}
         <View style={styles.inputGroup}>
           <View style={styles.commuteBuildingRow}>
             <View style={styles.commuteBuildingIconContainer}>
               <Image
                 source={require('@/assets/icons/school.png')}
                 style={styles.commuteBuildingIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('commuteTimeBuilding')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.commuteTimeBuilding || '-'}</Text>
                 </View>
               </View>
             ) : (
               <View style={styles.commuteContainer}>
                 <TextInput style={styles.commuteInput} placeholder={t('distance')} />
                 <View style={styles.footprintContainer}>
                   <View style={styles.footstepIconContainer}>
                     <Image
                       source={require('@/assets/icons/footstep.png')}
                       style={styles.footstepIcon}
                       resizeMode="contain"
                     />
                   </View>
                 </View>
                 <TouchableOpacity 
                   style={styles.commuteDropdown}
                   onPress={() => setShowCommuteBuildingPicker(true)}
                 >
                   <Text style={styles.dropdownText}>
                     {formData.commuteTimeBuilding || t('selectCommuteTime')}
                   </Text>
                   <ChevronDown size={16} color="#6B7280" />
                 </TouchableOpacity>
               </View>
             )}
           </View>
         </View>

                 {/* Postal Code */}
         <View style={styles.inputGroup}>
           <View style={styles.postalRow}>
             <View style={styles.postalIconContainer}>
               <Image
                 source={require('@/assets/icons/mailbox.png')}
                 style={styles.postalIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('postalCode')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.postalCode || '-'}</Text>
                 </View>
               </View>
             ) : (
               <View style={styles.postalContainer}>
                 <TextInput
                   style={styles.postalInput}
                   placeholder={t('enterPostalCode')}
                   value={formData.postalCode}
                   onChangeText={(value) => updateFormData('postalCode', value)}
                 />
                 <TouchableOpacity style={styles.autoAddressButton}>
                   <Text style={styles.autoAddressText}>{t('autoAddress')}</Text>
                 </TouchableOpacity>
               </View>
             )}
           </View>
         </View>

                 {/* Preferences */}
         <View style={styles.inputGroup}>
           <View style={styles.preference1Row}>
             <View style={styles.preferenceIconContainer}>
               <Image
                 source={require('@/assets/icons/suitcase.png')}
                 style={styles.preferenceIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('jobPreference')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.preferences[0] || '-'}</Text>
                 </View>
               </View>
             ) : (
               <TouchableOpacity 
                 style={styles.preferenceDropdown}
                 onPress={() => setShowPreference1Picker(true)}
               >
                 <Text style={styles.dropdownText}>
                   {formData.preferences[0] || t('selectJobType')}
                 </Text>
               </TouchableOpacity>
             )}
           </View>
         </View>

                 {/* Address */}
         <View style={styles.inputGroup}>
           <View style={styles.addressRow}>
             <View style={styles.addressIconContainer}>
               <Image
                 source={require('@/assets/icons/pin.png')}
                 style={styles.addressIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('address')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.address || '-'}</Text>
                 </View>
               </View>
             ) : (
                                <TextInput
                   style={styles.addressInput}
                   placeholder={t('enterAddress')}
                   value={formData.address}
                   onChangeText={(value) => updateFormData('address', value)}
                 />
             )}
           </View>
         </View>

         {/* Phone */}
         <View style={styles.inputGroup}>
           <View style={styles.phoneRow}>
             <View style={styles.phoneIconContainer}>
               <Image
                 source={require('@/assets/icons/phone_1.png')}
                 style={styles.phoneIcon}
                 resizeMode="contain"
               />
             </View>
             {isReadOnly ? (
               <View style={styles.readOnlyWrapper}>
                 <Text style={styles.readOnlyLabel}>{t('phone')}</Text>
                 <View style={styles.readOnlyContainer}>
                   <Text style={styles.readOnlyText}>{formData.phone || '-'}</Text>
                 </View>
               </View>
             ) : (
               <TextInput
                 style={styles.phoneInput}
                 placeholder={t('enterPhoneNumber')}
                 value={formData.phone}
                 onChangeText={(value) => updateFormData('phone', value)}
                 keyboardType="phone-pad"
               />
             )}
           </View>
         </View>

                            {/* Email */}
         <View style={styles.inputGroup}>
           <View style={styles.emailRow}>
             <View style={styles.emailIconContainer}>
               <Image
                 source={require('@/assets/icons/email.png')}
                 style={styles.emailIcon}
                 resizeMode="contain"
               />
             </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('email')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.email || '-'}</Text>
                  </View>
                </View>
              ) : (
                               <TextInput
                 style={styles.emailInput}
                 placeholder={t('enterEmail')}
                 value={formData.email}
                 onChangeText={(value) => updateFormData('email', value)}
                 keyboardType="email-address"
                />
              )}
            </View>
          </View>

          {/* Visa Type */}
          <View style={styles.inputGroup}>
            <View style={styles.visaTypeRow}>
              <View style={styles.visaTypeIconContainer}>
                <Image
                  source={require('@/assets/icons/visa.png')}
                  style={styles.visaTypeIcon}
                  resizeMode="contain"
                />
              </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('visaType')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.visaType || '-'}</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.visaTypeDropdown}
                  onPress={() => setShowVisaTypePicker(true)}
                >
                                   <Text style={styles.dropdownText}>
                   {formData.visaType || t('selectVisaType')}
                 </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Planned Visa Change */}
          <View style={styles.inputGroup}>
            <View style={styles.plannedVisaChangeRow}>
              <View style={styles.plannedVisaChangeIconContainer}>
                <Image
                  source={require('@/assets/icons/visa.png')}
                  style={styles.plannedVisaChangeIcon}
                  resizeMode="contain"
                />
              </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('plannedVisaChange')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.plannedVisaChange || '-'}</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.plannedVisaChangeDropdown}
                  onPress={() => setShowPlannedVisaChangePicker(true)}
                >
                                   <Text style={styles.dropdownText}>
                   {formData.plannedVisaChange || t('selectPlannedVisaChange')}
                 </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Japanese Level */}
          <View style={styles.inputGroup}>
            <View style={styles.japaneseLevelRow}>
              <View style={styles.japaneseLevelIconContainer}>
                <Image
                  source={require('@/assets/icons/chat.png')}
                  style={styles.japaneseLevelIcon}
                  resizeMode="contain"
                />
              </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('japaneseLevel')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.japaneseLevel || '-'}</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.japaneseLevelDropdown}
                  onPress={() => setShowJapaneseLevelPicker(true)}
                >
                                   <Text style={styles.dropdownText}>
                   {formData.japaneseLevel || t('selectJapaneseLevel')}
                 </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Current Status */}
          <View style={styles.inputGroup}>
            <View style={styles.currentStatusRow}>
              <View style={styles.currentStatusIconContainer}>
                <Image
                  source={require('@/assets/icons/star.png')}
                  style={styles.currentStatusIcon}
                  resizeMode="contain"
                />
              </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('currentStatus')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.currentStatus || '-'}</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.currentStatusDropdown}
                  onPress={() => setShowCurrentStatusPicker(true)}
                >
                                   <Text style={styles.dropdownText}>
                   {formData.currentStatus || t('selectCurrentStatus')}
                 </Text>
                  <ChevronDown size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Work Experience */}
          <View style={styles.inputGroup}>
            <View style={styles.workExperienceRow}>
              <View style={styles.workExperienceIconContainer}>
                <Image
                  source={require('@/assets/icons/suitcase.png')}
                  style={styles.workExperienceIcon}
                  resizeMode="contain"
                />
              </View>
              {isReadOnly ? (
                <View style={styles.readOnlyWrapper}>
                  <Text style={styles.readOnlyLabel}>{t('workExperience')}</Text>
                  <View style={styles.readOnlyContainer}>
                    <Text style={styles.readOnlyText}>{formData.workExperience || '-'}</Text>
                  </View>
                </View>
              ) : (
                <TextInput
                  style={styles.workExperienceInput}
                  placeholder={t('enterWorkExperience')}
                  value={formData.workExperience}
                  onChangeText={(value) => updateFormData('workExperience', value)}
                  multiline
                />
              )}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={[styles.inputGroup, styles.lastInputGroup]}>
            <View style={styles.bottomSpacing} />
          </View>
       </ScrollView>

       {/* Save Button */}
       {!isReadOnly && (
         <View style={styles.footer}>
           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
             <Text style={styles.saveButtonText}>{t('save')}</Text>
           </TouchableOpacity>
         </View>
       )}

      {/* Pickers */}
      {renderPickerModal(
        showAgePicker,
        () => setShowAgePicker(false),
        t('age'),
        ageOptions,
        (value) => updateFormData('age', value),
        formData.age
      )}

      {renderPickerModal(
        showNationalityPicker,
        () => setShowNationalityPicker(false),
        t('nationality'),
        nationalities,
        (value) => updateFormData('nationality', value),
        formData.nationality
      )}

      {renderPickerModal(
        showCommuteHomePicker,
        () => setShowCommuteHomePicker(false),
        t('commuteTimeHome'),
        commuteOptions,
        (value) => updateFormData('commuteTimeHome', value),
        formData.commuteTimeHome
      )}

      {renderPickerModal(
        showCommuteBuildingPicker,
        () => setShowCommuteBuildingPicker(false),
        t('commuteTimeBuilding'),
        commuteOptions,
        (value) => updateFormData('commuteTimeBuilding', value),
        formData.commuteTimeBuilding
      )}

      {renderPickerModal(
        showPreference1Picker,
        () => setShowPreference1Picker(false),
        `${t('jobPreference')} 1`,
        preferenceOptions,
        (value) => updatePreference(0, value),
        formData.preferences[0]
      )}

      {renderPickerModal(
        showPreference2Picker,
        () => setShowPreference2Picker(false),
        `${t('jobPreference')} 2`,
        preferenceOptions,
        (value) => updatePreference(1, value),
        formData.preferences[1]
      )}

      {renderPickerModal(
        showVisaTypePicker,
        () => setShowVisaTypePicker(false),
        'Visa Type',
        visaTypeOptions,
        (value) => updateFormData('visaType', value),
        formData.visaType
      )}

      {renderPickerModal(
        showPlannedVisaChangePicker,
        () => setShowPlannedVisaChangePicker(false),
        'Planned Visa Change',
        plannedVisaChangeOptions,
        (value) => updateFormData('plannedVisaChange', value),
        formData.plannedVisaChange
      )}

      {renderPickerModal(
        showJapaneseLevelPicker,
        () => setShowJapaneseLevelPicker(false),
        'Japanese Level',
        japaneseLevelOptions,
        (value) => updateFormData('japaneseLevel', value),
        formData.japaneseLevel
      )}

      {renderPickerModal(
        showCurrentStatusPicker,
        () => setShowCurrentStatusPicker(false),
        'Current Status',
        currentStatusOptions,
        (value) => updateFormData('currentStatus', value),
        formData.currentStatus
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffee7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D8A362',
  },
  placeholder: {
    width: 40,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
    marginBottom: 12,
    overflow: 'hidden',
  },
  readOnlyImage: {
    borderStyle: 'solid',
    backgroundColor: '#F8F9FA',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImageText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D8A362',
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  nameIcon: {
    width: 32,
    height: 32,
  },
  nameInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addPhotoButton: {
    backgroundColor: '#bc9a6d',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addPhotoIcon: {
    width: 24,
    height: 24,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ageIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  ageIcon: {
    width: 32,
    height: 32,
  },
  ageDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nationalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nationalityIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  nationalityIcon: {
    width: 32,
    height: 32,
  },
  nationalityDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  genderIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  genderIcon: {
    width: 32,
    height: 32,
  },

  commuteHomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commuteHomeIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  commuteHomeIcon: {
    width: 32,
    height: 32,
  },
  commuteBuildingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commuteBuildingIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  commuteBuildingIcon: {
    width: 32,
    height: 32,
  },
  commuteDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 80,
    marginLeft: 'auto',
  },
  postalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postalIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  postalIcon: {
    width: 32,
    height: 32,
  },
  preference1Row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  preferenceIcon: {
    width: 32,
    height: 32,
  },
  preferenceDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  addressIcon: {
    width: 32,
    height: 32,
  },
  addressInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emailInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lastInputGroup: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  readOnlyWrapper: {
    flex: 1,
  },
  readOnlyLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  readOnlyContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  readOnlyText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#6B7280',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'flex-start',
  },
  genderOptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genderOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderSelected: {
    backgroundColor: '#3B82F6',
  },
  genderOptionIcon: {
    width: 20,
    height: 20,
  },
  genderOptionText: {
    fontSize: 14,
    color: '#6B7280',
  },

  commuteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-start',
  },
  commuteInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 60,
  },
  footprintContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  footprint: {
    fontSize: 16,
  },
  footstepIcon: {
    width: 16,
    height: 16,
  },
  footstepIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 12,
    padding: 6,
  },
  postalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
  },
  autoAddressButton: {
    backgroundColor: '#D8A362',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  autoAddressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#D8A362',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '80%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D8A362',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalOptions: {
    maxHeight: 300,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionSelected: {
    backgroundColor: '#FEF3C7',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalOptionTextSelected: {
    color: '#D8A362',
    fontWeight: '600',
  },

  // Visa Type styles
  visaTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  visaTypeIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  visaTypeIcon: {
    width: 32,
    height: 32,
  },
  visaTypeDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Planned Visa Change styles
  plannedVisaChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  plannedVisaChangeIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  plannedVisaChangeIcon: {
    width: 32,
    height: 32,
  },
  plannedVisaChangeDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Japanese Level styles
  japaneseLevelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  japaneseLevelIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  japaneseLevelIcon: {
    width: 32,
    height: 32,
  },
  japaneseLevelDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Current Status styles
  currentStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentStatusIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  currentStatusIcon: {
    width: 32,
    height: 32,
  },
  currentStatusDropdown: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Work Experience styles
  workExperienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  workExperienceIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  workExperienceIcon: {
    width: 32,
    height: 32,
  },
  workExperienceInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  // Phone styles
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  phoneIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  phoneIcon: {
    width: 32,
    height: 32,
  },
  // Email styles
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emailIconContainer: {
    backgroundColor: '#ecdfcf',
    borderRadius: 20,
    padding: 8,
  },
  emailIcon: {
    width: 32,
    height: 32,
  },
  bottomSpacing: {
    height: 40,
  },
});
