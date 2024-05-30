<script setup>
import { ref, provide, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import Header from '../components/Header.vue'
import FLName_manager from '../components/FLName_manager.vue'
import Table_Header from '../components/Table_Header.vue'
import Review_Info from '../components/Review_Info.vue'
import Footer from '../components/Footer.vue'
import Review_page from '../components/Review_page.vue'
import Paginate from 'vuejs-paginate-next'

const reviewOpen = ref(false)
const router = useRouter()
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
const Rev_images = ref([])

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
  Rev_reply_text,
  Rev_images
})

provide('reviewActions', { openReview, closeReview })

const items = ref([])

const search_reviews = ref('')

const sorted_status = ref(false)

const sort_by_status = async () => {
  sorted_status.value = !sorted_status.value
  try {
    const { data } = await axios.get('http://127.0.0.1:8000/api/manager/actions/see_reviews', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (sorted_status.value) {
      data.sort(function (a, b) {
        if (a.review_status < b.review_status) return -1
        if (a.review_status > b.review_status) return 1
        return 0
      })
    }
    localStorage.setItem('reviews', JSON.stringify(data))
    pagination_items_total.value = JSON.parse(localStorage.getItem('reviews')).length
    changePage(page.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  if (search_reviews.value === '') {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/api/manager/actions/see_reviews', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (sorted_status.value) {
        data.sort(function (a, b) {
          if (a.review_status < b.review_status) return -1
          if (a.review_status > b.review_status) return 1
          return 0
        })
      }
      localStorage.setItem('reviews', JSON.stringify(data))
      pagination_items_total.value = JSON.parse(localStorage.getItem('reviews')).length
      changePage(page.value)
    } catch (err) {
      console.log(err)
    }
  } else {
    search(search_reviews.value)
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

const search = async (search_text) => {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/manager/actions/search_in_reviews/?search_text=${search_text}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    localStorage.setItem('reviews', JSON.stringify(data))
    pagination_items_total.value = JSON.parse(localStorage.getItem('reviews')).length
    changePage(page.value)
  } catch (err) {
    console.log(err)
  }
}

const page = ref(1)
const pagination_items_on_page = ref(20)
const pagination_offset = ref(0)
const pagination_items_total = ref()
const changePage = async (page_num) => {
  try {
    page.value = page_num
    pagination_offset.value =
      pagination_items_on_page.value * page_num - pagination_items_on_page.value
    if (page_num === 1) {
      router.push('/manager')
    } else {
      router.push('/manager?page=' + page_num)
    }
    items.value = JSON.parse(localStorage.getItem('reviews')).slice(
      pagination_offset.value,
      pagination_items_on_page.value * page.value
    )
    window.scroll(0, 0)
  } catch (err) {
    console.log(err)
  }
}

const pagesCount = computed(() => {
  return Math.ceil(pagination_items_total.value / pagination_items_on_page.value)
})
</script>

<template>
  <Review_page v-if="reviewOpen" />
  <Header />
  <FLName_manager :name="manager_firstname" :lastname="manager_lastname" />
  <Table_Header />
  <div class="flex justify-between">
    <div class="flex flex-row">
      <input
        v-model="search_reviews"
        placeholder="Поиск"
        class="w-[250px] h-[50px] border-solid border-2 border-[#37383C] ml-[150px] rounded-lg px-5 py-2 text-[#37383C] text-center thins-text"
      />
      <button
        class="h-[40px] mt-1 bg-[#F1F4FF] border-solid border-2 border-[#37383C] rounded-lg transition hover:-translate-y-1 hover:shadow-xl ml-2"
        @click="search(search_reviews)"
      >
        <img src="/search.svg" alt="search" />
      </button>
    </div>
    <div class="flex gap-2 mr-[200px]">
      <p class="text-sm mt-3">Сначала не рассмотренные</p>
      <button
        @click="sort_by_status"
        class="h-[40px] mt-1 bg-[#F1F4FF] rounded-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <img src="/arrows.svg" alt="arrows" />
      </button>
    </div>
  </div>

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
    :images="item.images.filenames"
    @open-review="openReview"
  />
  <Paginate
    v-model="page"
    :page-count="pagesCount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="changePage"
    :prev-text="'<'"
    :next-text="'>'"
    :container-class="'pagination flex justify-contect-center flex-wrap'"
    :page-class="'page-item'"
  />

  <Footer class="mt-[149px]" />
</template>

<style>
.pagination {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  justify-content: center;
  gap: 0.25rem;
}
.page-item {
  border-width: 1px;
  border-color: rgba(120, 122, 125, 1);
  background: rgba(229, 236, 255, 1);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}
.page-item:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
