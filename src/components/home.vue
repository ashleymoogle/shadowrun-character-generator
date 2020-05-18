<template>
  <div class="wrapper">
    <h1>
      {{ $t('hello') }} derp
    </h1>
    </div>
</template>

<script>
  import { reactive, computed } from '@vue/composition-api'
  import tooltip from './partials/tooltip.vue'
  export default {
    name: 'test',
    components: { tooltip },
    setup() {
      const state = reactive({
        count: 0,
        double: computed(() => (state?.count ?? 1) * 2)
      })

      function increment() {
        state.count++
      }

      return {
        state,
        increment
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 20px;
    .btn-data {
      color: $aqua;
      margin-bottom: 20px;
    }
    .text {
      margin-top: 10px;
    }
  }
</style>
