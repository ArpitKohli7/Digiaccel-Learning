import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors';
import images from '../assets/images';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import fonts from '../assets/fonts';
interface ButtonProps {
  hasValue?: boolean;
  toggleCheckBox?: boolean;
  buttonText?: string;
  onPress?: any;
  loader?: boolean;
}
const ButtonBox = (props: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.hasValue && props.toggleCheckBox ? false : true}
        style={{
          ...styles.button,
          backgroundColor:
            props.hasValue && props.toggleCheckBox
              ? colors.darlBlueColor
              : 'rgba(56, 123, 219, 0.32)',
        }}>
        {props?.loader ?
          <ActivityIndicator size={"small"} style={styles.loader} color={"#fff"} />
          : <Text style={styles.buttonText}>{props.buttonText}</Text>}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  loader: {
    height: 20,
    width: 20,
  },
  button: {
    // height: responsiveFontSize(8),
    paddingVertical: responsiveFontSize(1.4),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brand,
  },
  buttonText: {
    fontSize: responsiveFontSize(2.4),
    color: colors.white,
    letterSpacing: -0.41,
    fontFamily: fonts.JakartaTextBold,
  },
});
export default ButtonBox;
