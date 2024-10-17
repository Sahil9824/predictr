import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { fonts } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQScreen = ({ navigation }) => {
  const [activeSections, setActiveSections] = useState([]);

  const faqItems = [
    {
      question: "What is StockAlgos?",
      answer: "StockAlgos is a platform for...",
    },
    { question: "How do you use the algos?", answer: "To use StockAlgos..." },
    {
      question: "How much money will I make?",
      answer: "The amount of money depends on...",
    },
    {
      question: "How does StockAlgos make money?",
      answer: "We make money by...",
    },
    {
      question: "What is the best stock?",
      answer: "The best stock depends on...",
    },
    // Add more questions and answers here as needed
  ];

  const toggleSection = (index) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(index)
        ? prevActiveSections.filter((i) => i !== index)
        : [...prevActiveSections, index]
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icons type={ICONS.BACKARR} />
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>FAQ's</Text>
        </View>
        <ScrollView>
          {faqItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleSection(index)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  {!activeSections.includes(index) ? (
                    <Icons type={ICONS.DOWN_ARROW} />
                  ) : (
                    <View style={{ transform: [{ rotate: "180deg" }] }}>
                      <Icons type={ICONS.DOWN_ARROW} />
                    </View>
                  )}
                </View>

                <Collapsible collapsed={!activeSections.includes(index)}>
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                </Collapsible>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontFamily: fonts.f600,
    paddingLeft: 16,
    color: "#101010",
    fontWeight: "600",
  },
  faqItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  questionText: {
    fontSize: 15,
    fontFamily: fonts.f500,
    fontWeight: "500",
    color: "black",
  },
  answerContainer: {
    // paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: "white",
  },
  answerText: {
    fontSize: 14,
    fontFamily: fonts.f500,
    fontWeight: "500",
    color: "#717272",
  },
});

export default FAQScreen;
