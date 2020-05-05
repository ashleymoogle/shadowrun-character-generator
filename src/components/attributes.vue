<template>
  <div class="attributes">
      <div v-for="(name, index) in attributesNames" :key="name" class="attribute">
          {{name}} :
          <input v-model="attributes[name].value" type="number" :min="attributes[name].baseMin" :max="attributes[name].baseMax" @change="restrictAttr($event, name, index)" /> / {{attributes[name].baseMax}} ({{attributes[name].max}})
      </div>
  </div>
</template>

<script>
  export default {
    name: 'attributes',
    props: {
        race: {
            default: 'human',
            type: String
        },
        attributes: {
            default: () => {},
            type: Object

        }
    },
    data() {
        return {
            attributesNames: [
                'bod', 'agi', 'rea', 'str', 'cha', 'int', 'log', 'wil', 'ini'
            ],
            renders: [
                0, 0, 0, 0, 0, 0, 0, 0, 0
            ]
        }
    },
    methods: {
        restrictAttr(e, name, index) {
            const nb = e.target.value
            const min = e.target.min
            const max = e.target.max
            if(this.nb < min) {
                this.attributes[name].value = min
            }
            if(nb > max ){
                this.attributes[name].value = max
                
            }
            this.render++
      },
    }
  }
</script>

<style lang="scss" scoped>
    .attributes{
        display: flex;
        align-items: center;
        .attribute{
            margin-right: 20px;
        }
    }
</style>
