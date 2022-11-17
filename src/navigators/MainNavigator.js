import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MoreScreen from '../screens/MoreScreen';
import SearchScreen from '../screens/SearchScreen';

import TopRatedMoviesDetails from '../screens/DetailsScreen/TopRatedMoviesDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TopRatedMoviesDetails"
        component={TopRatedMoviesDetails}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#000',
          },
          tabBarInactiveTintColor: '#fff',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeTabNavigator}
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#000',
            },
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="ellipsis-horizontal" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName === 'TopRatedMoviesDetails') {
    return 'none';
  }

  return 'flex';
};

export default MainNavigator;
