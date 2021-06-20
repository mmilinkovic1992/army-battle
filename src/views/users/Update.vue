<template>
  <div class="game-wrapper">
    <div class="container">
      <h1 class="game-title">Update Game</h1>
      <div class="row">
        <div class="offset-md-2"></div>
        <div class="col-md-8">
          <div class="col-sm-2 col-md-12" v-if="message">
            <div class="card text-center bg-success text-white">
              <div class="card-body">
                <blockquote class="card-blockquote">
                  <p>{{ message }}</p>
                </blockquote>
              </div>
            </div>
          </div>
          <form @submit.prevent="update()" method="post" class="form">
            <div class="form-group">
              <label>First Name*</label>
              <input type="text" placeholder="First Name" class="form-control"  v-model="first_name" required>
            </div>
            <div class="form-group">
              <label>Last Name*</label>
              <input type="text" placeholder="Last Name"  v-model="last_name" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Email*</label>
              <input type="text" placeholder="Email" class="form-control"  v-model="email" required>
            </div>
            <div class="form-group">
              <label>Password*</label>
              <input type="text" placeholder="Password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <button type="submit" class="game-btn ml-0">Update game</button>
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
  name: "Update",
  data() {
    return {
      user: null,
      message: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      response: ""
    }
  },
  methods : {
    async update () {
      const dataForUpdate = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }
      console.log(dataForUpdate)

      let id = this.$route.params.userId

      await axios.post('http://army-battle.test/api/users/update/' + id, dataForUpdate)
          .then(res => this.response = res.data)
          .catch(err => console.error(err))

      this.message = this.response.message
      console.log(this.message)
      setTimeout(() => this.message = "", 1500);
    }
  },
  async mounted() {
    try {
      let id = this.$route.params.userId
      const response = await axios.get('http://army-battle.test/api/users/' + id);
      this.user = response.data.user
      this.first_name = this.user.first_name
      this.last_name = this.user.last_name
      this.email = this.user.email
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>

</style>