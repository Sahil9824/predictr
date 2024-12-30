import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
// For emojis
import { Images } from "../../assets/images";
import { scale } from "../../../helper";
import { fonts } from "../../constant";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import Button from "../../component/Button";
import { SCREENS } from "../../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Feedback Component
const GiveFeedback = ({ navigation }) => {
  const [isModal, setIsModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = [
    { label: "Very bad", emoji: Images.Ebad, id: 1 },
    { label: "Poor", emoji: Images.Epoor, id: 2 },
    { label: "Average", emoji: Images.Eavg, id: 3 },
    { label: "Good", emoji: Images.Egood, id: 4 },
    { label: "Excellent", emoji: Images.Eexelent, id: 5 },
  ];

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white" }}
        edges={["top", "left", "right"]}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icons type={ICONS.BACKARR} />
              </TouchableWithoutFeedback>
              <Text style={styles.menuText}>Give Feedback</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Rate Your Experience</Text>
              <Text style={styles.subtitle}>
                How would you like to describe your experience with our App?
              </Text>

              <View style={styles.emojiRow}>
                {ratings.map((rating) => (
                  <TouchableOpacity
                    key={rating.id}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    onPress={() => setSelectedRating(rating.id)}
                  >
                    <View
                      style={[
                        styles.emojiContainer,
                        selectedRating === rating.id && styles.selectedEmoji,
                      ]}
                    >
                      <Image
                        source={rating.emoji}
                        style={{ height: 34, width: 34 }}
                      />
                    </View>
                    <Text
                      style={[
                        styles.emojiLabel,
                        selectedRating === rating.id &&
                          styles.selectedEmojiLabel,
                      ]}
                    >
                      {rating.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Tell us how we can improve..."
                value={feedback}
                onChangeText={setFeedback}
              />

              <Button
                onPress={() => {
                  setIsModal(true);
                }}
                inActive={!feedback || !selectedRating}
                style={styles.submitButton}
                text="Submit Feedback"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      <Modal
        visible={isModal}
        transparent={true}
        style={{ backgroundColor: "red" }}
        presentationStyle="overFullScreen"
        statusBarTranslucent
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 24,
          }}
          onPress={() => setIsModal(false)}
        >
          <View style={styles.modalBox}>
            <Icons type={ICONS.DONE} />

            <Text style={styles.ty}>Thank you for your feedback!</Text>
            <Text style={styles.ty2}>We appreciate your input.</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default GiveFeedback;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    padding: 16,
    flexGrow: 1,
  },

  ty: {
    fontFamily: fonts.f700,
    //fontWeight: "700",
    fontSize: 20,
    color: "#000000",
    marginBottom: 8,
  },

  ty2: {
    fontFamily: fonts.f400,
    //fontWeight: "400",
    fontSize: 14,
    color: "#717272",
  },

  modalBox: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
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
    //fontWeight: "600",
    fontSize: 16,
    color: "#101010",
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.f700,
    fontSize: scale(17),
    //fontWeight: "700",
    marginBottom: 8,
    color: "#151B26",
  },
  subtitle: {
    fontFamily: fonts.f400,
    fontSize: scale(15),
    //fontWeight: "400",
    marginBottom: 24,
    color: "#505050",
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(24),
  },
  emojiContainer: {
    width: 60,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    marginBottom: 4,
  },
  selectedEmoji: {
    borderColor: "#024BAC", // Blue border for active state
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#E9F1FC",
  },
  emojiLabel: {
    fontSize: scale(12),
    fontFamily: fonts.f400,
    color: "#505050",
    //fontWeight: "400",
  },

  selectedEmojiLabel: {
    fontSize: scale(12),
    fontFamily: fonts.f700,
    color: "#024BAC",
    //fontWeight: "700",
  },
  textInput: {
    minHeight: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 14,
    maxHeight: 250,
    fontFamily: fonts.f500,
  },

  submitButton: {
    marginTop: "auto",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.f700,
  },
});
