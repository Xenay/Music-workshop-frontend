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
let urlser = "http://localhost:5000/api/posts/";

export default {
  name: 'ChallengeView',
   components: {
        LazyYoutube,
        
    },
  data () {
    return {
      youtubeLink:name,
      posts: []
    };
  },
 
  mounted() {
    this.getPOst();
    
  },
  methods: {
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

        if (url) {
        Swal.fire(`Entered URL: ${url}`)
        //put
        let params = (new URL(document.location)).searchParams;
        let origiginame = params.get("url");
        let name = url
        console.log(name);
        console.log(store.login.user.name);
        const body = {
          url: name,
          name:store.login.user.name
        };
        await axios.put(urlser+origiginame, body)
        .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    };
        
      
        })
      }
    
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
