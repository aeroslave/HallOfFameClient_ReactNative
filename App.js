import 'react-native-gesture-handler';
import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hall of Fame">
        <Stack.Screen name="Hall of Fame" component={PersonListScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

class PersonListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: null, refreshing: false };
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

  getPersonList() {
    return fetch('http://192.168.0.105:52480/api/persons')
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

  componentDidMount() {
    this.getPersonList();
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
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={({ id }, index) => id}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
        />
      </View>
    );
  }
}

class PersonScreen extends React.Component {
  renderItem = ({ item }) => {
    return (
        <View style={styles.container}>
          <Text>Навык: {item.name}</Text>
          <Text>Уровень: {item.level}</Text>
        </View>
    );
  };

  render() {
    const name = this.props.route.params.person.name;
    const skills = this.props.route.params.person.skills;

    return (
      <View style={styles.container}>
        <Text>Имя: {JSON.stringify(name)}</Text>
        <FlatList
          data={skills}
          renderItem={this.renderItem}
          keyExtractor={({ id }, index) => id}
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