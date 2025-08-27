import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { 
  X, 
  ArrowUpDown, 
  Filter as FilterIcon,
  DollarSign,
  Home,
  School,
  FileText,
  MessageSquare,
  Star,
  Handshake,
  Clock,
  Check,
  Search
} from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { mockJobs } from '@/data/mockJobs';

const { width: screenWidth } = Dimensions.get('window');

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
  const { t } = useLanguage();
  const [selectedSort, setSelectedSort] = useState('commuteSchool');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showJobTypeModal, setShowJobTypeModal] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [showJapaneseLevelModal, setShowJapaneseLevelModal] = useState(false);
  const [selectedJapaneseLevels, setSelectedJapaneseLevels] = useState<string[]>([]);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedSalaryTypes, setSelectedSalaryTypes] = useState<string[]>([]);
  const [showWorkImportantModal, setShowWorkImportantModal] = useState(false);
  const [selectedWorkImportant, setSelectedWorkImportant] = useState<string[]>([]);

  // Get unique job categories from mock data
  const jobCategories = Array.from(new Set(mockJobs.map(job => job.category)));
  
  const jobTypeLabels: { [key: string]: string } = {
    warehouse: '倉庫・軽作業',
    cooking: '調理・飲食',
    cleaning: '清掃',
    delivery: '配達',
    customer_service: '接客・販売',
    hotel: 'ホテル'
  };

  const japaneseLevelLabels: { [key: string]: string } = {
    N1: 'N1 (上級)',
    N2: 'N2 (中級)',
    N3: 'N3 (中級)',
    N4: 'N4 (初級)',
    N5: 'N5 (初級)'
  };

  const transportLabels: { [key: string]: string } = {
    train: '電車 (Train)',
    bus: 'バス (Bus)',
    subway: '地下鉄 (Subway)',
    bike: '自転車 (Bike)',
    car: '車 (Car)',
    walking: '徒歩 (Walking)'
  };

  const salaryTypeLabels: { [key: string]: string } = {
    hourly: '時給 (Hourly)',
    monthly: '月給 (Monthly)',
    daily: '日給 (Daily)',
    weekly: '週給 (Weekly)'
  };

  const workImportantLabels: { [key: string]: string } = {
    flexible_hours: 'フレックスタイム (Flexible Hours)',
    remote_work: 'リモートワーク (Remote Work)',
    training: '研修制度 (Training)',
    career_growth: 'キャリアアップ (Career Growth)',
    benefits: '福利厚生 (Benefits)',
    overtime_pay: '残業手当 (Overtime Pay)',
    transportation: '交通費支給 (Transportation)',
    meal_allowance: '食事手当 (Meal Allowance)',
    insurance: '社会保険 (Insurance)',
    bonus: 'ボーナス (Bonus)'
  };



  const sortOptions = [
    { id: 'salary', label: '給与', icon: null, color: '#FFD700', useImage: true },
    { id: 'commuteHome', label: '通勤時間(自宅)', icon: null, color: '#4A90E2', useImage: true, imageName: 'house' },
    { id: 'commuteSchool', label: '通勤時間(学校)', icon: null, color: '#FF9800', useImage: true, imageName: 'school' },
  ];

  const filterOptions = [
    { id: 'jobType', label: '希望職種', icon: null, color: '#4A90E2', useImage: true, imageName: 'task' },
    { id: 'japaneseLevel', label: '日本語レベル', icon: null, color: '#4CAF50', useImage: true, imageName: 'chat' },
    { id: 'commuteConvenient', label: '通勤に便利なこと', icon: null, color: '#FF5722', useImage: true, imageName: 'footstep' },
    { id: 'workImportant', label: '仕事で大事な事', icon: null, color: '#FFD700', useImage: true, imageName: 'star' },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleApply = () => {
    onApply({
      sortBy: selectedSort,
      filters: selectedFilters,
      jobTypes: selectedJobTypes,
      japaneseLevels: selectedJapaneseLevels,
      transports: selectedTransports,
      salaryTypes: selectedSalaryTypes,
      workImportant: selectedWorkImportant
    });
    onClose();
  };

  const handleSearch = () => {
    onApply({
      sortBy: selectedSort,
      filters: selectedFilters,
      jobTypes: selectedJobTypes,
      japaneseLevels: selectedJapaneseLevels,
      transports: selectedTransports,
      salaryTypes: selectedSalaryTypes,
      workImportant: selectedWorkImportant
    });
    onClose();
  };

  const handleClose = () => {
    // Reset all filters when closing
    setSelectedSort('commuteSchool');
    setSelectedFilters([]);
    setSelectedJobTypes([]);
    setSelectedJapaneseLevels([]);
    setSelectedTransports([]);
    setSelectedSalaryTypes([]);
    setSelectedWorkImportant([]);
    
    // Apply empty filters to clear filtered results
    onApply({
      sortBy: 'commuteSchool',
      filters: [],
      jobTypes: [],
      japaneseLevels: [],
      transports: [],
      salaryTypes: [],
      workImportant: []
    });
    
    onClose();
  };

  const toggleJobType = (jobType: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(jobType) 
        ? prev.filter(type => type !== jobType)
        : [...prev, jobType]
    );
  };

  const handleJobTypeSelect = () => {
    if (selectedJobTypes.length > 0) {
      setSelectedFilters(prev => 
        prev.includes('jobType') 
          ? prev 
          : [...prev, 'jobType']
      );
    } else {
      setSelectedFilters(prev => 
        prev.filter(filter => filter !== 'jobType')
      );
    }
    setShowJobTypeModal(false);
  };

  const toggleJapaneseLevel = (level: string) => {
    setSelectedJapaneseLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleJapaneseLevelSelect = () => {
    if (selectedJapaneseLevels.length > 0) {
      setSelectedFilters(prev => 
        prev.includes('japaneseLevel') 
          ? prev 
          : [...prev, 'japaneseLevel']
      );
    } else {
      setSelectedFilters(prev => 
        prev.filter(filter => filter !== 'japaneseLevel')
      );
    }
    setShowJapaneseLevelModal(false);
  };

  const toggleTransport = (transport: string) => {
    setSelectedTransports(prev => 
      prev.includes(transport) 
        ? prev.filter(t => t !== transport)
        : [...prev, transport]
    );
  };

  const handleTransportSelect = () => {
    if (selectedTransports.length > 0) {
      setSelectedFilters(prev => 
        prev.includes('commuteConvenient') 
          ? prev 
          : [...prev, 'commuteConvenient']
      );
    } else {
      setSelectedFilters(prev => 
        prev.filter(filter => filter !== 'commuteConvenient')
      );
    }
    setShowTransportModal(false);
    // Auto apply filters when modal closes
    handleApply();
  };

  const toggleSalaryType = (salaryType: string) => {
    setSelectedSalaryTypes(prev => 
      prev.includes(salaryType) 
        ? prev.filter(type => type !== salaryType)
        : [...prev, salaryType]
    );
  };

  const handleSalaryTypeSelect = () => {
    if (selectedSalaryTypes.length > 0) {
      setSelectedSort('salary'); // Set selectedSort to 'salary' when salary types are selected
    }
    setShowSalaryModal(false);
    // Auto apply filters when modal closes
    handleApply();
  };

  const toggleWorkImportant = (workImportant: string) => {
    setSelectedWorkImportant(prev => 
      prev.includes(workImportant) 
        ? prev.filter(item => item !== workImportant)
        : [...prev, workImportant]
    );
  };

  const handleWorkImportantSelect = () => {
    if (selectedWorkImportant.length > 0) {
      setSelectedFilters(prev => 
        prev.includes('workImportant') 
          ? prev 
          : [...prev, 'workImportant']
      );
    } else {
      setSelectedFilters(prev => 
        prev.filter(filter => filter !== 'workImportant')
      );
    }
    setShowWorkImportantModal(false);
    // Auto apply filters when modal closes
    handleApply();
  };

    if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
             <Image 
               source={require('@/assets/icons/sort-by-attributes.png')} 
               style={styles.headerIcon}
               resizeMode="contain"
             />
            <Text style={styles.headerTitle}>ソート</Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Sort Section */}
          <View style={styles.section}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                                   onPress={() => {
                    if (option.id === 'salary') {
                      setShowSalaryModal(true);
                    } else {
                      setSelectedSort(option.id);
                    }
                  }}
              >
                <View style={styles.optionLeft}>
                  <View style={[styles.radioButton, selectedSort === option.id && styles.radioButtonSelected]}>
                    {selectedSort === option.id && <Check size={12} color="#FFF" />}
                  </View>
                    <View style={[styles.optionIcon, { backgroundColor: option.useImage ? '#eddfd0' : option.color }]}>
                      {option.useImage ? (
                        <Image 
                          source={
                            option.imageName === 'house' ? require('@/assets/icons/house.png') : 
                            option.imageName === 'school' ? require('@/assets/icons/school.png') :
                            option.imageName === 'task' ? require('@/assets/icons/task.png') :
                            require('@/assets/icons/yen-coin.png')
                          } 
                          style={styles.optionImage}
                          resizeMode="contain"
                        />
                      ) : option.icon ? (
                        <option.icon size={16} color="#FFF" />
                      ) : null}
                    </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          

          {/* Filter Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Image 
                 source={require('@/assets/icons/filter_type_1.png')} 
                 style={styles.sectionIcon}
                 resizeMode="contain"
               />
              <Text style={styles.sectionTitle}>フィルタ</Text>
            </View>
             <View style={styles.divider} />
            
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                                   onPress={() => {
                    if (option.id === 'jobType') {
                      setShowJobTypeModal(true);
                    } else if (option.id === 'japaneseLevel') {
                      setShowJapaneseLevelModal(true);
                    } else if (option.id === 'commuteConvenient') {
                      setShowTransportModal(true);
                    } else if (option.id === 'workImportant') {
                      setShowWorkImportantModal(true);
                    } else {
                      toggleFilter(option.id);
                    }
                  }}
              >
                <View style={styles.optionLeft}>
                  <View style={[styles.radioButton, selectedFilters.includes(option.id) && styles.radioButtonSelected]}>
                    {selectedFilters.includes(option.id) && <Check size={12} color="#FFF" />}
                  </View>
                                 {(option.icon || option.useImage) && (
                   <View style={[styles.optionIcon, { backgroundColor: option.useImage ? '#eddfd0' : option.color }]}>
                     {option.useImage ? (
                       <Image 
                         source={
                           option.imageName === 'task' ? require('@/assets/icons/task.png') :
                           option.imageName === 'chat' ? require('@/assets/icons/chat.png') :
                           option.imageName === 'footstep' ? require('@/assets/icons/footstep.png') :
                           option.imageName === 'star' ? require('@/assets/icons/star.png') :
                           require('@/assets/icons/yen-coin.png')
                         } 
                         style={styles.optionImage}
                         resizeMode="contain"
                       />
                     ) : option.icon ? (
                    <option.icon size={16} color="#FFF" />
                     ) : null}
                  </View>
                )}
                   <Text style={styles.optionText}>{option.label}</Text>
                 </View>
              </TouchableOpacity>
            ))}
          </View>

                                
                 </View>
       </View>

       {/* Job Type Selection Modal */}
       <Modal
         visible={showJobTypeModal}
         transparent={true}
         animationType="fade"
         onRequestClose={() => setShowJobTypeModal(false)}
       >
         <View style={styles.jobTypeOverlay}>
           <View style={styles.jobTypeModal}>
                           <View style={styles.jobTypeHeader}>
                <View style={styles.modalTitleContainer}>
                  <Image 
                    source={require('@/assets/icons/task.png')} 
                    style={styles.modalTitleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.jobTypeTitle}>希望職種を選択</Text>
                </View>
                <TouchableOpacity onPress={() => setShowJobTypeModal(false)}>
                  <X size={24} color="#333" />
                </TouchableOpacity>
              </View>
             
             <ScrollView style={styles.jobTypeContent}>
               {jobCategories.map((category) => (
                 <TouchableOpacity
                   key={category}
                   style={styles.jobTypeItem}
                   onPress={() => toggleJobType(category)}
                 >
                   <View style={[styles.jobTypeCheckbox, selectedJobTypes.includes(category) && styles.jobTypeCheckboxSelected]}>
                     {selectedJobTypes.includes(category) && <Check size={12} color="#FFF" />}
                   </View>
                   <Text style={styles.jobTypeText}>{jobTypeLabels[category]}</Text>
                 </TouchableOpacity>
               ))}
             </ScrollView>
             
             <View style={styles.jobTypeButtons}>
               <TouchableOpacity 
                 style={styles.jobTypeCancelButton} 
                 onPress={() => setShowJobTypeModal(false)}
               >
                 <Text style={styles.jobTypeCancelText}>キャンセル</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 style={styles.jobTypeConfirmButton} 
                 onPress={handleJobTypeSelect}
               >
                 <Text style={styles.jobTypeConfirmText}>確認</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
               </Modal>

        {/* Japanese Level Selection Modal */}
        <Modal
          visible={showJapaneseLevelModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowJapaneseLevelModal(false)}
        >
          <View style={styles.jobTypeOverlay}>
            <View style={styles.jobTypeModal}>
                             <View style={styles.jobTypeHeader}>
                 <View style={styles.modalTitleContainer}>
                   <Image 
                     source={require('@/assets/icons/chat.png')} 
                     style={styles.modalTitleIcon}
                     resizeMode="contain"
                   />
                   <Text style={styles.jobTypeTitle}>日本語レベルを選択</Text>
                 </View>
                 <TouchableOpacity onPress={() => setShowJapaneseLevelModal(false)}>
                   <X size={24} color="#333" />
                 </TouchableOpacity>
               </View>
              
              <ScrollView style={styles.jobTypeContent}>
                {Object.keys(japaneseLevelLabels).map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.jobTypeItem}
                    onPress={() => toggleJapaneseLevel(level)}
                  >
                    <View style={[styles.jobTypeCheckbox, selectedJapaneseLevels.includes(level) && styles.jobTypeCheckboxSelected]}>
                      {selectedJapaneseLevels.includes(level) && <Check size={12} color="#FFF" />}
                    </View>
                    <Text style={styles.jobTypeText}>{japaneseLevelLabels[level]}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={styles.jobTypeButtons}>
                <TouchableOpacity 
                  style={styles.jobTypeCancelButton} 
                  onPress={() => setShowJapaneseLevelModal(false)}
                >
                  <Text style={styles.jobTypeCancelText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.jobTypeConfirmButton} 
                  onPress={handleJapaneseLevelSelect}
                >
                  <Text style={styles.jobTypeConfirmText}>確認</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
                 </Modal>

         {/* Transport Selection Modal */}
         <Modal
           visible={showTransportModal}
           transparent={true}
           animationType="fade"
           onRequestClose={() => setShowTransportModal(false)}
         >
           <View style={styles.jobTypeOverlay}>
             <View style={styles.jobTypeModal}>
                               <View style={styles.jobTypeHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Image 
                      source={require('@/assets/icons/footstep.png')} 
                      style={styles.modalTitleIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.jobTypeTitle}>通勤手段を選択</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowTransportModal(false)}>
                    <X size={24} color="#333" />
                  </TouchableOpacity>
                </View>
               
               <ScrollView style={styles.jobTypeContent}>
                 {Object.keys(transportLabels).map((transport) => (
                   <TouchableOpacity
                     key={transport}
                     style={styles.jobTypeItem}
                     onPress={() => toggleTransport(transport)}
                   >
                     <View style={[styles.jobTypeCheckbox, selectedTransports.includes(transport) && styles.jobTypeCheckboxSelected]}>
                       {selectedTransports.includes(transport) && <Check size={12} color="#FFF" />}
                     </View>
                     <Text style={styles.jobTypeText}>{transportLabels[transport]}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
               
               <View style={styles.jobTypeButtons}>
                 <TouchableOpacity 
                   style={styles.jobTypeCancelButton} 
                   onPress={() => setShowTransportModal(false)}
                 >
                   <Text style={styles.jobTypeCancelText}>キャンセル</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={styles.jobTypeConfirmButton} 
                   onPress={handleTransportSelect}
                 >
                   <Text style={styles.jobTypeConfirmText}>確認</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </View>
         </Modal>

         {/* Salary Type Selection Modal */}
         <Modal
           visible={showSalaryModal}
           transparent={true}
           animationType="fade"
           onRequestClose={() => setShowSalaryModal(false)}
         >
           <View style={styles.jobTypeOverlay}>
             <View style={styles.jobTypeModal}>
                               <View style={styles.jobTypeHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Image 
                      source={require('@/assets/icons/yen-coin.png')} 
                      style={styles.modalTitleIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.jobTypeTitle}>給与形態を選択</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowSalaryModal(false)}>
                    <X size={24} color="#333" />
                  </TouchableOpacity>
                </View>
               
               <ScrollView style={styles.jobTypeContent}>
                                   {Object.keys(salaryTypeLabels).map((salaryType) => (
                    <TouchableOpacity
                      key={salaryType}
                      style={styles.jobTypeItem}
                      onPress={() => toggleSalaryType(salaryType)}
                    >
                      <View style={[styles.jobTypeCheckbox, selectedSalaryTypes.includes(salaryType) && styles.jobTypeCheckboxSelected]}>
                        {selectedSalaryTypes.includes(salaryType) && <Check size={12} color="#FFF" />}
                      </View>
                      <Text style={styles.jobTypeText}>{salaryTypeLabels[salaryType]}</Text>
                    </TouchableOpacity>
                  ))}
               </ScrollView>
               
               <View style={styles.jobTypeButtons}>
                 <TouchableOpacity 
                   style={styles.jobTypeCancelButton} 
                   onPress={() => setShowSalaryModal(false)}
                 >
                   <Text style={styles.jobTypeCancelText}>キャンセル</Text>
                 </TouchableOpacity>
                                   <TouchableOpacity 
                    style={styles.jobTypeConfirmButton} 
                    onPress={handleSalaryTypeSelect}
                  >
                    <Text style={styles.jobTypeConfirmText}>確認</Text>
                  </TouchableOpacity>
               </View>
             </View>
           </View>
         </Modal>

         {/* Work Important Selection Modal */}
         <Modal
           visible={showWorkImportantModal}
           transparent={true}
           animationType="fade"
           onRequestClose={() => setShowWorkImportantModal(false)}
         >
           <View style={styles.jobTypeOverlay}>
             <View style={styles.jobTypeModal}>
                               <View style={styles.jobTypeHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Image 
                      source={require('@/assets/icons/star.png')} 
                      style={styles.modalTitleIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.jobTypeTitle}>仕事で大事な事を選択</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowWorkImportantModal(false)}>
                    <X size={24} color="#333" />
           </TouchableOpacity>
                </View>
               
               <ScrollView style={styles.jobTypeContent}>
                 {Object.keys(workImportantLabels).map((workImportant) => (
                   <TouchableOpacity
                     key={workImportant}
                     style={styles.jobTypeItem}
                     onPress={() => toggleWorkImportant(workImportant)}
                   >
                     <View style={[styles.jobTypeCheckbox, selectedWorkImportant.includes(workImportant) && styles.jobTypeCheckboxSelected]}>
                       {selectedWorkImportant.includes(workImportant) && <Check size={12} color="#FFF" />}
                     </View>
                     <Text style={styles.jobTypeText}>{workImportantLabels[workImportant]}</Text>
           </TouchableOpacity>
                 ))}
        </ScrollView>
               
               <View style={styles.jobTypeButtons}>
                 <TouchableOpacity 
                   style={styles.jobTypeCancelButton} 
                   onPress={() => setShowWorkImportantModal(false)}
                 >
                   <Text style={styles.jobTypeCancelText}>キャンセル</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={styles.jobTypeConfirmButton} 
                   onPress={handleWorkImportantSelect}
                 >
                   <Text style={styles.jobTypeConfirmText}>確認</Text>
                 </TouchableOpacity>
               </View>
      </View>
                     </View>
        </Modal>

        {/* Search Button */}
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Search size={24} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>検索</Text>
          </TouchableOpacity>
        </View>
         
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 9999,
  },
  modalContainer: {
     width: screenWidth * 0.7,
     height: '55%',
     backgroundColor: '#efefef',
     borderTopLeftRadius: 0,
     borderBottomLeftRadius: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 0,
    flexDirection: 'column',
     marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     paddingHorizontal: 16,
     paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
   headerIcon: {
     width: 20,
     height: 20,
   },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
     paddingHorizontal: 16,
     paddingTop: 4,
     paddingBottom: 8,
  },
  section: {
     marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
   sectionIcon: {
     width: 20,
     height: 20,
   },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     paddingVertical: 6,
     paddingHorizontal: 6,
     borderRadius: 6,
     marginBottom: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
      marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  optionText: {
     fontSize: 15,
    color: '#333',
    flex: 1,
     marginLeft: 8,
  },
  optionIcon: {
     width: 28,
     height: 28,
     borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
   optionImage: {
     width: 16,
     height: 16,
   },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
     marginVertical: 2,
   },

  
   // Job Type Modal Styles
   jobTypeOverlay: {
     flex: 1,
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     justifyContent: 'center',
     alignItems: 'center',
   },
       jobTypeModal: {
      width: screenWidth * 0.8,
      maxHeight: '70%',
      backgroundColor: '#efefef',
      borderRadius: 0,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
    },
   jobTypeHeader: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 20,
     paddingVertical: 16,
     borderBottomWidth: 1,
     borderBottomColor: '#E5E5E5',
   },
       jobTypeTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
    modalTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalTitleIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
   jobTypeContent: {
     maxHeight: 300,
     paddingHorizontal: 20,
   },
   jobTypeItem: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 12,
     borderBottomWidth: 1,
     borderBottomColor: '#F0F0F0',
   },
                               jobTypeCheckbox: {
        width: 32,
        height: 32,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      },
   jobTypeCheckboxSelected: {
    backgroundColor: '#4A90E2',
     borderColor: '#4A90E2',
   },
   jobTypeText: {
     fontSize: 16,
     color: '#333',
     flex: 1,
   },
   jobTypeButtons: {
     flexDirection: 'row',
     paddingHorizontal: 20,
     paddingVertical: 16,
     borderTopWidth: 1,
     borderTopColor: '#E5E5E5',
   },
               jobTypeCancelButton: {
       flex: 1,
    paddingVertical: 12,
       marginRight: 8,
       borderRadius: 6,
       borderWidth: 1,
       borderColor: '#D3D3D3',
    alignItems: 'center',
  },
   jobTypeCancelText: {
     color: '#666',
    fontSize: 16,
     fontWeight: '500',
   },
               jobTypeConfirmButton: {
       flex: 1,
    paddingVertical: 12,
       marginLeft: 8,
       borderRadius: 6,
       backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
       jobTypeConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '85%',
    minHeight: 65,
    borderWidth: 2,
    borderColor: '#45A049',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 10,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
    
});
