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
    Button,
    TouchableOpacity
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import api from '../../utils/test-api'
import net from '../../utils/net'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Home extends Component {
    state = {
        title: "hello android developed using react-native"
    }
    constructor(props) {
        super(props)
    }

    loadData() {

        // net.get({
        //     url: api.wechat.test
        // }).then(res => {
        //     console.log('res:')
        //     console.log(res)
        //     this.setState({
        //         title: "success"
        //     })
        // }).catch(res => {
        //     console.log('res:')
        //     console.log(res)
        //     this.setState({
        //         title: "fail:" + JSON.stringify(res)
        //     })
        // })
    }

    componentWillMount() {
        this.setState({
            title: "loading"
        })
        // this.loadData()
    }

    // render() {
    //     return (
    //         <View style={styles.pageContainer}>
    //             <Text>{this.state.title}</Text>
    //             <Button
    //                 title="Update the title"
    //                 onPress={() => {
    //                     console.log("press")
    //                     this.setState({
    //                         title:'press button'
    //                     })
    //                 }}
    //             />
    //         </View>
    //     );
    // }
    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }
    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}>
                        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
              </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    // pageContainer: {
    //     backgroundColor: "#fff",
    //     position: "absolute",
    //     width: window.width,
    //     left: 0,
    //     top: 20,
    //     height: window.height - 20,
    //     // backgroundColor: 'red'
    // }
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});
