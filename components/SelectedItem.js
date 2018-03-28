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
                <Text style={{color: this.state.data.isLike?'red':'gray'}}>{this.state.data.count}</Text>
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