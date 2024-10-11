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
import FilterCard from "../../component/FilterCard";
import CustomDatePicker from "..//../component/CustomDatePicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREENS } from "../../constant/navigation.constants";
import ShareCard from '../../component/ShareCard';

const HeaderOptions = ({ isSelected, setIsSelected, openFilter }) => {
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
        {/* My Feed Pressable */}
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

        {/* Explore Pressable */}
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

      {/* More Options Button to open the FilterScreen */}
      <Pressable onPress={openFilter}>
        <Image
          source={Images.moreOptions}
          style={{ height: scale(24), width: scale(24) }}
        />
      </Pressable>
    </View>
  );
};

const DashBoard = () => {
  const contestDetailsRef = useRef(null);
  const filterCardRef = useRef(null);
  const datePickerRef = useRef(null);
  const shareCardRef = useRef(null)
  const [isSelected, setIsSelected] = useState(0);

  const navigation = useNavigation();

  const route = useRoute();
  const filteredOptions = route.params?.filteredOptions || null;

  console.log("FilteredOptions:", filteredOptions);

  const onSearchPress = () => {
    navigation.navigate(SCREENS.SEARCH)
  }


  const openContestDetails = () => {
    contestDetailsRef.current?.present();
  };

  const openFilterCard = () => {
    filterCardRef.current?.present();
  };

  const openDatePicker = () => {
    datePickerRef.current?.present();
  };

  const openShareCard = () => {
    shareCardRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/* Header */}
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
          <TouchableOpacity onPress={onSearchPress}>
            <Image
              source={Images.headerSearch}
              style={{ height: scale(22), width: scale(22) }}
            />
          </TouchableOpacity>

        </View>

        {/* Content */}
        <FlatList
          ListHeaderComponent={
            <>
              {isSelected !== 2 && (
                <View style={{ paddingHorizontal: 16 }}>
                  <WinnerCard openBottomSheet={openContestDetails} />
                </View>
              )}
              <HeaderOptions
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                openFilter={openFilterCard}
              />
            </>
          }
          data={isSelected === 2 ? [1] : [1, 2, 3, 4]}
          renderItem={({ item, index }) => {
            if (isSelected === 2) {
              return <Contests openBottomSheet={openContestDetails} />;
            }
            return (
              <View style={{ paddingHorizontal: 16 }}>
                <PredictionCard index={index} />
              </View>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
          scrollEventThrottle={16}
        />

        {/* Bottom Sheets */}
        <ContestDetails ref={contestDetailsRef} />
        <FilterCard ref={filterCardRef} />
        <ShareCard ref={shareCardRef} />
      </View>
    </BottomSheetModalProvider>
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
