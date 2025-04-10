import React from "react";
import { useState, useEffect, useRef } from "react";

import { View, StyleSheet, Image, Animated, Dimensions, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const {width} = Dimensions.get("window");

const Profile = () => {

const [activeTab, setActiveTab]=useState<"collections" | "tags">("collections");
const [hoverTab, setHoverTab]=useState<"collections" | "tags" | null>(null);
const [hoverCollection, setHoverCollection]=useState<string | null>(null);

const  scrollX = useRef(new Animated.Value(0)).current;

useEffect(()=>{
  Animated.loop(
    Animated.timing(scrollX, {
      toValue: -width,
      duration: 10000,
      useNativeDriver:true
    })
  ).start();
}, []);


useEffect(()=>{
  const animatedBackground = () =>{
    scrollX.setValue(0);
    Animated.timing(scrollX, {
      toValue: - width,
      duration: 10000,
      useNativeDriver: true,
    }).start(()=>animatedBackground());
  };
  animatedBackground();
}, []);

const collectionsData = [
  {
    id:"1",
    label:"likes",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3mi-ZalCW3UoUad8aMdwVQceEVRixvGHufA&s",
    count:32,
    icon:"heart-outline",
  },
  {
    id:"2",
    label:"saved",
    img:"https://static.musictoday.com/store/bands/840/product_600/T5CT207.jpg",
    count:23,
    icon:"bookmark-outline",
  },
  {
    id:"3",
    label:"files",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUj2-VUCL7Fmmpt9v9vX1L_bPXJQIpVwZDeg&s",
    count:4,
    icon:"folder-outline",
  },

];


const tagsData=[
{
  id:"1",
  title:"YOUR DIFFICULTY",
  text:"You decide the level of challenge you want"
},
{
  id:"2",
  title:"INTERESTS YOU LIKE",
  text:"we`ll use these to show you cool builds",
},
{
  id:"3",
  title:"TOOLS USED",
  text:"we`ll suggest better using picks"
},
{
  id:"4",
  title:"CREATOR INSIGHTS",
  text:"understand what1s trending now"
},
];


return  (
<View style={styles.container}>
<View style={styles.top}>
  <Animated.View style={[styles.backgroundImageContainer, 
  {
    transform: [{translateX: scrollX}]
  },
  ]}>
<Image 
 source={
  require("@/assets/images/1.png")}
style={styles.backgroundImage}/>

</Animated.View>

<View style={styles.overlay}>
  <View style={styles.profileHeader}>
<Image style={styles.image}
source={{
  uri: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
}}/>

<View style={styles.iconGroup}>
<Icon name="share-outline" size={24} color="white" />
<Icon name="settings-outline" size={24} color="white" style={{ marginRight: 12 }} />
</View>
</View>


<View style={styles.profileInfo}>
<View>
  <Text style={styles.name}>@Tthe0_from_hsr</Text>
  <Text style={styles.country}>India</Text>
 </View>

 
<TouchableOpacity style={styles.editButton}>
  <Text style={styles.aboutText}>Edit Profile</Text>
</TouchableOpacity>
</View>


<Text style={styles.about}>18 y/o with High ambitions want to build cool</Text>


<View style={styles.followersSection}>
<View style={styles.followersRow}>
  <View style={styles.followersRowBox}>
  <Icon name="people-outline" size={20} color="rgb(152, 187, 233)" style={{ marginRight: 6 }} /> 
<Text style={styles.iconText}>2</Text>
</View>
  <Text style={styles.followerText}>FOLLOWING</Text>
</View>
</View>
</View>
</View>

<View style={styles.bottom}>
<View style={styles.tabBar}>
  <TouchableOpacity 
  onPress={()=>setActiveTab("collections")}
  onPressIn={()=>setHoverTab("collections")}
  onPressOut={()=>setHoverTab(null)}
  style={styles.tab}>
 <Icon name="grid-outline" size={20} color={activeTab === "collections" ? "white" : "#888"}/>
  <Text style={[
    styles.tabText,
    activeTab === "collections" && styles.activeTab,
    hoverTab === "collections" && styles.hoverTabText,
  ]}>
Collections
  </Text>
  </TouchableOpacity>

  <TouchableOpacity 
  onPress={()=>setActiveTab("tags")}
  onPressIn={()=>setHoverTab("tags")}
  onPressOut={()=>setHoverTab(null)}
  style={styles.tab}>
 <Icon name="priceTag-outline" size={20} color={activeTab === "collections" ? "white" : "#888"}/>
  <Text style={[
    styles.tabText,
    activeTab === "tags" && styles.activeTab,
    hoverTab === "tags" && styles.hoverTabText,
  ]}>
Tags
  </Text>
  </TouchableOpacity>

</View>

{
  activeTab === "collections" && (
    <FlatList 
    data={collectionsData}
    numColumns={2}
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
      <TouchableOpacity
      style={styles.collectionCard}
      onPressIn={()=>setHoverCollection(item.id)}
      onPressOut={()=>setHoverCollection(null)}>
        <Image source={{uri:item.img}}  style={styles.collectionImage} />
        <View style={styles.cardFooter}>
          <Icon name={item.icon} size={16} color="white"/>
          <Text
          style={[
            styles.cardText,
            hoverCollection === item.id && styles.hoverCollectionText,
          ]}>
{item.label} {item.count}
          </Text>
        </View>
      </TouchableOpacity>
    )}/>

  
  )}

{
  activeTab === "tags" && (
<View>
<Text style={styles.header}>
  Our Recomended work best when you let us know these things
</Text>
{
  tagsData.map((tag)=>(
    <View key={tag.id} style={styles.tagItem}>
      <View>
        <Text style={styles.tagTitle}>{tag.title}</Text>
        <Text style={styles.tagText}>{tag.text}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="white"/>
    </View>
  ))}
</View>
)}
</View>
</View>
)}


