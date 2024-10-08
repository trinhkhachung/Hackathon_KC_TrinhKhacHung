<template>
  <div>
    <div class="navbar">
    
    <router-link class="nav-link" to="/admin">Dashboard</router-link>
    <router-link class="nav-link" to="/admin/manager-product">Product</router-link>
    <router-link class="nav-link" to="/admin/manager-user">User</router-link>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';


</script>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  background-color: #333;
  padding: 10px 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffcc00; 
}

.nav-link.active {
  font-weight: bold;
  text-decoration: underline; 
}
</style>
