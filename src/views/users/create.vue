<template>
  <div class="game-wrapper">
    <div class="container">
      <h1 class="game-title">Create User</h1>
      <div class="row">
        <div class="offset-md-2"></div>
        <div class="col-md-8">
          <div class="col-sm-2 col-md-12" v-if="this.message">
            <div class="card text-center bg-success text-white">
              <div class="card-body">
                <blockquote class="card-blockquote">
                  <p>{{ this.message }}</p>
                </blockquote>
              </div>
            </div>
          </div>
          <form @submit.prevent="create" method="post" class="form">
            <div class="form-group">
              <label>First name*</label>
              <input type="text" placeholder="First Name" class="form-control" required v-model="first_name">
            </div>
            <div class="form-group">
              <label>Last Name*</label>
              <input type="text" placeholder="Last Name" class="form-control" required v-model="last_name">
            </div>
            <div class="form-group">
              <label>Email*</label>
              <input type="text" placeholder="Email" class="form-control" required v-model="email">
            </div>
            <div class="form-group">
              <label>Password*</label>
              <input type="password" placeholder="Password" class="form-control" required v-model="password">
            </div>
            <div class="form-group">
              <button type="submit" class="game-btn ml-0">Create game</button>
            </div>
          </form>
        </div>
        <div class="offset-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'babel-polyfill';

export default {
  name: "create",
  data() {
    return {
      message: "",
      response: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async create() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }

      await axios.post('http://army-battle.online/api/users/create', data)
            .then(res => this.message = res.data.message)
            .catch(err => console.error(err))

      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.password = ''
      setTimeout(() => this.message = "", 1500);
    }
  }
}
</script>

<style scoped>

</style>