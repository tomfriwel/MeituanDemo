import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class SelectedItem extends Component {    
    constructor(props) {
        super(props)
        console.log(props.data.key)
        this.state = {
            data:this.props.data
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.state.data.item.title}</Text>
                    <Text style={styles.subtitle}>微辣</Text>
                </View>
                <Text>{this.state.data.count}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: 61,
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft:13,
        // justifyContent:'center'
        borderBottomWidth:1,
        borderBottomColor:'#f0f0f0',
    },
    info: {

    },
    title: {
        fontWeight:'500',
        color:'#333'
    },
    subtitle: {
        marginTop:8,
        color:'#999'
    }
})