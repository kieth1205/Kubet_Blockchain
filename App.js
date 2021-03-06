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
const { width, height } = Dimensions.get("window");
const scale = width / 414;

class App extends Component {
  state = {
    isLoading: true,
    isError: false,
    data: {}
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get("http://103.207.38.161:3000/list");
      const jsonResponse = response.data;
      console.log("response", jsonResponse.data);
      this.setState({
        isLoading: false,
        isError: false,
        data: jsonResponse
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
        data: {}
      });
    }
  };

  renderHeader = () => {
    const { data } = this.state;
    return (
      <View>
        <ImageBackground
          resizeMode="contain"
          style={styles.imgBanner}
          source={R.images.img_banner}
        >
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.login);
              }}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText} children={"ĐĂNG NHẬP"} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.register);
              }}
              style={[styles.buttonStyle, { backgroundColor: "white" }]}
            >
              <Text
                style={[styles.buttonText, { color: "black" }]}
                children={"ĐĂNG KÝ"}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  codePushStatusDidChange(status) {
    // console.log("Codepush status : ", status);
  }

  codePushDownloadDidProgress(progress) {
    // console.log(
    //   progress.receivedBytes + " of " + progress.totalBytes + " received."
    // );
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={R.images.stock}
        children={
          <AppNavigator
            ref={navigatorRef =>
              NavigationUtil.setTopLevelNavigator(navigatorRef)
            }
          />
        }
      />
    );
    const { isLoading, isError, data } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (isError)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <FastImage source={R.images.error} style={{ height: 200 }} />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold"
            }}
            children={"Opps! Lỗi rồi"}
          />
        </View>
      );
    return (
      <View style={styles.container}>
        <RNHeader titleHeader="KUBET BLOCKCHAIN" />

        <VerticalCategories
          data={data.data}
          renderHeader={this.renderHeader}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={index => {
                  Linking.openURL(`${item.zalo}`);
                }}
                style={styles.itemView}
              >
                <FastImage
                  resizeMode="contain"
                  style={styles.imgItem}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          }}
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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL
  // installMode: codePush.InstallMode.IMMEDIATE
  // rollbackRetryOptions: {
  //   delayInHours: 12,
  //   maxRetryAttempts: 1,
  // },
};
const MyApp = codePush(codePushOptions)(App);

export default MyApp;
//appcenter codepush release-react -a Apps-Windsoft/KUBET_ANDROID -d Production
