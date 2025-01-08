// import { View, Text } from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { Image } from "react-native";

import homeImg from "../../assets/home-white.png";
import catImg from "../../assets/category_white.png";
import addImg from "../../assets/add_circle_white.png";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: "black" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={homeImg} className="w-6 h-6" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="addRecord"
        options={{
          headerShown: false,
          title: "Add Record",
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={addImg} className="w-6 h-6" />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="addSalary"
        options={{
          headerShown: false,
          title: "Add Salary",
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={addImg} className="w-6 h-6" />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
          title: "Categories",
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={catImg} className="w-6 h-6" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
