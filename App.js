import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 :StatusBar.currentHeight;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: [
        {index: 1, title: "薬を飲む",done:false},
        {index: 2, title: "薬を飲む2",done:false},
      ],
      currentIndex: 2,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>filter</Text>
        </View>
        <ScrollView style={styles.todolist}>
          <FlatList data={this.state.todo}
            renderItem={({item}) => <Text>{item.title}</Text> }
            keyExtractor={(item,index) => "todo_" + item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Text>input</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  filter: {
    height: 30,
  },
  todolist: {
    flex: 1,
  },
  input: {
    height: 30,
  }
});
