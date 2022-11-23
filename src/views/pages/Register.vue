<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <form @submit.prevent="register()" method="post" class="form">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <input type="text" placeholder="First Name" autocomplete="First Name" class="form-control" v-model="first_name"><br>

                <input type="text" placeholder="Last Name" autocomplete="Last Name" class="form-control" v-model="last_name"><br>

                <input type="text" placeholder="Email" autocomplete="Email" class="form-control" v-model="email"><br>

                <input type="password" placeholder="Password" autocomplete="Password" class="form-control" v-model="password"><br>

                <input type="password" placeholder="Repeat Password" autocomplete="Repeat password" class="form-control" v-model="repeat_password"><br>

                <input type="submit" name="submit" id="submit" class="btn btn-success btn-block" value="Create Account">
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

import axios from "axios";
import 'babel-polyfill';

export default {
  name: 'Register',
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
      response: null,
    }
  },
  methods: {
    async register() {
      let register_data = {
        first_name : this.first_name,
        last_name : this.last_name,
        email : this.email,
        password : this.password,
        repeat_password : this.repeat_password
      }

      await axios.post('http://army-battle.online/api/register', register_data)
          .then(res => this.response = res.data)
          .catch(err => console.error(err))


      alert(this.response.message)

      localStorage.setItem('token', this.response.token)
      this.$router.push('/game/create-game')
    }
  }
}
</script>
