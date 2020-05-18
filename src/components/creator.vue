<template>
  <div class="wrapper-class">
    <div v-if="!isLoading" >
      <div class="line-element">
        CP : <input v-model="cp" type="number" :min="cpLeft-1" max="1000" @input="restrictCp" />
      </div>
      <div class="line-element">
        cp: {{cp}} / left: {{cpLeft}}
      </div>
      <div class="line-element">
        <select v-model="race">
          <option v-for="raceName in races" :key="raceName" >
            {{raceName}} 
          </option>
        </select>
        / cost : {{raceCost}}
      </div>
      <div class="line-element">
          <attributes :race="race" :attributes="attributes" :total-cp="castCpToInt" @spent="spendInAttributes" @unspent="unspendInAttributes"/> 
      </div>
      <div class="line-element">
        <skills :skills="skills" :left="cpLeft" @spent="spend" @unspent="unspend" />
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
  import mapSkills from '../data/skills'
  import skills from './skills.vue'
  import attributes from './attributes.vue'
  import tooltip from './partials/tooltip.vue'
  export default {
    name: 'creator',
    components: { skills, attributes, tooltip },
    data() {
      return {
        spent: 0,
        spentInAttributes: 0,
        isLoading: true,
        cp: 300,
        race: 'human',
        races: ['human', 'ork', 'dwarf', 'elf', 'troll']
      }
    },
    computed: {
      skills() {
        return mapSkills
      },
      castCpToInt() {
        return parseInt(this.cp)
      },
      canReduceTotal() {
        return Math.floor(this.cp / 2) >= this.spentInAttributes
      },
      cpAfterRace() {
        return this.cp - mapRaces[this.race].cost
      },
      raceCost() {
        return mapRaces[this.race].cost
      },
      cpLeft() {
        return this.cpAfterRace - this.spent
      },
      traits() {
        return mapRaces[this.race].traits
      },
      attributes() {
        return mapRaces[this.race].attributes 
      },
      char() {
        return {
          cp: this.cp,
          race: this.race,
          traits: this.traits,
          attributes: this.attributes,
          skills: this.skills
        }
      }
    },
    mounted() {
      this.isLoading = false
    },
    methods: {
      restrictCp(e) {
        const nb = parseInt(e.target.value)
        if(!this.canReduceTotal){
          this.cp++
        }
        if(this.cpLeft <= 0) { // en fonction des races
          this.cp = nb - this.cpLeft
          return
        }
        if(nb > 1000){
          this.cp = 1000
          return
        }
      },
      spend(nb){
        this.spent += nb 
      },
      unspend(nb){
        if(this.spent - nb >= 0){
          this.spent -= nb
        }
      },
      spendInAttributes(nb){
        this.spentInAttributes += nb 
        this.spend(nb)
      },
      unspendInAttributes(nb){
        if(this.spentInAttributes - nb >= 0){
          this.spentInAttributes -= nb
          this.unspend(nb)
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
