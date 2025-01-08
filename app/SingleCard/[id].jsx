import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Record from "../../components/Record";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { deleteSalary, getSalaryRecords } from "../../db/transactions";

const SingleCard = () => {
  const param = useLocalSearchParams();
  console.log(param);

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const init = async () => {
  //     const res = await getSalaryRecords(param.id);
  //     setData(res);
  //     console.log(res);
  //   };
  //   init();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        const res = await getSalaryRecords(param.id);
        setData(res);
        console.log(res);
      };
      init();
    }, [])
  );

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion..",
      "Are you sure you want to delete this Salary and all records in it?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            console.log("CANCELED");
          },
        },
        {
          text: "OK",
          onPress: async () => {
            console.log("DELETED");
            const res = await deleteSalary(param.id);
            router.back();
          },
        },
      ]
      // { cancelable: true }
    );
  };

  return (
    <SafeAreaView>
      <View className="p-4 gap-2 h-full bg-[#18181a]">
        <View className="flex-row justify-between">
          <Text className="text-2xl color-white">{param.date}</Text>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="rounded-full bg-red-400 p-3"
              onPress={handleDelete}
            >
              <Text className="color-white">Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-full bg-blue-400 w-10 h-10 items-center justify-center"
              // onPress={() => router.push("/addRecord/14?add=false")}
              onPress={() => router.push(`/addRecord/${param.id}`)}
            >
              <Text className="text-2xl color-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="border w-1/3 border-gray-400 rounded-lg p-3 items-center">
            <Text className="color-white">Income:</Text>
            <Text className="color-white">{param.amount}</Text>
          </View>
          <View className="border w-1/3 border-gray-400 rounded-lg p-3 items-center">
            <Text className="color-white">Expenses:</Text>
            <Text className="color-white">
              {data.length > 0 && data[0].sum_expenses}
            </Text>
          </View>
          <View className="border w-1/3 border-gray-400 rounded-lg p-3 items-center">
            <Text className="color-white">Remaining:</Text>
            <Text className="color-white">
              {data.length > 0 && param.amount - data[0].sum_expenses}
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ gap: 10, flexDirection: "column-reverse" }}
        >
          {data &&
            data.map((itm) => (
              <TouchableOpacity
                key={itm.id}
                onPress={() =>
                  router.push(
                    `/addRecord/${param.id}?edit=${itm.id}&type=${itm.type}&amount=${itm.amount}&date=${itm.date}&time=${itm.time}&category=${itm.category_id}&payment_method=${itm.method}&note=${itm.note}`
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
