
<template>

<div>
  <h1> aaaaa </h1>
  <input class="input" type="text" @keydown.enter="handleSearch($event, 'youtube')" placeholder="Youtube Video Link or Video Id" :value="youtubeLink">
<LazyYoutube
        ref="youtubeLazyVideo"
        :src="youtubeLink"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />
</div>

</template>

<script>
import LazyYoutube from "vue-lazytube";

export default {
  name: 'ChallengeView',
   components: {
        LazyYoutube,
        
    },
  data () {
    return {
      youtubeLink:'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      
    }
  },
 
  mounted() {
    // this.$refs['lazyVideo'].playVideo();
  },
  methods: {
    handleClick(event, ref) {
      this.$refs[ref][event]()
    },
    handleSearch(e) {
     this.youtubeLink = e.target.value;
     
    }
  }

}
</script>
