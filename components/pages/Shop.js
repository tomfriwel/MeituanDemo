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
    SectionList,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    LayoutAnimation
} from 'react-native';

import ShopItem from '../ShopItem'
import ShopItemClass from '../ShopItemClass'
import SelectedItem from '../SelectedItem'
import AnimationTest from './AnimationTest'
import LinearGradient from 'react-native-linear-gradient'
import ShopHeader from '../ShopHeader'

import api from '../../utils/api'
import net from '../../utils/net'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

// export default AnimationTest
export default class App extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     const { params } = navigation.state;

    //     return {
    //         header: null
    //     }
    // };
    state = {
        // loading: false,
        allItems: [],
        classifyItems: [],
        fadeAnim: new Animated.Value(0.0),
        total: 0,
        isShow: false,
        showCover: false,
        hiddenH: 52,
        showH: 300,
        minimum: 20, //起送价
        express: 6, //起送价
        orderList: [],
        classList: []
    }

    shopItemList = null

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         fadeAnim: new Animated.Value(0.0),
    //     };
    // }

    // 结算
    count() {
        this.props.navigation.navigate('BillDetail', {
            orderList: this.state.orderList
        })
    }

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

    reduceItem({ item }) {
        console.log('reduce')
        let obj
        let { orderList } = this.state

        let keys = orderList.map((item) => {
            return item.key
        })

        let index = keys.indexOf(item.key)

        if (index != -1 && orderList[index].count > 0) {
            orderList[index].count--

            let total = this.state.total
            total -= item.price

            let needHide = false
            if (orderList[index].count == 0) {
                orderList.splice(index, 1)

                if (orderList.length == 0) {
                    needHide = true
                }
            }

            this.setState({
                orderList,
                total
            }, () => {
                // 如果为空, 就隐藏购物车
                if (needHide) {
                    this.orderListAnimation()
                }
            })
        }
    }

    // control order list show/hide animation when press
    orderListAnimation() {
        let isShow = this.state.isShow

        if (this.state.total == 0 && !isShow) {
            return
        }
        else if (this.state.total == 0 && isShow) {

        }

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

    // 购物item
    renderShopItem({ item, index }) {
        return (
            <ShopItem
                key={item.id}
                data={item}
                onAdd={(res) => this.addItem({ item })}
            />
        )
    }

    // 分类item
    renderClassItem({ item }) {
        return (
            <ShopItemClass
                data={item}
                onClick={(res) => {
                    console.log(item)
                    let sectionIndex = 0

                    for (let i in this.state.classifyItems) {
                        let ele = this.state.classifyItems[i]
                        if (item.id == ele.id) {
                            sectionIndex = i
                            break
                        }
                    }

                    this.shopItemList.scrollToLocation({
                        itemIndex: 0,
                        sectionIndex: sectionIndex,
                        viewOffset: 37,
                    })
                }}
            ></ShopItemClass>
        )
    }

    renderShopItemHeader({ title }) {
        return (
            <View style={styles.shopItemHeader}>
                <Text style={styles.shopItemHeaderText}>{title}</Text>
            </View>
        )
    }

    // 购物车item
    renderOrder({ item, index }) {
        return (
            <SelectedItem
                key={item.key}
                data={item}
                onAdd={(res) => this.addItem({ item: item.item })}
                onReduce={(res) => this.reduceItem({ item: item.item })}
            ></SelectedItem>
        )
    }

    renderBottomLogo() {
        let colors = ['#959595', '#6D6D6D']
        if (this.state.total > 0) {
            colors = ['#FFDA88', '#FDC147']
        }
        return (
            <LinearGradient
                style={[styles.bottomLogo, {}]}
                colors={colors}>
            </LinearGradient>
        )
    }

    // 结算按钮
    renderCountButton() {
        if (this.state.total > this.state.minimum) {
            return (
                <TouchableOpacity
                    style={styles.bottomBarCount}
                    onPress={() => {
                        this.count()
                    }}
                >
                    <LinearGradient
                        // , { display: this.state.total > 0 ? 'flex' : 'none' }
                        style={[styles.bottomBarCount, {}]}
                        colors={['#fecf58', '#fec841']}>
                        <Text style={[styles.bottomBarCountTitle, { color: '#333431' }]}>结算</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View
                    style={[styles.bottomBarCount, {}]}
                >
                    <Text style={[styles.bottomBarCountTitle, { color: '#bab9b9' }]}>{'￥' + (this.state.minimum - this.state.total) + '起送'}</Text>
                </View>

            )
        }
    }

    loadData() {
        this.setState({
            loading: true
        })

        net.get({
            url: api.shop.getItems
        }).then(res => {
            console.log('res:')
            console.log(res)
            // allItems = res

            res.map(item => {
                item.key = item.id + ''
                return item
            })

            let items = {}
            let classList = []

            res.forEach(ele => {
                if (!items[ele.classId]) {
                    items[ele.classId] = []
                    classList.push({
                        key: ele.classId + '',
                        id: ele.classId,
                        title: ele.classTitle
                    })
                }
                items[ele.classId].push(ele)
            });

            console.log(items)
            console.log(classList)

            let classifyItems = []

            // 转为sectionlist 的数据形式
            for (let key in items) {
                classifyItems.push({
                    title: items[key][0].classTitle,
                    id: key,
                    data: items[key]
                })
            }

            console.log(classifyItems)

            this.setState({
                loading: false,
                allItems: res,
                classList: classList,
                classifyItems: classifyItems
            })
        }).catch(res => {
            console.log('res:')
            console.log(res)
            this.setState({
                loading: false
            })
        })
    }

    componentWillMount() {
        this.loadData()
    }

    render() {
        let pic = require('../../assets/images/sample.jpg')
        let pic2 = {
            uri: "https://www.bing.com/az/hprichbg/rb/TulipsEquinox_EN-US11642351862_400x240.jpg"
        }

        return (
            <View style={styles.pageContainer}>
                {/* <View style={styles.switchBar}></View> */}
                <ShopHeader></ShopHeader>
                <View style={styles.flowContainer}>
                    <FlatList
                        style={styles.classList}
                        data={this.state.classList}
                        renderItem={({ item }) => this.renderClassItem({ item })
                            // <TouchableWithoutFeedback
                            //     onPress={() => {
                            //         console.log(item)
                            //         let sectionIndex = 0

                            //         for(let i in this.state.classifyItems) {
                            //             let ele = this.state.classifyItems[i]
                            //             if(item.id == ele.id) {
                            //                 sectionIndex = i
                            //                 break
                            //             }
                            //         }

                            //         this.shopItemList.scrollToLocation({
                            //             itemIndex: 0,
                            //             sectionIndex: sectionIndex,
                            //             viewOffset:37,
                            //         })
                            //     }}
                            // >
                            //     <View style={styles.classItemContainer}>
                            //         <Text style={styles.classItem}>{item.title}</Text>
                            //     </View>
                            // </TouchableWithoutFeedback>
                        }
                    />
                    {/* <FlatList
                        style={styles.itemList}
                        data={this.state.allItems}
                        extraData={this.state}
                        renderItem={({ item }) => this.renderShopItem({ item })}
                    /> */}
                    <SectionList
                        style={styles.itemList}
                        ref={(list) => { this.shopItemList = list }}
                        renderItem={({ item, index, section }) => this.renderShopItem({ item })}
                        renderSectionHeader={({ section: { title } }) => this.renderShopItemHeader({ title })}
                        // sections={[
                        //     { title: 'Title1', data: ['item1', 'item2'] },
                        //     { title: 'Title2', data: ['item3', 'item4'] },
                        //     { title: 'Title3', data: ['item5', 'item6'] },
                        // ]}
                        sections={this.state.classifyItems} />
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
                        renderItem={({ item }) => this.renderOrder({ item })}
                        // renderItem={this.renderOrder}
                        extraData={this.state}
                    />
                </Animated.View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        this.orderListAnimation()
                    }}>
                    <View style={styles.bottomActionBar}>
                        {this.renderBottomLogo()}
                        <View style={[styles.bottomBarTotalPriceWrapper, { display: this.state.total > 0 ? 'flex' : 'none' }]}>
                            <Text style={styles.bottomBarTotalPrice}>{'￥' + this.state.total}</Text>
                            <Text style={styles.bottomBarTotalPriceInfo}>{this.state.express > 0 ? '另需配送费￥' + this.state.express : '免配送费'}</Text>
                        </View>
                        <TouchableWithoutFeedback>
                            {/* <View style={[styles.bottomBarCount, { display: this.state.total > 0 ? 'flex' : 'none' }]}>
                                <Text style={styles.bottomBarCountTitle}>结算</Text>
                            </View> */}
                            {this.renderCountButton()}
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
        top: 0,
        height: window.height,
        // height: window.height - 20-64,
        backgroundColor: '#fff'
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
        // backgroundColor: 'blue',
        // backgroundColor:'#eee'
        height: window.height - 52 - 104,
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
        // backgroundColor: '#fece5a'
    },
    bottomBarCountTitle: {
        fontSize: 15,
        fontWeight: '600'
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
        // backgroundColor: '#aa7723'
    },
    switchBar: {
        height: 41,
        width: '100%',
        backgroundColor: '#fafafa'
    },
    shopItemHeader: {
        backgroundColor: '#fff',
        height: 37,
    },
    shopItemHeaderText: {
        color: '#333',
        fontWeight: 'bold',
        lineHeight: 37,
        fontSize: 14
    }
});
