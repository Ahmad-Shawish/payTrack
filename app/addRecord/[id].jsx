import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import {
  getCategories,
  addRecord as AddRecord,
  deleteRecord,
  updateRecord,
} from "../../db/transactions";

const addRecord = () => {
  // console.log(param);

  // actual useful
  const param = useLocalSearchParams();
  console.log("Param2: ", param); //{"id": "14"} || {"add":"false", "id":"14"}

  if (param.date) {
    let [year, month, day] = param.date.split("-");
    let [hour, minute, seconds] = param.time.split(" ")[0].split(":");
    // let dd = parseInt(day);
    // let dy = parseInt(year);
    // let dm = parseInt(month);
    // let dh = parseInt(hour);
    // let dmi = parseInt(minute);
    // let ds = parseInt(seconds);
    var d = new Date(year, month - 1, day, hour, minute, seconds);
    console.log(d);
  }

  // just a bunch of functions/hooks
  // const param3 = useRouter();
  // console.log("Param3: ", param3);

  // undefined
  // const { query } = useRouter();
  // console.log(query);

  const [recordType, setRecordType] = useState(param.type || "");
  const [amount, setAmount] = useState(param.amount || 0);

  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(
    (param.date && new Date(param.date)) || new Date()
  );

  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState((param.time && new Date(d)) || new Date());

  const [category, setCategory] = useState(param.category || "");
  // const [subCategory, setSubCategory] = useState();
  const [rtvCat, setRtvCat] = useState();

  const [paymentMethod, setPaymentMethod] = useState(
    param.payment_method || ""
  );

  const [note, setNote] = useState(param.note || "");

  const ChangeDate = (e, selectedValue) => {
    console.log("DATE SELECTED VALUE", selectedValue);
    setShowDate(false);
    setDate(selectedValue);
  };
  const ChangeTime = (e, selectedValue) => {
    console.log("TIME SELECTED VALUE", selectedValue);
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
    if (recordType && amount && date && time && category && paymentMethod) {
      console.log(
        param.id,
        recordType,
        amount,
        date.toDateString(),
        time.toTimeString(),
        category,
        paymentMethod,
        note
      );
      try {
        const res = await AddRecord(
          param.id,
          recordType,
          date.toISOString().split("T")[0],
          time.toTimeString(),
          amount,
          category,
          paymentMethod,
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

  const handleUpdate = async () => {
    try {
      const res = await updateRecord(
        param.edit,
        recordType,
        date.toISOString().split("T")[0],
        time.toTimeString(),
        amount,
        category,
        paymentMethod,
        note
      );
      console.log(res);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion..",
      "Are you sure you want to delete this Record?",
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
            const res = await deleteRecord(param.edit);
            router.back();
          },
        },
      ]
      // { cancelable: true }
    );
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

        <Text className="color-gray-400">Payment Method</Text>
        <Picker
          mode="dropdown"
          selectedValue={paymentMethod}
          onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
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
        {param.edit ? (
          <View className="gap-2">
            <TouchableOpacity onPress={handleUpdate}>
              <Text className="w-full p-2 border bg-green-400 text-center">
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text className="w-full p-2 border bg-red-400 text-center">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="p-2 border w-32 rounded-xl text-center">
              Add Record
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default addRecord;
