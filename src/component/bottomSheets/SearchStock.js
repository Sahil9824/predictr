import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Images } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { scale } from "../../../helper";
import { TouchableOpacity } from "react-native";
import { fonts } from "../../constant";
import Icons from "../Icons";
import { ICONS } from "../../constant/icons.constants";

const stocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. (Class A)",
  },
  {
    symbol: "GOOG",
    name: "Alphabet Inc. (Class C)",
  },
  {
    symbol: "FB",
    name: "Meta Platforms, Inc.",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
  },
  {
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc. (Class A)",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
  },
  {
    symbol: "PG",
    name: "Procter & Gamble Company",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Company",
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. (Class A)",
  },
  {
    symbol: "GOOG",
    name: "Alphabet Inc. (Class C)",
  },
  {
    symbol: "FB",
    name: "Meta Platforms, Inc.",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
  },
  {
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc. (Class A)",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
  },
  {
    symbol: "PG",
    name: "Procter & Gamble Company",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Company",
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
  },
];

const ListItems = ({ nameAb, name, setSelectedStock, searchBottomRef }) => {
  const handlePress = () => {
    setSelectedStock({ symbol: nameAb, name });
    searchBottomRef.current.dismiss();
  };
  return (
    <TouchableOpacity style={styles.listBox} onPress={handlePress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.stockAb}>{nameAb}</Text>
        <Text style={styles.stockName} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Icons type={ICONS.RIGHTARR} />
    </TouchableOpacity>
  );
};

const SearchStock = ({ searchBottomRef, setSelectedStock }) => {
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [query, setQuery] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [modalVal, setModalVal] = useState("");

  console.log(modalVal, "woww");

  const handleSavePress = () => {
    searchBottomRef.current.dismiss();
    setSelectedStock({ symbol: modalVal, name: "" });
    setModalVal("");
    setIsModal(false);
  };

  const handleAddPopUp = () => {
    // searchBottomRef.current.dismiss();
    setIsModal(true);
  };

  const handleSearch = (text) => {
    setQuery(text);

    // Filter stocks based on symbol or name
    const filtered = stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(text.toLowerCase()) ||
        stock.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredStocks(filtered);
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const navigation = useNavigation();

  return (
    <>
      <BottomSheetModal
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
        ref={searchBottomRef}
        index={0}
        enablePanDownToClose
        snapPoints={["92%"]}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.searchContainer}>
          <View style={styles.header}>
            <Text style={styles.headText}>Select Stock</Text>
            <TouchableOpacity onPress={() => searchBottomRef.current.dismiss()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBoxContainer}>
            <Image
              source={Images.headerSearch}
              style={{ height: scale(18), width: scale(18), marginLeft: 10 }}
            />
            <TextInput
              style={styles.searchBox}
              placeholder=""
              onChangeText={handleSearch}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            {filteredStocks.map((item, index) => (
              <ListItems
                key={index}
                name={item.name}
                nameAb={item.symbol}
                setSelectedStock={setSelectedStock}
                searchBottomRef={searchBottomRef}
              />
            ))}

            <View style={styles.listBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.stockAb} />
                <Text style={styles.stockName} numberOfLines={1}>
                  Don't see your stock?
                </Text>
              </View>
              <TouchableOpacity onPress={handleAddPopUp}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </BottomSheetModal>
      <Modal
        visible={isModal}
        animationType="fade"
        transparent={true}
        style={{ backgroundColor: "red" }}
        presentationStyle="overFullScreen"
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={() => setIsModal(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modText}>Add Stock Symbol</Text>
            <Text style={styles.modText2}>
              We will fetch the stock data based on the symbol you enter.
            </Text>
            <TextInput
              value={modalVal}
              onChangeText={(text) => setModalVal(text)}
              style={styles.modalInput}
              placeholder="Enter symbol"
            />

            <View style={styles.modBot}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => setIsModal(false)}
              >
                <Text style={styles.canText}>Cancle</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: "100%",
                  width: 1,
                  backgroundColor: "#0000001A",
                }}
              />
              <TouchableOpacity style={styles.box} onPress={handleSavePress}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default SearchStock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scrollview: {
    paddingVertical: 12,
    paddingBottom: 25,
  },

  modalBox: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  modalInput: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0000001A",
  },

  box: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  listBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001A",
  },

  stockName: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(15),
    color: "#717272",
    width: "60%",
  },

  modBot: {
    display: "flex",
    borderTopWidth: 1,
    borderTopColor: "#0000001A",
    flexDirection: "row",
  },

  modText: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(17),
    color: "#000",
  },

  canText: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(17),
    color: "#024BAC",
  },

  saveText: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(17),
    color: "#024BAC",
  },

  modText2: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(13),
    color: "#717272",
    marginTop: 4,
    width: "80%",
    textAlign: "center",
  },

  stockAb: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: scale(16),
    color: "#000",
    width: 100,
  },

  searchContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  headText: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(17),
    color: "#000",
  },

  addText: {
    fontFamily: fonts.f800,
    fontWeight: "800",
    fontSize: scale(15),
    color: "#024BAC",
  },

  searchBoxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 2,
    marginTop: 12,
  },
  searchBox: {
    width: "85%",
    backgroundColor: "red",
    fontFamily: fonts.f500,
    fontWeight: "500",
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "black",
  },
  cancelButton: {
    color: "#717272",
    paddingLeft: 10,
    fontSize: 16,
  },
});
