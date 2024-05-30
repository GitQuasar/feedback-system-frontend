<script setup>
import { ref } from 'vue'

defineProps({
  image: String
})

const image_fiew = ref(false)

function open() {
  image_fiew.value = true
  alert('Для закрытия окна с фотографией нажмите вне её области!')
}
</script>

<template>
  <div v-if="image_fiew">
    <div
      @click="image_fiew = false"
      class="fixed cursor-pointer top-0 left-0 h-full w-full bg-black opacity-70 z-30"
    ></div>
    <div class="fixed i_p w-3/5 border border-black z-40">
      <img :src="image" class="" />
    </div>
  </div>

  <button @click="open">
    <img :src="image" class="images_view" />
  </button>
</template>

<style scoped>
.images_view {
  height: 4rem;
  width: 4rem;
  border-width: 1px;
  border-color: rgb(0 0 0);
  border-radius: 0.75rem;
}
.i_p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
