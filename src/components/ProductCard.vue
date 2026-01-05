<template>
<div class="item">
        <img :src="card.img" alt="" style="max-width: 200px;">
        <div style="display: flex; flex-direction: column;">
            <p>{{ props.card.description }}</p>
            <br>
            <strong style="margin-top: 10px;">{{ props.card.price }} Eur</strong>
        </div>
        
        <div>
          <p class="stock">In stock: {{ props.card.in_stock}}</p><br>
          <p @click="add" class="buyBtn">Add to cart</p>
      </div>
      </div>
</template>


<script setup>
//const props = defineProps(['name', 'description', 'price', 'img', "in_stock"]);
const props = defineProps({card: Object})


const emit = defineEmits(['add-to-cart'])

function add() {
  emit('add-to-cart', props.card)
}


</script>


<style>
.item{
  display: flex;
  background-color: rgb(33, 33, 33);
  border-radius: 2%;
  max-width: 210px;
  gap: 20px;
  flex-direction: column;  
}
.stock{
  background-color: rgba(0, 128, 0, 0.405);
  border-radius: 6px;
  padding: 5px;
  display: inline-block;
}
.buyBtn{
  background-color: rgba(44, 201, 201, 0.553);
  border-radius: 6px;
  padding: 5px;
  text-align: center;
  cursor: pointer;

}
</style>