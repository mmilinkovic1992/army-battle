<template>
  <div>
    <div class="col-sm-2 col-md-12" v-if="info">
      <div class="card text-center bg-success text-white">
        <div class="card-body">
          <blockquote class="card-blockquote">
            <p>{{ info }}</p>
          </blockquote>
        </div>
      </div>
    </div>
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
            <router-link :to="{ name: 'users-update', params: { userId: item.id }}" class="btn btn-outline-warning btn-block active">
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
  methods: {
    deleteResponse(message, index) {
      this.users.splice(index, 1)
      this.backupUsers = this.armies
      setTimeout(() => this.info = "", 1500);
    },

    deleteUser(id, index) {
      axios({
        method: 'delete',
        url: 'http://army-battle.online/api/users/delete/'+ id
      }).then(response => {
        this.info = response.data.message
      }).catch(function (error) {
        console.log(error);
      });

      this.deleteResponse(id, index)
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://army-battle.online/api/users")
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