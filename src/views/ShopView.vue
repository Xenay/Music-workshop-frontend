<template>
<div class="a">

  <div class="center">
      <h2> points: {{points}} </h2>
  </div>   

<div class="row">
   

     

  
    </div>
<div class= "card" style="width:25rem" v-for="(item,index) in images" v-bind:item = "post"
    v-bind:index = "index"
    v-bind:key = "item"> 
<img :src="require(`../assets/shopitems/${item.src}.png`)" class="card-img-top"  width="25rem" alt="require(`@/assets/${item.src}`)" style="float:left">
  <div class="card-body">
    <h5 class="card-title">{{item.title}}</h5>
    <p class="card-text">{{item.price}} Points</p>
    <a class="btn btn-primary" @click="shopSystem(item.price)">Add to cart</a>

</div>
</div>
</div>



</template>
<script>
/* eslint-disable */
import PostService from '../PostService';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../store';

export default {
    name: "shopview",
    data() {
        return {
        images: [{
          src : "erniebass",
          title: "Ernie ball bass strings",
          price: 3500
        },
        {
          src : "ernieskinny",
          title: "Ernie Ball 7-string Skinny top heavy bottom",
          price: 2500
        },
         {
          src : "P02221",
          title: "Ernie Ball 10-46 standard",
          price: 2000
        },
         {
          src : "P02839",
          title: "Ernie Ball 13-72 baritone",
          price: 2500
        },
        ],
        nameUser: '',
        address: '',
        postcode: '',
        email: '',
        login: '',
        points:0,
    }
},
methods: {

 async shopSystem(price) {
  console.log(store.login.points);
  console.log(price);
    if(price<store.login.points) {
    //swal start
Swal.fire({
  title: 'Login Form',
  html: `<input type="text" id="nameUser" class="swal2-input" placeholder="Name">
  <input type="text" id="address" class="swal2-input" placeholder="Password">
  <input type="text" id="postcode" class="swal2-input" placeholder="Post Code">
  <input type="text" id="email" class="swal2-input" placeholder="Email">`,
  confirmButtonText: 'Sign in',
  focusConfirm: false,
  preConfirm: () => {
    
    const nameUser = Swal.getPopup().querySelector('#nameUser').value
    const address = Swal.getPopup().querySelector('#address').value
    const postcode = Swal.getPopup().querySelector('#postcode').value
    const email = Swal.getPopup().querySelector('#email').value
    this.nameUser = nameUser;
    this.address = address;
    this.postcode= postcode;
    this.email = email;
    if (!nameUser || !address || !postcode || !email) {
      Swal.showValidationMessage(`Please enter the details :)`)
    }
    return { name: nameUser, address: address, postcode: postcode, email: email }
  
  }
}).then((result) => {
  const body = {
          point: price,
          id: store.login.name,
          name: this.nameUser,
          postCode: this.postcode,
          email: this.email,
          address: this.address
      };
      console.log(body);
      axios.put("http://localhost:5000/api/posts/user/buy", body)
      .catch(function (error) {
      //weld
      
      if (error.response) {
     
    } else if (error.request) { 
      console.log(error.request);
    } else {

      console.log('Error', error.message);
    };
          });
          

        
 });
 store.login.points -= price;
   }
    else this.$swal('Not enough money', ':(', 'OK');;
 


 },


async getImgUrl(imagePath) {
  return require(("../assets/shopitems/"+imagePath));
      },

async getstore() {
  this.points = store.login.points;
}
  },
  mounted() {
//this.check();
  PostService.authent();
  this.isLoggedIn = localStorage.getItem("isLoggedIn");
  this.getstore();
  }
}



</script>
<style>

.card {
    display:inline-block;
    }
.center {
  margin: auto;
  width: 20%;
 
 
}
</style>