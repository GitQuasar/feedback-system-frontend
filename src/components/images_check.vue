<script setup>
import image_show from './image_show.vue'
defineProps({
  array_image: Array
})
</script>

<template>
  <image_show v-for="(item, index) in array_image" :key="index" :image="item" />
</template>

<style scoped></style>
