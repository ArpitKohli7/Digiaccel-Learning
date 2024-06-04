import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors';
import images from '../assets/images';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

interface InputProps extends TextInputProps {
  hasError?: boolean;
  errorMessage?: string;
  customStyles?: object;
  changeSecure?: Function;
}

const TextInputBox = (props: InputProps) => {
  const { hasError, errorMessage, changeSecure,customStyles, ...rest } = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, hasError && styles.inputContainerError]}>
        <TextInput
          selectionColor={colors.brand}
          placeholderTextColor={colors.inputText}
          style={[styles.input, customStyles]}
          {...rest}
        />
        {rest.isPassword && (
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => {
              setPasswordVisibility(!passwordVisibility);
              changeSecure();
            }}
          >
            <Image  
            resizeMode='contain'
            style={{width: responsiveFontSize(3),height: responsiveFontSize(3),marginLeft: 10}}
            source={rest.secureTextEntry ? images.forgotHide : images.eyeIcon} />
          </TouchableOpacity>
         )} 
      </View>
      {/* {hasError && <Text style={styles.errorEmail}>{errorMessage}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: '7%',
    backgroundColor: colors.white,
    // borderColor: colors.brand,
    borderColor: 'transparent'
  },
  inputContainerError: {
    borderColor: colors.dangerPrimary,
  },
  input: {
    height: responsiveFontSize(7),
    fontSize: responsiveFontSize(2),
    flex: 1,
    color: colors.textPrimary,
  },
  showPasswordButton: {
    // paddingHorizontal: 8,
  },
  errorEmail: {
    fontSize: responsiveFontSize(1.6),
    marginTop: '2%',
    lineHeight: 24,
    letterSpacing: -0.41,
    backgroundColor:'red',
    width: '55%',
    color: colors.dangerPrimary,
  },
});

export default TextInputBox;
