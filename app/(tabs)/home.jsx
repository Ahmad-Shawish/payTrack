import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import { router } from "expo-router";
import { initializeDbConnection } from "../../db/db";
import { initializeDatabase } from "../../db/schema";
import { getSalaries } from "../../db/transactions";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleRefresh = async () => {
    const res = await getSalaries();
    setData(res);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4 gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl">Home</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <Text>Refresh</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            <View className="border border-gray-400 rounded-lg p-3">
              <Text>Total Income:</Text>
              <Text>1500</Text>
            </View>
            <View className="border border-gray-400 rounded-lg p-3">
              <Text>Total Expenses:</Text>
              <Text>1500</Text>
            </View>
            <View className="border border-gray-400 rounded-lg p-3">
              <Text>Total Remaining:</Text>
              <Text>1500</Text>
            </View>
          </View>

          {data.map((itm) => (
            <TouchableOpacity
              key={itm.id}
              onPress={() => {
                router.push(`/SingleCard/${itm.id}`);
              }}
            >
              <Card
                date={itm.month}
                amount={itm.income}
                total_spending={itm.total_spending}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
