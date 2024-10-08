<template>
  <div class="overlay">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Add New User</h4>
        <i class="fa-solid fa-xmark" @click="closeShowFrom"></i>
      </div>
      <div>
        <label class="form-label" for="userName">Name</label>
        <input v-model="name" id="userName" type="text" class="form-control" required/>
      </div>
      <div class="gender">
        <label class="form-label" for="gender">Gender</label> <br>
        <input v-model="selectedGender" type="radio" name="gender" id="male">
        <label for="male">Male</label>
        <input v-model="selectedGender" type="radio" name="gender" id="female">
        <label for="female">Female</label>
        <input v-model="selectedGender" type="radio" name="gender" id="other">
        <label for="other">Other</label>
      </div>
      <div>
        <label class="form-label" for="dateOfBirth">Ngày sinh</label>
        <input v-model="dateOfBirth" id="dateOfBirth" type="date" class="form-control" />
        <div v-if="dateError" class="form-text error">{{ dateError }}</div>
      </div>
      <div>
        <label class="form-label" for="email">Email</label>
        <input v-model="email" id="email" type="email" class="form-control" />
        <div v-if="emailError" class="form-text error">{{ emailError }}</div>
      </div>
      <div>
        <button class="w-100 btn btn-primary">Thêm mới</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const selectedGender = ref('');
const dateOfBirth = ref('');
const email = ref('');
const emailError = ref('');
const dateError = ref('');

const emit = defineEmits(["closeFrom"])
    function closeShowFrom(){
        emit("closeFrom")
    };
    
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateDate = (date) => {
  const today = new Date();
  const selectedDate = new Date(date);
  return selectedDate < today;
};

const generateRandomID = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

const handleSubmit = () => {
  emailError.value = '';
  dateError.value = '';

  if (!validateEmail(email.value)) {
    emailError.value = 'Vui lòng dùng định dạng email';
    return;
  }

  if (!validateDate(dateOfBirth.value)) {
    dateError.value = 'Ngày sinh không hợp lệ';
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  const emailExists = allUsers.some(user => user.email === email.value);
  if (emailExists) {
    emailError.value = 'Email đã tồn tại';
    return;
  }

   // Tạo dữ liệu người dùng mới
  const userData = {
    id: generateRandomID(),
    name: name.value,
    selectedGender: selectedGender.value,
    dateOfBirth: dateOfBirth.value,
    email: email.value,
  };

  // Thêm người dùng mới vào localStorage
  allUsers.push(userData);
  localStorage.setItem('users', JSON.stringify(allUsers));

  // Hiển thị thông báo thành công
  alert("Thêm thành công");

  // Tải lại trang sau khi thêm mới
  location.reload();
};


</script>

<style>
.gender label {
  padding: 4px;
  margin-left: 2px;
}
.form-text.error {
  color: red;
}
</style>
