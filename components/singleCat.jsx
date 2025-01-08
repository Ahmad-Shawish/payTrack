import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { updateCategory } from "../db/transactions";

const SingleCategory = ({ value, edit, id }) => {
  const [textValue, setTextValue] = useState(value);
  //   console.log(params);

  const hanldeUpdate = async () => {
    const res = await updateCategory(id, textValue);
    // console.log(res);
    // console.log("Changes after edit");
  };

  return (
    <View>
      <TextInput
        value={textValue}
        onChangeText={(v) => {
          setTextValue(v);
        }}
        editable={edit}
        onEndEditing={hanldeUpdate}
        className={`${edit ? "color-white" : "color-gray-400"}`}
      />
    </View>
  );
};

export default SingleCategory;
