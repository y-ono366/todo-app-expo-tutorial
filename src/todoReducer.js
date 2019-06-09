import { TODO } from './actions'

const initialState = {
  todos: [],
  currentIndex: 0,
}

const todos = (state = initialState,action) => {
  switch (action.type) {
    case TODO.ADD:
      const newTodo = {title: action.text, index: state.currentIndex,done:false}
      return {
        ...state,
        todos: [...state.todos,newTodo],
        currentIndex: state.currentIndex + 1
      }
    case TODO.TOGGLE:
      const todoItems = action.todo
      const todos = Object.assign([],state.todos)
      const index = todos.indexOf(todoItems)
      todoItems.done = !todoItems.done
      todos[index] = todoItems
      return {
        ...state,
        todos: todos
      }
    default:
      return state
  }
}

export default todos
