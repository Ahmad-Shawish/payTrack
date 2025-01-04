import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/home");
        }}
      >
        <Text>SignIn</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;
