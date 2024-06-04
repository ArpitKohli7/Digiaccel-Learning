import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar, Image } from "react-native"
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "../assets/colors";
import images from "../assets/images";
import fonts from "../assets/fonts";

export const CustomHeader = () => {
    const insets = useSafeAreaInsets();
    // console.log("innnddd ", insets);
    return (
        <View style={styles.main}>
            <View style={styles.View}>
                <TouchableOpacity>
                    <Image resizeMode={"contain"}
                        style={styles.icon}
                        source={images.lineIcon}></Image>
                </TouchableOpacity>
                <Text style={styles.text}>Library</Text>
            </View>
            <View style={styles.View}>
                <TouchableOpacity>
                    <Image resizeMode={"contain"}
                        style={{
                            ...styles.icon, marginRight: responsiveFontSize(2), width: responsiveFontSize(4.5),
                            height: responsiveFontSize(4.5)
                        }}
                        source={images.bellIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image resizeMode={"contain"}
                        style={{
                            ...styles.icon, width: responsiveFontSize(4.5),
                            height: responsiveFontSize(4.5)
                        }}
                        source={images.profile}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        paddingHorizontal: '3%', justifyContent: 'space-between', alignItems: 'center', height: responsiveFontSize(8), flexDirection: 'row', backgroundColor: colors.header,
    },
    View: {
        flexDirection: 'row', alignItems: 'center'
    },
    icon: {
        width: responsiveFontSize(4.7),
        height: responsiveFontSize(4.7)
    },
    text: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
        fontFamily: fonts.JakartaTextBold,
        marginLeft: '6%'
    }
})