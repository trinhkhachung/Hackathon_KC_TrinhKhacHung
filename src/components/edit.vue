<template>
  <div class="overlay" v-if="editedUser">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Edit User</h4>
        <i class="fa-solid fa-xmark" @click="closeForm" style="cursor: pointer;"></i>
      </div>
      <div>
        <label class="form-label" for="userName">Name</label>
        <input v-model="editedUser.name" id="userName" type="text" class="form-control" required />
      </div>
      <div class="gender">
        <label class="form-label">Gender</label><br>
        <input v-model="editedUser.selectedGender" type="radio" name="gender" id="male" value="Male" />
        <label for="male">Male</label>
        <input v-model="editedUser.selectedGender" type="radio" name="gender" id="female" value="Female" />
        <label for="female">Female</label>
        <input v-model="editedUser.selectedGender" type="radio" name="gender" id="other" value="Other" />
        <label for="other">Other</label>
      </div>
      <div>
        <label class="form-label" for="dateOfBirth">Date of Birth</label>
        <input v-model="editedUser.dateOfBirth" id="dateOfBirth" type="date" class="form-control" />
      </div>
      <div>
        <label class="form-label" for="email">Email</label>
        <input v-model="editedUser.email" id="email" type="email" class="form-control" />
      </div>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" @click="closeForm">Cancel</button>
        <button class="btn btn-primary" type="submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

// Nhận props từ component cha
const props = defineProps({
  user: Object
});
const emit = defineEmits(['close', 'updateUser']);

// Tạo bản sao của props.user để chỉnh sửa
const editedUser = ref({ ...props.user });

// Đóng form khi người dùng nhấn nút hủy
const closeForm = () => {
  emit('close');
};

// Gửi dữ liệu người dùng đã chỉnh sửa và đóng form
const handleSubmit = () => {
  emit('updateUser', editedUser.value);
  closeForm();
};
</script>

<style scoped>
/* Bạn có thể thêm CSS tùy chỉnh tại đây */
</style>
