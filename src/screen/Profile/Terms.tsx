import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { SCREENS } from "../../constant/navigation.constants";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { fonts } from "../../constant";
import { scale } from "../../../helper";

// Terms and Conditions Component
const TermsAndConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(SCREENS.MENU)}
        >
          <Icons type={ICONS.BACKARR} />
        </TouchableWithoutFeedback>
        <Text style={styles.menuText}>Terms & Conditions</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.text}>
          Welcome to StockAlgos Inc.! By accessing, browsing, or using any part
          of the services provided by stockalgos.com ("the Site"), you
          acknowledge that you have read, understood, and agree to be bound by
          these Terms of Service ("Terms"). These Terms constitute a legally
          binding agreement between you and StockAlgos Inc., governing your
          access to and use of the Site, including any content, functionality,
          and services offered on or through the Site, whether as a guest or a
          registered user. If you do not agree with these Terms, you must
          discontinue using the Site immediately.
        </Text>
        <Text style={styles.text}>
          You must be of legal age, as determined by the laws of your
          jurisdiction, to form a binding contract to use the Site. By accessing
          the Site, you also agree that the laws of the Province of Ontario,
          Canada, without regard to conflict of law principles, shall govern
          these Terms and any dispute that may arise.
        </Text>
        <Text style={styles.title}>Services Provided</Text>
        <Text style={styles.text}>
          stockalgos.com provides financial datasets that users can interact
          with, including but not limited to, data on Congressional trades,
          market data, and other financial information. The Site also offers a
          leaderboard section where users can place predictions on the stock
          market, get ranked based on their performance, and win prizes. The
          services provided by stockalgos.com are strictly for informational and
          educational purposes and are not intended as, and should not be
          construed as, professional financial advice.
        </Text>
        <Text style={styles.text}>
          Users should not rely on the data or information provided on the Site
          for making investment decisions without seeking advice from qualified
          financial professionals. StockAlgos Inc. disclaims any responsibility
          for investment decisions made based on the content available on the
          Site.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  title: {
    fontSize: scale(17),
    fontFamily: fonts.f700,
    fontWeight: "700",
    marginBottom: 8,
    color: "#151B26",
  },

  text: {
    fontSize: scale(15),
    fontFamily: fonts.f400,
    fontWeight: "400",
    marginBottom: 16,
    color: "#505050",
  },
});
