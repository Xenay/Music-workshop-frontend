<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg  navbar-dark " style="background-color: #169300;">
  <div class="container-fluid">
    <v-img class ="navbar-brand" src= "require(assets/musicLogo.png)" alt = "cat"> </v-img>
    <a class="navbar-brand" href="/">Music Workshop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

      

        <li class="nav-item">
          <a class="nav-link" href="#">Forum</a>
        </li>
      
      </ul>
      
      <form class="d-flex align-items-sm-end">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      
      <div class ="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class = "navbar-nav ml-auto">
          <li class= "nav-item">
            <a class = "nav-link" v-on:click= "authent" href = "/login" v-if="isLoggedIn === false">Log In </a>
          </li>
          <li class= "nav-item">
            <a class = "nav-link" href = "/register" v-if="isLoggedIn === false"> Register </a>
          </li>
          <li class= "nav-item">
            <a class = "nav-link" href = "/register" v-if="isLoggedIn ===true"> {{login.name}} </a>
          </li>
        </ul>
      </div>
        
    </div>
  </div>
</nav>
  
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import { HomeView } from '@/views/HomeView.vue';
import axios from 'axios';
import store from '../src/store';


export default {
name: 'app',
components: {
  HomeView,
  
},
data() {
  return{
    login: [],
    isLoggedIn: false
}},
methods: {

  async authent() {
  let res = await axios.get('http://localhost:5000/user/me',{headers: {"Authorization" :  `Bearer ${localStorage.getItem("jwt")}`}});
  let data = res.data;
  this.login = data;
  console.log(login);
  store.login = this.login;
  if(login) this.isLoggedIn =true;
  else this.isLoggedIn = false;
  },
  
  async check() {
    if (authent() == true) isLoggedIn = "true"
    else isLoggedIn = "false";
  }
  
},
mounted:function() {
 
  
},



};



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
