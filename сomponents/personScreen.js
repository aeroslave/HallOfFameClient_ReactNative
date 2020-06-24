import 'react-native-gesture-handler';
import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
      let name = this.props.route.params.person.name;
      let skills = this.props.route.params.person.skills;
  
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