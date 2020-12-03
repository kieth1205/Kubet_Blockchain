import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import i18 from "@i18";
import * as Progress from "react-native-progress";
import codePush from "react-native-code-push";
import { ImageBackground } from "react-native";
import R from "@app/assets/R";
import Loading from "@app/components/Loading";
import theme from "@app/constants/Theme";
// import { connect } from 'react-redux'

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      progress: {
        receivedBytes: 0,
        totalBytes: 1
      },
      isNeedUpdate: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this._checkUpdate();
    }, 200);
  }

  bootstrapAsync() {
    NavigationUtil.replace("Register");
  }

  async _checkUpdate() {
    this.setState(
      {
        ...this.state,
        update: true
      },
      async () => {
        codePush
          .checkForUpdate()
          .then(update => {
            this.setState({
              ...this.state,
              update: false
            });
            if (!update) {
              this.bootstrapAsync();
            } else {
              codePush.sync(
                {
                  updateDialog: null,
                  installMode: codePush.InstallMode.IMMEDIATE
                },
                status => {
                  // reactotron.log(status);
                  if (
                    status == codePush.SyncStatus.DOWNLOADING_PACKAGE ||
                    status == codePush.SyncStatus.CHECKING_FOR_UPDATE ||
                    status == codePush.SyncStatus.SYNC_IN_PROGRESS ||
                    status == codePush.SyncStatus.INSTALLING_UPDATE
                  ) {
                    this.setState({
                      ...this.state,
                      update: true
                    });
                  } else {
                    this.setState({
                      ...this.state,
                      update: false
                    });
                  }
                  if (status == codePush.SyncStatus.UPDATE_INSTALLED) {
                    codePush.allowRestart();
                  }
                },
                progress => {
                  this.setState({
                    progress: progress,
                    isNeedUpdate: true,
                    update: false
                  });
                  // reactotron.log(progress);
                }
              );
            }
          })
          .catch(err => {
            console.log("error", err);
            codePush.allowRestart();
          });
      }
    );
    codePush.notifyAppReady();
  }

  render() {
    const { isNeedUpdate, progress } = this.state;
    return (
      <ImageBackground
        style={{
          flex: 1
        }}
        resizeMode="cover"
        source={R.images.stock}
        children={
          isNeedUpdate ? (
            <View
              style={{
                position: "absolute",
                top: height * 0.5,
                alignSelf: "center"
              }}
            >
              <Progress.Bar
                progress={progress.receivedBytes / progress.totalBytes}
                height={height * 0.018}
                width={width * 0.8}
                color={theme.colors.primaryDark}
                style={{
                  borderWidth: 1.5,
                  borderColor: theme.colors.borderTopColor,
                  backgroundColor: theme.colors.borderTopColor,
                  borderRadius: 10
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: R.fonts.roboto_medium,
                  fontSize: 14,
                  marginVertical: 10,
                  color: "white"
                }}
                children={`Cập nhập dữ liệu ${Math.round(
                  (progress.receivedBytes / progress.totalBytes) * 100
                )}%`}
              />
            </View>
          ) : (
            <Loading color="white" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
