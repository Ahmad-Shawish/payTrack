import { View, Text } from "react-native";
import React from "react";

const Card = ({ date, amount, total_spending }) => {
  return (
    <View className="border border-gray-400 w-full h-fit p-4 rounded-lg gap-2">
      <View className="flex-row justify-between">
        <Text className="text-2xl">{date}</Text>
        {/* <Text className="text-2xl">Aug, 28th</Text> */}
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">Amount:</Text>
        <Text className="text-lg text-gray-500">{amount}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">Expenses:</Text>
        <Text className="text-lg text-gray-500">{total_spending}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">Remaining:</Text>
        <Text className="text-lg text-gray-500">{amount - total_spending}</Text>
      </View>
    </View>
  );
};

export default Card;
