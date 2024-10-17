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
const Privacy = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.MENU)}
          >
            <Icons type={ICONS.BACKARR} />
          </TouchableWithoutFeedback>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <Text style={styles.title}>Privacy Policy for StockAlgos Inc.</Text>
          <Text style={styles.text}>
            At StockAlgos Inc. ("Company", "we", "us", or "our"), accessible
            from https://stockalgos.com/ ("Website"), we are committed to
            safeguarding the privacy of our visitors and users ("you" or
            "your"). This Privacy Policy outlines the types of personal
            information we collect, how we use it, and the measures we take to
            protect it.
          </Text>
          <Text style={styles.text}>
            If you have any questions or require further information regarding
            our Privacy Policy, please do not hesitate to contact us at
            admin@stockalgos.com.
          </Text>
          <Text style={styles.text}>
            This Privacy Policy applies solely to the information collected
            through our Website and does not govern any data collection
            occurring offline or through other channels.
          </Text>
          <Text style={styles.title}>Consent</Text>
          <Text style={styles.text}>
            By accessing or using our Website, you hereby consent to this
            Privacy Policy and agree to its terms. If you do not agree with this
            Privacy Policy, please do not use our Website.
          </Text>
          <Text style={styles.title}>Information We Collect</Text>

          <Text style={styles.text}>
            We collect several types of information from and about users of our
            Website, including: Personal Data: Information may include things
            such as your name, email address, phone number, company name, and
            any other information you voluntarily provide when contacting us or
            registering for an account. Usage Data: Information about how you
            interact with our Website, including IP address, browser type,
            Internet Service Provider (ISP), referring/exit pages, date and time
            stamps, and clickstream data. Cookies and Tracking Technologies: We
            use cookies and similar tracking technologies to enhance your
            experience on our Website and to collect information about your
            browsing behavior. The specific reasons for requesting your
            information will be made clear at the time of collection.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Privacy;
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
    fontSize: 15,
    fontFamily: fonts.f400,
    fontWeight: "400",
    marginBottom: 16,
    color: "#505050",
  },
});
