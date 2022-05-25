<template>
 <div class = "container">
   <h1> Latest posts </h1>
   <hr>
   <p class = "error" v-if= "error" > {{error}} </p>
   
  <div class = "posts-container">
    <div class = "post" 
    v-for="(post,index) in posts"
    v-bind:item = "post"
    v-bind:index = "index"
    v-bind:key = "post._id" 
    
    >
    {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}/`}}
  <p class= "text" > {{post.text}} </p>
    </div>
 </div>
 </div>
</template>

<script>
// @ is an alias to /src
import PostService from '../PostService';

export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      
    } catch (err) {
      this.error = err.message;
    }
  },
  components: {
   
  }
}
</script>
