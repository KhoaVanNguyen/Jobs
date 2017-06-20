import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
export default class ReviewScreen extends Component{
    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Review Jobs',
            headerRight: (
             <Button 
                 title="Setitngs" 
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0, 122, 255, 1)"
                 onPress = { () => { navigation.navigate('settings')   } }
            /> )
        }
    }
    render(){
        console.log("in the review screen")
        console.log(this.props.navigation)
        return (
            <View>
                <Text>
                    ReviewScreen
                </Text>
                 <Text>
                    ReviewScreen
                </Text>
                 <Text>
                    ReviewScreen
                </Text>
            </View>
        )
    }
}