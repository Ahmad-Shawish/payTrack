import { View, Text } from "react-native";
import React from "react";

const Record = ({ amount, date, time, method, category, note, type }) => {
  let d = new Date(date);
  return (
    <View className="border border-gray-400 w-full h-fit p-4 rounded-lg gap-1">
      <View className="flex-row justify-between items-center">
        <Text className="color-white">{d.toDateString()}</Text>
        <Text className="color-white">{time}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="color-white">{method}</Text>
        <Text className="color-white">{category}</Text>
        <Text className="color-white">{amount}</Text>
      </View>
      <Text className="color-white">{note}</Text>
    </View>
  );
};

export default Record;
