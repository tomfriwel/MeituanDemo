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
import LinearGradient from 'react-native-linear-gradient'
import BillDetailItem from '../BillDetailItem'


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class AnimationTest extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.title : 'A Nested Details Screen',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Menlo'
            },
            headerRight: (
                <Button
                    onPress={()=>{
                        if(params.increaseCount) {
                            params.increaseCount()
                        }
                    }}
                    title={(params.count?params.count:0)+''}
                    color="#fff"
                />
            ),
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount?this._increaseCount:123});
        this.props.navigation.setParams({ count: 0 });
    }
    state = {
        count: 0,
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
        this.props.navigation.setParams({ count:this.state.count });
    }


    constructor(props) {
        super(props)
    }

    renderItem({ item }) {
        return (
            <BillDetailItem
                key={item.item.id}
                data={item}
                onAdd={(res) => this.addItem({ item })}
            />
        )
    }

    render() {
        const { params } = this.props.navigation.state
        let orderList = params.orderList

        console.log(orderList)

        let listItems = []

        orderList.forEach(ele => {
            listItems.push(
                this.renderItem({item:ele})
            )
        });

        return (
            <View style={styles.pageContainer}>
                <Text>{params.title}</Text>
                <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({ title: 'Updated!' })}
                />
                {listItems}
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
