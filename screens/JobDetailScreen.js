import React, { Component } from "react";
import { View, Text, ListView } from "react-native";

export default class JobDetailScreen extends Component {
  componentWillMount() {
    console.log('willMount')
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"])
    };
  }

  render() {
      console.log('render')
    return (
      <View>          
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}
