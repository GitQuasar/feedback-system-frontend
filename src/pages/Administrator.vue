<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import FLName from '../components/FLName.vue'
import Staff_table from '../components/Staff_table.vue'

const admin_info = ref([])
const admin_firstname = ref('')
const admin_lastname = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get('http://127.0.0.1:8000/api/admin/pc/', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    admin_info.value = data
    admin_firstname.value = admin_info.value.first_name
    admin_lastname.value = admin_info.value.last_name
  } catch (err) {
    console.log(err)
  }
})

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/admin/actions/read_staff?is_admin=true&is_manager=false',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    items.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <Header />
  <FLName :name="admin_firstname" :lastname="admin_lastname" />
  <div class="text-[#37383C] text-[50px] text-center mt-[50px] mb-[50px]">
    <b class="ml-[95px] text-[#37383C] text-center thins-text">
      Список менеджеров и администраторов
    </b>
  </div>
  <Staff_table
    v-for="item in items"
    :key="item.id"
    :id="item.id"
    :first_name="item.first_name"
    :last_name="item.last_name"
    :admin="item.is_admin"
    :manager="item.is_manager"
  />
  <div class="flex justify-center p-5">
    <router-link to="/administrator/add_staff">
      <button
        class="bg-[#37383C] border-solid border-2 border-[#37383C] rounded-lg px-5 py-2 text-[#D0DAFC] transition hover:-translate-y-1 hover:shadow-xl"
      >
        Добавить сотрудника
      </button>
    </router-link>
  </div>
  <Footer />
</template>

<style scoped></style>
