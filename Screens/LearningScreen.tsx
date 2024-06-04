import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, Alert } from 'react-native';
import { CustomStatusBar } from '../ customcomponent/CustomStatusBar';
import colors from '../assets/colors';
import { CustomHeader } from '../ customcomponent/CustomHeader';
import fonts from '../assets/fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import images from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import { Slider } from 'react-native-elements';

function LearningScreen(props: any): JSX.Element {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("VideoScreen");
                }}
                style={{ ...styles.renderView1, width: width * .8, }}>
                <View style={{ marginLeft: '3%', borderRadius: 8 }}>
                    <Image style={styles.imgRender1L} resizeMode="contain" source={item.img}></Image>
                </View>
                <View style={{ marginLeft: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={styles.textRender1}>{item.title}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.textRenderView1}>{item.subHeading}</Text>
                    <View pointerEvents="none">
                        <Slider
                            value={90}
                            onValueChange={() => { }}
                            maximumValue={100}
                            minimumValue={1}
                            step={5}
                            maximumTrackTintColor={colors.grey} // Set maximum track color to red
                            minimumTrackTintColor={colors.darlBlueColor} // Set minimum track color to red
                            trackStyle={{ borderRadius: 20, height: '50%', backgroundColor: 'transparent' }} // Optional: additional track styling
                            style={styles.sliderView1}
                            orientation="horizontal"
                            thumbStyle={{ height: 0, width: 0, backgroundColor: 'transparent' }}
                            thumbProps={{ children: null }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={styles.textView1}>{item.text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const renderItemRecent = ({ item, index }) => {
        return (
            <View style={{ ...styles.renderView2, width: width * .72, }}>
                <View style={{ marginLeft: '3%', borderRadius: 8 }}>
                    <Image style={styles.renderRecentImg} resizeMode="cover" source={item.img}></Image>
                </View>
                <View style={{ marginLeft: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={styles.renderRecentText}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '2%', marginBottom: '8%', }}>
                        <Text numberOfLines={1} style={styles.renderRecentText1}>{item.subHeading}</Text>
                        <Image style={styles.renderRecentImg1} resizeMode='contain' source={item.selectedIcon}></Image>
                    </View>
                </View>
            </View>
        )
    }
    const renderItemUpcoming = ({ item, index }) => {
        return (
            <View style={{ ...styles.renderUpView, opacity: index == 0 ? 1 : 0.5, width: width * .9 }}>
                <View style={{ marginLeft: '3%', borderRadius: 8 }}>
                    <Image style={styles.renderUpImg} resizeMode="cover" source={item.img}></Image>
                </View>
                <View style={{ marginLeft: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={styles.renderUpText}>{item.title}</Text>
                    </View>
                    {index == 0 ? (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '2%', marginBottom: '8%', }}>
                                <Text numberOfLines={1} style={styles.renderUpText1}>{item.subHeading}</Text>
                                <Image style={styles.renderUpIndexImg} resizeMode='contain' source={item.selectedIcon}></Image>
                            </View>
                            <View pointerEvents="none">
                                <Slider
                                    value={7}
                                    onValueChange={() => { }}
                                    maximumValue={100}
                                    minimumValue={1}
                                    step={5}
                                    maximumTrackTintColor={colors.grey} // Set maximum track color to red
                                    minimumTrackTintColor={colors.darlBlueColor} // Set minimum track color to red
                                    trackStyle={{ borderRadius: 20, height: '50%', backgroundColor: 'transparent' }} // Optional: additional track styling
                                    style={{ width: '70%', height: responsiveFontSize(2) }}
                                    orientation="horizontal"
                                    thumbStyle={{ height: 0, width: 0, backgroundColor: 'transparent' }}
                                    thumbProps={{ children: null }}
                                />
                            </View>
                        </>
                    ) : (
                        <View style={{ flexDirection: 'row', backgroundColor: colors.card, alignItems: 'center', marginBottom: '5%' }}>
                            <TouchableOpacity
                                disabled
                                onPress={() => navigation.goBack()}
                                style={{ width: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.grey, marginTop: '5%', marginLeft: '5%', paddingVertical: '1.8%', borderRadius: 9, paddingHorizontal: '2.5%' }}>
                                <Image style={{ width: responsiveFontSize(2), height: responsiveFontSize(2), marginRight: 6 }} resizeMode='contain' source={images.locked}></Image>
                                <Text style={styles.renderUpTextNew}>Locked</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    const arr = [
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 Learning hours left',
            text: '90%',
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 Learning hours left',
            text: '90%',
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 Learning hours left',
            text: '90%',
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 Learning hours left',
            text: '90%',
        }
    ];
    const arrRecent = [
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 hours Completed',
            text: '90%',
            selectedIcon: images.tickBox
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 hours Completed',
            text: '90%',
            selectedIcon: images.tickBox
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 hours Completed',
            text: '90%',
            selectedIcon: images.tickBox
        },
        {
            img: images.learning,
            title: 'Digital Shopper Journey',
            subHeading: '4 hours Completed',
            text: '90%',
            selectedIcon: images.tickBox
        }
    ];

    const navigation = useNavigation();
    const width = Dimensions.get("screen").width;

    return (
        <>
            <CustomStatusBar />
            <CustomHeader />
            <ScrollView
                style={{ flex: 1, backgroundColor: colors.white }}
                keyboardShouldPersistTaps="always"
                automaticallyAdjustKeyboardInsets={true}
            >
                <View style={{ flex: 1, backgroundColor: colors.card }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%', marginLeft: '5%' }}>
                        <Image resizeMode='contain'
                            style={{ width: responsiveFontSize(1.6), height: responsiveFontSize(1.6) }}
                            source={images.back} />
                        <Text style={{ marginLeft: '3%', fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextSemiBold, color: colors.back }}>Back to Dashboard</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', backgroundColor: colors.card, alignItems: 'center', marginBottom: '5%' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightBlueColor, marginTop: '5%', marginLeft: '5%', paddingVertical: '1.8%', borderRadius: 9, paddingHorizontal: '2.5%' }}>
                            <Text style={{ marginLeft: '0%', fontSize: responsiveFontSize(1.3), fontFamily: fonts.JakartaTextSemiBold, color: colors.darlBlueColor }}>In Progress</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={arr}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                    <View>
                        <Text style={{ marginLeft: '5%', marginBottom: '4%', marginTop: '6%', fontFamily: fonts.JakartaTextBold, color: colors.contentText, fontSize: responsiveFontSize(1.9) }}>Recently Completed</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={arrRecent}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItemRecent}
                        />
                    </View>
                    {/*  */}
                    <View style={{ backgroundColor: colors.white, paddingBottom: 50 }}>
                        <Text style={{ marginLeft: '5%', marginBottom: '4%', marginTop: '2%', fontFamily: fonts.JakartaTextBold, color: colors.contentText, fontSize: responsiveFontSize(1.9) }}>Upcoming Modules</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={arr}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItemUpcoming}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    renderUpTextNew: {
        marginLeft: '0%', fontSize: responsiveFontSize(1.3), fontFamily: fonts.JakartaTextSemiBold, color: colors.contentText
    },
    renderUpText1: {
        fontSize: responsiveFontSize(1.5), color: colors.darlBlueColor, fontFamily: fonts.NunitoTextSemiBold
    },
    renderUpIndexImg: {
        marginLeft: '2.5%', width: responsiveFontSize(2), height: responsiveFontSize(2)
    },
    renderUpText: {
        fontSize: responsiveFontSize(1.8), fontFamily: fonts.JakartaTextBold, color: colors.contentText, width: '80%'
    },
    renderUpImg: {
        width: responsiveFontSize(8), height: responsiveFontSize(8), borderRadius: 8, marginLeft: '5%'
    },
    renderUpView: {
        shadowColor: '#000',
        marginBottom: 10,
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5, paddingVertical: 11, flexDirection: 'row', borderRadius: 9, alignSelf: 'center', height: 'auto', backgroundColor: colors.recentBg,
    },
    renderRecentImg1: {
        marginLeft: '2.5%', width: responsiveFontSize(2), height: responsiveFontSize(2)
    },
    renderRecentText1: {
        fontSize: responsiveFontSize(1.5), color: colors.darlBlueColor, fontFamily: fonts.NunitoTextSemiBold
    },
    renderRecentText: {
        fontSize: responsiveFontSize(1.8), fontFamily: fonts.JakartaTextBold, color: colors.contentText, width: '80%'
    },
    renderRecentImg: {
        width: responsiveFontSize(8), height: responsiveFontSize(8), borderRadius: 8, marginLeft: '5%'
    },
    renderView2: {
        shadowColor: '#000',
        marginBottom: 10,
        shadowOffset: { width: 0, height: .3 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, paddingVertical: 11, flexDirection: 'row', borderRadius: 9, alignSelf: 'center', height: 'auto', backgroundColor: colors.recentBg, marginLeft: 10
    },
    textView1: {
        fontSize: responsiveFontSize(1.8), fontFamily: fonts.NunitoBold, color: colors.header, width: '80%'
    },
    sliderView1: {
        width: '70%', height: responsiveFontSize(2)
    },
    textRenderView1: {
        marginTop: '2%', marginBottom: '8%', fontSize: responsiveFontSize(1.5), color: colors.darlBlueColor, fontFamily: fonts.NunitoTextSemiBold
    },
    textRender1: {
        fontSize: responsiveFontSize(2.4), fontFamily: fonts.JakartaTextBold, color: colors.contentText, width: '80%'
    },
    imgRender1L: {
        width: responsiveFontSize(12), height: responsiveFontSize(15), borderRadius: 8
    },
    renderView1: {
        shadowColor: '#000',
        marginBottom: 10,
        shadowOffset: { width: 0, height: .3 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, paddingVertical: 15, flexDirection: 'row', borderRadius: 9, alignSelf: 'center', height: 'auto', backgroundColor: colors.white, marginLeft: 10
    },
    queryQuestion: {
        fontFamily: fonts.NunitoMedium,
        fontSize: responsiveFontSize(1.8),
        color: colors.asked,
        marginTop: '5%',
    },
    textInput: {
        width: '90%',
        marginLeft: '2%',
        marginTop: '2%',
        height: '80%',
        color: colors.textPrimary,
        fontFamily: fonts.NunitoMedium,
        fontSize: responsiveFontSize(1.8),
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // Ensure placeholder starts at the top
    },
    mainText: {
        color: colors.darlBlueColor,
        fontSize: responsiveFontSize(1.8),
        fontFamily: fonts.JakartaTextBold,
        marginLeft: '8%'
    },
    text: {
        color: '#5B5757',
        fontSize: responsiveFontSize(1),
        fontFamily: fonts.LatoRegular,
        marginLeft: '2.5%'
    },
    icon: {
        width: responsiveFontSize(2),
        height: responsiveFontSize(2),
        marginLeft: '2.5%'
    },
    wrapper: {
        marginTop: '10%',
        paddingHorizontal: '8%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    contentText: {
        fontFamily: fonts.JakartaTextBold,
        fontSize: responsiveFontSize(1.8),
        color: colors.contentText,
        marginLeft: '4%'
    }
});

export default LearningScreen;
