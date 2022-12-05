import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

import VideoItem from './video_item';
let data = []
import { WINDOW_HEIGHT } from '../data/videos';


let country_selected = "VN"

import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const TiktokScreen = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const bottomTabHeight = useBottomTabBarHeight()
    const [selectedValue, setSelectedValue] = useState("VN");

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
    
    useEffect( () => {
      console.log(data.length)
      if (selectedValue != country_selected)
      {
        data = []
        country_selected = selectedValue
        getvals().then(response => setVideo_raw(response));
      }
    }
    )
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
            const is_includes_el = data.find(video => video["id"] == el["id"])
            if (is_includes_el != -1)
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
      <View>
        <Picker
                  selectedValue={selectedValue}
                  style={{ width: 70,
                    position: 'absolute',
                    right:    0,
                    top: 50,
                    height: 30,
                    borderRadius: 13,
                    backgroundColor: "white",
                    color: "black",
                    zIndex: 3, // works on ios
                    elevation: 3, // works on android
                    marginTop: 10 }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue)
                    data = []
                    country_selected = selectedValue;
                    getvals().then(response => setVideo_raw(response));
                  }}
                >
                  <Picker.Item label="Việt Nam" value="VN" />
                  <Picker.Item label="Hàn Quốc" value="KR" />
                  <Picker.Item label="Nhật Bản" value="JP" />
                  <Picker.Item label="Úc" value="AU" />
                </Picker>
        <FlatList
            data = {data}
            pagingEnabled
            renderItem={({item, index}) => <VideoItem data={item} isActive={ activeVideoIndex === index}></VideoItem>}
            onScroll={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT))
                setActiveVideoIndex(index)
            }}/>
        </View>
    )
}

const Home = ({ route, navigation }) => {
  const country = route.params.country
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