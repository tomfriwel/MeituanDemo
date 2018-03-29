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
        isShow: false,
        height:100
    }
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
        this.
    }
    render() {
        return (
            <View style={styles.pageContainer}>
                <Button
                    title="click"
                    onPress={()=>{
                        this.animation()
                    }}
                ></Button>
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
});
