import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Record from "../../components/Record";
import { router, useLocalSearchParams } from "expo-router";
import { getSalaryRecords } from "../../db/transactions";

const SingleCard = () => {
  const param = useLocalSearchParams();
  console.log(param);

  const [data, setData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await getSalaryRecords(param.id);
      setData(res);
      console.log(res);
    };
    init();
  }, []);

  return (
    <SafeAreaView>
      <View className="p-4 gap-2">
        <View className="flex-row justify-between">
          <Text>8/2024</Text>
          <TouchableOpacity
            className="rounded-full bg-blue-400 w-10 h-10 items-center justify-center"
            // onPress={() => router.push("/addRecord/14?add=false")}
            onPress={() => router.push(`/addRecord/${param.id}`)}
          >
            <Text className="text-2xl color-white">+</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <View className="border border-gray-400 rounded-lg p-3 items-center">
            <Text>Income:</Text>
            <Text>1500</Text>
          </View>
          <View className="border border-gray-400 rounded-lg p-3 items-center">
            <Text>Expenses:</Text>
            <Text>1500</Text>
          </View>
          <View className="border border-gray-400 rounded-lg p-3 items-center">
            <Text>Remaining:</Text>
            <Text>1500</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {data &&
            data.map((itm) => (
              <TouchableOpacity
                key={itm.id}
                onPress={() =>
                  router.push(
                    `/addRecord/${param.id}?edit=${itm.id}&type=${itm.type}&amount=${itm.amount}&date=${itm.date}&time=${itm.time}&catagory=${itm.category_id}&payment_type=${itm.method}&note=${itm.note}`
                  )
                }
              >
                <Record
                  amount={itm.amount}
                  date={itm.date}
                  time={itm.time}
                  method={itm.method}
                  category={itm.category_name}
                  note={itm.note}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SingleCard;
