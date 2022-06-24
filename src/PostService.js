/* eslint-disable */
import axios from "axios";
import store from "../src/store";
//import { resolve, reject } from "core-js/fn/promise";

const url = "http://localhost:5000/api/posts/";

class PostService {
  //get
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = await res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  //create
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  async authent() {
    let res = await axios.get("http://localhost:5000/user/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    let data = res.data;

    console.log(login);
    store.login = data;
  }

  //delete
  static deletePost(id) {
    return axios.delete("${url}${id}");
  }

  static getSinglePost(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + id);

        const data = await res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default PostService;
