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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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


type Props = {};
export default class App extends Component<Props> {
  state = {
    isShow: false,
    hiddenH: 52,
    showH: 300,
    orderList: []
  };

  render() {
    let pic = require('./assets/images/sample.jpg')
    let pic2 = {
      uri: "https://www.bing.com/az/hprichbg/rb/TulipsEquinox_EN-US11642351862_400x240.jpg"
    }
    let pics = [
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

    // let images = []
    let classList = [
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

    function addItem(item) {
      // Alert.alert('You tapped the button!' + orderList.length+','+item.title);
      let obj
      let orderList = this.state.orderList

      let keys = orderList.map((item) => {
        return item.key
      })

      let index = keys.indexOf(item.key)

      // Alert.alert(''+keys.length+', index='+index)

      if (index == -1) {
        obj = {
          count: 1,
          item: item,
          key:item.key
        }
        orderList.push(obj)
        // this.state.orderState.list.push(obj)
        Alert.alert('new add')
      }
      else {
        orderList[index].count++
        Alert.alert('add, count=' + orderList[index].count)
        // for (let index in orderList) {
        //   if (orderList[index].item.key == item.key) {
        //     orderList[index].count++

        //   }
        // }
      }

      this.setState({
        orderList: orderList
      })
    }

    // for (let i = 0; i < pics.length; i++) {
    //   images.push(
    //     <ShopItem
    //       key={i}
    //       source={pics[i].pic}
    //       description={pics[i].description}
    //     />
    //   )
    // }
    var CustomLayoutAnimation = {
      duration: 300,
      update: {
        type: LayoutAnimation.Types.keyboard,
      },
    };

    return (
      <View style={styles.pageContainer}>
        <View style={styles.flowContainer}>
          <FlatList
            style={styles.classList}
            data={classList}
            renderItem={({ item }) =>
              <View style={styles.classItemContainer}>
                <Text style={styles.classItem}>{item.title}</Text>
              </View>
            }
          />
          <FlatList
            style={styles.itemList}
            data={pics}
            renderItem={({ item }) =>
              <ShopItem
                key={item.key}
                source={item.source}
                title={item.title}
                volume={item.volume}
                price={item.price}
                like={item.like}
                onAdd={(res) => {
                  addItem.apply(this, [item])
                }}
              />
            }
          />
        </View>

        <View style={[styles.bottomList, { height: this.state.isShow ? this.state.showH : this.state.hiddenH }]}>
          <Text style={styles.bottomListTitle}>已选商品</Text>
          <FlatList
            style={styles.orderList}
            data={this.state.orderList}
            renderItem={({ item }) =>
              <SelectedItem></SelectedItem>
            }
          />
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            // Alert.alert(1 + '')
            LayoutAnimation.configureNext(CustomLayoutAnimation);//.linear();
            this.setState({
              isShow: !this.state.isShow,
              // hiddenH: 52,
              // showH: 300,
            })
          }}>
          <View style={styles.bottomActionBar}></View>
        </TouchableWithoutFeedback>
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
  bottomList: {
    position: 'absolute',
    width: '100%',
    height: 52,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    paddingBottom: 52
  },
  bottomListTitle: {
    paddingLeft: 10,
    height: 31,
    lineHeight: 31,
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#f4f4f4'
  }
});
