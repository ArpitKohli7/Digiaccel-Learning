import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native';
import { CustomStatusBar } from '../ customcomponent/CustomStatusBar';
import colors from '../assets/colors';
import { CustomHeader } from '../ customcomponent/CustomHeader';
import fonts from '../assets/fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import images from '../assets/images';

function Library(props: any): JSX.Element {
    const [selected, setSelected] = useState('KeyResources');
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ paddingVertical: '5%', flexDirection: 'row', borderRadius: 9, width: '90%', alignSelf: 'center', height: 'auto', backgroundColor: colors.white, marginBottom: 20 }}>
                <View style={{ marginLeft: '3%' }}>
                    <Image style={{ width: responsiveFontSize(4.5), height: responsiveFontSize(4.5) }} resizeMode='contain' source={item.img}></Image>
                </View>
                <View style={{ marginLeft: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.8), fontFamily: fonts.JakartaTextBold }}>{item.title}</Text>
                        <Image style={{ marginLeft: '3%', width: responsiveFontSize(3), height: responsiveFontSize(3) }} resizeMode='contain' source={item.selectedIcon}></Image>
                    </View>
                    <Text numberOfLines={1} style={{ marginTop: '2%', marginBottom: '8%', fontSize: responsiveFontSize(1.6), color: colors.lightgrey, fontFamily: fonts.NunitoTextSemiBold }}>{item.subHeading}</Text>
                    <TouchableOpacity onPress={() => {
                    }} style={{ borderWidth: item.text === "Download" ? 1 : 0, borderColor: item.text === "Download" ? colors.darlBlueColor : 'blue', width: '50%', backgroundColor: item.text === "Download" ? colors.white : colors.darlBlueColor, padding: '3%', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                        <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextBold, color: item.text === "Download" ? colors.darlBlueColor : colors.white }}>{item.text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const renderItem2 = ({ item, index }) => {
        return (
            <>
                <View style={{ paddingVertical: '5%', borderRadius: 9, width: '90%', alignSelf: 'center', height: 'auto', backgroundColor: colors.white, marginBottom: 20 }}>
                    <Text numberOfLines={1} style={{ marginLeft: '5%', marginBottom: '5%', fontSize: responsiveFontSize(1.8), fontFamily: fonts.JakartaTextBold }}>{item.topicName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: '3%' }}>
                            <Image style={{ width: responsiveFontSize(4.5), height: responsiveFontSize(4.5) }} resizeMode='contain' source={item.img}></Image>
                        </View>
                        <View style={{ marginLeft: '3%', backgroundColor: colors.white, width: '80%', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', }}>
                                <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.8), fontFamily: fonts.JakartaTextBold }}>{item.title}</Text>
                                <Image style={{ marginLeft: '3%', width: responsiveFontSize(3), height: responsiveFontSize(3) }} resizeMode='contain' source={item.selectedIcon}></Image>
                            </View>
                        </View>
                    </View>
                    {/*  */}
                    <View style={{ backgroundColor: colors.white }}>
                        <View style={{ backgroundColor: colors.white, alignItems: 'center' }}>
                            <Text style={{ width: '95%', backgroundColor: colors.white, marginTop: '2%', marginBottom: '8%', fontSize: responsiveFontSize(1.6), color: colors.lightgrey, fontFamily: fonts.NunitoTextSemiBold }}>{item.data}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => {
                            }} style={{ padding: '3%', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                                <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextBold, color: colors.lightgrey }}>{item.date}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    const arr = [
        {
            img: images.data1,
            title: 'Additional Reading Material',
            subHeading: 'Module 2 - Digital Shopper Journey',
            text: 'View',
            selectedIcon: images.tickBox
        },
        {
            img: images.data2,
            title: 'Swiggy case study',
            subHeading: 'Module 2 - Digital Shopper Journey',
            text: 'View',
            selectedIcon: images.tickBox
        },
        {
            img: images.data3,
            title: 'Working  file for selection simulation',
            subHeading: 'Module 2 - Digital Shopper Journey',
            text: 'Download',
            selectedIcon: images.tickBox
        },
        {
            img: images.data1,
            title: 'Additional Reading Material',
            subHeading: 'Module 2 - Digital Shopper Journey',
            text: 'View',
            selectedIcon: images.tickBox
        }
    ];
    const arr2 = [
        {
            topicName: 'Topic Name',
            img: images.saveData1,
            title: 'Shopping Missions (01:30)',
            data: 'In publishing and graphic digital, Lorem ipsum is a placeholder text commonly used to demonstrate the Lorem ipsum is a placeholder.',
            date: '12 Sept, 23',
            selectedIcon: images.Pencil
        },
        {
            topicName: 'Topic Name',
            img: images.saveData2,
            title: 'Shopping Missions (01:30)',
            data: 'In publishing and graphic digital, Lorem ipsum is a placeholder text commonly used to demonstrate the Lorem ipsum is a placeholder.',
            date: '12 Sept, 23',
            selectedIcon: images.Pencil
        },
        {
            topicName: 'Topic Name',
            img: images.data1,
            title: 'Shopping Missions (01:30)',
            data: 'In publishing and graphic digital, Lorem ipsum is a placeholder text commonly used to demonstrate the Lorem ipsum is a placeholder.',
            date: '12 Sept, 23',
            selectedIcon: images.Pencil
        },
    ];
    const data = [
        { key: '1', title: 'All Modules' },
        { key: '2', title: 'Module: 1' },
        { key: '3', title: 'Module: 2' },
        { key: '4', title: 'Module: 3' }
    ];
    const renderItemModules = ({ item }) => (
        <View style={{
            borderWidth: item.title === 'All Modules' ? 0 : 1,
            borderColor: colors.grey,
            backgroundColor: item.title === 'All Modules' ? colors.lightBlue : colors.white,
            paddingVertical: '3%',
            paddingHorizontal: '0.7%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6
        }}>
            <TouchableOpacity
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: responsiveFontSize(1.6),
                        fontFamily: fonts.JakartaTextSemiBold,
                        color: item.title === 'All Modules' ? colors.darlBlueColor : colors.textPrimary
                    }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <>
            <CustomStatusBar />
            <CustomHeader />
            <View style={{ flex: 1, }}>
                <ScrollView
                    style={{ flex: 1, backgroundColor: colors.white }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="always"
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <View style={styles.wrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected("KeyResources");
                            }}
                            style={{ paddingVertical: '3%', width: 'auto', }}>
                            <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.9), fontFamily: fonts.JakartaTextSemiBold, color: selected === "KeyResources" ? colors.darlBlueColor : colors.textGrey }}>Key Resources</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected("SavedNotes");
                            }}
                            style={{ paddingVertical: '3%', width: 'auto', }}>
                            <Text numberOfLines={1} style={{ fontSize: responsiveFontSize(1.9), fontFamily: fonts.JakartaTextSemiBold, color: selected === "SavedNotes" ? colors.darlBlueColor : colors.textGrey }}>Saved Notes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignSelf: 'flex-start', backgroundColor: selected === "KeyResources" ? colors.darlBlueColor : 'transparent', height: 3.5, width: '50%' }}></View>
                        <View style={{ alignSelf: 'flex-end', backgroundColor: selected === "SavedNotes" ? colors.darlBlueColor : 'transparent', height: 3.5, width: '50%' }}></View>
                    </View>
                    <View style={{ marginTop: '7%', paddingHorizontal: '5%', alignSelf: 'center', alignItems: 'center', borderRadius: 6, borderWidth: 1, borderColor: colors.grey, flexDirection: 'row', width: '90%', height: responsiveFontSize(6) }}>
                        <Image resizeMode='contain'
                            style={{ width: responsiveFontSize(2.5), height: responsiveFontSize(2.5) }}
                            source={images.searchIcon}></Image>
                        <TextInput
                            placeholder='Search'
                            style={{ width: '85%', marginLeft: '5%', fontFamily: fonts.NunitoMedium, fontSize: responsiveFontSize(2) }}
                        ></TextInput>
                    </View>
                    <View style={{ width: Dimensions.get('screen').width, margin: 0, padding: 0 }}>
                        {selected === "SavedNotes" ? (
                            <>
                                <FlatList
                                    data={data}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ marginTop: '8%', marginLeft: '5%', width: Dimensions.get('screen').width  * 2, }}
                                    renderItem={renderItemModules}
                                    keyExtractor={item => item.key}
                                />
                                <Text numberOfLines={1} style={{ marginTop: '5%', marginLeft: '5%', fontSize: responsiveFontSize(1.6), fontFamily: fonts.JakartaTextBold, color: colors.darlBlueColor }}>Module 2 : Introduction to Digital Journeys</Text>
                            </>
                        ) : (null)}
                    </View>
                    <View style={{ marginTop: 18, flex: 1, backgroundColor: colors.card, paddingTop: 25 }}>
                        {selected === "KeyResources" ? (
                            <FlatList
                                data={arr}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                            />) : (
                            <FlatList
                                data={arr2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem2}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>

        </>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        marginTop: '10%',
        paddingHorizontal: '8%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default Library;