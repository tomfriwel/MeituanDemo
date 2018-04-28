// 商品

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/*
    volume: 销量
    like: 赞
 */

export default class extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{
                        uri: this.props.data.item.image
                    }}
                    style={styles.image}
                />
                <Text>{this.props.data.item.title}</Text>
                <Text>x{this.props.data.count}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: 300,
        height: 82,
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FAFBFC',
    },
    image: {
        width: 76,
        height: 78,
    },
})