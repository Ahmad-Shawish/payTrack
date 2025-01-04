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
    <SafeAreaView className="p-6 items-center justify-center h-screen">
      {/* <Text>addSalary</Text> */}
      <Text className="color-gray-400">Month</Text>
      <TouchableOpacity
        onPress={() => {
          setShowDate(true);
        }}
      >
        <Text className="text-lg">{date.toDateString()}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          display="default"
          value={date}
          mode="date"
          onChange={ChangeDate}
        />
      )}

      <Text>Amount</Text>
      <TextInput
        placeholder="0.00"
        keyboardType="number-pad"
        onChangeText={(value) => setAmount(value)}
        value={amount}
      />

      <TouchableOpacity onPress={handleSubmit}>
        <Text className="w-48 border rounded-full flex items-center text-center justify-center p-2">
          Add Salary
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default addSalary;
