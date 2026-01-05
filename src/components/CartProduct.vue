<template>

<div class="cart-item">
    <div class="head">
        <img :src="item.product.img" alt="ico" class="icon">
        <p>{{ props.item.product.name }}</p>
        <p>{{ props.item.product.price }}Eur</p>
    </div>

    <div class="amount">
        <button @click="emit('decrese')">-</button>
        <p>{{ props.item.amount }}</p>
        <button @click="emit('add')">+</button>
    
        <p>Together: {{ props.item.product.price * props.item.amount }}Eur</p>
    </div>

    <button @click="emit('remove')">Remove</button>
</div>

</template>

<script setup>

const props = defineProps({item: Object});

const emit = defineEmits(['add', 'decrese', 'remove']);
</script>

<style>
.cart-item{
    border: 1px solid white;
    margin-top: 20px;
    padding-left: 25px;
}
.head{
    display: flex;
    gap: 10px;
}
.amount{
    display: flex;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.amount button{
    max-height: 25px;
}
.amount *{
    margin: 0;
}
.icon{
    max-width: 50px;

}
</style>