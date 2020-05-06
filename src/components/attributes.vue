<template>
    <div>
        <div>
            spent : {{spent}} / {{availableCp}}
        </div>
        <div class="attributes">
            <div v-for="(name, index) in attributesNames" :key="name" class="attribute">
                <div class="attribute-name">
                    {{name}} :
                </div>
                <button @click="decrement(name, index, attributes[name].baseMin, attributes[name].baseMax)">-</button>
                <div class="attribute-value">
                    {{attributes[name].value}} / {{attributes[name].baseMax}} ({{attributes[name].max}})
                </div>
                <button @click="increment(name, index, attributes[name].baseMin, attributes[name].baseMax)">+</button> 
            </div>
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
        },
        totalCp: {
            default: 300,
            type: Number
        }
    },
    data() {
        return {
            spent: 0,
            attributesNames: [
                'bod', 'agi', 'rea', 'str', 'cha', 'int', 'log', 'wil', 'ini'
            ],
            renders: [
                0, 0, 0, 0, 0, 0, 0, 0, 0
            ]
        }
    },
    watch: {
        race(nv, ov) {
            if(nv !== ov) {
                this.spent = 0
            }
        }
    },
    computed: {
        availableCp() {
            return this.totalCp / 2
        }
    },
    methods: {
        increment(name, index, min, max){
            const nb = this.attributes[name].value +1
            if(nb > max){
                //this.render[index]++
                return
            }
            let cost = 0
            if(nb < max) {
                cost = 10
            }
            else {
                cost = 25
            }
            if((this.spent + cost) > this.availableCp) {
                return
            }
            this.spent += cost
            this.attributes[name].value++
        },
        decrement(name, index, min, max){
            const nb = this.attributes[name].value -1
            if(nb < min){
                //this.render[index]++
                return
            }
            let cost = 0
            if(nb < max-1) {
                cost = 10
            }
            else {
                cost = 25
            }
            if((this.spent - cost) < 0) {
                return
            }
            this.spent -= cost 
            this.attributes[name].value--
        }
    }
  }
</script>

<style lang="scss" scoped>
    .attributes{
        display: flex;
        align-items: center;
        .attribute{
            margin-right: 20px;
            display: flex;
            align-items: center;
            .attribute-name{
                margin-right: 15px;
            }
            .attribute-value{
                margin: 0 15px;
            }
        }
    }
</style>
