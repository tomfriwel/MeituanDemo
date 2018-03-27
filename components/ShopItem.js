import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ShopItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.source}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.itemTitle}>{this.props.title}</Text>
                    <Text style={styles.itemVolume}>月售{this.props.volume}   赞{this.props.like}</Text>
                    <Text style={styles.itemPrice}>¥{this.props.price}</Text>
                </View>
                <View style={styles.itemAction}></View>

                <TouchableOpacity
                    style={styles.itemActionWrapper}
                    onPress={()=>{
                        this.props.onAdd(this.props.title)
                    }}>
                    <LinearGradient
                        style={styles.itemAction}
                        colors={['#fecf58', '#fec02a']}>
                        <Text style={styles.itemActionText}>+</Text>
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
        width: 26,
        height: 26,
        // backgroundColor: '#FECF58'
    },
    itemAction: {
        width: 26,
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
    }
})