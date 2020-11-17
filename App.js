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
        data: jsonResponse.data
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
                Linking.openURL(`https://zalo.me/g/sevthi083`);
              }}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText} children={"ĐĂNG NHẬP"} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`https://zalo.me/g/sevthi083`);
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

  render() {
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
          data={data}
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

export default App;
