<template>
  <div class="wrapper-class">
    <div v-if="!isLoading" >
      <div class="line-element">
        CP : <input v-model="cp" type="number" :min="cpLeft" max="1000" @input="restrictCp" />
      </div>
      <div class="line-element">
        cp: {{cp}} / left: {{cpLeft}}
      </div>
      <div class="line-element">
          <attributes :race="char.race" :attributes="char.attributes" /> 
      </div>
      <tree-view :data="char" :options="{maxDepth: 100}"></tree-view>
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script>
  import mapRaces from '../data/races'
  import attributes from './attributes.vue'
  import tooltip from './partials/tooltip.vue'
  export default {
    name: 'class-view',
    components: { attributes, tooltip },
    data() {
      return {
        spent: 0,
        isLoading: true,
        cp: 300,
        char: {
          race: 'human',
          traits: mapRaces['human'].traits,
          attributes: mapRaces['human'].attributes 
        }
      }
    },
    computed: {
      cpAfterRace() {
        return this.cp - mapRaces[this.char.race].cost
      },
      cpLeft() {
        return this.cpAfterRace - this.spent
      }
    },
    mounted() {
      this.isLoading = false
    },
    methods: {
      restrictCp(e) {
        const nb = e.target.value
        if(this.cpLeft <= 0) {
          this.cp = nb - this.cpLeft
          this.render++
        }
        if(nb > 1000){
          this.cp = 1000
        }
      },
      spend(nb){
        this.spent += nb
      },
      unspend(nb){
        if(this.spent - nb >= 0){
          this.spent -= nb
        }
      }
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
    .line-element{
      margin-bottom: 20px;
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
