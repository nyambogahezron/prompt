import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View,  StyleSheet, Platform } from 'react-native';
import Blogs from './Blogs';
import Posts from './Posts';
import Profile from './Profile';
import { Colors } from '@/constants/Colors';
import CustomProfileHeader from '@/components/navigation/CustomProfileHeader';
const isWeb = Platform.OS === 'web';
const contentWidth = isWeb ? 600 : '100%';


const TopTab = createMaterialTopTabNavigator();

export default function TopTabLayout() {
  return (
    <View style={styles.container}>
      <CustomProfileHeader />
      <TopTab.Navigator
        initialRouteName='Profile'
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.black },
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarLabelStyle: { color: Colors.white },
          tabBarIndicatorStyle: { backgroundColor: Colors.primaryColor },
        }}
        style={styles.tabs} 
      >
        <TopTab.Screen name='Blogs' component={Blogs} />
        <TopTab.Screen name='Posts' component={Posts} />
        <TopTab.Screen name='Profile' component={Profile} />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: isWeb ? 600 : '100%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  tabs: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  customHeader: {
    height: 60,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
  },
});


