<script setup>
import { inject } from 'vue'
import { DateTime } from 'luxon'

const emit = defineEmits(['openReview'])
const {
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
} = inject('reviewPage_Info')

defineProps({
  review_text: String,
  date: String,
  status: String,
  firstname: String,
  lastname: String,
  patronymic: String,
  department: String,
  email: String,
  uuid: String,
  reply_text: String
})

function Status_Text(Status) {
  if (Status == 'Replied') {
    return 'Рассмотрено'
  }
  return 'Ждёт ответа'
}
function Reply(Status) {
  if (Status == 'Replied') {
    return 'Посмотреть ответ'
  }
  return 'Ответить на отзыв'
}

function StatusColor(Status) {
  if (Status == 'Created') {
    return false
  }
  return true
}

function Rev(
  Review_text,
  Date,
  firstname,
  lastname,
  patronymic,
  department,
  email,
  uuid,
  status,
  reply_text
) {
  Rev_date.value = formatDatetime(Date)
  Rev_text.value = Review_text
  Rev_firstname.value = firstname
  Rev_lastname.value = lastname
  Rev_patronymic.value = patronymic
  Rev_department.value = department
  Rev_email.value = email
  Rev_uuid.value = uuid
  Rev_status.value = status
  Rev_reply_text.value = reply_text
}
const formatDatetime = (date) => {
  const datetime = DateTime.fromISO(date)
  return datetime.toFormat('dd-MM-yyyy HH:mm')
}
</script>

<template>
  <div
    class="flex bg-white border border-black place-content-center place-items-center place-self-center rounded-3xl p-4 mt-4 mr-[120px] ml-[120px]"
  >
    <div class="flex flex-row gap-8">
      <div class="item_review">
        <p class="text-center min-w-[495px] max-w-[495px] truncate">
          {{ review_text }}
        </p>
      </div>
      <div class="item_review">
        <p class="text-center min-w-[140px] max-w-[140px]">
          {{ formatDatetime(date) }}
        </p>
      </div>
      <div class="item_review">
        <p
          :class="{
            'text-red-800 font-bold text-center': !StatusColor(status),
            'text-green-800 font-bold text-center': StatusColor(status)
          }"
        >
          {{ Status_Text(status) }}
        </p>
      </div>
      <button
        @click="
          Rev(
            review_text,
            date,
            firstname,
            lastname,
            patronymic,
            department,
            email,
            uuid,
            status,
            reply_text
          ),
            emit('openReview')
        "
        class="item_review_button text-center text-[#F1F4FF] transition hover:-translate-y-1 hover:shadow-xl"
      >
        {{ Reply(status) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item_review {
  background: rgba(241, 244, 255, 1);
  border-width: 1px;
  border-color: rgb(0 0 0);
  padding: 2rem;
  border-radius: 1.5rem;
  place-self: center;
  place-items: center;
  place-content: center;
}
.item_review_button {
  background: rgba(55, 56, 60, 0.9);
  border-width: 1px;
  border-color: rgba(55, 56, 60, 0.9);
  padding: 2rem;
  border-radius: 1.5rem;
  place-self: center;
  place-items: center;
  place-content: center;
}
</style>
