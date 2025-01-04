import { View, Text } from "react-native";
import React from "react";

const Record = ({ amount, date, time, method, category, note, type }) => {
  return (
    <View className="border border-gray-400 w-full h-fit p-4 rounded-lg gap-1">
      <View className="flex-row justify-between items-center">
        <Text>{date}</Text>
        <Text>{time}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>{method}</Text>
        <Text>{category}</Text>
        <Text>{amount}</Text>
      </View>
      <Text>{note}</Text>
    </View>
  );
};

export default Record;
