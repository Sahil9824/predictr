import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, fonts } from "../../constant";
import { Images } from "../../assets/images";
import { useRef, useState } from "react";
import { scale } from "../../../helper";
import PredictionCard from "../../component/PredictionCard";
import WinnerCard from "../../component/WinnerCard";

const HeaderOptions = () => {
  const [isSelected, setIsSelected] = useState(0);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
      }}
    >
      <View style={{ flexDirection: "row", height: scale(50) }}>
        <Pressable
          onPress={() => setIsSelected(0)}
          style={[
            { width: 85, justifyContent: "center" },
            isSelected === 0 && {
              borderBottomColor: Colors.primaryBlue,
              borderBottomWidth: scale(3),
              height: scale(50),
            },
          ]}
        >
          <Text
            style={[
              {
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                textAlign: "center",
              },
              isSelected === 0 && {
                fontFamily: fonts.f800,
                color: Colors.primaryBlue,
              },
            ]}
          >
            {"My Feed"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setIsSelected(1)}
          style={[
            { width: scale(85), justifyContent: "center" },
            isSelected === 1 && {
              borderBottomColor: Colors.primaryBlue,
              borderBottomWidth: scale(3),
              height: scale(50),
            },
          ]}
        >
          <Text
            style={[
              {
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                textAlign: "center",
              },
              isSelected === 1 && {
                fontFamily: fonts.f800,
                color: Colors.primaryBlue,
              },
            ]}
          >
            {"Explore"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setIsSelected(2)}
          style={[
            { width: 85, justifyContent: "center" },
            isSelected === 2 && {
              borderBottomColor: Colors.primaryBlue,
              borderBottomWidth: 3,
              height: scale(50),
            },
          ]}
        >
          <Text
            style={[
              {
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                textAlign: "center",
              },
              isSelected === 2 && {
                fontFamily: fonts.f800,
                color: Colors.primaryBlue,
              },
            ]}
          >
            {"Contests"}
          </Text>
        </Pressable>
      </View>
      <Image
        source={Images.moreOptions}
        style={{ height: scale(24), width: scale(24) }}
      />
    </View>
  );
};

const DashBoard = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 50;
  const RenderHeaderOptions = () => {
    const translateY = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, 0], // Keeps it pinned at the top
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.headerOptionsContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <HeaderOptions />
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scale(10),
        }}
      >
        <Text
          style={{
            fontFamily: fonts.f800,
            color: Colors.textBlack,
            fontSize: scale(22),
          }}
        >
          {"Predictr."}
        </Text>
        <Image
          source={Images.headerSearch}
          style={{ height: scale(22), width: scale(22) }}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <WinnerCard />
            <HeaderOptions />
          </>
        }
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => <PredictionCard index={index} />}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
  },
  headerOptionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
});
