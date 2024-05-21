<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const Adm_id = ref(localStorage.getItem('Adm_id'))

const last_name = ref('')
const first_name = ref('')
const patronymic = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const UpdateInfo = async () => {
  const StaffData = {
    email: `${email.value}`,
    first_name: `${first_name.value}`,
    last_name: `${last_name.value}`,
    patronymic: `${patronymic.value}`,
    password: `${password.value}`
  }
  try {
    await axios.patch(
      `http://127.0.0.1:8000/api/admin/actions/update_staff/${Adm_id.value}`,
      StaffData,
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
    router.push('/Administrator')
  }
}
</script>

<template>
  <div>
    <Header />
  </div>

  <div>
    <div class="text-[#37383C] text-[50px] text-center my-[150px]">
      <b class="ml-[95px] text-[#37383C] text-center thins-text">
        Список менеджеров и администраторов
      </b>
    </div>
    <div class="bg-[#FBFDFF] w-[974px] m-auto my-4 h-[900px] rounded-[55px] border">
      <div class="text-[#000000] text-[29px] my-[20px] mx-[40px]" style="font-style: italic">
        <b>Изменить данные о сотруднике:</b>
        <br />
        <br />
        <input
          v-model="last_name"
          placeholder="Фамилия"
          class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 m-auto rounded-lg indent-4"
        />
        <input
          v-model="first_name"
          placeholder="Имя"
          class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 rounded-lg indent-4"
        />
        <input
          v-model="patronymic"
          placeholder="Отчество"
          class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 rounded-lg indent-4"
        />
        <input
          v-model="email"
          placeholder="Email"
          class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 rounded-lg indent-4"
        />

        <input
          v-model="password"
          placeholder="Пароль"
          class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 rounded-lg indent-4"
        />
      </div>
      <br />

      <button
        @click="UpdateInfo(id)"
        class="bg-[#37383C] w-[250px] h-[52px] ml-[350px] mb-[100px] rounded-lg text-[#DADCFF] transition hover:-translate-y-1 hover:shadow-xl"
      >
        Сохранить изменения
      </button>
      <br />
    </div>
  </div>
  <br />
  <div>
    <Footer />
  </div>
</template>

<style scoped>
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.thin-text {
  font-weight: 300;
}
.thins-text {
  font-weight: 400;
}
</style>
