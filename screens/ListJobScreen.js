import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import JobDetail from '../components/JobDetail'
export default class ListJobScreen extends Component {
  state = { data: [] };

  constructor(props) {
    super(props);
    console.log("in props");
    console.log(props)
    //   this.setState({ data: this.props.navigation.state.params.data })
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //   this.state = {
    //      dataSource: ds.cloneWithRows([
    //         'Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8', 
    //            'Item9', 'Item10'
    //      ])
    //   };
     console.log(this.state)
      this.state = {
         dataSource: ds.cloneWithRows(props.navigation.state.params.data)
      };
   }
    componentWillMount(){
        console.log("in componentWillMount");
   }
   renderRow = (rowData) => {
       return  ( <JobDetail data = { rowData } /> )
   }
  render() {
    // console.log("in render");
    // console.log(this.state);
    return (
      <View >
        <ListView
          //style = { {flex: 1} }
          enableEmptySections
          dataSource={  this.state.dataSource }
          renderRow= { this.renderRow }
        />
      </View>
    );
  }
}
