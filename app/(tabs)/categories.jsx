import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleCategory from "../../components/singleCat";

import editIcon from "../../assets/edit_square_white.png";
import { addCategory, getCategories } from "../../db/transactions";
import { StatusBar } from "expo-status-bar";

const categories = () => {
  const [edit, setEdit] = useState(false);
  const [newCat, setNewCat] = useState();

  const handleSubmit = async () => {
    if (newCat) {
      const res = await addCategory(newCat);
      // console.log(res);
      setNewCat("");
      const updatedRes = await getCategories();
      setData(updatedRes);
    } else return;
  };

  const [data, setData] = useState();

  useEffect(() => {
    const initCat = async () => {
      try {
        const res = await getCategories();
        setData(res);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    initCat();
  }, []);

  return (
    <>
      <SafeAreaView className="p-4 bg-[#18181a] h-full">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-4xl color-white">Categories</Text>
          <TouchableOpacity
            onPress={() => {
              setEdit((prev) => !prev);
            }}
          >
            <Image source={editIcon} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        <ScrollView className="max-h-[80%]">
          {/* <TextInput value="Income" editable={edit ? true : false} />
        <TextInput value="Vehicle" editable={edit ? true : false} />
        <TextInput value="Food" editable={edit} />
        <TextInput value="Other" editable={edit} />
        <TextInput value="Life" editable={edit} />
        <SingleCategory value="Some value" edit={edit} />
        <SingleCategory value="Some value" edit={edit} /> */}
          {data &&
            data.map((itm) => (
              <SingleCategory
                key={itm.id}
                id={itm.id}
                value={itm.name}
                edit={edit}
              />
            ))}

          {/* <TextInput
          value="Shopping"
          editable={edit}
          className={`color-black ${
            edit ? "border-b border-gray-400" : "border-none"
          } h-14 w-20 `}
        /> */}
        </ScrollView>
        {edit && (
          <>
            <TextInput
              className="color-white"
              placeholder="New Category..."
              placeholderTextColor="white"
              value={newCat}
              onChangeText={(v) => {
                setNewCat(v);
              }}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text className="border p-2 w-32 color-white border-white">
                Add Category
              </Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="black" />
    </>
  );
};

export default categories;
