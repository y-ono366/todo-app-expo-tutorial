import { TODO } from './actions'

export const addTodo = (text) => {
  return {
    todo: TODO.ADD,
    text
  }
}

export const toggleTodo = (todo) => {
  return {
    todo: TODO.TOGGEL,
    todo,
  }
}
