import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

class Loading extends Component{
    render(){
        return (
            <View style = { this.props.style }>
                <ActivityIndicator 
                    size = 'large'
                    animating
                    hidesWhenStopped
                    
                />
                <Text 
                style = { { fontSize: 18, backgroundColor: 'rgb(249, 245, 238)'  } }
                 >  Loading... </Text>
            </View>

        )
    }
}

export default Loading