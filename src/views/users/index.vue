<template>
  <div>
    <table class="table table-striped table-fixed table-hover table-bordered">
      <th>First Name</th><th>Last Name</th><th>Email</th><th>Action</th>
        <tr v-for="(item,index) in this.users" :key="item.id">

          <td>
            {{item.first_name}}
          </td>

          <td>
            {{item.last_name}}
          </td>

          <td>
            {{item.email}}
          </td>

          <td>
            <router-link :to="'users/update/' + item.id" class="btn btn-outline-warning btn-block active">
              Update
            </router-link>

            <a class="btn btn-outline-danger btn-block active" @click="deleteUser(item.id, index)">Delete</a>

          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import 'babel-polyfill';

export default {
  name: "index",
  data() {
    return {
      users: [],
      backupUsers: [],
      info: '',
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://army-battle.test/api/users")
      this.users = response.data.users
      this.backupUsers = this.users
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>

</style>