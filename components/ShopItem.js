// 商品

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/*
    volume: 销量
    like: 赞
 */

export default class ShopItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        let textNode

        if(this.props.data.additions) {
            textNode = (
                <Text style={styles.itemActionTextLong}>选规格</Text>
            )
        }
        else {
            textNode = (
                <Text style={styles.itemActionText}>+</Text>
            )
        }

        return (
            <View style={styles.container}>
                <Image
                    source={{
                        uri: this.props.data.image
                    }}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.itemTitle}>{this.props.data.title}</Text>
                    <Text style={styles.itemVolume}>月售{this.props.data.volume}   赞{this.props.data.like}</Text>
                    <Text style={styles.itemPrice}>¥{this.props.data.price}</Text>
                </View>
                <View style={styles.itemAction}></View>

                <TouchableOpacity
                    style={styles.itemActionWrapper}
                    onPress={()=>{
                        this.props.onAdd({item:this.props.data.title})
                    }}>
                    <LinearGradient
                        style={styles.itemAction}
                        colors={['#fecf58', '#fec02a']}>
                        {textNode}
                        {/* <Text style={styles.itemActionText}>{this.props.data.additions?'选规格':'+'}</Text> */}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 82,
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        width: 76,
        height: 78,
    },
    info: {
        marginLeft: 9,
    },
    itemTitle: {
        height: 15,
        fontSize: 15,
        color: '#343434',
        fontWeight: '500'
    },
    itemVolume: {
        marginTop: 10,
        height: 11,
        fontSize: 11,
        color: '#999',
    },
    itemPrice: {
        marginTop: 27,
        height: 15,
        fontSize: 15,
        color: '#FA4F44',
        fontWeight: '800'
    },
    itemActionWrapper: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        minWidth: 26,
        height: 26,
        // backgroundColor: '#FECF58'
    },
    itemAction: {
        minWidth: 26,
        height: 26,
        borderRadius: 13,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemActionText: {
        height: 26,
        color: '#333333',
        fontSize: 22,
        lineHeight: 25
    },
    itemActionTextLong: {
        paddingLeft:8,
        paddingRight:8,
        height: 26,
        color: '#333333',
        fontSize: 13,
        lineHeight: 25
    }
})