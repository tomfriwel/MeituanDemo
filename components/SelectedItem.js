import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class SelectedItem extends Component {
    constructor(props) {
        super(props)
        console.log(props.data.key)
        this.state = {
            data: this.props.data
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.state.data.item.title}</Text>
                    <Text style={styles.subtitle}>微辣</Text>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onAdd({})
                        }}
                    >
                        <LinearGradient
                            style={styles.itemAction}
                            colors={['#fecf58', '#fec02a']}>
                            <Text style={styles.itemActionText}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.itemCount}>{this.state.data.count}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onReduce({})
                        }}
                    >
                        <View style={styles.itemActionReduce}>
                            <Text style={styles.itemActionText}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.itemTotal}>￥{this.state.data.count * this.state.data.item.price}</Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 61,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13,
        // justifyContent:'center'
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    rightContainer: {
        position: 'absolute',
        right: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    info: {

    },
    title: {
        fontWeight: '500',
        color: '#333'
    },
    subtitle: {
        marginTop: 8,
        color: '#999'
    },
    itemAction: {
        marginRight: 12,
        width: 26,
        height: 26,
        borderRadius: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemActionReduce: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemActionText: {
        height: 26,
        color: '#333333',
        fontSize: 22,
        lineHeight: 25
    },
    itemCount: {
        width: 25,
        textAlign: 'center'
    },
    itemTotal: {
        marginRight: 34,
        fontWeight: '500',
        fontSize: 13,
        color: '#333'
    }
})