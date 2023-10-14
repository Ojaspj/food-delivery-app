import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { featured } from "../constants";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="border border-gray-400 rounded-full p-3 flex-row flex-1 items-center ">
          <Icon.Search height={25} width={25} stroke={"gray"} />
          <TextInput placeholder="Search Restaurants" className="ml-4 flex-1" />
          <View className="border-0 pl-2 border-gray-300 border-l-2 flex-row items-center space-x-1  ">
            <Icon.MapPin height={25} width={25} stroke={"gray"} />
            <Text className="text-gray-500">Nepal</Text>
          </View>
        </View>
        <View className="rounded-full p-3 bg-orange-400">
          <Icon.Sliders height={25} width={25} stroke={"white"} />
        </View>
      </View>
      {/* main  */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* categories */}
        <Categories/>
        {/* featured  */}
        <View>
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description ={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
