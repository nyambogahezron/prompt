import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Blogs from './Blogs';
import Posts from './Posts';
import Treading from './Treading';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabLayout() {
  return (
    <NavigationContainer>
      <TopTab.Navigator>
        <TopTab.Screen name='Blogs' component={Blogs} />
        <TopTab.Screen name='Posts' component={Posts} />
        <TopTab.Screen name='Trending' component={Treading} />
      </TopTab.Navigator>
    </NavigationContainer>
  );
}
