<template>
  <div class="todo-footer">
    <div class="todo-footer__count">Left: {{ remaining }}</div>
    <div class="todo-footer__wrapper">
      <div class="todo-footer__filters filters">
        <button class="filters__btn" :class="{'active': visibility === 'all'}" @click="$emit('on-filter', 'all')">Все</button>
        <button class="filters__btn" :class="{'active': visibility === 'completed'}" @click="$emit('on-filter', 'completed')">Завершенные</button>
        <button class="filters__btn" :class="{'active': visibility === 'active'}" @click="$emit('on-filter', 'active')">Активные</button>
      </div>
      <div class="todo-footer__clear clear-wrapper" v-show="length > remaining">
        <button class="clear-wrapper__btn" @click="$emit('on-clear')">Очистить выполненные</button>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
@import "../styles/helpers/variables";
button.active {
  background-color: $color__primary--1;
  color: $color__light;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  &__count {
    font-size: .95rem;
    color: $color__light;
    font-style: italic;
  }

  &__wrapper {
    display: flex;
  }
}

.filters {
  &__btn {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
}

.clear-wrapper {
  margin-left: 20px;
}
</style>
<script>
export default {
  props: {
    remaining: Number,
    length: Number,
    visibility: String
  },
}
</script>
