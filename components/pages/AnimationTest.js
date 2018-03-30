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
    Image,
    FlatList,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    LayoutAnimation,
    Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'


const Dimensions = require('Dimensions');

const window = Dimensions.get('window');

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class AnimationTest extends Component {
    state = {
        fadeAnim: Object,
        heightAnim: Object,
        currentAlpha: Object,
    }
    constructor(props) {
        super(props);
        this.state = {//设置初值
            currentAlpha: 1.0,//标志位，记录当前value
            fadeAnim: new Animated.Value(1.0),
            heightAnim:new Animated.Value(44.0)
        };
    }

    // componentDidMount() {
    //     Animated.timing(
    //         this.state.fadeAnim,//初始值
    //         { toValue: 1 }//结束值
    //     ).start();//开始
    // }

    animation() {
        LayoutAnimation.configureNext({
            duration: 1300, //持续时间
            create: { // 视图创建
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,// opacity, scaleXY
            },
            update: { // 视图更新
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        }, () => {
            console.log('end')
        });
        this.setState({
            isShow: !this.state.isShow
        })
    }

    animation2() {
        this.setState({
            isShow: !this.state.isShow
        })
        Animated.timing(
            this.state.fadeAnim,//初始值
            { toValue: this.state.isShow ? 1 : 0 }//结束值
        ).start();//开始

    }

    startAnimation() {
        this.state.currentAlpha = this.state.currentAlpha == 1.0 ? 0.0 : 1.0;
        Animated.timing(
            this.state.fadeAnim,
            { toValue: this.state.currentAlpha }
        ).start();
        Animated.timing(
            this.state.heightAnim,
            {toValue: this.state.currentAlpha==1.0?100:44}
        ).start()
    }


    render() {
        return (
            <View style={styles.pageContainer}>
                <Button
                    title="click"
                    onPress={() => {
                        this.startAnimation()
                    }}
                ></Button>
                {/* <View style={[styles.view, { opacity: this.state.isShow ? 1 : 0.2, height: this.state.isShow ? 200 : 44 }]}></View> */}
                <Animated.View style={[styles.view, {
                    opacity: this.state.fadeAnim,
                    // height: this.state.heightAnim,
                    height: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [60, 110] //线性插值，0对应60，0.6对应30，1对应0
                    }),
                }]}>
                </Animated.View>
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
    },
    view: {
        marginTop: 44,
        width: 100,
        height: 44,
        backgroundColor: '#aaa'
    }
});
