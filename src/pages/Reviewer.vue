<script setup>
import Header_Review from '../components/Header_Review.vue'
import Start_text from '../components/Start_text.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const checked = ref(false)
// const showModal = ref(false)

// const imagePreview = ref('')
const images = ref([])
const containerHeight = ref(231) // начальная высота контейнера
const containerHeight1 = ref(269)
const up_images = new FormData()
const handleFileInputChange = (event) => {
  const files = event.target.files

  for (let i = 0; i < files.length; i++) {
    up_images.append('file', files[i])
    const reader = new FileReader()
    reader.onload = () => {
      // Устанавливаем миниатюру и увеличиваем высоту контейнера

      images.value.push(reader.result)
    }
    reader.readAsDataURL(files[i])
  }
  containerHeight1.value = 310
  containerHeight.value = 275
}
const deleteImage = (index) => {
  images.value.splice(index, 1)
}

const review_text = ref('')
const firstname = ref('')
const lastname = ref('')
const patronymic = ref('')
const email = ref('')
const department = ref('')
const link_uuid = ref('')
const router = useRouter()
const send_rewiew = async () => {
  if (review_text.value.length < 8) {
    alert('Текст отзыва должен содержать не менее 8 символов')
    return
  }
  const reviewData = new FormData()
  reviewData.append('review_text', review_text.value)
  reviewData.append('email', email.value)
  reviewData.append('first_name', firstname.value)
  reviewData.append('last_name', lastname.value)
  reviewData.append('patronymic', patronymic.value)
  reviewData.append('department', department.value)
  up_images.forEach((value) => reviewData.append('files_upload', value))
  try {
    link_uuid.value = await axios.post(
      'http://127.0.0.1:8000/api/reviews/actions/create_review',
      reviewData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    localStorage.setItem('link_info', link_uuid.value.data.review_uuid)
    localStorage.setItem('QR_base64', link_uuid.value.data.image_base64_bytes)
    router.push('/qr')
  } catch (err) {
    console.log(err)
    alert(
      'Произошла ошибка при создании отзыва! Были введены некорректные данные! Попробуйте ещё раз!'
    )
    return
  }
}

const download_instruction = async () => {
  try {
    axios
      .get('http://127.0.0.1:8000/api/reviewer/download/instruction', { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'инструкция_для_заявителя.pdf'
        link.click()
        URL.revokeObjectURL(link.href)
      })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <Header_Review />
    <div dir="rtl">
      <button
        @click="download_instruction"
        class="flex bg-[#F1F4FF] border border-[#37383C] ml-10 mt-6 ms-[58px] text-xl rounded-lg px-5 py-2 transition hover:-translate-y-1 hover:shadow-xl"
      >
        ?
      </button>
    </div>
  </div>
  <div>
    <Start_text />
  </div>

  <div class="text-[#37383C] centered-text mt-10">
    <b class="text-4xl">Оставить отзыв</b>
  </div>

  <div class="flex place-content-center gap-2 mt-5">
    <input
      type="checkbox"
      id="checkbox"
      v-model="checked"
      class="bg-[#D9D9D9] w-[30px] h-[30px] border-0"
    />
    <div for="checkbox" class="text-[24px]">НЕанонимно</div>
  </div>
  <br />
  <div v-if="checked" class="ml-8 text-[24px]">
    <b class="ml-[185px] text-[#37383C]"> Ваши персональные данные: </b>
    <img src="/icon.svg" alt="Icon" class="mt-2 w-[41px] h-[41px] ml-[191px]" />
    <input
      v-model="lastname"
      placeholder="Фамилия"
      class="bg-[#F1F4FF] w-[411px] h-[50px] ml-[185px] my-4 rounded-lg indent-4"
    />
    <input
      v-model="department"
      placeholder="Отдел"
      class="bg-[#F1F4FF] w-[411px] h-[50px] ml-[185px] my-4 rounded-lg indent-4"
    />
    <input
      v-model="firstname"
      placeholder="Имя"
      class="bg-[#F1F4FF] w-[411px] h-[50px] ml-[185px] my-4 rounded-lg indent-4"
    />
    <input
      v-model="email"
      placeholder="Почта"
      class="bg-[#F1F4FF] w-[411px] h-[50px] ml-[185px] my-4 rounded-lg indent-4"
    />
    <input
      v-model="patronymic"
      placeholder="Отчество"
      class="bg-[#F1F4FF] w-[411px] h-[50px] ml-[185px] my-4 rounded-lg indent-4"
    />
  </div>

  <div
    class="bg-[#F1F4FF] w-[974px] m-auto my-8 h-[269px] rounded-[55px] border border-black"
    :style="{ height: containerHeight1 + 'px' }"
  >
    <div
      class="relative bg-white w-[902px] m-auto my-8 mt-5 h-[231px] border-dashed border-black border"
      :style="{ height: containerHeight + 'px' }"
    >
      <div
        class="relative bg-white w-[901px] h-[190px] border-b border-r border-dashed border-black"
      >
        <textarea
          v-model="review_text"
          placeholder="Введите текст"
          class="w-[880px] h-[166px] indent-6 ml-2 my-3 text-lg resize-none"
        ></textarea>
      </div>
      <div>
        <label for="file-input">
          <img src="/clip.svg" alt="Clip" class="w-[41px] h-[41px] -my-[2px]" />
        </label>
        <input
          id="file-input"
          type="file"
          accept=".jpg, .jpeg, .png"
          @change="handleFileInputChange"
        />
      </div>

      <p v-if="images.length === 0" class="text-[#787A7D] ml-[50px] -my-[36px]">Прикрепить фото</p>
      <div class="flex ml-[30px]">
        <div class="image-container" v-for="(img, index) in images" :key="index">
          <img
            :src="img"
            alt="Preview"
            class="w-[75px] h-[75px] rounded-[20px] -my-[35px] ml-[20px]"
          />
          <span class="delete-icon" @click="deleteImage(index)">×</span>
        </div>
      </div>
    </div>
    <p class="text-slate-400 ml-10">
      *Количество файлов не должно превышать 6. Размер одного файла не должен превышать 4МБ.
      Поддерживаемые типы файлов: PNG, jpg, jpeg
    </p>
  </div>

  <br />

  <br />
  <button
    @click="send_rewiew"
    class="bg-[#37383C] w-[200px] mt-4 h-[52px] ml-[680px] rounded-lg text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
  >
    Отправить
  </button>

  <br />
  <br />
  <div>
    <Footer />
  </div>
</template>

<style scoped>
.centered-text {
  text-align: center;
}
input[type='file'] {
  display: none;
}

.image-container {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}
.delete-icon {
  position: absolute;
  top: -45px;
  right: -7px;
  cursor: pointer;
  font-size: 1.2em;
  color: #828282;
}
</style>
