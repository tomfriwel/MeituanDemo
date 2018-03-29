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
    LayoutAnimation
} from 'react-native';
import ShopItem from './components/ShopItem'
import SelectedItem from './components/SelectedItem'
import AnimationTest from './components/AnimationTest'
import LinearGradient from 'react-native-linear-gradient'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

// export default AnimationTest
export default class App extends Component {
    state = {
        fadeAnim: new Animated.Value(0.0),
        total: 0,
        isShow: false,
        showCover: false,
        hiddenH: 52,
        showH: 300,
        orderList: [],
        classList: [
            {
                key: '1',
                title: '开胃冷菜'
            },
            {
                key: '2',
                title: '开胃冷菜'
            },
            {
                key: '3',
                title: '开胃冷菜'
            },
            {
                key: '4',
                title: '开胃冷菜'
            },
            {
                key: '5',
                title: '开胃冷菜'
            }
        ]
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         fadeAnim: new Animated.Value(0.0),
    //     };
    // }

    addItem({ item }) {
        let obj
        let { orderList } = this.state

        let keys = orderList.map((item) => {
            return item.key
        })

        let index = keys.indexOf(item.key)

        if (index == -1) {
            obj = {
                count: 1,
                item: item,
                key: item.key,
            }
            orderList.push(obj)
        }
        else {
            orderList[index].count++
        }

        let total = this.state.total
        total += item.price

        this.setState({
            orderList,
            total
        })
    }

    renderItem({ item, index }) {
        return (
            <ShopItem
                key={item.key}
                source={item.source}
                title={item.title}
                volume={item.volume}
                price={item.price}
                like={item.like}
                onAdd={(res) => this.addItem({ item })}
            />
        )
    }

    renderOrder({ item, index }) {
        return (
            <SelectedItem
                key={item.key}
                data={item}
                onAdd={(res) => this.addItem({item})}
                onReduce={() => {
                    console.log('selected item reduce')
                }}
            ></SelectedItem>
        )
    }

    // control order list show/hide animation when press
    orderListAnimation() {
        if(this.state.total==0) {
            return
        }
        let isShow = this.state.isShow

        Animated.timing(
            this.state.fadeAnim, {
                duration: 400,
                toValue: !isShow ? 1 : 0
            }
        ).start(() => {
            this.setState({
                showCover: !isShow
            });
        });

        this.setState({
            isShow: !isShow,
            showCover: true
        });
    }

    render() {
        let pic = require('./assets/images/sample.jpg')
        let pic2 = {
            uri: "https://www.bing.com/az/hprichbg/rb/TulipsEquinox_EN-US11642351862_400x240.jpg"
        }
        let allItems = [
            {
                key: '1',
                source: pic,
                title: '巧克力蛋糕',
                volume: 12,
                price: 12,
                like: 12
            },
            {
                key: '2',
                source: pic2,
                title: '网络图片',
                volume: 12,
                price: 12,
                like: 12
            },
            {
                key: '3',
                source: pic2,
                title: '网络图片',
                volume: 12,
                price: 12
            },
            {
                key: '4',
                source: pic2,
                title: '网络图片',
                volume: 125,
                price: 12,
                like: 12
            },
            {
                key: '5',
                source: pic2,
                title: '网络图片',
                volume: 121,
                price: 12,
                like: 12
            }
        ]

        return (
            <View style={styles.pageContainer}>
                <View style={styles.flowContainer}>
                    <FlatList
                        style={styles.classList}
                        data={this.state.classList}
                        renderItem={({ item }) =>
                            <View style={styles.classItemContainer}>
                                <Text style={styles.classItem}>{item.title}</Text>
                            </View>
                        }
                    />
                    <FlatList
                        style={styles.itemList}
                        data={allItems}
                        renderItem={({ item }) => this.renderItem({ item })}
                    />
                </View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        this.orderListAnimation()
                    }}
                >
                    {/* <View style={[styles.cover, { display: this.state.isShow ? 'flex' : 'none' }]}></View> */}
                    <Animated.View style={[
                        styles.cover,
                        {
                            opacity: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.7] //线性插值，0对应60，0.6对应30，1对应0
                            }), display: this.state.showCover ? 'flex' : 'none'
                        }
                    ]}>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.bottomList, {
                    height: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [52, 300] //线性插值，0对应60，0.6对应30，1对应0
                    }),
                }]}>
                    <View style={styles.bottomListTitleBar}>
                        <Text style={styles.bottomListTitle}>已选商品</Text>
                        <Text style={styles.bottomListClear}>清空购物车</Text>
                    </View>
                    <FlatList
                        style={styles.orderList}
                        data={this.state.orderList}
                        renderItem={({item})=>this.renderOrder({item})}
                        // renderItem={this.renderOrder}
                        extraData={this.state}
                    />
                </Animated.View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        this.orderListAnimation()
                    }}>
                    <View style={styles.bottomActionBar}>
                        <View style={styles.bottomLogo}></View>
                        <View style={[styles.bottomBarTotalPriceWrapper, { display: this.state.total > 0 ? 'flex' : 'none' }]}>
                            <Text style={styles.bottomBarTotalPrice}>{'￥' + this.state.total}</Text>
                            <Text style={styles.bottomBarTotalPriceInfo}>另需配送费￥5</Text>
                        </View>
                        <TouchableWithoutFeedback>
                            {/* <View style={[styles.bottomBarCount, { display: this.state.total > 0 ? 'flex' : 'none' }]}>
                                <Text style={styles.bottomBarCountTitle}>结算</Text>
                            </View> */}
                            <LinearGradient
                                style={[styles.bottomBarCount, { display: this.state.total > 0 ? 'flex' : 'none' }]}
                                colors={['#fecf58', '#fec841']}>
                                <Text style={styles.bottomBarCountTitle}>结算</Text>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: -20,
        backgroundColor: 'black',
        opacity: 0,
        display: 'none'
        // backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    pageContainer: {
        backgroundColor: "transparent",
        position: "absolute",
        width: window.width,
        left: 0,
        top: 20,
        height: window.height - 20,
        // backgroundColor: 'red'
    },
    flowContainer: {
        flex: 1,
        // backgroundColor: 'red',
        alignContent: 'center',
        flexDirection: 'row',
        height: window.height - 52,
    },
    classList: {
        flexGrow: 0,
        marginLeft: 10,
        width: 80,
        height: '100%',
        // backgroundColor:'#fff'
    },
    classItemContainer: {
        width: 80,
        height: 49,
        flex: 1,
        justifyContent: 'center',
    },
    classItem: {
        color: '#666666'
    },
    itemList: {
        height: '100%',
        // backgroundColor:'#eee'
    },
    orderList: {
        width: '100%',
        // backgroundColor:'#eee'
    },
    bottomActionBar: {
        position: 'absolute',
        width: '100%',
        height: 52,
        left: 0,
        bottom: 0,
        backgroundColor: '#4F4F4F'
    },
    bottomBarTotalPriceWrapper: {
        position: 'absolute',
        left: 68,
        display: 'flex',
        // flexGrow:0,
        // alignContent:'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 100,
        height: '100%',
    },
    bottomBarCount: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        width: 111,
        height: '100%',
        backgroundColor: '#fece5a'
    },
    bottomBarCountTitle: {
        color: '#333431',
        fontSize: 15
    },
    bottomList: {
        position: 'absolute',
        width: '100%',
        height: 52,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        paddingBottom: 52
    },
    bottomListTitleBar: {
        width: '100%',
        height: 31,
        backgroundColor: '#f4f4f4'
    },
    bottomListTitle: {
        position: 'absolute',
        left: 10,
        fontSize: 12,
        lineHeight: 31,
        color: '#666666',
    },
    bottomListClear: {
        position: 'absolute',
        right: 10,
        fontSize: 12,
        lineHeight: 31,
        color: '#666666',
    },
    bottomBarTotalPrice: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
    bottomBarTotalPriceInfo: {
        color: '#aaa',
        fontSize: 11,
    },
    bottomLogo: {
        position: 'absolute',
        left: 10,
        top: -10,
        width: 51,
        height: 51,
        borderRadius: 25.5,
        backgroundColor: '#aa7723'
    }
});
