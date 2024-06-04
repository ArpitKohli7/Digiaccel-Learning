import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Linking,
  BackHandler,
} from "react-native";
import {
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { vs } from "react-native-size-matters";
import CheckBox from "react-native-check-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../assets/images";
import TextInputBox from "../ customcomponent/CustomTextinput";
import ButtonBox from "../ customcomponent/CustomButton";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors";
import { CustomStatusBar } from "../ customcomponent/CustomStatusBar";
import fonts from "../assets/fonts";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function EnterEmail(props: any): JSX.Element {
  const [f1, setF1] = useState("");
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [valEmail, setValEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [_error, _setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const [loader, setLoader] = useState(false);

  const handleSubmit = () => {
    navigation.navigate("LearningScreen");
  };

  const checkEmail = txt => {
    const strongRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const recepientRegex = /^[A-Za-z0-9]+\.*([A-Za-z0-9]+)$/;
    const parts = txt.split('@');
    const recipientName = parts[0];

    if (txt && txt.length > 0) {
      if (strongRegex.test(txt) && recepientRegex.test(recipientName) === true && recipientName !== null) {
        setValEmail(true);
        setShowError(false);
      } else {
        if (!/@/.test(txt)) {
          setShowError(true);
          setValEmail(false);
          _setError("ENTER_EMAIL_ERROR_");
        } else if (!/@\./.test(txt)) {
          setValEmail(false);
          setShowError(true);
          _setError("ENTER_EMAIL_ERROR_DOMAIN");
        } else if (recepientRegex.test(recipientName) === false) {
          setShowError(true);
          setValEmail(false);
          _setError("ENTER_EMAIL_ERROR_MISSING_RECIPIENT");
        }
      }
      return strongRegex.test(txt);
    } else {
      setShowError(false);
      setValEmail(false);
    }
  };

  async function openLink(link) {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          dismissButtonStyle: "cancel",
          preferredBarTintColor: "white",
          preferredControlTintColor: "black",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "fullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: false,
          showTitle: true,
          toolbarColor: "white",
          secondaryToolbarColor: "black",
          navigationBarColor: "black",
          navigationBarDividerColor: "white",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
          headers: {
            "my-custom-header": "my custom header value",
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      // Alert.alert(error.message)
    }
  }

  const openTerms = () => {
    openLink("https://digiaccel.in/");
  };

  const openPolicy = () => {
    openLink("https://digiaccel.in/");
  };

  const checkPassword = (password) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;

    if (password.length < minLength) {
      return false;
    }

    if (!uppercaseRegex.test(password)) {
      return false;
    }

    if (!lowercaseRegex.test(password)) {
      return false;
    }

    if (!digitRegex.test(password)) {
      return false;
    }

    return true;
  };

  const checkFunction = () => {
    const isPasswordValid = checkPassword(password);
    if (isPasswordValid && !showError && toggleCheckBox) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <CustomStatusBar />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View style={styles.wrapper}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={images.logo}
            />
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={styles.mainImage}
                source={images.mainImg}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>Sign-in</Text>
              <TextInputBox
                placeholder={"Enter email or username"}
                value={f1}
                onChangeText={(txt) => {
                  setF1(txt);
                  setShowError(false);
                  checkEmail(txt);
                }}
                hasError={showError}
                errorMessage={'_error'}
              />
              <TextInputBox
                placeholder={"Password"}
                value={password}
                isPassword={"true"}
                secureTextEntry={showPass}
                changeSecure={() => setShowPass(!showPass)}
                onChangeText={(txt) => {
                  const isPasswordValid = checkPassword(txt);
                  if (isPasswordValid) {
                    setPassError(false);
                  } else {
                    setPassError(true);
                  }
                  setPassword(txt);
                }}
                hasError={passError}
                errorMessage={'_error'}
              />
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              <View style={styles.checkWrapper}>
                <CheckBox
                  onClick={() => {
                    setToggleCheckBox(!toggleCheckBox);
                  }}
                  isChecked={toggleCheckBox}
                  unCheckedImage={
                    <Image
                      style={styles.uncheckedBox}
                      source={images.checkbox}
                    />
                  }
                />
                <View style={styles.checkTextWrapper}>
                  <View style={styles.checkTextRow}>
                    <Text style={styles.checkText}>By signing up, you agree to our</Text>
                    <TouchableOpacity onPress={openTerms}>
                      <Text style={styles.linkText}> terms of</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.checkTextRow}>
                    <TouchableOpacity onPress={openTerms}>
                      <Text style={styles.linkText}>service</Text>
                    </TouchableOpacity>
                    <Text style={styles.checkText}> and</Text>
                    <TouchableOpacity onPress={openPolicy}>
                      <Text style={styles.linkText}> privacy policy.</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <ButtonBox
                onPress={handleSubmit}
                hasValue={valEmail}
                loader={loader}
                toggleCheckBox={checkFunction()}
                buttonText="Sign-in"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    paddingBottom: 0,
    paddingHorizontal: 0,
    backgroundColor: colors.white,
  },
  logo: {
    marginTop: '5%',
    marginLeft: '5%',
    alignSelf: 'flex-start',
    height: responsiveFontSize(5),
    width: responsiveFontSize(10),
  },
  imageContainer: {
    height: windowHeight * 0.35,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    height: responsiveFontSize(22),
    width: responsiveFontSize(28),
  },
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.card,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: vs(2),
    paddingHorizontal: '5%',
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: responsiveFontSize(3),
    lineHeight: 32,
    marginBottom: '6%',
    textAlign: "left",
    letterSpacing: -0.41,
    color: colors.textPrimary,
    fontFamily: fonts.JakartaTextBold,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: '25%',
  },
  forgotPasswordText: {
    fontSize: responsiveFontSize(1.8),
    color: colors.darlBlueColor,
    fontFamily: fonts.JakartaTextBold,
  },
  checkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: '8%',
    flexWrap: "wrap",
  },
  uncheckedBox: {
    height: 20,
    width: 20,
    borderRadius: 3.5,
    borderWidth: 1,
    borderColor: colors.brand,
  },
  checkTextWrapper: {
    flex: 1,
    flexDirection: "column",
    marginLeft: '4%',
  },
  checkTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.textPrimary,
    fontFamily: fonts.NunitoTextSemiBold,
  },
  linkText: {
    fontSize: responsiveFontSize(1.8),
    color: colors.darlBlueColor,
    fontFamily: fonts.NunitoTextSemiBold,
  },
  termsWrapper: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  termTitle: {
    fontSize: 24,
    color: colors.textPrimary,
    lineHeight: 33,
    letterSpacing: -0.41,
  },
  termClose: {
    height: 30,
    width: 30,
  },
  termTextSmall: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 21,
    letterSpacing: -0.41,
    color: colors.textSecondary,
  },
  termsSubTitle: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 12,
    letterSpacing: -0.408,
    color: colors.textPrimary,
  },
  termText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    letterSpacing: -0.41,
    color: colors.textSecondary,
  },
});

export default EnterEmail;

