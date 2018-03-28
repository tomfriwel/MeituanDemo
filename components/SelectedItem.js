import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class SelectedItem extends Component {    
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.count}</Text>
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
        // borderBottomWidth:1,
        // borderBottomColor:'#f0f0f0',
    },
})