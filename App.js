/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    Button
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Shop from './components/pages/Shop'
import AnimationTest from './components/pages/AnimationTest'
import BillDetail from './components/pages/BillDetail'

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('./assets/images/sample.jpg')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

export default StackNavigator(
    {
        Home: {
            screen: Shop,
        },
        AnimationTest: {
            screen: AnimationTest,
        },
        BillDetail: {
            screen: BillDetail,
        }
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#aa5100',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            // headerBackTitle: 'back haha',
            // headerBackImage: require('./assets/images/icon.png')
        },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
)