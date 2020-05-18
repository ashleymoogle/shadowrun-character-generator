<template>
    <div>
        <div v-if="!isLoading">
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
        <div v-else>
            ...loading
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
            isLoading: true,
            spent: 0,
            hasOneMaxAttribute: false,
            attributesNames: [
                'bod', 'agi', 'rea', 'str', 'cha', 'int', 'log', 'wil', 'ini'
            ],
            renders: [
                0, 0, 0, 0, 0, 0, 0, 0, 0
            ]
        }
    },
    mounted() {
        const cost = this.attributesNames.reduce((acc, item) => {
            if(this.attributes[item].value !== this.attributes[item].baseMin){
                if(this.attributes[item].value === this.attributes[item].baseMax){
                    acc += (((this.attributes[item].value - (this.attributes[item].baseMin + 1)) * 10) + 25)
                }else {
                    acc += ((this.attributes[item].value - this.attributes[item].baseMin) * 10 )
                }
            }
            return acc
        }, 0)
        this.spent = cost
        this.isLoading = false
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
            return Math.floor(this.totalCp / 2)
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
                if(!this.hasOneMaxAttribute){
                    cost = 25
                    this.hasOneMaxAttribute = true
                } else {
                    return
                }
            }
            if((this.spent + cost) > this.availableCp) {
                return
            }
            this.spent += cost
            this.attributes[name].value++
            this.$emit("spent", cost)
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
                this.hasOneMaxAttribute = false
            }
            if((this.spent - cost) < 0) {
                return
            }
            this.spent -= cost 
            this.attributes[name].value--
            this.$emit("unspent", cost)
        }
    }
  }
</script>

<style lang="scss" scoped>
    .attributes{
        display: flex;
        flex-wrap: wrap;
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
