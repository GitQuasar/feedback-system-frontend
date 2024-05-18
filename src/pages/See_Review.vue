<script setup>
import { ref, onMounted } from 'vue'
import Header_Review from '../components/Header_Review.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

const uuid = defineProps({
  uuid: String
})

const ReviewData = ref([])

onMounted(async () => {
  try {
    console.log(uuid)
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/reviews/actions/see_review/{id}?uuid=${uuid.uuid}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    ReviewData.value = data
  } catch (err) {
    console.log(err)
  }
})

function status(rev_stat) {
  if (rev_stat == 'Created') {
    return 'Рассматривается'
  } else {
    return 'Рассмотрено'
  }
}
</script>

<template>
  <div>
    <Header_Review />
    <div dir="rtl">
      <button
        class="flex bg-[#F1F4FF] border border-[#37383C] ml-10 mt-6 ms-[58px] text-xl rounded-lg px-5 py-2 transition hover:-translate-y-1 hover:shadow-xl"
      >
        ?
      </button>
    </div>
  </div>

  <div class="text-[#37383C] text-[64px] text-center my-[140px]">
    <b>Обратная связь:</b>
  </div>

  <div
    class="bg-[#F1F4FF] w-[1050px] h-[591px] m-auto rounded-[55px] border border-black -my-8 p-4"
  >
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="ml-2 font-bold">Отзыв от</p>
        <div class="bg-[#E5ECFF] border-solid border-2 border-black rounded-lg px-2">
          {{ ReviewData.review_creation_date }}
        </div>
      </div>
      <div class="flex gap-2 mr-2">
        <p class="font-bold">Статус:</p>
        <div class="bg-[#E5ECFF] border-solid border-2 border-black rounded-lg px-2">
          {{ status(ReviewData.review_status) }}
        </div>
      </div>
    </div>

    <div class="bg-[#E5ECFF] mt-2 border border-black rounded-3xl h-80 p-4 scrollbar">
      <p>
        {{ ReviewData.review_text }}
      </p>
    </div>
  </div>
  <br />

  <div
    class="bg-[#F1F4FF] w-[1050px] h-[324px] ml-[320px] p-4 rounded-[55px] border border-black my-10"
  >
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="ml-2 font-bold">Ответ от</p>
        <div class="bg-[#E5ECFF] border-solid border-2 border-black rounded-lg px-2">
          {{ ReviewData.manager_reply_datetime }}
        </div>
      </div>
      <div class="flex gap-2 mr-2">
        <p class="font-bold">ID менеджера:</p>
        <div class="bg-[#E5ECFF] border-solid border-2 border-black rounded-lg px-2">
          {{ ReviewData.replied_manager_id }}
        </div>
      </div>
    </div>
    <div class="bg-[#E5ECFF] mt-2 border border-black rounded-3xl h-[250px] p-4 scrollbar">
      <p>
        {{ ReviewData.manager_reply_text }}
      </p>
    </div>
  </div>

  <br />
  <br />
  <div>
    <Footer />
  </div>
</template>

<style scoped>
.scrollbar {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
