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
import { Images } from "../../assets/images";
import { scale } from "../../../helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constant/navigation.constants";

const mockData = [
  { id: "1", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "2", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "3", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "4", name: "Jacob Jones", accuracy: "78.90%" },
  { id: "5", name: "Jacob Jones", accuracy: "78.90%" },
];

const PredictorsScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.itemContainer} key={item.id}>
          {/* Avatar */}

          <Pressable
            style={{
              flexDirection: "row",
              flex: 1,
            }}
            onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
          >
            <>
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
            </>
          </Pressable>
          {/* Follow Button */}
          <TouchableOpacity>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.divider} />
      </>
    );
  };

  return (
    <FlatList
      data={mockData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
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
    marginTop: 2,
  },
  followButtonText: {
    color: "#024BAC",
    fontWeight: "800",
    fontSize: 14,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginLeft: scale(48),
  },
});

export default PredictorsScreen;
