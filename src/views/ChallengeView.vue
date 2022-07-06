<template>

<div class="cardimage"> 
 <h2 class="selected"> Selected Challenge: </h2>

<LazyYoutube
        ref="youtubeLazyVideo"
        :src="youtubeLink"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />
<p> </p>



<button type="button" v-on:click="inputVideo" class="btn btn-primary">Submit your video!</button>
<p> </p>
<div class = "cardimage">
    <div class = "post"
    v-for="(child,index) in childrenpost"
    v-bind:item = "child"
    v-bind:index = "index"
    v-bind:key = "index">
   
    <LazyYoutube
        ref="youtubeLazyVideo"
        :src="child.text"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />
    <p> </p>
    
   Creator: {{childrenpost[index].name}} 
   <p> </p>
    
    <div class="textfont" v-if="isAdmin === true">
    <button @click="awardSystem(childrenpost[index].name)"> Award Points </button>
    
    </div>
</div>
</div>
</div>




</template>

<script>
/* eslint-disable */
import {LazyYoutube} from "vue-lazytube";
import Swal from 'sweetalert2';
import store from '../store';
//let params = (new URL(document.location)).searchParams;
//let name = params.get("url");
import axios from 'axios';
import PostService from  '../PostService';
let urlser = "http://localhost:5000/api/posts/";

export default {
  name: 'ChallengeView',
   components: {
        LazyYoutube,
        
    },
  data () {
    return {
      youtubeLink:name,
      posts: [],
      childrenpost: [],
      isAdmin:false,
      postName: ""
    };
  },
  async created() {
    PostService.authent();
  await axios.get("http://localhost:5000/api/posts/find/"+store.post)
      .then((response) => {
        var parsedobj = JSON.parse(JSON.stringify(response.data))
        
        this.childrenpost=parsedobj[0].childern;
        console.log(this.childrenpost);
      });
 },
  mounted() {
    this.getPOst();
    //this.getChildren();

    
      console.log(store.login.isAdmin);
      this.isAdmin = store.login.isAdmin;
  },
  methods: {
    async getChildren() {
      try {
      const response = await axios.get("http://localhost:5000/api/posts/find/"+store.post)
      console.log(response);
      
      this.childrenpost=response;
      }
      catch( error) {
        console.log(error)
      }
      },
      
    
      async getPOst() {
        
        let params = (new URL(document.location)).searchParams;
        let name = params.get("url");
        console.log(name);
        this.youtubeLink=name;
      },

      async inputVideo() {
        const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
        })

        var query = new URLSearchParams();

        if (url) {
        Swal.fire(`Entered URL: ${url}`)
        //put
        let params = (new URL(document.location)).searchParams;
        let origiginame = params.get("url");
       
        
      //point loop------------------------------------------------------------
      const patchbody = {
          
          point:50
      };
      let point =50;
      //await axios.patch("http://localhost:5000/user/me/"+origiginame,patchbody)
      
      const body = {
          url: url,
          name:store.login.name
      };
      //-----------------------------------------------------------------------
      //update thing
      let objectid = store.post;
      
      
      console.log(store.post);
      await axios.put(urlser+'post/'+objectid, body)
      .catch(function (error) {
      //weld
      
      if (error.response) {
     
    } else if (error.request) { 
      console.log(error.request);
    } else {

      console.log('Error', error.message);
    };

        
      
        });
        
      }
    
  },
   async awardSystem(nameOfCreator) {
    const { value: point } = await Swal.fire({
      title: "Select number of points to award",
      input: "select",
      inputOptions: {
        500: "first",
        250: "second",
        150: "third",
        50: "else",
      },
      inputPlaceholder: "Select one",
      showCancelButton: true,
    });

    if (point) {
      Swal.fire(`You selected: ${point}`);
    }
     const body = {
          point: parseInt(point),
          id: nameOfCreator
      };
      
      console.log(point);
      await axios.put("http://localhost:5000/api/posts/user/", body)
      .catch(function (error) {
      //weld
      
      if (error.response) {
     
    } else if (error.request) { 
      console.log(error.request);
    } else {

      console.log('Error', error.message);
    };
          });
        
      }
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
</style>
