import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { ElMessage } from "element-plus";
import router from "@/router";
import { loadingStore } from "../utils/loading";
import { tokenStore } from "./token";
import cookies from "vue-cookies";

export const authStore = defineStore("authStore", () => {
  const api = apiStore()
  const token_store = tokenStore()
  const loading_store = loadingStore()

  const user = ref({})

  // User check
  const checkUser = async () => {
    
    if (cookies.isKey("token") && cookies.isKey("user")) {
      token_store.setToken(cookies.get("token"))
      let res = await api.get({ url: `users/${cookies.get("user").id}`})
      
      if (res.response?.status == 404) {
        ElMessage({
          type: "error",
          message: "Tizimga kirish ruhsati yo'q"
        })

        cookies.remove("token");
        cookies.remove("user");
      }

    } else {
      router.push({ name: "signin" })
    }
  }
  
  // Login
  const signIn = async (data) => {
    console.log(data);
    let res = await api.post({ url: "signin", data });

    if (res.status == 200) {
      ElMessage({
        type: "success",
        message: "Muvaffaqiyatli tizimga kirildi"
      })
      user.value = { ...res.data.user };
      cookies.set("user", { ...res.data.user });
      if (data.remember) cookies.set("remember", data.remember);

      token_store.setToken(res.data.accessToken.slice());

      setTimeout(() => {
        loading_store.setLoading(false)
      }, 1000);
      
      setTimeout(() => {
        router.push("/")
      }, 1500);
    }
  }

  // Registration
  // const signUp = async (data) => {
  //   let res = await api.post({ url: "signup", data })
    
  //   if (res.status == 201) {
  //     ElMessage({
  //       type: "success",
  //       message: "Muvaffaqiyatli ro'yxatdan o'tildi"
  //     })
  //     setTimeout(() => {
  //       loading_store.setLoading(false)
  //     }, 1000);
  //     setTimeout(() => {
  //       router.push("/auth/signin")
  //     }, 1500);
  //   }
  // }

  return {
    user,

    checkUser,
    signIn,
    // signUp
  }
})