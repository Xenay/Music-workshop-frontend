<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Music Workshop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link" href="/challenges">Challenges</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Forum</a>
        </li>
      
      </ul>
      
      <form class="d-flex align-items-sm-end">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
        <div class = "nav-item ml-auto ">
        <a class= "nav-link active" href="#"> Log In </a>
        </div>
    </div>
  </div>
</nav>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      
    </nav>
    <router-view/>
  </div>
</template>
<script>
/* eslint-disable */
import { HomeView } from '@/views/HomeView.vue'

export default {
name: 'app',
components: {
  HomeView
}
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
