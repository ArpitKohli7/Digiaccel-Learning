import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, Alert } from 'react-native';
import { CustomStatusBar } from '../ customcomponent/CustomStatusBar';
import colors from '../assets/colors';
import { CustomHeader } from '../ customcomponent/CustomHeader';
import fonts from '../assets/fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import images from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import Video, { VideoRef } from 'react-native-video';
import { Slider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

function VideoScreen(props: any): JSX.Element {
    const [isbutton, setIsButton] = useState('Queries');
    const navigation = useNavigation();
    const videoRef = useRef<VideoRef>(null);
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    const [vertValue, setVertValue] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState();
    const [sound, setSound] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toggleFullScreen = () => {
        console.log(isFullScreen);
        if (isFullScreen === false) {
            videoRef.current?.presentFullscreenPlayer();
        } else {
            videoRef.current?.dismissFullscreenPlayer();
        }
        setIsFullScreen(!isFullScreen);
    };
    const onSliderValueChange = (value: number) => {
        setVertValue(value);
        videoRef.current?.seek(value);
    };
    function decimalToTime(number) {
        // Round off to two decimal places
        const roundedNumber = Math.round(number * 100) / 100;

        // Convert to string and replace decimal point with colon
        const formattedNumber = roundedNumber.toString().replace('.', ':');

        return formattedNumber;
    }
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <>
            <CustomStatusBar />
            <CustomHeader />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: '13%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, marginTop: '5%', marginLeft: '5%' }}>
                    <Image resizeMode='contain'
                        style={{ width: responsiveFontSize(1.6), height: responsiveFontSize(1.6) }}
                        source={images.back} />
                    <Text style={{ marginLeft: '15%', fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextSemiBold, color: colors.back }}>Back</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center' }}>
                    <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, marginTop: '5%', marginLeft: '5%' }}>
                        <Text numberOfLines={1} style={{ marginLeft: '0%', fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextSemiBold, color: colors.textPrimary }}>Digital Shopper Journey</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Library");
                        }}
                        style={{ width: '22%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: colors.white, marginTop: '5%', marginLeft: '5%' }}>
                        <Image resizeMode='contain'
                            style={{ width: responsiveFontSize(1.6), height: responsiveFontSize(1.6) }}
                            source={images.left} />
                        <Text style={{ marginLeft: '0%', fontSize: responsiveFontSize(1.3), fontFamily: fonts.JakartaTextSemiBold, color: colors.darlBlueColor }}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Library");
                        }}
                        style={{ width: '13%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, marginTop: '5%', marginLeft: '5%' }}>
                        <Text style={{ marginLeft: '0%', fontSize: responsiveFontSize(1.3), fontFamily: fonts.JakartaTextSemiBold, color: colors.darlBlueColor }}>Next</Text>
                        <Image resizeMode='contain'
                            style={{ width: responsiveFontSize(1.6), height: responsiveFontSize(1.6) }}
                            source={images.right} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={{ flex: 1, backgroundColor: colors.white }}
                    keyboardShouldPersistTaps="always"
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <View style={{ marginTop: '5%', height: responsiveFontSize(30) }}>
                        <Video
                            fullscreen={true}
                            // Can be a URL or a local file.
                            source={images.Video}
                            paused={isPaused}
                            onEnd={() => {
                                videoRef?.current?.seek(0);
                                setIsPaused(true);
                                setTime(0);
                            }}
                            onLoad={(t) => {
                                setDuration(t?.duration);
                                setIsPaused(true);
                            }}
                            onProgress={(t) => {
                                setTime(t?.currentTime);
                            }}
                            // Store reference  
                            ref={videoRef}
                            style={{ width: width, height: responsiveFontSize(25) }}
                        />
                        <View style={{ paddingHorizontal: '1%', alignItems: 'center', width: width, height: 'auto', flexDirection: 'row', marginTop: '2%', }}>
                            <TouchableOpacity onPress={() => {
                                setIsPaused(!isPaused);
                                if (isPaused) {
                                    videoRef?.current?.resume();
                                } else {
                                    videoRef?.current?.pause();
                                }
                            }}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={!isPaused ? images.pause : images.play} style={{ width: '100%', height: '100%' }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                console.log('time is', time);

                                videoRef.current?.seek(time + 10) // Fast forward by 10 seconds
                            }}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={images.time} style={{ width: '100%', height: '100%' }}></Image>
                            </TouchableOpacity>
                            <Text style={{ ...styles.text, marginRight: '2%', width: '6%' }}>
                                {time == undefined ? `0:0` : decimalToTime(time)}
                            </Text>
                            {/*  */}
                            <Slider
                                value={time}
                                onValueChange={onSliderValueChange}
                                maximumValue={30.57}
                                minimumValue={1}
                                step={1}
                                allowTouchTrack
                                maximumTrackTintColor={colors.trackgrey} // Set maximum track color to red
                                minimumTrackTintColor={colors.darlBlueColor} // Set minimum track color to red
                                trackStyle={{ height: '50%', backgroundColor: 'transparent' }} // Optional: additional track styling
                                style={{ width: '40%', height: '17%' }}
                                orientation="horizontal"
                                thumbStyle={{ height: responsiveFontSize(2), width: responsiveFontSize(2), backgroundColor: 'transparent' }}
                                thumbProps={{
                                    children: (
                                        <Image resizeMode='contain'
                                            style={{ width: responsiveFontSize(2), height: responsiveFontSize(2) }}
                                            source={images.thumb}></Image>
                                    ),
                                }}
                            />
                            {/*  */}
                            <Text style={{ ...styles.text, marginLeft: '2%', width: '6%' }}>{duration ? Math.round(duration * 100) / 100 : 0}</Text>
                            <TouchableOpacity onPress={() => {
                            }}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={images.ccIcon} style={{ width: '100%', height: '100%', marginLeft: '5%' }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setSound(!sound);

                                if (sound) {
                                    videoRef?.current?.setVolume(0);
                                } else {
                                    videoRef?.current?.setVolume(1);
                                }
                            }}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={!sound ? images.soundDisable : images.audioIcon} style={{ width: '100%', height: '100%' }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleFullScreen}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={images.fullScreenIcon} style={{ width: '100%', height: '100%' }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                videoRef.current?.pause();
                            }}
                                style={styles.icon}>
                                <Image resizeMode='contain' source={images.settingIcon} style={{ width: '100%', height: '100%' }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ paddingHorizontal: '7%', justifyContent: 'space-between', flexDirection: 'row', width: width, backgroundColor: colors.veryLightBlue, paddingVertical: '5%', marginTop: 0 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }}
                                    source={images.threeLines} />
                                <Text style={styles.mainText}>Content List</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => {
                                    setIsCollapsed(!isCollapsed);
                                }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(1.5), height: responsiveFontSize(1.5) }}
                                        source={images.downArrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*  */}
                        <Collapsible collapsed={isCollapsed} style={{ paddingHorizontal: '7%', width: width, backgroundColor: colors.veryLightBlue, marginTop: 0, paddingBottom: responsiveFontSize(7), marginBottom: 200 }}>
                            <View style={{ paddingTop: '5%', width: width, alignSelf: 'center', paddingHorizontal: '10%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }} source={images.loading}></Image>
                                    <Text style={styles.contentText}>Digital Journeys Explainer</Text>
                                </View>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGreen }}></View>
                            </View>
                            <View style={{ paddingTop: '0%', width: width, alignSelf: 'center', paddingHorizontal: '10%', backgroundColor: colors.white, }}>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGreen }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }} source={images.doneIcon}></Image>
                                    <Text style={{ ...styles.contentText, fontFamily: fonts.JakartaMedium, }}>eCommerce Shopping Missions</Text>
                                </View>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGreen }}></View>
                            </View>
                            <View style={{ paddingTop: '0%', width: width, alignSelf: 'center', paddingHorizontal: '10%' }}>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGrey }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }} source={images.lockIcon}></Image>
                                    <Text style={{ ...styles.contentText, fontFamily: fonts.JakartaMedium, }}>Additional Reading</Text>
                                </View>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGrey }}></View>
                            </View>
                            <View style={{ paddingTop: '0%', width: width, alignSelf: 'center', paddingHorizontal: '10%' }}>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGrey }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }} source={images.lockIcon}></Image>
                                    <Text style={{ ...styles.contentText, fontFamily: fonts.JakartaMedium, }}>Shopping Missions Quiz</Text>
                                </View>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGrey }}></View>
                            </View>
                            <View style={{ paddingTop: '0%', width: width, alignSelf: 'center', paddingHorizontal: '10%' }}>
                                <View style={{ height: responsiveFontSize(2.3), width: 3.5, marginLeft: '3.4%', backgroundColor: colors.contentGrey }}></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image resizeMode='contain' style={{ width: responsiveFontSize(3), height: responsiveFontSize(3) }} source={images.lockIcon}></Image>
                                    <Text style={{ ...styles.contentText, fontFamily: fonts.JakartaMedium, }}>Swiggy Case Study</Text>
                                </View>
                            </View>
                        </Collapsible>
                    </View>
                    {/*  */}
                    <View style={{ backgroundColor: colors.card, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <View style={{ ...styles.wrapper, justifyContent: 'flex-start' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsButton("Queries");
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', width: 'auto', }}>
                                <Image resizeMode='contain' source={images.queries} style={{ marginRight: '8%', width: responsiveFontSize(2.5), height: responsiveFontSize(2.5) }}></Image>
                                <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.9), fontFamily: fonts.JakartaTextSemiBold, color: isbutton === "Queries" ? colors.darlBlueColor : colors.textGrey }}>Queries</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsButton("Notes");
                                }}
                                style={{ marginLeft: '15%', flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', width: 'auto', }}>
                                <Image resizeMode='contain' source={images.notes} style={{ marginRight: '8%', width: responsiveFontSize(2.5), height: responsiveFontSize(2.5) }}></Image>
                                <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.9), fontFamily: fonts.JakartaTextSemiBold, color: isbutton === "Notes" ? colors.darlBlueColor : colors.textGrey }}>Notes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
                            <View style={{ backgroundColor: isbutton === "Queries" ? colors.darlBlueColor : 'transparent', height: 3.5, width: '40%', }}></View>
                            <View style={{ backgroundColor: isbutton === "Notes" ? colors.darlBlueColor : 'transparent', height: 3.5, width: '40%' }}></View>
                        </View>
                        {/*  */}
                        <View style={{ borderWidth: 1, borderColor: colors.borderColor, backgroundColor: colors.white, alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: responsiveFontSize(12), borderRadius: 10, alignSelf: 'center', marginTop: '5%' }}>
                            <TextInput
                                multiline
                                placeholder={`Ask your queries here..\nA mentor will respond to it in 24 Hrs.`}
                                style={styles.textInput}
                                placeholderTextColor={colors.palceholderText}
                            />
                        </View>
                        {/*  */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Library");
                            }}
                            style={{ marginBottom: 25, marginRight: '5%', paddingVertical: '3%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: '3%', height: 'auto', backgroundColor: colors.darlBlueColor, borderRadius: 8, alignSelf: 'flex-end', marginTop: '4%' }}>
                            <Text style={{ fontFamily: fonts.JakartaTextBold, color: colors.white, fontSize: responsiveFontSize(1.6) }}>Submit Query</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: '5%', marginTop: '5%' }}>
                        <Text style={{ color: colors.queryHeading, fontFamily: fonts.JakartaTextBold, fontSize: responsiveFontSize(2) }}>Asked queries</Text>
                    </View>
                    <View style={{ marginBottom: 100, paddingHorizontal: '3%', backgroundColor: colors.card, alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: 'auto', paddingBottom: 30, borderRadius: 10, alignSelf: 'center', marginTop: '5%' }}>
                        <Text
                            style={styles.queryQuestion}
                        >Wanted to initiate discussion on the book which was an optional reading in this module.</Text>
                    </View>
                </ScrollView>
            </View>

        </>
    );
}
const styles = StyleSheet.create({
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

export default VideoScreen;