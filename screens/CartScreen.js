import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { featured } from "../constants";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromCart, selectCartItems, selectCartTotal } from "../slices/cartSlice";


export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant)
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems]  = useState({});
  const dispatch  = useDispatch();
  const deliveryFee = 2;

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
        if(group[item.id]){
            group[item.id].push(item);

        }else{
            group[item.id] = [item];
        }
        return group;
    },{})
    setGroupedItems(items);
  },[cartItems])
  return (
    <View className="bg-white flex-1 ">
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 bg-orange-300 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke={"white"} />
        </TouchableOpacity>
        <View>
          <Text className="text-center text-xl font-extrabold">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>
      {/* delivery time  */}
      <View className="bg-orange-200 flex-row px-4 items-center ">
        <Image
          source={require("../assets/bikeguy.png")}
          className="w-20 h-20"
        />
        <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text className=" text-orange-500 font-bold px-4 py-2 rounded-full">
            Change
          </Text>
        </TouchableOpacity>
      </View>
      {/* dishes  */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 15,
        }}
        className="bg-white pt-5"
      >
        {Object.entries(groupedItems).map(([key, items]) => {
            let dish = items[0]
          return (
            <View
              key={key}
              className="flex-row bg-white items-center space-x-3 py-2 px-4 rounded-3xl mx-2 mb-3 shadow-md "
            >
              <Text className="font-bold text-orange-500">{items.length} x</Text>
              <Image className="h-14 w-14 rounded-full " source={dish.image} />
              <Text className="flex-1 font-semibold text-base">
                {dish.name}
              </Text>
              <Text className="font-semibold text-base">${dish.price}</Text>
              <TouchableOpacity
              onPress={() => dispatch(removeFromCart({id:dish.id}))}
              className="p-1 rounded-full bg-orange-400">
                <Icon.Minus
                  stroke={"white"}
                  strokeWidth={2}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals  */}
      <View className="p-6 px-8 rounded-t-3xl space-y-4 bg-orange-200">
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Sub total</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total</Text>
          <Text className="text-gray-700 font-extrabold">${deliveryFee+cartTotal}</Text>
        </View>
        <View>
          <TouchableOpacity
          onPress={() => navigation.navigate('OrderPreparing')} 
          className="p-3 rounded-full bg-orange-400 ">
            <Text className="text-white text-center  font-bold text-lg">
                Place order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
