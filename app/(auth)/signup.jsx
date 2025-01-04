import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/home");
        }}
      >
        <Text>SignUp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
