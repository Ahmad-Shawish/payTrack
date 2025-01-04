import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { getCategories, addRecord as AddRecord } from "../../db/transactions";

const addRecord = () => {
  // console.log(param);

  // actual useful
  const param = useLocalSearchParams();
  console.log("Param2: ", param); //{"id": "14"} || {"add":"false", "id":"14"}
  const [testtt, setTesttt] = useState(param.edit || "no edit");
  console.log(testtt);
  param.edit && console.log("EDITTTT");

  // just a bunch of functions/hooks
  // const param3 = useRouter();
  // console.log("Param3: ", param3);

  // undefined
  // const { query } = useRouter();
  // console.log(query);

  const [recordType, setRecordType] = useState();
  const [amount, setAmount] = useState();

  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState(new Date());

  const [category, setCategory] = useState();
  // const [subCategory, setSubCategory] = useState();
  const [rtvCat, setRtvCat] = useState();

  const [payment, setPayment] = useState();

  const [note, setNote] = useState("");

  const ChangeDate = (e, selectedValue) => {
    setShowDate(false);
    setDate(selectedValue);
  };
  const ChangeTime = (e, selectedValue) => {
    setShowTime(false);
    setTime(selectedValue);
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomPadding, setBottomPadding] = useState(35);

  useEffect(() => {
    // Event listener for when the keyboard shows
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        // Adjust padding when the keyboard appears
        const keyboardHeight = e.endCoordinates.height;
        setBottomPadding(keyboardHeight + 5); // Add some extra space for comfortable layout
        setKeyboardVisible(true); // Indicate that the keyboard is visible
      }
    );

    // Event listener for when the keyboard hides
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBottomPadding(35); // Reset the padding when the keyboard disappears
        setKeyboardVisible(false); // Indicate that the keyboard is hidden
      }
    );

    const initCat = async () => {
      try {
        const res = await getCategories();
        setRtvCat(res);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    initCat();

    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (recordType && amount && date && time && category && payment) {
      console.log(
        param.id,
        recordType,
        amount,
        date.toDateString(),
        time.toTimeString(),
        category,
        payment,
        note
      );
      try {
        const res = await AddRecord(
          param.id,
          recordType,
          date.toDateString(),
          time.toTimeString(),
          amount,
          category,
          payment,
          note
        );
        console.log(res);
        router.back();
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        className="p-6"
        contentContainerStyle={{ paddingBottom: bottomPadding, gap: 10 }}
      >
        {/* <Text className="-mb-6 p-4">Type:</Text> */}
        <Text className="color-gray-400">Type:</Text>
        <Picker
          selectedValue={recordType}
          onValueChange={(itemValue, itemIndex) => setRecordType(itemValue)}
          // mode="dropdown"
          // className="border-2 border-black bg-red-500 h-12"
          // style={{ borderColor: "#008", borderWidth: 20, margin: 15 }}
        >
          <Picker.Item label="Pick.." color="#808080" enabled={false} />
          <Picker.Item label="Expense" value="Expense" color="#FF0000" />
          <Picker.Item label="Income" value="Income" color="#008000" />
        </Picker>

        <Text className="color-gray-400">Ammount:</Text>
        <TextInput
          placeholder="0.00"
          keyboardType="number-pad"
          onChangeText={(value) => setAmount(value)}
          value={amount}
          className="text-lg"
        />

        {/* <DatePicker date={date} onDateChange={setDate} /> */}
        {/* <Button
          title="Select Date"
          onPress={() => {
            setShowDate(true);
          }}
        /> */}
        <Text className="color-gray-400">Date</Text>
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
        {/* {console.log("normal date", date)}
        {console.log("to localedatestring", date.toLocaleDateString())}
        {console.log("to string: ", date.toString())}
        {console.log("to datestring: ", date.toDateString())} */}
        <Text className="color-gray-400">Time</Text>
        <TouchableOpacity
          onPress={() => {
            setShowTime(true);
          }}
        >
          <Text className="text-lg">{time.toTimeString()}</Text>
        </TouchableOpacity>

        {showTime && (
          <DateTimePicker
            display="default"
            value={time}
            mode="time"
            onChange={ChangeTime}
          />
        )}

        <Text className="color-gray-400">Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="Pick.." color="#808080" enabled={false} />

          {rtvCat ? (
            rtvCat.map((itm) => (
              <Picker.Item key={itm.id} label={itm.name} value={itm.id} />
            ))
          ) : (
            <Picker.Item />
          )}
          {/* <Picker.Item />
          <Picker.Item /> */}
        </Picker>

        {/* <Text className="color-gray-400">SubCategory</Text>
        <Picker
          selectedValue={subCategory}
          onValueChange={(itemValue, itemIndex) => setSubCategory(itemValue)}
        >
          <Picker.Item />
          <Picker.Item />
        </Picker> */}

        <Text className="color-gray-400">Payment Type</Text>
        <Picker
          mode="dropdown"
          selectedValue={payment}
          onValueChange={(itemValue, itemIndex) => setPayment(itemValue)}
        >
          <Picker.Item label="Pick.." color="#808080" enabled={false} />

          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Debit Card" value="Debit Card" />
          <Picker.Item label="Credit Card" value="Credit Card" />
          <Picker.Item label="Bank Transfer" value="Bank Transfer" />
        </Picker>

        <Text className="color-gray-400">Note</Text>
        <TextInput
          placeholder="Description"
          onChangeText={(value) => setNote(value)}
          value={note}
          className="text-lg"
        />

        <TouchableOpacity onPress={handleSubmit}>
          <Text className="p-2 border w-32 rounded-xl text-center">
            Add Record
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addRecord;
