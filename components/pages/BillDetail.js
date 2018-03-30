/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class AnimationTest extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        const { params } = this.props.navigation.state;
        console.log(params)

        return (
            <View style={styles.pageContainer}>
                <Text>{params.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "transparent",
        position: "absolute",
        width: window.width,
        left: 0,
        top: 20,
        height: window.height - 20,
        // backgroundColor: 'red'
    }
});
