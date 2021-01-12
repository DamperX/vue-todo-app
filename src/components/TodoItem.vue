<template>
  <li class="list-item" :class="{ 'list-item_completed': completed }">
    <div
        class="list-item__value"
        @click="$emit('on-toggle')"
        v-if="!isEdit"
    >{{ msg }}</div>
    <div v-else>
      <input
          type="text"
          class="form-control"
          v-model="newTodoMsg"
          @blur="finishEditing"
          @keyup.enter="finishEditing"
          ref="newTodo"
      >
    </div>
    <div class="list-item__controls">
      <button
          class="btn"
          @click="startEditing"
          :disabled="isEdit">Edit</button>
      <button class="btn" @click="$emit('on-delete')">&times;</button>
    </div>
  </li>
</template>
<style lang="scss" scoped>
@import "../styles/helpers/variables";
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;

  &__value {
    font-size: 1.5rem;
    color: $color__light;
    cursor: pointer;
  }

  &_completed {
    text-decoration: line-through;
    text-decoration-color: $color__light;
  }
}

.form-control {
  height: 27px;
  font-size: 1.5rem;
  color: $color__light;
  border: 1px solid $color__primary--1;
  background-color: transparent;
}
</style>
<script>
export default {
  data: () => ({
    isEdit: false,
    newTodoMsg: ''
  }),
  props: {
    msg: String,
    completed: Boolean
  },
  methods: {
    startEditing() {
      if (this.isEdit) {
        this.finishEditing()
      } else {
        this.newTodoMsg = this.msg
        this.isEdit = true
        this.$nextTick(() => this.$refs.newTodo.focus())
      }
    },
    finishEditing() {
      this.isEdit = false
      this.$emit('on-edit', this.newTodoMsg)
    }
  }
}
</script>