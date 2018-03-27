import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class CustomImage extends Component {
    render() {
        return (
            <View>
                <Image
                    source={this.props.source}
                    style={styles.image}
                />
                <Text>{this.props.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        marginTop: 10,
        width: 152,
        height: 136,
        backgroundColor: 'red'
    }
})