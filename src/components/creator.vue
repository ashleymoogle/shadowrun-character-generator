<template>
  <div class="wrapper-class">
    <div v-if="!isLoading">
      Hello
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script>
  import {onMounted, reactive, toRefs, ref} from '@vue/composition-api'
  import classParse from '../utils/classParse.js'
  import { useRouter } from '../router'
  import tooltip from './partials/tooltip.vue'
  export default {
    name: 'class-view',
    components: { tooltip },
    setup(props, context) {
      // +10 points par stat
      // +25 pour le dernier point max
      // Une seule stat peut etre max
      // Pas plus de la moitie du total des points
      const $router = useRouter()
      const $route = $router.currentRoute

      const state = reactive({
        isLoading: true,
        json: {},
        rpgClass: {}
      })

      onMounted(async () => {
        state.isLoading = false
      })

      return {
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper-class {
    padding: 20px;
    .desc {
      margin: 10px 0;
    }
    .supplement {
      margin: 10px 0;
      .is-bold {
        font-weight: bolder;
      }
      .supplement-item {
        margin: 10px 0;
      }
    }
    .skills {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      .skill {
        margin-right: 5px;
      }
    }
    .tree-view-wrapper {
      min-height: 20px;
      padding: 19px;
      margin-bottom: 20px;
      background-color: #f5f5f5;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    }
  }
</style>
