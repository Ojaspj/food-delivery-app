import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Icon from 'react-native-feather'
import { selectRestaurant } from "../slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../slices/cartSlice";


export default function Delivery() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cancelorder = () => {
    navigation.navigate('Home');
    dispatch(emptyCart());
  }
  return (
    <View className="flex-1">
      {/* map view  */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10 ">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              {" "}
              Estimated Arrival Time
            </Text>
            <Text className="text-lg text-gray-700 font-extrabold">
              {" "}
              20-30 minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your order is on its way!
            </Text>
          </View>
          <Image
            className="w-24 h-24"
            source={require("../assets/bikeguy2.gif")}
          />
        </View>
        <View className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2 bg-orange-500">
          <View className="p-1 rounded-full bg-orange-400">
            <Image
              className="h-16 w-16 rounded-full"
              source={require("../assets/deliveryguy.png")}
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Prajwal Joshi</Text>
            <Text className="font-semibold text-white">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
                <Icon.Phone className="text-orange-800 " fill={"orange"} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={cancelorder}
            className="bg-white p-2 rounded-full">
                <Icon.X className="text-red-500 "  strokeWidth={4} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
}
