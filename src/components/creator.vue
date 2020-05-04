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
  import tooltip from './partials/tooltip.vue'
  export default {
    name: 'class-view',
    components: { tooltip },
    data() {
      return {
        isLoading: true
      }
    },
    mounted() {
      this.isLoading = false
    }
      // +10 points par stat
      // +25 pour le dernier point max
      // Une seule stat peut etre max
      // Pas plus de la moitie du total des points
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
