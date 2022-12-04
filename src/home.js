import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VideoItem from './video_item';
let data = []
import { WINDOW_HEIGHT } from '../data/videos';


country_selected = "VN"

import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const TiktokScreen = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const bottomTabHeight = useBottomTabBarHeight()

    const [video_raw, setVideo_raw] = useState(false)

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b38fe71dc5msh610a135ab36e42ap16a713jsn8d4ccc1dcfba',
        'X-RapidAPI-Host': 'tiktok-all-in-one.p.rapidapi.com'
      }
    };

    function getvals(){
      const url = `https://tiktok-all-in-one.p.rapidapi.com/feed?region=${country_selected}&device_id=7523368224928586621`
      console.log(url)
      return fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
    }
    
    if (!video_raw)
    {
      if (data.length < 40)
        getvals().then(response => setVideo_raw(response));
    }
    else {
      if (data.length < 40)
      {
        try {
          video_raw["aweme_list"].forEach(element => {
            let el = {
              "id": element["aweme_id"],
              "channelName": element["author"]["nickname"],
              "uri": element["video"]["play_addr"]["url_list"][0],
              "caption": element["desc"],
              "musicName": element["music"]["title"],
              "likes": element["statistics"]["digg_count"],
              "comments": element["statistics"]["comment_count"],
              "avatarUri": element["author"]["avatar_300x300"]["url_list"][0],
            }
            if (!data.includes(el))
              data.push(el)
          });
        }
        catch {
  
        }
        finally {
          setVideo_raw(false)
        }
      }
    }

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

const Home = ({ route, navigation }) => {
  const country = route.params.country
  console.log(country)
  country_selected = country
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