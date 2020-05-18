<template>
    <div :key="render">
        <div v-if="!isLoading">
            <div v-for="(groupItem, group, indexGroup) in skills" :key="group" class="skill-group">
                <div class="group">
                    <div class="group-name">
                        {{group}} :
                    </div>
                    <button @click="decrement(true, group, indexGroup, group)">-</button>
                    <div class="attribute-value">
                        {{skills[group].value}}
                    </div>
                    <button @click="increment(true, group, indexGroup, group)">+</button> 
                </div>
                <div v-for="(skillItem, skill, indexSkill) in groupItem.skills" :key="skill" class="skill">
                    <div class="skill-name">
                        {{skill}} :
                    </div>
                    <button @click="decrement(false, skill, indexSkill, group)">-</button>
                    <div class="attribute-value">
                        {{skills[group].skills[skill].value}}
                    </div>
                    <button @click="increment(false, skill, indexSkill, group)">+</button> 
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
    name: 'skills',
    props: {
        skills: {
            default: () => {},
            type: Object
        },
        left: {
            default: 300,
            type: Number
        }
    },
    data() {
        return {
            isLoading: true,
            spent: 0,
            render: 0
        }
    },
    mounted() {
        /*
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
        */
       console.log(this.skills)
        this.isLoading = false
    },
    computed: {
        hasOneGroupMax() {
            return false
        },
        hasOneSkillMax() {
            return false
        }
    },
    methods: {
        increment(isGroup, name, index, group){
            let cost = 0
            if(isGroup) {
                cost = 10
                this.skills[name].value++
                Object.keys(this.skills[name].skills).map((item) => {
                    this.skills[name].skills[item].value++
                }) 
            }
            else {
                cost = 4
                this.skills[group].skills[name].value++
            }
            this.spent += cost
            this.render++
            this.$emit("spent", cost)
        },
        decrement(isGroup, name, index, group){
            let cost = 0
            if(isGroup) {
                if(this.skills[name].value === 0){
                    return
                }
                cost = 10
                this.skills[name].value--
                Object.keys(this.skills[name].skills).map((item) => {
                    this.skills[name].skills[item].value--
                }) 
            }
            else {
                if(this.skills[group].skills[name].value === 0){
                    return
                }
                cost = 4
                this.skills[group].skills[name].value--
            }
            this.spent -= cost 
            this.render++
            this.$emit("unspent", cost)
        }
    }
  }
</script>

<style lang="scss" scoped>
    .skill-group {
        margin-bottom: 10px;
        .group {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 18px;
        }
        .skill {
            display: flex;
            align-items: center;    
            padding-left: 20px;
        }
    }
</style>
