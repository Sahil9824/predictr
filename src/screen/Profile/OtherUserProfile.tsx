import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../helper';
import PredictionCard from '../../component/PredictionCard';
import { Images } from '../../assets/images';
import { Colors } from '../../constant';
import { useNavigation } from '@react-navigation/native';

const OtherUserProfile = () => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [selectedTab, setSelectedTab] = useState('All'); 

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    }

    const data = [
        { id: '1', index: 0 },
        { id: '2', index: 1 },
        { id: '3', index: 2 },
        { id: '4', index: 3 }
    ];

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.mainHeader}>
                <Pressable onPress={handleBackPress}>
                <Image source={Images.back} style={{ height: 20, width: 20 }} />
                </Pressable>
                <Text style={{ fontSize: scale(16), color: Colors.labelBlack, fontWeight: '600', marginStart: 15 }}>Profile</Text>
            </View>
            <View style={styles.profileHeader}>
                <Image
                    source={Images.avatar17}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Lincoln Philips</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: scale(10) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '700', paddingHorizontal: scale(3), fontSize: scale(14), color: '#505050' }}>88</Text>
                            <Text style={{ fontWeight: '400', fontSize: scale(14) }}> followers</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginStart: 15 }}>
                            <Text style={{ fontWeight: '700', paddingHorizontal: scale(3), fontSize: scale(14), color: '#505050' }}>55</Text>
                            <Text style={{ fontWeight: '400', fontSize: scale(14) }}>following</Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        style={[styles.followButton, isFollowing ? styles.following : styles.follow]}
                        onPress={toggleFollow}
                    >
                        <Text style={isFollowing ? styles.followingText : styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

           {/* Tabs */}
           <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        selectedTab === 'All' && styles.selectedTabItem
                    ]}
                    onPress={() => setSelectedTab('All')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === 'All' && styles.selectedTabText
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        selectedTab === 'Week' && styles.selectedTabItem
                    ]}
                    onPress={() => setSelectedTab('Week')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === 'Week' && styles.selectedTabText
                        ]}
                    >
                        Week
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        selectedTab === 'Month' && styles.selectedTabItem
                    ]}
                    onPress={() => setSelectedTab('Month')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === 'Month' && styles.selectedTabText
                        ]}
                    >
                        Month
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>114</Text>
                    <Text style={styles.statLabel}>Rank</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>23</Text>
                    <Text style={styles.statLabel}>Predictions #</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>43%</Text>
                    <Text style={styles.statLabel}>Accuracy %</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                <Text style={styles.predictionsHeader}>Predictions</Text>
                <Pressable style={{marginEnd: 20}}>
                    <Image
                        source={Images.moreOptions}
                        style={{ height: scale(24), width: scale(24) }}
                    />
                </Pressable>
            </View>

            {/* FlatList for Predictions */}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <PredictionCard index={item.index} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEventThrottle={16}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainHeader: {
        flexDirection: 'row',
        padding: moderateScale(16),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    profileHeader: {
        flexDirection: 'row',
        padding: moderateScale(16),
        alignItems: 'center',
    },
    profileImage: {
        width: scale(110),
        height: scale(110),
        borderRadius: scale(20),
        marginRight: moderateScale(16)
    },
    profileInfo: {
        flex: 1
    },
    profileName: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        color: Colors.labelBlack
    },
    profileStats: {
        color: '#888',
        marginVertical: verticalScale(4)
    },
    followButton: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(12),
        alignItems: 'center'
    },
    follow: {
        backgroundColor: '#024BAC',
    },
    following: {
        backgroundColor: '#ddd'
    },
    followText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(16)
    },
    followingText: {
        color: '#717272',
        fontWeight: 'bold',
        fontSize: moderateScale(16)
    },
     tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scale(15),
        backgroundColor: '#F9F9F9',
        borderRadius: scale(10),
        borderColor: '#ddd',
        borderWidth: 1,
    },
    tabItem: {
        flex: 1,
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        borderRadius: scale(10),
        backgroundColor: '#F9F9F9',
    },
    selectedTabItem: {
        backgroundColor: '#E5E5E5', 
    },
    tabText: {
        fontSize: moderateScale(16),
        color: '#000',
        fontWeight: '400',
    },
    selectedTabText: {
        color: '#000', 
        fontWeight: 'bold',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: verticalScale(16),
       paddingHorizontal: scale(10)
    },
    statItem: {
        alignItems: 'center',
        backgroundColor: "#F6F8F9",
        width: scale(108),
        height: scale(70),
        justifyContent: 'center',
        borderRadius: scale(8)
    },
    statNumber: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: Colors.labelBlack
    },
    statLabel: {
        color: '#888',
        fontSize: moderateScale(12),
        fontWeight: '400'
        
    },
    predictionsHeader: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(16),
        paddingTop: verticalScale(14),
        paddingBottom: verticalScale(10),
        color: Colors.labelBlack
    },
    cardContainer: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(8)
    },
    card: {
        padding: moderateScale(16),
        borderRadius: moderateScale(8),
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd'
    }
});

export default OtherUserProfile;
