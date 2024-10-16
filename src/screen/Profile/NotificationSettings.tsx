import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { fonts } from "../../constant";
import { ICONS } from "../../constant/icons.constants";
import Icons from "../../component/Icons";

// Notification Settings Component
const NotificationSettings = ({ navigation }) => {
  const [newsletterEmails, setNewsletterEmails] = useState(false);
  const [likeNotification, setLikeNotification] = useState(true);
  const [commentNotification, setCommentNotification] = useState(true);
  const [followNotification, setFollowNotification] = useState(true);
  const [profileViewNotification, setProfileViewNotification] = useState(true);
  const [predictionNotification, setPredictionNotification] = useState(true);
  const [newPostNotification, setNewPostNotification] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icons type={ICONS.BACKARR} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Notification Settings</Text>
      </View>
      <ScrollView>
        {/* Newsletter Emails Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Newsletter Emails</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Receive Newsletter Emails</Text>
            <Switch
              value={newsletterEmails}
              onValueChange={setNewsletterEmails}
            />
          </View>
        </View>

        {/* Activity Emails Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Emails</Text>

          {/* When you receive a like */}
          <View style={styles.row}>
            <Text style={styles.label}>When you receive a like</Text>
            <Switch
              value={likeNotification}
              onValueChange={setLikeNotification}
            />
          </View>

          {/* When someone comments */}
          <View style={styles.row}>
            <Text style={styles.label}>When someone comments</Text>
            <Switch
              value={commentNotification}
              onValueChange={setCommentNotification}
            />
          </View>

          {/* When someone follows you */}
          <View style={styles.row}>
            <Text style={styles.label}>When someone follows you</Text>
            <Switch
              value={followNotification}
              onValueChange={setFollowNotification}
            />
          </View>

          {/* When someone views your profile */}
          <View style={styles.row}>
            <Text style={styles.label}>When someone views your profile</Text>
            <Switch
              value={profileViewNotification}
              onValueChange={setProfileViewNotification}
            />
          </View>

          {/* When your prediction result is in */}
          <View style={styles.row}>
            <Text style={styles.label}>When your prediction result is in</Text>
            <Switch
              value={predictionNotification}
              onValueChange={setPredictionNotification}
            />
          </View>

          {/* When someone you follow makes a new post */}
          <View style={styles.row}>
            <Text style={styles.label}>
              When someone you follow makes a new post
            </Text>
            <Switch
              value={newPostNotification}
              onValueChange={setNewPostNotification}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationSettings;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F9",
  },

  headerText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: 16,
    color: "#101010",
  },

  header: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderBottomColor: "#0000001A",
  },

  sectionTitle: {
    fontFamily: fonts.f400,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginTop: 16,
    color: "#717272",
    marginLeft: 16,
  },
  row: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#0000001A",
    borderBottomColor: "#0000001A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 15,
    fontFamily: fonts.f500,
    color: "#000",
    width: "80%",
  },
});
