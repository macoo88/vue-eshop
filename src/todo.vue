<template>
  <div>
    <h1>Achuta</h1>

    {{ test }}
    <br>

    <button @click="click()">Click me</button>
    {{ score }}
  </div>

  <div>
    <h1>Jee Jee Atatin</h1>
    <input @keydown.enter="addItem()" v-model="input" type="text" placeholder="Haspivaka">
    <div class="container">
      <div v-for="(item, index) in items" class="item">
          {{ items[index] }}
          <div class="inputs">
            <button @click="rmItem(index, items[index])">X</button>
            <button @click="completeFunc(index, items[index])">:)</button>
          </div>
          
      </div>
    </div>
    <div class="container">
      <h1>Palyeeka</h1>
      <div v-for="(item, index) in complete" class="item">
        {{ item }}
      </div>
    </div>

    <div class="container">
      <h1>Bunky</h1>
      <div v-for="(item, index) in fails" class="item">
        {{ item }}
      </div>
    </div>

  </div>


</template>

<script lang="js" setup>
import { ref } from 'vue'

const test = ref("Yunkee wim")
const score = ref(0)

function click()
{
  score.value++
}

const items = ref([])
const complete = ref([])
const fails = ref([])
const input = ref("")


function addItem()
{
  if(input.value == "") return
  items.value.push(input.value)
  input.value = ""
}

function rmItem(index, item)
{
  fails.value.push(item)
  items.value.splice(index, 1)
}

function completeFunc(index, item)
{
  complete.value.push(item)
  items.value.splice(index, 1)
}





</script>


<style lang="css" scoped>
.container{
  background-color: rgb(49, 49, 49);
}
.item{
  display: flex;
  justify-content: space-between;
  gap: 100px;
  border: 1px solid black;
  margin-top: 10px;
}
.inputs{
  display: flex;
  gap: 4px;
}


</style>

