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
    Button
} from 'react-native';


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Home extends Component {
    state = {
        title:"hello android developed using react-native"
    }
    constructor(props) {
        super(props)
    }

    // renderItem({ item }) {
    //     return (
    //         <Button>

    //         </Button>
    //     )
    // }

    render() {
        return (
            <View style={styles.pageContainer}>
                <Text>{this.state.title}</Text>
                <Button
                    title="Update the title"
                    onPress={() => {
                        console.log("press")
                        this.setState({
                            title:'press button'
                        })
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "#fff",
        position: "absolute",
        width: window.width,
        left: 0,
        top: 20,
        height: window.height - 20,
        // backgroundColor: 'red'
    }
});
