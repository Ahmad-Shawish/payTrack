import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Card from "../../components/Card";
import { router, useFocusEffect } from "expo-router";
import { initializeDbConnection } from "../../db/db";
import { initializeDatabase } from "../../db/schema";
import { getSalaries } from "../../db/transactions";

const Home = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const initDB = async () => {
  //     try {
  //       await initializeDbConnection();
  //       await initializeDatabase();
  //       const res = await getSalaries();
  //       setData(res);
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   initDB();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      const initDB = async () => {
        try {
          await initializeDbConnection();
          await initializeDatabase();
          const res = await getSalaries();
          setData(res);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      initDB();
    }, [])
  );

  // const handleRefresh = async () => {
  //   const res = await getSalaries();
  //   setData(res);
  // };

  return (
    <>
      <SafeAreaView>
        <View className="p-4 gap-3 h-full bg-[#18181a]">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl color-white">Home</Text>
            {/* <TouchableOpacity onPress={handleRefresh}>
              <Text>Refresh</Text>
            </TouchableOpacity> */}
          </View>
          <View className="flex-row justify-between">
            <View className="border border-gray-400 rounded-lg p-3">
              <Text className="color-white">Total Income:</Text>
              <Text className="color-white">
                {data.length > 0 && data[0].sum_salaries}
              </Text>
            </View>
            <View className="border border-gray-400 rounded-lg p-3">
              <Text className="color-white">Total Expenses:</Text>
              <Text className="color-white">
                {data.length > 0 && data[0].sum_total_spendings}
              </Text>
            </View>
            <View className="border border-gray-400 rounded-lg p-3">
              <Text className="color-white">Total Remaining:</Text>
              <Text className="color-white">
                {data.length > 0 &&
                  data[0].sum_salaries - data[0].sum_total_spendings}
              </Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ gap: 10, flexDirection: "column-reverse" }}
          >
            {data.map((itm) => (
              <TouchableOpacity
                key={itm.id}
                onPress={() => {
                  router.push(
                    `/SingleCard/${itm.id}?amount=${itm.income}&expense=${itm.total_spending}&date=${itm.month}`
                  );
                }}
              >
                <Card
                  date={itm.month}
                  amount={itm.income}
                  total_spending={itm.sum_spendings}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="black" />
    </>
  );
};

export default Home;
