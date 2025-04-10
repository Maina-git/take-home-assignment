import { Text, View, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Profile from "./Profile";
import { StatusBarStyle } from "react-native";


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  backgroundColor="rgb(38, 14, 61)" translucent={true} barStyle="light-content"/>
        <Profile/>
    </SafeAreaView>

  );
}

const styles=StyleSheet.create({
  container:{
  flex:1,
  backgroundColor:"rgb(87, 63, 116)"
  }
})
