<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

const last_name = ref('')
const first_name = ref('')
const patronymic = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const role_Staff = ref('')
const router = useRouter()

const Select_Role = (role) => {
  if (role == 'Менеджер') {
    role_Staff.value = 'Manager'
  } else if (role == 'Администратор') {
    role_Staff.value = 'Administrator'
  }
}

const Add_Staff = async () => {
  Select_Role(role.value)
  const Add_Staff_Data = {
    first_name: `${first_name.value}`,
    last_name: `${last_name.value}`,
    patronymic: `${patronymic.value}`,
    email: `${email.value}`,
    password: `${password.value}`,
    user_type: `${role_Staff.value}`
  }
  try {
    await axios.post('http://127.0.0.1:8000/api/admin/actions/add_staff', Add_Staff_Data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    router.push('/administrator')
  }
}
</script>

<template>
  <div>
    <Header />
  </div>

  <div class="py-8">
    <div class="bg-[#FBFDFF] w-[974px] m-auto my-4 h-[900px] rounded-[55px] border">
      <div class="text-[#000000] text-[29px] my-[20px] mx-[40px]" style="font-style: italic">
        <b>Новый сотрудник:</b>
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
        <div>
          <select
            v-model="role"
            class="bg-[#E3E9FF] w-[411px] h-[50px] ml-[60px] my-4 rounded-lg indent-4"
          >
            <option>Менеджер</option>
            <option>Администратор</option>
          </select>
        </div>
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
        @click="Add_Staff"
        class="bg-[#37383C] w-[250px] h-[52px] ml-[350px] mb-[100px] rounded-lg text-[#DADCFF] transition hover:-translate-y-1 hover:shadow-xl"
      >
        Добавить нового сотрудника
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
