import React from 'react';
import { connect } from 'react-redux'
import { addTodo,toggleTodo } from './actionCreators'

import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import {ifIphoneX,getStatusBarHeight} from 'react-native-iphone-x-helper'

import {
  SearchBar,
  Input,
  Button,
  ListItem,
} from 'react-native-elements'

import FeatherIcon from 'react-native-vector-icons/Feather';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const TODO = "@todoapp.todo"
const STATUSBAR_HEIGHT = getStatusBarHeight()

const TodoItem = (props) => {
  let icon = null
  if (props.done === true) {
    icon = <MaterialIcon name="done"/>
  }
  return (
    <TouchableOpacity onPress={props.onPressFunc}>
      <ListItem
        title={props.title}
        rightIcon={icon}
        bottomDriver
      />
    </TouchableOpacity>
  )
}

// export default class App extends React.Component {
class TodoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      filterText: "",
    }
  }

  onAddItem = () => {
    const title = this.state.inputText

    if (title == "") {
      return
    }
    this.props.addTodo(title)
    this.setState({
      inputText: "",
    })
  }

  onTapTodoItem = (todoItem) => {
    this.props.toggleTodo(todoItem)
  }

  render() {
    const filterText = this.state.filterText
    let todo = this.props.todos
    if(filterText !== "") {
      todo = todo.filter(t => t.title.includes(filterText))
    }
    const platform = Platform.OS == 'ios' ? 'ios' : 'android'
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <SearchBar
          platform={platform}
          cancelButtonTitle="Cancel"
          onChangeText={(text) => this.setState({filterText: text})}
          onClear={() => this.setState({filterText: ""})}
          value={this.state.filterText}
          placeholder="type filter text"
        />
        <ScrollView style={styles.todolist}>
          <FlatList data={todo}
            extraData={this.state}
            renderItem={({item}) =>
              <TodoItem
                title={item.title}
                done={item.done}
                onPressFunc={() => this.onTapTodoItem(item)}
              />
            }
            keyExtractor={(item,index) => "todo_" + item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Input
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            containerStyle={styles.inputText}
          />

          <Button
            icon={
              <FeatherIcon
                name="plus"
                size={30}
                color='white'
              />
              }
              title=""
              onPress={this.onAddItem}
              buttonStyle={styles.inputButton}
          />
        </View>
      </KeyboardAvoidingView>
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
    ...ifIphoneX({
      paddingBottom: 30,
      height: 80,
    },{
      height: 50,
    }),
    height: 70,
    flexDirection: 'row',
    paddingRight: 10,
  },
  inputText: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  inputButton: {
    width: 48,
    height: 48,
    borderWidth: 0,
    borderRadius: 48,
    borderColor: 'transparent',
    backgroundColor: '#ff6347',
  },
  todoItem: {
    fontSize: 20,
    backgroundColor: "white",
  },
  todoItemDone: {
    fontSize: 20,
    backgroundColor: "red",
  }
});

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo(text) {
      dispatch(addTodo(text))
    },
    toggleTodo(todo) {
      dispatch(toggleTodo(todo))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoScreen)
