// 商品

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class ShopItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    this.props.onClick({ item: this.props.data })
                }}>
                <Text style={styles.text}>{this.props.data.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 53,
        height: 49,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
        // flex: 1,
        // flexDirection: 'row',
    },
    text: {
        color: '#666',
        fontSize: 12
    }
})