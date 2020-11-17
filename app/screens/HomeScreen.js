import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import VerticalCategories from '@app/components/customFlatlist';
import FastImage from 'react-native-fast-image'
import R from '@app/assets/R';
import RNHeader from '@app/components/WHeader';

const { width, height } = Dimensions.get('window');
const scale = width / 414;

const data = [
    {
        id: 1,
        image: R.images.img_sale
    },
    {
        id: 2,
        image: R.images.img_interest
    },
    {
        id: 3,
        image: R.images.img_about_me
    },
    {
        id: 4,
        image: R.images.img_play_tutorial
    },
    {
        id: 5,
        image: R.images.img_zalo_support
    },
    {
        id: 6,
        image: R.images.img_exchange_investor
    },

]

export default class HomeScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <RNHeader
                    titleHeader='KUBET BLOCKCHAIN'
                />
                <FastImage
                    resizeMode='contain'
                    style={{ height: 220 * scale, marginVertical: 20 * scale }}
                    source={R.images.img_banner} />
                <VerticalCategories
                    data={data}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.itemView}>
                                <FastImage
                                    resizeMode='contain'
                                    style={{ height: 200 * scale, marginBottom: 20 * scale }}
                                    source={item.image} />
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    itemView: {
        width: width / 2,
        borderRadius: 10 * scale
    }
})
