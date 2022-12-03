import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VideoItem from './video_item';
import data, { WINDOW_HEIGHT } from '../data/videos';


import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const TiktokScreen = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const bottomTabHeight = useBottomTabBarHeight()

    return (
        <FlatList
            data = {data}
            pagingEnabled
            renderItem={({item, index}) => <VideoItem data={item} isActive={ activeVideoIndex === index}></VideoItem>}
            onScroll={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT))
                setActiveVideoIndex(index)
            }}/>
    
    )
}


const Home = () => {

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: 'black'},
        headerShown: false,
        tabBarActiveTintColor: 'white',
      }}>
      <BottomTab.Screen
        name="Trang chủ"
        component={TiktokScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/images/home.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tìm kiếm"
        component={TiktokScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/images/search.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ), 
        }}
      />
      <BottomTab.Screen
        name="Tin nhắn"
        component={TiktokScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/images/message.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tôi"
        component={TiktokScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/images/user.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});

export default Home