import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, fonts } from "../../constant";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { moderateScale, scale } from "../../../helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../../assets/images";
import { useRef, useState } from "react";
import SearchStock from "../../component/bottomSheets/SearchStock";
import MovementSheet from "../../component/bottomSheets/Movement";
import CustomDatePicker from "../../component/CustomDatePicker";
import CustomCalSheet from "../../component/bottomSheets/CustomCalSheet";
import ImagePicker from "../../component/ImagePicker";
import Button from "../../component/Button";
import { SCREENS } from "../../constant/navigation.constants";

const Prediction = ({ navigation }) => {
  const [selectedStock, setSelectedStock] = useState("");
  const [date, setDate] = useState(null);
  const [movement, setMovement] = useState("");
  const [reason, setReason] = useState("");
  const [isPick, setIsPick] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const resetValues = () => {
    setSelectedStock("");
    setDate(null);
    setMovement("");
    setMovement("");
    setReason("");
    setIsPick(false);
    setImgSrc(null);
  };

  const searchBottomRef = useRef(null);
  const movementBottomRef = useRef(null);
  const calBottomRef = useRef(null);

  const handlePicImage = () => {
    setIsPick(true);
  };

  const openStockPicker = (type) => {
    searchBottomRef.current?.present();
  };

  const closeStockPicker = (type) => {
    searchBottomRef.current?.dismiss();
  };

  const handlePostPredict = () => {
    resetValues();
    navigation.navigate(SCREENS.POST, {
      imgSrc,
      date,
      selectedStock,
      movement,
      reason,
    });
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["left", "right", "bottom", "top"]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icons type={ICONS.CLOSE} />
          </TouchableWithoutFeedback>

          <Text style={styles.text1}>Make a prediction</Text>
          <Text style={styles.text2}>Predict stock, movement, and date.</Text>
        </View>
        <View style={styles.box}>
          <Pressable onPress={openStockPicker}>
            <View style={styles.boxMain}>
              <View style={styles.box2}>
                <Image
                  source={Images.Econfused}
                  style={{ height: 24, width: 24 }}
                />
                <Text style={styles.text3}>I think</Text>
              </View>
              <View style={styles.box2}>
                {!selectedStock ? (
                  <Text style={styles.text4}>Select Stock</Text>
                ) : (
                  <Text
                    style={{
                      ...styles.text4,
                      fontFamily: fonts.f500,
                      fontWeight: "500",
                      color: "#151B26",
                    }}
                  >
                    {selectedStock?.symbol}
                  </Text>
                )}
                {!selectedStock ? (
                  <Icons type={ICONS.DOWN_ARROW} />
                ) : (
                  <Image
                    source={Images.CheckmarkBlue}
                    style={{ height: 17, width: 17 }}
                  />
                )}
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => movementBottomRef.current.present()}>
            <View style={styles.boxMain}>
              <View style={styles.box2}>
                <Image
                  source={Images.DateCal}
                  style={{ height: 24, width: 24 }}
                />
                <Text style={styles.text3}>Will go</Text>
              </View>
              <View style={styles.box2}>
                {!movement ? (
                  <Text style={styles.text4}>Set Movement</Text>
                ) : (
                  <Text
                    style={{
                      ...styles.text4,
                      fontFamily: fonts.f500,
                      fontWeight: "500",
                      color: "#151B26",
                    }}
                  >
                    {`${movement?.movement} ${movement?.percentage}`}
                  </Text>
                )}
                {!movement ? (
                  <Icons type={ICONS.DOWN_ARROW} />
                ) : (
                  <Image
                    source={Images.CheckmarkBlue}
                    style={{ height: 17, width: 17 }}
                  />
                )}
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => calBottomRef.current.present()}>
            <View style={styles.boxMain}>
              <View style={styles.box2}>
                <Image
                  source={Images.PCalendar}
                  style={{ height: 24, width: 24 }}
                />
                <Text style={styles.text3}>By</Text>
              </View>
              <View style={styles.box2}>
                {!date ? (
                  <Text style={styles.text4}>Pick a Date</Text>
                ) : (
                  <Text
                    style={{
                      ...styles.text4,
                      fontFamily: fonts.f500,
                      fontWeight: "500",
                      color: "#151B26",
                    }}
                  >
                    {date}
                  </Text>
                )}
                {!date ? (
                  <Icons type={ICONS.DOWN_ARROW} />
                ) : (
                  <Image
                    source={Images.CheckmarkBlue}
                    style={{ height: 17, width: 17 }}
                  />
                )}
              </View>
            </View>
          </Pressable>
        </View>

        <TextInput
          value={reason}
          onChange={setReason}
          style={styles.input}
          placeholder="Reason..."
          placeholderTextColor="#717272"
          multiline
        />

        {!imgSrc ? (
          <Pressable
            style={{ width: "99%" }}
            onPress={!imgSrc ? handlePicImage : () => {}}
          >
            <View style={styles.box3}>
              <Icons type={ICONS.PIN} />
              <Text style={styles.text5}>Upload</Text>
            </View>
          </Pressable>
        ) : (
          <View
            style={{
              width: "100%",
              height: scale(190),
              borderRadius: 16,
              overflow: "hidden",
              marginTop: 16,
              position: "relative",
              marginBottom: 30,
            }}
          >
            <Image
              source={{ uri: imgSrc.uri }}
              style={{ width: "100%", height: "100%" }}
            />

            <View style={{ position: "absolute", left: 10, top: 10 }}>
              <Icons type={ICONS.PIN} stroke="#FFFFFF" />
            </View>

            <TouchableWithoutFeedback onPress={() => setImgSrc(null)}>
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                <Icons type={ICONS.CLOSE} stroke="#fff" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}

        <Button
          text="Post Prediction"
          inActive={!selectedStock || !date || !movement}
          style={{ marginTop: "auto", marginBottom: 30, width: "99%" }}
          onPress={handlePostPredict}
        />
      </ScrollView>

      <ImagePicker
        visible={isPick}
        setPickedImage={setImgSrc}
        hideModal={() => {
          setIsPick(false);
        }}
      />

      <SearchStock
        searchBottomRef={searchBottomRef}
        setSelectedStock={setSelectedStock}
      />
      <MovementSheet
        movementBottomRef={movementBottomRef}
        setMovement={setMovement}
      />

      <CustomCalSheet datePickerRef={calBottomRef} setDate={setDate} />
    </SafeAreaView>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF0F1",
    padding: 16,
    paddingTop: 20,
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

  box3: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 16,
    marginTop: 16,
  },

  text1: {
    fontSize: scale(24),
    fontFamily: fonts.f700,
    fontWeight: "700",
    color: "#151B26",
    textAlign: "center",
    width: "100%",
    marginTop: 24,
    marginBottom: 4,
  },

  text5: {
    fontSize: scale(15),
    fontFamily: fonts.f400,
    fontWeight: "400",
    color: "#024BAC",
  },

  text2: {
    fontSize: scale(15),
    fontFamily: fonts.f400,
    fontWeight: "400",
    color: "#717272",
    textAlign: "center",
    width: "100%",
  },

  text3: {
    fontFamily: fonts.f600,
    fontSize: scale(15),
    fontWeight: "600",
    color: "#101010",
    marginLeft: 16,
  },

  input: {
    width: "99%",

    padding: 16,
    paddingVertical: 18,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },

  text4: {
    fontFamily: fonts.f400,
    fontSize: scale(15),
    fontWeight: "400",
    color: "#717272",
    marginRight: 40,
    textAlign: "left",
    width: 115,
  },

  box: {
    width: "99%",
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    marginTop: 32,
  },

  boxMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  box2: {
    flexDirection: "row",
    alignItems: "center",
  },
});
