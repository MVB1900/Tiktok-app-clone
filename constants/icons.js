/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/MaterialIcons';
const IconHome = color => (
  <AntDesign name="message1" size={24} color={color} style={{marginBottom: -10}} />
);
const IconDownload = color => (
  <MaterialIcons
    name="account-circle"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);
const IconVideo = color => (
  <AntDesign
    name="team"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);


const IconChat = color => (
  <AntDesign name="message1" size={24} color={color} style={{marginBottom: -10}} />
);
const IconFriend = color => (
  <AntDesign
    name="team"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);
const IconProfile = color => (
  <MaterialIcons
    name="account-circle"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);

export {IconHome, IconDownload, IconVideo, IconChat, IconFriend, IconProfile}