const styles = StyleSheet.create({
  container:{
    backgroundColor:"black",
    flex:1
  },
  top:{
    height:366,
    overflow:"hidden",
    position:"relative",
    flexDirection:"column",
    justifyContent:"space-between",
    backgroundColor:"rgb(46, 12, 78)"
  },
backgroundImageContainer:{
  position:"absolute",
  top:0,
  left:0,
  width:width * 2,
  height:"100%",
  flexDirection:"row",
},
backgroundImage:{
  width:width *2,
  height:"100%",
  resizeMode:"cover"
},
overlay:{
flex:1,
padding:16,
justifyContent:"space-between",
},
profileHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
},
image:{
  width:150,
  height:150,
  backgroundColor:"white",
  borderRadius:20,
  borderWidth:3,
  borderColor:"rgb(218, 211, 117)",
  marginVertical:5,
  marginHorizontal:20
},
iconGroup:{
  flexDirection:"row",
  gap:20,
  alignItems:"center"
},
profileInfo:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:12,
  paddingHorizontal:10
},
name:{
  color:"white",
  fontSize:20,
  fontWeight:"bold"
},
country:{
  color:"#aaa",
  fontSize:14,
},
about:{
  color:"#aaa",
  fontSize:14,
  paddingHorizontal:10
},
editButton:{
  borderBottomWidth:1,
  borderBottomColor:"white",
borderStyle:"dotted",
  paddingVertical:6,
  paddingHorizontal:12,
},
editText:{
  color:"white",
},
aboutSection:{
  marginTop:12,
},
aboutText:{
  color:"#ccc",
  fontSize:14,
},
followersSection:{
  marginTop:8,
},
followersRow:{
  flexDirection:"column",
  paddingHorizontal:10
},
followersRowBox:{
flexDirection:"row",
},
followerText:{
  color:"#999",
  fontSize:10,
},
iconText:{
color:"white"
},
bottom:{
  height:619,
  backgroundColor:"rgb(10, 10, 10, 1)",
},
tabBar:{
  flexDirection:"row",
  justifyContent:"space-around",
  backgroundColor:"rgb(30, 30, 30)",
  padding:20,
  borderBottomWidth:2,
  borderBottomColor:"gray"
},
tab:{
  flexDirection:"row",
  alignItems:"center",
},
tabText:{
color:"#888",
fontSize:16,
marginLeft:8,
},
activeTab:{
  color:"rgb(51, 236, 165)",
  fontWeight:"bold",
  borderBottomWidth:2,
  borderBottomColor:"rgb(51, 236, 165)",
  textShadowColor:"rgb(51, 236, 165)",
  padding:2
},
hoverTabText:{
  color:"green",
},
collectionCard:{
  flex:0.5,
  margin:6,
  backgroundColor:"#222",
  borderRadius:10,
  overflow:"hidden",
},
collectionImage:{
  width:"100%",
  height:150,
  resizeMode:"cover",
},
cardFooter:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"rgb(75, 74, 74)",
  paddingVertical:20,
  gap:4,
},
cardText:{
  color:"rgba(211, 205, 205, 0.75)",
  fontWeight:"bold",
  marginLeft:6,
  fontSize:18,
},
hoverCollectionText:{
  color:"green",
},
header:{
  padding:16,
  fontSize:16,
  color:"gray",
},
tagItem:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  padding:16,
  borderBlockColor:"gray",
  borderBottomWidth:2,
},
tagTitle:{
  color:"white",
  fontSize:20,
  fontWeight:"600",
},
tagText:{
  color:"#999",
  fontSize:13,
},
})

export default Profile;


