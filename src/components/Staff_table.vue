<script setup>
import { ref } from 'vue'
import axios from 'axios'
defineProps({
  first_name: String,
  last_name: String,
  admin: Boolean,
  manager: Boolean,
  id: String,
  is_active: Boolean
})

const Adm_id = ref('')

function Revv(id) {
  Adm_id.value = id
  localStorage.setItem('Adm_id', Adm_id.value)
}

function role_staff(admin) {
  if (admin) {
    return 'Администратор'
  } else {
    return 'Менеджер'
  }
}

const ban_Staff = async (id) => {
  const ban_staff = {
    is_active: `${false}`
  }
  try {
    await axios.patch(`http://127.0.0.1:8000/api/admin/actions/update_staff/${id}`, ban_staff, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    location.reload()
  }
}
const unban_Staff = async (id) => {
  const ban_staff = {
    is_active: `${true}`
  }
  try {
    await axios.patch(`http://127.0.0.1:8000/api/admin/actions/update_staff/${id}`, ban_staff, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    location.reload()
  }
}
</script>

<template>
  <div
    class="flex bg-white border border-black justify-between rounded-3xl p-4 mt-4 mr-[120px] ml-[120px]"
  >
    <div class="flex gap-2">
      <img src="/icon.svg" alt="icon_admin" class="w-12 h-12 mt-[25px]" />
      <div class="flex flex-col item_review min-w-[400px] max-w-[400px] max-h-[100px]">
        <div class="-mt-3">
          <p>{{ role_staff(admin) }}</p>
          <p class="font-semibold">{{ first_name }} {{ last_name }}</p>
        </div>
      </div>
    </div>
    <div v-if="!is_active" class="item_review_ban mt-8">
      <p class="text-red-700 font-bold">Заблокирован</p>
    </div>
    <div class="flex gap-14">
      <router-link to="/administrator/update_staff">
        <button
          @click="Revv(id)"
          class="item_review_button border-[#D0DAFC] mt-5 bg-[#D0DAFC] max-h-[50px] rounded-2xl text-center text-black transition hover:-translate-y-1 hover:shadow-xl"
        >
          <p class="-mt-4">Изменить</p>
        </button>
      </router-link>
      <button
        v-if="is_active"
        @click="ban_Staff(id)"
        class="item_review_button border-[#37383C] bg-[#37383C] text-center text-[#DADCFF] rounded-3xl transition hover:-translate-y-1 hover:shadow-xl"
      >
        Заблокировать
      </button>
      <button
        v-else
        @click="unban_Staff(id)"
        class="item_review_button border-[#37383C] bg-[#37383C] text-center text-[#DADCFF] rounded-3xl transition hover:-translate-y-1 hover:shadow-xl"
      >
        Разблокировать
      </button>
    </div>
  </div>
</template>

<style scoped>
.item_review {
  background: rgba(241, 244, 255, 1);
  border-width: 1px;
  border-color: rgb(0 0 0);
  padding: 2rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  line-height: 1.75rem;
}
.item_review_ban {
  font-size: 1.2rem;
  max-height: 5rem;
}

.item_review_button {
  border-width: 1px;
  padding: 1.75rem;
  place-self: center;
  place-items: center;
  place-content: center;
  min-width: 14rem;
  max-width: 14rem;
  font-size: 1.3rem;
}
</style>
