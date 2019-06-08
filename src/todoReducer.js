import { TODO } from './actions'

const initialState = {
  todos: [],
  currentIndex: 0,
}

const todos = (state = [],action) => {
  switch (action.type) {
    case TODO.ADD:
      const newTodo = {title: action.text, index: state.currentIndex,done:false}
      return {
        ...state,
        todos: [...state.todo,newTodo],
        currentIndex: state.currentIndex + 1
      }
    case TODO.TOGGLE:
      const todoItems = action.todo
      const todos = Object.assign([],state.todos)
      const index = todoItems.IndexOf(todoItems)
      todoItems.done = !todoItems.done
      todos[index] = todoItems
      return {
        ...state,
        todo: todos
      }
    default:
      return state
  }
}

export default todos
