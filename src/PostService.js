/* eslint-disable */
import axios from "axios";
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

  //cleate
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  //delete
  static deletePost(id) {
    return axios.delete("${url}${id}");
  }
}

export default PostService;
