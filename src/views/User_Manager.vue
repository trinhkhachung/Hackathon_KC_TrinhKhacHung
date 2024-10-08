<script setup>
import { ref, onMounted } from "vue";
import AddNewUser from "@/components/AddNewUser.vue";

const isShowForm = ref(false);
const isEditing = ref(false); // To track if we are editing
const users = ref([]);
const currentUser = ref(null); // To store the user being edited

onMounted(() => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  users.value = storedUsers;
});

function handleShowForm() {
  isShowForm.value = true;
  isEditing.value = false;
  currentUser.value = null; // Reset the current user
}

function handleEditUser(user) {
  currentUser.value = user; // Set the current user for editing
  isShowForm.value = false; // Close the add form
  isEditing.value = true; // Set to editing mode
}

function handleClose() {
  isShowForm.value = false;
  currentUser.value = null; // Reset the current user
}

function addUser(user) {
  if (currentUser.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === currentUser.value.id);
    users.value[index] = user; // Update user details
  } else {
    // Add new user
    users.value.push(user);
  }
  localStorage.setItem('users', JSON.stringify(users.value));
  handleClose();
}
//update user 
function updateUser(user) {
  const index = users.value.findIndex(u => u.id === user.id);
  users.value[index] = user; 
  localStorage.setItem('users', JSON.stringify(users.value));
  handleClose();
}

// Remove user
function deleteUser(userId) {
  users.value = users.value.filter(user => user.id !== userId); 
  localStorage.setItem('users', JSON.stringify(users.value));
}
</script>

<template>
   <div>
     <div class="header">
    </div>
    <div class="w-[80%] m-auto mt-4 h-[100vh]">
      <main class="main">
        <header class="d-flex justify-content-between mb-3">
          <h3>Manager User</h3>
          <button class="btn btn-primary" @click="handleShowForm">Add New User</button>
        </header>

        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th colspan="2">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="users.length === 0">
              <td colspan="7" class="text-center">No users found.</td>
            </tr>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.selectedGender }}</td>
              <td>{{ user.dateOfBirth }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="button button-edit" @click="handleEditUser(user)">Sửa</span>
              </td>
              <td>
                <span class="button button-delete" @click="deleteUser(user.id)">Xóa</span>
              </td>
            </tr>
          </tbody>
        </table>

        <footer class="d-flex justify-content-end align-items-center gap-3">
          <select class="form-select">
            <option selected>Hiển thị 10 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 50 bản ghi trên trang</option>
            <option>Hiển thị 100 bản ghi trên trang</option>
          </select>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </footer>
      </main>
    </div>
    
    <AddNewUser v-if="isShowForm && !isEditing" @closeFrom="handleClose" @addUser="addUser" />
    <EditUserVue v-if="isEditing" :user="currentUser" @close="handleClose" @updateUser="updateUser" />
   </div>
</template>




<style>
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  font-family: sans-serif;
}

.header ul{
  display: flex;
  list-style: none;
  gap: 30px;
  color: #fff;
  padding: 20px;
  font-size: 20px;
}
.main {
  /* height: 100vh; */
  margin: 50px 100px;
}

.fa-arrows-rotate {
  font-size: 20px;
  cursor: pointer;
  color: gray;
}

.fa-arrows-rotate:hover {
  color: rgb(184, 180, 180);
  transform: rotate(20deg);
  transition: all 0.5s linear;
}

.button {
  padding: 4px 12px;
  line-height: 30px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.button-edit {
  background-color: orange;
}

.button-delete {
  background-color: red;
}

.button-block {
  background-color: green;
}

td:first-child,
td:nth-child(6),
td:nth-child(7) {
  text-align: center;
}

.form-select {
  width: 270px !important;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  background-color: #fff;
  width: 500px;
  padding: 20px 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-label {
  font-weight: 600;
  margin-bottom: 8px;
}

.fa-xmark {
  font-size: 20px;
  cursor: pointer;
}

.error {
  color: red !important;
}

.status-container {
  border: 1px solid #dadada;
  padding: 4px 8px;
  border-radius: 4px;
}

.status {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid transparent;
}

.status-active {
  background-color: green;
}

.status-stop {
  background-color: red;
}

.modal-custom {
  background-color: #fff;
  padding: 20px 24px;
  border-radius: 4px;
  width: 400px;
}

.modal-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body-custom {
  padding: 20px 0;
}

.modal-footer-custom {
  display: flex;
  justify-content: end;
  gap: 8px;
}

.pagination {
  margin-bottom: 0;
}
</style>
