import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addSalary as AddSalary } from "../../db/transactions.js";
import { router } from "expo-router";

const addSalary = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [amount, setAmount] = useState(0);

  const ChangeDate = (e, selectedValue) => {
    setShowDate(false);
    setDate(selectedValue);
  };

  const handleSubmit = async () => {
    if (amount) {
      const res = await AddSalary(date.toDateString(), amount);
      // console.log(res);
      setAmount(0);
      router.navigate("/home");
    } else return;
  };

  return (
    <SafeAreaView className="p-4 h-screen gap-3 bg-[#18181a]">
      {/* <Text>addSalary</Text> */}
      <Text className="text-4xl color-gray-400">New Salary</Text>
      <View>
        <Text className=" color-white">Month</Text>
        <TouchableOpacity
          onPress={() => {
            setShowDate(true);
          }}
        >
          <Text className="text-lg color-white">{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showDate && (
        <DateTimePicker
          display="default"
          value={date}
          mode="date"
          onChange={ChangeDate}
        />
      )}
      <View>
        <Text className="text-white">Amount</Text>
        <TextInput
          className="color-white"
          placeholder="0.00"
          placeholderTextColor="white"
          keyboardType="number-pad"
          onChangeText={(value) => setAmount(value)}
          value={amount}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit}>
        <Text className="w-full border rounded-full flex items-center text-center justify-center p-2 color-white border-white">
          Add Salary
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default addSalary;
