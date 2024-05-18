<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import Header_Review from '../components/Header_Review.vue'
import Footer from '../components/Footer.vue'

const username = ref('')
const password = ref('')
const token = ref('')
const router = useRouter()
const role = ref('')

const showError = ref(false)

const login = async () => {
  const loginData = {
    username: `${username.value}`,
    password: `${password.value}`
  }
  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/token', loginData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    token.value = data.access_token
    role.value = data.role
  } catch (err) {
    console.log(err)
  } finally {
    if (role.value == 'Manager') {
      router.push(`/manager`)
    }
    if (role.value == 'Administrator') {
      router.push(`/administrator`)
    }
    localStorage.setItem('token', token.value)
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

  <p class="text-[#37383C] text-[64px] text-center font-[700] my-[150px]">Авторизация</p>
  <input
    v-model="username"
    placeholder="Логин"
    class="bg-[#F1F4FF] ml-[541px] -my-[50px] w-[446px] h-[68px] text-[32px] font-[100] rounded-lg indent-4"
  />
  <input
    v-model="password"
    placeholder="Пароль"
    class="bg-[#F1F4FF] ml-[541px] my-[50px] w-[446px] h-[68px] text-[32px] font-[100] rounded-lg indent-4"
  />
  <p v-if="showError" class="text-red-600 font-bold ml-[550px]">
    Ошибка авторизации! Неверный логин или пароль!
  </p>
  <button
    @click="login"
    class="bg-[#37383C] w-[118px] h-[44px] ml-[705px] mb-[300px] my-[40px] rounded-lg text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
  >
    ВОЙТИ
  </button>

  <div>
    <Footer />
  </div>
</template>
