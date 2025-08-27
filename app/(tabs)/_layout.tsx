import { Tabs } from 'expo-router';
import { MessageCircle, Phone, Mail, FileText, Heart } from 'lucide-react-native';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#c39d71',
        tabBarInactiveTintColor: '#8B7355',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity 
              style={styles.chatIconContainer}
              onPress={() => router.push('/accepted-jobs')}
            >
              <Image 
                source={require('@/assets/icons/thumb.png')} 
                style={{ width: size + 8, height: size + 8 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ size, color }) => (
            <View style={styles.contactIconContainer}>
              <Image 
                source={require('@/assets/icons/phone.png')} 
                style={{ width: size - 4, height: size - 4 }}
                resizeMode="contain"
              />
              <Image 
                source={require('@/assets/icons/email.png')} 
                style={{ width: size - 4, height: size - 4 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ size, color }) => (
            <View style={styles.favoritesIconContainer}>
              <Image 
                source={require('@/assets/icons/wishlist.png')} 
                style={{ width: size + 4, height: size + 4 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#BCA88D',
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  chatIconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
      contactIconContainer: {
      backgroundColor: '#74add4',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#72a1c2',
      padding: 8,
      width: 70,
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  favoritesIconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});