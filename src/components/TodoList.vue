<template>
  <ul class="todo-list">
    <TodoItem
        v-for="(item, idx) in TodoList"
        :key="item"
        :msg="item.msg"
        :completed="item.completed"
        @on-toggle="toggleTodo(idx)"
        @on-delete="deleteTodo(item)"
        @on-edit="editTodo(item, $event)"/>
  </ul>

</template>

<style lang="scss" scoped>
@import "../styles/helpers/variables";
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

<script>
import TodoItem from '@/components/TodoItem'

export default {
  components: { TodoItem },
  props: {
    TodoList: Array,
    deleteTodo: Function,
    toggleTodo: Function,
    editTodo: Function
  },
}
</script>