<template>
  <div class="wrapper">
    <b>СИСТЕМА АНОНИМНЫХ ОТЗЫВОВ</b>
    <button @click="">Меню</button>
  </div>
  <p>Добро пожаловать на сайт анонимных отзывов!</p>
  <c>Здесь вы можете оставить свой отзыв, не боясь за свою конфиденциальность. Но при желании можете оставить свои контактные данные.</c>
  <d>Чтобы войти в систему в роли менеджера или администратора перейдите в меню.</d>
  <e>Более подробную инструкцию можно скачать в правом верхнем углу.</e> <br> <b> Оставить отзыв</b>
  <div class="content">
    <f>Введите отзыв</f>
  </div>
  <button @click="">Отправить анонимно</button> 
  <div class="niz">
    <b>СИСТЕМА АНОНИМНЫХ ОТЗЫВОВ</b>
    <pochta>ПОЧТА КОМПАНИИ: COMPANY@MAIL.RU</pochta>
  </div>
</template>

<script>
export default{
  data(){
    return{
      
    }
  }
}
</script>

<style>

.wrapper {
  background-size: 100% 30%;
  background-color: #a0b3dd;
  display: flex;
  justify-content: baseline;
  align-items: baseline;
}

.wrapper button {
  padding: 5px;
  display: block;
  background-color: #000000;
  border-radius: 10px;
  color: white;
  text-align:center;
  position: absolute;
  top: 1px;
  right: 2px;
}

.content {
  width: 700px;
  height: 300px;
  border: 1px solid rgb(104, 103, 103);
  border-radius: 50px;
  padding: 20px;
  background: #c7dee6;
  text-align: center;
  color: #fff;
  margin-left: 26%;
}

.content f {
  width: 650px;
  height: 250px;
  border: 1px dashed rgb(0, 0, 0);
  padding: 20px;
  background: #feffff;
  color: black;
}

.button {
  padding: 5px;
  display: block;
  background-color: #000000;
  border-radius: 10px;
  color: white;
  text-align:center;
  position: absolute;
}

.niz {
  background-size: 100% 30%;
  background-color: #a0b3dd;
}
.niz b {
  display: flex;
  justify-content: baseline;
  align-items: baseline;
}
.niz pochta {
  display: flex;
  justify-content: right;
  align-items: right;
}
</style>
