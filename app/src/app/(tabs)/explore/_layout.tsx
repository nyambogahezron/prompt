import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Blogs from './Blogs';
import Posts from './Posts';
import Treading from './Treading';
import { Colors } from '@/constants/Colors';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabLayout() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.black },
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarLabelStyle: { color: Colors.white },
      }}
    >
      <TopTab.Screen name='Blogs' component={Blogs} />
      <TopTab.Screen name='Posts' component={Posts} />
      <TopTab.Screen name='Trending' component={Treading} />
    </TopTab.Navigator>
  );
}
