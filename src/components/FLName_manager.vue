<script setup>
import axios from 'axios'

defineProps({
  name: String,
  lastname: String
})

const download_instruction = async () => {
  try {
    axios
      .get('http://127.0.0.1:8000/api/manager/download/instruction', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'инструкция_для_менеджера.pdf'
        link.click()
        URL.revokeObjectURL(link.href)
      })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="flex mt-8 ml-8 justify-between">
    <div class="flex">
      <img src="/icon.svg" alt="icon" class="w-[80px] h-[80px]" />
      <p
        class="bg-[#F1F4FF] w-[430px] h-[50px] ml-[10px] my-4 rounded-lg indent-4 text-[#000000] text-[30px] text-mt-[0px] thin-text"
        style="display: inline-block"
      >
        {{ name }} {{ lastname }}
      </p>
    </div>

    <div dir="rtl">
      <button
        @click="download_instruction"
        class="flex bg-[#F1F4FF] border border-[#37383C] ml-10 mt-6 ms-[58px] text-xl rounded-lg px-5 py-2 transition hover:-translate-y-1 hover:shadow-xl"
      >
        ?
      </button>
    </div>
  </div>
</template>
<style scoped>
.thin-text {
  font-weight: 300;
}
</style>
