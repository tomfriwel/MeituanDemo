import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class ShopHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:104,
        backgroundColor: '#fafafa',
        borderBottomColor:'#e4e4e4',
        borderBottomWidth:1
    }
})