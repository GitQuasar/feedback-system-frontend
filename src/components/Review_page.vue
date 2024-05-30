<script setup>
import { inject, ref, onBeforeMount } from 'vue'
import axios from 'axios'
import images_check from './images_check.vue'

const { closeReview } = inject('reviewActions')
const {
  Rev_text,
  Rev_date,
  Rev_firstname,
  Rev_lastname,
  Rev_patronymic,
  Rev_department,
  Rev_email,
  Rev_uuid,
  Rev_status,
  Rev_reply_text,
  Rev_images
} = inject('reviewPage_Info')

const reply = ref('')
const images_array = []
onBeforeMount(async () => {
  for (let i = 0; i < Rev_images.value.length; i++) {
    images_array.push('/images/' + Rev_images.value[i])
  }
})
const SendReply = async () => {
  if (reply.value.length < 16) {
    alert('Текст ответа должен содержать не менее 16 символов')
    return
  }
  try {
    const ReplyData = {
      reply_text: reply.value,
      replied_manager_id: localStorage.getItem('manager_id')
    }
    await axios.post(
      `http://127.0.0.1:8000/api/manager/actions/add_reply?review_uuid=${Rev_uuid.value}`,
      ReplyData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  } catch (err) {
    console.log(err)
  } finally {
    closeReview()
    location.reload()
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-10"></div>
  <div
    class="fixed ml-[250px] mt-[50px] bg-white w-8/12 h-5/6 border border-black rounded-3xl p-4 z-20"
  >
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="ml-2 font-bold">Отзыв</p>
        <div class="bg-[#F1F4FF] border-solid border-2 border-black rounded-lg px-2">
          {{ Rev_date }}
        </div>
      </div>

      <button
        @click="closeReview"
        class="bg-[#37383C] border-solid border-2 border-[#37383C] rounded-lg px-2 text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
      >
        X
      </button>
    </div>

    <div class="mt-2 border border-black rounded-3xl h-60 bg-[#F1F4FF] p-4 scrollbar">
      <p>
        {{ Rev_text }}
      </p>
    </div>
    <div class="flex gap-4">
      <div class="relative mt-2 border border-black rounded-3xl h-60 w-1/2 bg-[#F1F4FF] p-4">
        <textarea
          v-if="Rev_status == 'Created'"
          v-model="reply"
          placeholder="Введите ответ"
          class="w-full h-full rounded-3xl bg-[#F1F4FF] resize-none"
        ></textarea>
        <p v-else>{{ Rev_reply_text }}</p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-4 mt-4">
          <images_check :array_image="images_array" />
        </div>
        <div v-if="Rev_firstname != null">
          <div class="flex flex-col border border-black rounded-3xl bg-[#F1F4FF] p-4 mt-4">
            <div class="flex flex-row">
              <p class="font-bold">Имя:</p>
              <p class="ml-1">{{ Rev_firstname }}</p>
            </div>
            <div class="flex flex-row">
              <p class="font-bold">Фамилия:</p>
              <p class="ml-1">{{ Rev_lastname }}</p>
            </div>
            <div class="flex flex-row">
              <p class="font-bold">Отчество:</p>
              <p class="ml-1">{{ Rev_patronymic }}</p>
            </div>
            <div class="flex flex-row">
              <p class="font-bold">Отдел:</p>
              <p class="ml-1">{{ Rev_department }}</p>
            </div>
            <div class="flex flex-row">
              <p class="font-bold">Email:</p>
              <p class="ml-1">{{ Rev_email }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="Rev_firstname == null"
          class="border border-black rounded-3xl bg-[#F1F4FF] p-4 mt-4 font-bold"
        >
          Заявитель решил остаться анонимным
        </div>
      </div>
    </div>
    <button
      v-if="Rev_status == 'Created'"
      @click="SendReply"
      class="mt-6 ml-[425px] bg-[#37383C] border-solid border-2 border-[#37383C] rounded-lg px-2 text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
    >
      Отправить
    </button>
  </div>
</template>

<style scoped>
.scrollbar {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
