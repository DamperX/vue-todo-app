<template>
  <div class="todo-content">
    <div class="todo-content__head">
      <input class="todo-content__field" type="text" v-model="inputValue" @keyup.enter="createTodo" placeholder="Что хотите сделать?">
      <button class="btn" @click="createTodo">+</button>
    </div>
    <TodoList v-if="filteredTodos.length" :TodoList="filteredTodos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" :editTodo="editTodo" />
    <div class="todo-content__empty" v-else-if="!todos.length">Нет дел. Добавьте первое.</div>
    <div class="todo-content__empty" v-else>Нет результатов.</div>
    <Footer :visibility="visibility" :remaining="remaining" :length="todos.length" @on-filter="changeFilterTodo" @on-clear="clearActiveItems" />
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/helpers/variables";
.todo-content {

  &__head {
    display: flex;
  }

  &__empty {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.5rem;
    color: $color__light;
  }

  &__field {
    border: 0;
    height: 46px;
    width: 100%;
    outline: none;
    padding: 10px;
  }
}

.btn {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
}
</style>
<script>
import TodoList from '@/components/TodoList'
import Footer from '@/components/Footer'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}

export default {
  components: {Footer, TodoList },
  data: () => ({
    inputValue: '',
    todos: [{ msg: 'Todo 1', completed: false }, { msg: 'Todo 2', completed: false }, { msg: 'Todo 3', completed: false }],
    visibility: 'all'
  }),
  methods: {
    createTodo() {
      if (this.inputValue) {
        this.todos.push({
          msg: this.inputValue,
          completed: false
        })
        this.inputValue = ''
      }
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    toggleTodo(id) {
      this.todos[id].completed = !this.todos[id].completed
    },
    editTodo(todo, newMsg) {
      todo.msg = newMsg
    },
    changeFilterTodo(filterValue) {
      this.visibility = filterValue
    },
    clearActiveItems() {
      this.todos = filters.active(this.todos)
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    }
  }
}
</script>