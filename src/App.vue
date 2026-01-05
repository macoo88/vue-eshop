<template>
<div class="body" style="background-color: rgb(33, 33, 33); min-height: 100vh;">
  <div v-if="showThankYou" class="overlay">
    <div class="popup">
      <p>Thank you for your purchase</p>
      <button @click="showThankYou = false">Close</button>
    </div>
  </div>

  <header>
    <div class="flex_gap" style="gap: 50px;">
      <img src="/home/macoo/Pictures/Screenshots/screenshot_1759932291.png" alt="" style="width: 100%; height: 22.33px;" class="marge">
      <p class="marge">Home</p>
      <p class="marge">Idk</p>
    </div>
    <div style="border: 1px solid white; border-radius: 2%; ">
      <input class="marge" id="search" type="text" placeholder="Search..." style="width: 400px; border: none;" v-model="search">
      <!--<button class="marge" style="border: none; cursor: pointer; " type="submit">|O-|</button>-->
    </div>
    <div>
      <p @click="cartOpen = true" class="marge" style="cursor: pointer;">🛒{{ totalInCart }}</p>
    </div>
  </header>

  <Drawer v-model:visible="cartOpen" position="right">
    <h3>Shopping Cart</h3>
    <h4 v-if="cartEmpty">Cart is empty</h4>
    <div>
      <CartProduct v-for="cartitem in cart"
      :key="cartitem.name"
      :item="cartitem"
      @add="cartitem.amount++;"
      @decrese="cartitem.amount = cartitem.amount > 1 ? cartitem.amount-1 : 1;"
      @remove="cart = cart.filter(i => i !== cartitem);"
      />
    </div>
    <div v-if="!cartEmpty" style="display: flex; gap: 50px; padding-top: 50px;">
      <button style="width: 100px; padding: 5px; border: 0.5px solid white;" class="BuyAllBtn" @click="Buy" >Buy</button>
      <p style="margin: 0;">Total {{ totalPriceAll }} Eur</p>
    </div>
    </Drawer
  >

  <div class="items_container">

    <div class="fliltre">
      <p style="margin: 0;">fliltres</p>
      
      <select v-model="selected_category">
        <option value="All">All</option>
        <option value="small_components">Small components</option>
        <option value="building_kit">Building kits</option>
      </select>

      <select v-model="price_sort">
        <option value="none">No sorting</option>
        <option value="asc">Price ↑</option>
        <option value="desc">Price ↓</option>
      </select>
    </div>

    <div class="items_list">
      <ProductCard
        v-for="(card, index) in filteredProducts"
        :key="card.name"
        :card="card"
        @add-to-cart="addToCart"
      />

    </div>

  </div>
  
  


  <footer></footer>
</div>

</template>

<script lang="js" setup>
import { ref, computed } from 'vue';
//1764067648 door
//1759932291 door
import products from './products.json';
import ProductCard from './components/ProductCard.vue';

import CartProduct from './components/CartProduct.vue';

import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog'


const cartOpen = ref(false);
const cart = ref([]);

function addToCart(product) 
{
  const exists = cart.value.find(item =>{
    return item.product.name === product.name;
  })
    
  if(exists)
  {
    exists.amount++;
  }
  else{
    cart.value.push({product: product,amount: 1 });
  }

  cartOpen.value = true;
}

const totalInCart = computed(() => cart.value.reduce((sum, item) => sum + item.amount, 0));
const totalPriceAll = computed(() => cart.value.reduce((sum, item) => sum + item.amount * item.product.price, 0));

const cartEmpty = computed(() => {
  if(cart.value.length !== 0)
  { return false; }
  else{ return true; } 
})

const showThankYou = ref(false);
function Buy()
{
  showThankYou.value = true;
  cart.value = [];
  cartOpen.value = false;

}

// reactive variable (Vue watches it)
const selected_category = ref("All");
const price_sort = ref("none");
const search = ref("");

// computed = recalculates automatically when selected_category changes
const filteredProducts = computed(() => {
  let resoult = [...products];
  if(selected_category.value !== "All")
  {
      resoult = resoult.filter(resoult =>
        resoult.category === selected_category.value
      )
  }

  if(search.value !== "")
  {
    resoult = resoult.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (price_sort.value === "asc") {
    resoult = resoult.sort((a, b) => a.price - b.price)
  }

  if (price_sort.value === "desc") {
    resoult = resoult.sort((a, b) => b.price - a.price)
  }

  

  return resoult
  
})



</script>


<style lang="css">

html, body {
  margin: 0;
  padding: 0;
  background-color: #111;
  height: 100%;
}

#app {
  min-height: 100vh;
  background-color: #111;
}


/* Overlay behind drawer */
.p-drawer-mask {
  background-color: rgba(20, 20, 20, 0.6);
}

/* Drawer container */
.p-drawer {
  background-color: #111 !important;
  color: white;
}

/* Drawer content */
.p-drawer-content {
  background-color: #111 !important;
  color: white;
}

/* Header / footer if present */
.p-drawer-header,
.p-drawer-footer {
  background-color: #111 !important;
  color: white;
}


p, h1, h2, h3, strong{
  color: white;
}
button{
  cursor: pointer;
}

header{
  display: flex;
  justify-content: space-between;
  background-color: rgb(45, 45, 45);
}

.flex_gap{
  display: flex;
  gap: 5px;
}
.items_list{
  display: grid;
  column-gap: 100px;
  row-gap: 100px;
  grid-template-columns: repeat(auto-fill, 186px);
}
.item{
  display: flex;
  background-color: rgb(33, 33, 33);
  border-radius: 2%;
  max-width: 210px;
  gap: 20px;
  flex-direction: column;  
}
.marge{
  margin-top: 16px;
  margin-bottom: 16px;
}
.fliltre{
  gap: 50px;
  display: flex;
  margin-bottom: 50px;
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
}
.items_container{
  margin: 300px;
}

.BuyAllBtn{
  background-color: rgba(0, 128, 0, 0.405);
  color: white;
}

.overlay{
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #111;
  padding: 50px;
  border: 2px solid white;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
}
.overlay p{
  margin-top: 0;
}
.popup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}
</style>

