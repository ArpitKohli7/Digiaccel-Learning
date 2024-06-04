import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "react-native"
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

export const CustomStatusBar = () => {
  const insets = useSafeAreaInsets();
  // console.log("innnddd ", insets);
  return (
    <View style={{ height: insets.top, backgroundColor: 'white' }}>
      <StatusBar
        animated={true}
        // barStyle={"light-content"}
        backgroundColor={'white'}
        // barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
    </View>
  )
}