import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Images } from "../assets/images";
import { scale } from "../../helper";
import { fonts } from "../constant";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data for notifications
const notifications = [
  {
    id: 1,
    name: "Nik",
    message: "has replied to your comment.",
    unread: true,
    type: "replied",
  },
  {
    id: 2,
    name: "Trev Berg",
    message: "just made a new prediction on ODFL.",
    unread: true,
    type: "post",
  },
  {
    id: 3,
    name: "Jhon",
    message: "started following you.",
    unread: true,
    type: "profile",
  },
  {
    id: 4,
    name: "August Winner announcement",
    message: "",
    unread: true,
    isSpecial: true,
  },
  {
    id: 5,
    name: "Desscon",
    message: "has replied to your comment.",
    unread: false,
    type: "replied",
  },
  {
    id: 6,
    name: "Maggie",
    message: "just made a new prediction on ODFL.",
    unread: false,
    type: "post",
  },
  {
    id: 7,
    name: "Sam Pic",
    message: "started following you.",
    unread: false,

    type: "profile",
  },
  {
    id: 8,
    name: "Takie",
    message: "Agree with your AAPL Prediction",
    unread: false,
    type: "post",
  },
  {
    id: 9,
    name: "Kevin K",
    message: "has liked your comments.",
    unread: false,
    type: "replied",
  },
  {
    id: 10,
    name: "Maggie",
    message: "just made a new prediction on ODFL.",
    unread: false,
    type: "post",
  },
  {
    id: 11,
    name: "Sam Pic",
    message: "started following you.",
    unread: false,
    type: "profile",
  },
  {
    id: 12,
    name: "Takie",
    message: "Agree with your AAPL Prediction",
    unread: false,
    type: "post",
  },
  {
    id: 13,
    name: "Kevin K",
    message: "has liked your comments.",
    unread: false,
    type: "replied",
  },
];

// Notification Item Component
const NotificationItem = ({ item }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    if (item.isSpecial) {
      navigation.navigate(SCREENS.HOME, {
        isSpecial: true,
      });

      return;
    }
    if (item.type === "profile") {
      navigation.navigate(SCREENS.OTHER_USER_PROFILE, {
        previousScreen: SCREENS.NOTIFICATION,
      });
    }
    if (item.type === "replied" || item.type === "post") {
      navigation.navigate(SCREENS.POST, {
        previousScreen: SCREENS.NOTIFICATION,
      });
    }
  };
  return (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={handleItemPress}
    >
      <View style={styles.avatarContainer}>
        {/* Placeholder Avatar */}
        <Image
          source={item.id !== 4 ? Images.avatar1 : Images.goldTrophy} // Use a placeholder image for avatar
          style={styles.avatar}
        />
        {item.unread && !item.isSpecial && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.notificationText}>
        <Text style={styles.boldText}>{item.name} </Text>
        {item.message}
      </Text>
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1 }}
      edges={["left", "right", "top"]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Notification</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>New</Text>

        {notifications
          .filter((item) => item.unread)
          .map((item) => (
            <NotificationItem item={item} />
          ))}

        <Text style={styles.sectionHeader}>All</Text>
        {notifications
          .filter((item) => !item.unread)
          .map((item) => (
            <NotificationItem item={item} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  title: {
    fontFamily: fonts.f800,
    fontSize: scale(22),
    fontWeight: "800",
    marginVertical: 16,
    color: "#151B26",
  },

  header: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#0000001A",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  sectionHeader: {
    fontSize: scale(14),
    fontWeight: "400",
    fontFamily: fonts.f400,
    marginVertical: 8,
    color: "#717272",
  },

  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatarContainer: {
    marginRight: 10,
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: "contain",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    right: 0,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default NotificationScreen;
