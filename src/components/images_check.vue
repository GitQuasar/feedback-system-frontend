<script setup>
defineProps({
  array_image: Array
})
</script>

<template>
  <img v-for="(item, index) in array_image" :key="index" :src="item" class="images_view" />
</template>

<style scoped>
.images_view {
  height: 4rem;
  width: 4rem;
  border-width: 1px;
  border-color: rgb(0 0 0);
  border-radius: 0.75rem;
}
</style>
