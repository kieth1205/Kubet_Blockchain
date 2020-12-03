import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { VerticalCategories } from "@app/components/customFlatlist";
import FastImage from "react-native-fast-image";
import reactotron from "reactotron-react-native";
import R from "@app/assets/R";
import RNHeader from "@app/components/WHeader";
import axios from "axios";
import Loading from "@app/components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import AppNavigator from "@app/navigation/AppNavigator";
import NavigationUtil from "@app/navigation/NavigationUtil";
import codePush from "react-native-code-push";
import { TextInput } from "react-native";
import { colors } from "@app/constants/Theme";
import { ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("window");
const scale = width / 414;
export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    isLoading: false
  };

  renderHeader = () => {
    return (
      <View>
        <ImageBackground
          resizeMode="contain"
          style={styles.imgBanner}
          source={R.images.img_banner}
        />
      </View>
    );
  };
  render() {
    return (
      <View>
        {this.renderHeader()}
        <View
          style={{
            marginHorizontal: 18
          }}
          children={
            <>
              <TextInput
                style={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingLeft: 12
                }}
                placeholder="Tài khoản"
              />
              <TextInput
                style={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingLeft: 12,
                  marginTop: 20
                }}
                secureTextEntry
                placeholder="Mật khẩu"
              />

              <TouchableOpacity
                disabled={this.state.isLoading}
                style={{
                  backgroundColor: colors.primaryDark,
                  marginTop: 20,
                  paddingVertical: 15,
                  alignItems: "center",
                  borderRadius: 10,
                  flexDirection: "row"
                }}
                onPress={() => {
                  this.setState(
                    {
                      isLoading: true
                    },
                    () => {
                      setTimeout(() => {
                        this.setState({ isLoading: false }, () => {
                          alert("Sai tài khoản hoặc mật khẩu");
                        });
                      }, 1000);
                    }
                  );
                }}
                children={
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                        flex: 1,
                        textAlign: "center"
                      }}
                      children="Đăng nhập"
                    />
                    {this.state.isLoading && (
                      <ActivityIndicator
                        color="white"
                        style={{ marginRight: 10 }}
                      />
                    )}
                  </>
                }
              />
            </>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imgBanner: {
    height: 220 * scale,
    marginVertical: 20 * scale
  },
  itemView: {
    width: width / 2,
    borderRadius: 10 * scale
  },
  buttonView: {
    marginRight: 40,
    alignSelf: "flex-end",
    marginTop: 20,
    borderRadius: 5,
    flexDirection: "column"
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 10,
    width: 110,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "orange"
  },
  buttonText: {
    fontWeight: "bold",
    color: "white"
  },
  imgItem: {
    height: 200 * scale,
    marginBottom: 20 * scale
  }
});
