import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { ICONS } from "../../constant/icons.constants";
import Icons from "../../component/Icons";
import { fonts } from "../../constant";
import { SCREENS } from "../../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    {
      title: "Notification Settings",
      icon: <Icons type={ICONS.PNOTI} />,

      onPress: () => navigation.navigate(SCREENS.NOTIFICATION_SETTINGS),
    },
    {
      title: "FAQs",
      icon: <Icons type={ICONS.FAQS} />,

      onPress: () => navigation.navigate(SCREENS.FAQS),
    },
    {
      title: "Give Feedback",
      icon: <Icons type={ICONS.FEEDBACK} />,

      onPress: () => navigation.navigate(SCREENS.FEEDBACK),
    },
    {
      title: "Privacy Policy",
      icon: <Icons type={ICONS.PRIVACY} />,

      onPress: () => navigation.navigate(SCREENS.PRIVACY),
    },
    {
      title: "Terms & Conditions",
      icon: <Icons type={ICONS.TERMS} />,

      onPress: () => navigation.navigate(SCREENS.TERMS),
    },
    {
      title: "Change password",
      icon: <Icons type={ICONS.KEY} />,

      onPress: () => navigation.navigate(SCREENS.CHANGE_PASSWORD),
    },
    {
      title: "Logout",
      icon: <Icons type={ICONS.LOGOUT} />,

      onPress: () => Alert.alert("Logout?", "Are you sure want to logout?"),
    },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.PROFILE)}
          >
            <Icons type={ICONS.BACKARR} />
          </TouchableWithoutFeedback>
          <Text style={styles.menuText}>Menu</Text>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.main}
            key={index}
            onPress={item.onPress}
          >
            <View>{item.icon}</View>
            <View style={styles.main2}>
              <Text style={styles.label}>{item.title}</Text>
              {index !== 6 ? <Icons type={ICONS.RIGHTARR} /> : <></>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
  },
  menuText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: 16,
    color: "#101010",
    marginLeft: 16,
  },
  main: {
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontFamily: fonts.f500,
    fontWeight: "500",
    fontSize: 15,
    color: "#000000",
  },
  main2: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MenuScreen;
