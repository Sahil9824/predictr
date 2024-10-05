import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, fonts } from "../../constant";
import { Images } from "../../assets/images";
import { useRef, useState } from "react";
import { scale } from "../../../helper";
import PredictionCard from "../../component/PredictionCard";
import WinnerCard from "../../component/WinnerCard";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import ContestDetails from "../../component/bottomSheets/ContestDetails";
import Contests from "../../component/Contests";

const HeaderOptions = ({ isSelected, setIsSelected }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        paddingHorizontal: scale(10),
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
  const bottomSheetModalRef = useRef(null);
  const [isSelected, setIsSelected] = useState(0);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scale(10),
          paddingHorizontal: scale(10),
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
            {isSelected !== 2 && (
              <WinnerCard openBottomSheet={openBottomSheet} />
            )}
            <HeaderOptions
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </>
        }
        data={isSelected === 2 ? [1] : [1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          if (isSelected === 2) {
            return <Contests openBottomSheet={openBottomSheet} />; // Render your component when isSelected is 2
          }
          return <PredictionCard index={index} />; // Render PredictionCard otherwise
        }}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
      />

      {/* <Contests /> */}

      <ContestDetails ref={bottomSheetModalRef} />
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
