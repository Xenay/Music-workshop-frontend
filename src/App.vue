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
     
      
     
      
      <div class ="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class = "navbar-nav ml-auto">
          <div class="work" v-if="isLoggedIn === true">
             <li class= "nav-item" >
          points: {{store.login.points}}
             </li>
          </div>
          <li class= "nav-item" >
            <a class = "nav-link" v-on:click= "authent" href = "/login" >Log In </a>
          </li>
          <li class= "nav-item" >
            <a class = "nav-link" href = "/register" > Register </a>
          </li>
          <li class= "nav-item" v-if="isLoggedIn ===true">
            <a class = "nav-link" > {{login.name}} </a>
          </li>
          <li class= "nav-item">
            <a class = "nav-link" href = "/shop"> Shop </a>
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
import PostService from '@/PostService';




export default {
name: 'app',
components: {
  HomeView,
  
},
data() {
  return{
    login: [],
    isLoggedIn: false,
    isAdmin: false
}},
methods: {

  async authent() {
  let res = await axios.get('http://localhost:5000/user/me',{headers: {"Authorization" :  `Bearer ${localStorage.getItem("jwt")}`}});
  
  let data = res.data;
  this.login = data;
  console.log(data.isAdmin);
  localStorage.setItem('isAdmin',data.isAdmin)

  console.log(login);
  store.login = this.login;
  if(login) this.isLoggedIn =true;
  else this.isLoggedIn = false;
  }
  ,
  
  async check() {
    if (authent() == true) isLoggedIn = "true"
    else isLoggedIn = "false";
    console.log(this.login, this.isLoggedIn);
  },
  async checkIfLoggedIn() {
    try {
      console.log(localStorage.getItem("isLoggedIn"));
      this.isLoggedIn = toLowerCase(localStorage.getItem("isLoggedIn"));
    } catch (error) {
      
    }
  
  }
  
},
mounted() {
//this.check();
PostService.authent();
this.checkIfLoggedIn();

  
 
  
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
