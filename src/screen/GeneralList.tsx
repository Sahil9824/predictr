import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Images } from "../assets/images";
import { scale } from "../../helper";
import Icons from "../component/Icons";
import { ICONS } from "../constant/icons.constants";
import { useRoute } from "@react-navigation/native";
import { fonts } from "../constant";
import { SCREENS } from "../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";

const mockData = [
  { id: "1", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "2", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "3", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "4", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "5", name: "Jacob Jones", accuracy: "78.90%" },
];

const GeneralList = ({ navigation }) => {
  const route = useRoute();
  const { title, backscreen } = route.params;
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          {/* Avatar */}
          <Image
            source={Images.avatar6}
            style={{
              height: scale(40),
              width: scale(40),
              borderRadius: 8,
              marginRight: 8,
            }}
          />
          {/* Name and Accuracy */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.accuracy}>{item.accuracy} Accurate</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
      >
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(backscreen)}
          >
            <Icons type={ICONS.BACKARR} />
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <FlatList
          data={mockData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: 16,
    color: "#101010",
  },
  header: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0000001A",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  accuracy: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default GeneralList;
