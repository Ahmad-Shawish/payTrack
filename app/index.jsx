import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

const Index = () => {
  return (
    // <SafeAreaView>
    //   <TouchableOpacity
    //     onPress={() => {
    //       router.push("/signin");
    //     }}
    //   >
    //     <Text className="text-2xl font-bold">Sign in</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => {
    //       router.push("/signup");
    //     }}
    //   >
    //     <Text>SignUp</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    <Redirect href={"/home"} />
  );
};

export default Index;
