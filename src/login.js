/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Dimensions, ImageBackground, StatusBar, Text} from 'react-native';
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';


import Apis, {endpoints} from '../config/Apis';
import {images} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("VN");

  const [loading, setLoading] = useState(false);
  const login = async () => {
    console.log(selectedValue)
    navigation.replace('Home', {
      country: selectedValue
    });
    }
  return (
    
    <>
      <StatusBar style="light" />
      <ContainerView>
        <ImageBackground
          source={{
            uri: images.background,
          }}
          resizeMode="cover"
          style={{flex: 1, height: Dimensions.get('window').height}}>
          <Overlay>
            <FormWrapper>
              <Form>
                <SignInText>Chọn Quốc Gia</SignInText>
                <Picker
                  selectedValue={selectedValue}
                  style={{ width: '95%',
                    height: 50,
                    padding: 10,
                    borderRadius: 13,
                    backgroundColor: "white",
                    color: "black",
                    marginTop: 10 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Việt Nam" value="VN" />
                  <Picker.Item label="Hàn Quốc" value="KR" />
                  <Picker.Item label="Nhật Bản" value="JP" />
                  <Picker.Item label="Úc" value="AU" />
                </Picker>
                <SubmitForm onPress={login} disabled={loading}>
                  <ButtonText>{loading ? 'Loading...' : 'Đăng nhập'}</ButtonText>
                </SubmitForm>
                {/* <ButtonDesign
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Register')}>
                  <SignupLinkDesign>Chưa có tài khoản? <Text style={{color: "#c52028"}}>Đăng ký ngay</Text></SignupLinkDesign>
                </ButtonDesign> */}
              </Form>
            </FormWrapper>
          </Overlay>
        </ImageBackground>
      </ContainerView>
    </>
  );
};
const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const FormWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const Form = styled.View`
  height: 400px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0);
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
`;

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: #0061cb;
`;

const Input = styled.TextInput`
  width: 95%;
  height: 50px;
  border: none;
  padding: 10px;
  border-radius: 13px;
  background-color: white;
  color: black;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
  color: white;
`;
const SignInText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: left;
`;

const ButtonDesign = styled.TouchableOpacity`
  width: 100%;
`;

const SignupLinkDesign = styled.Text`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: #ccc;
  margin: 15px;
  text-align: center;
`;

const Overlay = styled.View`
  background-color: 'rgba(0,0,0,0.5)';
  flex: 1;
`;
export default Login;
