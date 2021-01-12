<template>
  <div class="app-wrapper">
    <div class="app-wrapper__inner">
      <h1 class="app-wrapper__title">Список дел</h1>
      <Container />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./styles/helpers/variables";
.app-wrapper {
  padding-top: 5rem;

  &__inner {
    max-width: 800px;
    background-color: #6882ba;
    padding: 1rem;
    margin: 0 auto;
    box-shadow: 2px 2px 2px #ccc;
  }

  &__title {
    margin: 0;
    color: $color__light;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>

<script>
import Container from './components/Container'

export default {
  name: 'App',
  components: {
    Container
  }
}
</script>
