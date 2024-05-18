<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const showModal = ref(false)
const router = useRouter()

const link_uuid = ref(localStorage.getItem('link_info'))

const confirm = () => {
  showModal.value = false
  router.push({ name: 'Review', params: { uuid: link_uuid.value } })
}

const cancel = () => {
  showModal.value = false
}
</script>

<template>
  <div>
    <Header />
    <div dir="rtl">
      <button
        class="flex bg-[#F1F4FF] border border-[#37383C] ml-10 mt-6 ms-[58px] text-xl rounded-lg px-5 py-2 transition hover:-translate-y-1 hover:shadow-xl"
      >
        ?
      </button>
    </div>
  </div>

  <div class="text-[#37383C] text-[64px] text-center my-[150px]">
    <b>Спасибо!</b><br />
    <b>Ваш отзыв отправлен!</b>
    <div class="text-[#535353] text-[24px] text-center my-[50px]">
      <p>
        Для получения обратной связи отсканируйте и
        <span class="text-[#535353] text-[24px] font-[800]">сохраните</span> QR-код<br />
        или ссылку
      </p>
    </div>
  </div>

  <div
    class="bg-[#F1F4FF] w-[415px] h-auto m-auto rounded-[55px] border border-black -my-[100px] mb-8"
  >
    <div
      class="bg-[#FAFBFC] w-[384px] h-[350px] border border-dashed border-black ml-[15px] my-[30px]"
    >
      <img src="/qr.svg" alt="qr" class="w-[343px] h-[343px] ml-[19px]" />
    </div>
    <p class="underline text-[24px] mb-2 text-center">http://localhost:5173/{{ link_uuid }}</p>
  </div>
  <div
    v-if="showModal"
    class="bg-[#D0DAFC] opacity-[.97] w-[814px] h-[706px] m-auto -mt-[550px] rounded-[52px] border border-[#FF0000]"
  >
    <div
      class="bg-[#E8EDFB] w-[140px] h-[140px] m-auto rounded-full border border-[#FF0000] my-[50px]"
    >
      <p class="text-center text-[100px] -my-2 font-[500]">!</p>
    </div>
    <p class="text-center text-[30px] font-[500]">
      Вы уверены, что <span class="text-[30px] font-[700]">сохранили</span> QR-код или<br />
      ссылку?<br />
      Иначе просмотр обратной связи для вашего обращения станет недоступен.
    </p>
    <button
      @click="confirm"
      class="bg-[#37383C] w-[189px] h-[76px] ml-[100px] mt-[90px] rounded-[20px] text-white text-[30px] transition hover:-translate-y-1 hover:shadow-xl"
    >
      Да
    </button>

    <button
      @click="cancel"
      class="bg-[#37383C] w-[189px] h-[76px] ml-[220px] mt-[90px] rounded-[20px] text-white text-[30px] transition hover:-translate-y-1 hover:shadow-xl"
    >
      Нет
    </button>
  </div>

  <div>
    <button
      @click="showModal = true"
      class="bg-[#37383C] w-[158px] h-[52px] ml-[680px] mb-[100px] -my-[50px] rounded-lg text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
    >
      Ок
    </button>
  </div>
  <br />

  <br />
  <div>
    <Footer />
  </div>
</template>
