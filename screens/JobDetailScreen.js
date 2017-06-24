import React, { Component } from "react";
import { View, Text, ListView, Dimensions} from "react-native";
import { connect } from 'react-redux'
import * as actions from '../actions'
import Swipe from '../components/Swipe'
import { Button, Card, Icon } from 'react-native-elements'
import { MapView } from 'expo'


const SCREEN_HEIGHT = Dimensions.get('window').height
class JobDetailScreen extends Component {

   static navigationOptions = {
        title: 'Details',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name = 'filter-list' size = {30} color = {tintColor} />
        }
    }

  componentWillMount() {

  }
  renderCards = (job) => {
    const initialRegion={
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 
    }

    return (
    
    <Card 
      containerStyle = {{ flex: 1 }}
      title = { job.jobtitle } >
      <View style = { { height: (SCREEN_HEIGHT / 3 ) } } >
        <MapView 
          style = { { flex: 1 } }
          initialRegion = {initialRegion}
          scrollEnabled = {false}
          cacheEnabled
        /> 
      </View>

      <View style = { styles.innerView } >
          <Text> {job.company} </Text>
          <Text> {job.formattedRelativeTime} </Text>
      </View>

      <Text>
        { job.snippet.replace(/<b>/g,'').replace(/<\/b>/g,'')  }
      </Text>
    </Card>
    )
  }
  renderNoMoreCards = () => {
      return (
        <Card title = 'There is no job related' >
          <Button
            title = 'View other jobs'
            icon = { { name: 'my-location' }  }
            onPress = { () => this.props.navigation.navigate('map')  }
            backgroundColor = '#189'
           />
        </Card>
      )
  }
  render() {
    console.log('in render')
    return (
      <View>          
        <Swipe 
          data = { this.props.jobs }
          renderCard = { this.renderCards }
          renderNoMoreCards = { this.renderNoMoreCards }
          keyProp = 'jobkey'
          onSwipeRight = { job => this.props.likeJob(job)  }
          cacheEnabled = {true}
        />
      </View>
    );
  }
}

const styles = {
  card: {
    flex: 1
  },
  innerView:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20
  }
}

const mapStateToProps = ({ jobs }) => {
  console.log('in mapStateToProps')
  return { jobs: jobs.results }
}
export default connect(mapStateToProps, actions )(JobDetailScreen)