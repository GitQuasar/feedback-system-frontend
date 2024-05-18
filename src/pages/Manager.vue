<script setup>
import { ref, provide, onMounted } from 'vue'
import axios from 'axios'

import Header from '../components/Header.vue'
import FLName from '../components/FLName.vue'
import Table_Header from '../components/Table_Header.vue'
import Review_Info from '../components/Review_Info.vue'
import Footer from '../components/Footer.vue'
import Review_page from '../components/Review_page.vue'
import Paginate from 'vuejs-paginate-next'

const reviewOpen = ref(false)

const openReview = () => {
  reviewOpen.value = true
}

const closeReview = () => {
  reviewOpen.value = false
}

const Rev_text = ref('')
const Rev_date = ref('')
const Rev_firstname = ref('')
const Rev_lastname = ref('')
const Rev_patronymic = ref('')
const Rev_department = ref('')
const Rev_email = ref('')
const Rev_uuid = ref('')
const Rev_status = ref('')
const Rev_reply_text = ref('')

provide('reviewPage_Info', {
  Rev_text,
  Rev_date,
  Rev_firstname,
  Rev_lastname,
  Rev_patronymic,
  Rev_department,
  Rev_email,
  Rev_uuid,
  Rev_status,
  Rev_reply_text
})

provide('reviewActions', { openReview, closeReview })

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/manager/actions/see_reviews?page=1',
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

const manager_info = ref([])
const manager_firstname = ref('')
const manager_lastname = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get('http://127.0.0.1:8000/api/manager/pc/', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    manager_info.value = data
    manager_firstname.value = manager_info.value.first_name
    manager_lastname.value = manager_info.value.last_name
    localStorage.setItem('manager_id', manager_info.value.id)
  } catch (err) {
    console.log(err)
  }
})

const rows = ref(3)
const perPage = ref(1)
const currentPage = ref(2)
</script>

<template>
  <Review_page v-if="reviewOpen" />
  <Header />
  <FLName :name="manager_firstname" :lastname="manager_lastname" />
  <Table_Header />
  <Review_Info
    v-for="item in items"
    :key="item.uuid"
    :uuid="item.uuid"
    :review_text="item.review_text"
    :date="item.review_creation_date"
    :status="item.review_status"
    :firstname="item.first_name"
    :lastname="item.last_name"
    :patronymic="item.patronymic"
    :email="item.email"
    :reply_text="item.manager_reply_text"
    :department="item.department"
    @open-review="openReview"
  />
  <Paginate
    v-model="currentPage"
    :page-count="rows"
    :page-range="perPage"
    :margin-pages="2"
    :click-handler="() => {}"
    :prev-text="'Назад'"
    :next-text="'Вперед'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  />

  <Footer />
</template>

<style></style>
