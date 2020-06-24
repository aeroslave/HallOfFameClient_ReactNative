import 'react-native-gesture-handler';
import * as React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

class PersonListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, dataSource: null, refreshing: false, url: '' };
  }
  
  _onPress(item) {
    this.props.navigation.navigate('Person', {
      person: item
    });
  }

  _handleRefresh = () => {
    this.getPersonList();
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <View style={styles.container}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
          marginRight: "5%"
        }}
      />
    );
  };

  getPersonList() {
    return fetch('http://' + this.state.url + '/api/persons')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            refreshing: false
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{margin:5 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin:5}}
            onChangeText={url => this.setState({ url })}
            value={this.state.url}
          />
          <Button title="Соединение"
          onPress={() => this.getPersonList()}/>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={({ id }, index) => id}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          ItemSeparatorComponent={this.renderSeparator}          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
  },
});