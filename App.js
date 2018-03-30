/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import { StackNavigator } from 'react-navigation'
import Shop from './components/pages/Shop'
import AnimationTest from './components/pages/AnimationTest'
import BillDetail from './components/pages/BillDetail'

export default StackNavigator({
    Home: {
        screen: Shop,
    },
    AnimationTest: {
        screen: AnimationTest,
    },
    BillDetail: {
        screen: BillDetail,
    },
})