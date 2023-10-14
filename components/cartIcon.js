import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

export default function CartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  if(!cartItems.length) return;

  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className=" bg-orange-400 flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg "
      >
        <View className="p-2 px-4 rounded-full bg-orange-300">
          <Text className="font-extrabold text-lg text-white">{cartItems.length}</Text>
        </View>
        <Text className="font-extrabold text-white flex-1 text-center text-lg">
          View cart
        </Text>
        <Text className="font-extrabold text-white text-lg">${cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
