<template>
 <div class = "cardimage">

  
    
   <h1 class="textfont"> Latest posts </h1>
   <div class="create-post" v-if="isAdmin === true">
     <label for="create-post">Upload video</label>
     <input type="text" id="create-post" v-model="text">
     <button v-on:click= "createPost">Post</button>
   </div>
   <hr>
   <p class = "error" v-if= "error" > {{error}} </p>
   
  <div class = "posts-container">
    <div class = "post"
    v-for="(post,index) in posts"
    v-bind:item = "post"
    v-bind:index = "index"
    v-bind:key = "post.text">
   <br>
    
  <div class="textfont">
    {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}/`}}
  </div>
  
  <LazyYoutube
        ref="youtubeLazyVideo"
        :src="post.text"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />
  
    <br>
    <div class="textfont">
    <router-link @click.native="putsore(post._id)" :to = "{path: '/challenges', query: {url: post.text}}">  Results </router-link>
    
    </div>
    
    </div>
 </div>
 </div>
 
 
</template>

<script>
// @ is an alias to /src
import PostService from '../PostService';
import {LazyYoutube} from "vue-lazytube";
import store from '../store';



var query = new URLSearchParams();

var url = "/challenges/"
query.append("url", url);
// eslint-disable-next-line
url += query.toString();


export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      image: "@/assets/catto.png",
      isAdmin: false
    
      
      
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      console.log(store.login.isAdmin);
      this.isAdmin = store.login.isAdmin;
      
      
      
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async putsore(id) {
      store.post = id;
      console.log(store);
  
  },
  
    
  
  },

  components: {
   LazyYoutube
  }
}

</script>
<style>
  .cardimage {
  background: url('@/assets/catto.png') no-repeat center center fixed;
 
  height: 80%;
 -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  }
  .cardborder {
    border: 100% groove rgba(23,164,34,0.42);
  border-radius: 10px 40px 0px 0px;
  outline: 6px groove rgba(23,164,34,0.42);
  outline-offset: 9px;
  display:inline-block
  }
  .textfont {
    
font-family: "Courier New", Courier, monospace;
font-size: 16px;
letter-spacing: 0px;
word-spacing: 2px;
color: #000000;
font-weight: 700;

font-style: normal;
font-variant: normal;
text-transform: none;
  }
</style>