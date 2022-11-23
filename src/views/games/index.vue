<template>
  <div>
    <table class="table table-striped table-fixed table-hover table-bordered">
      <th>Name</th><th>Number of turns</th><th>Minimum number of armies</th><th>Status</th><th>Action</th>
      <tr v-for="(item,index) in this.games" :key="item.id">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.number_of_turns}}
        </td>
        <td>
          {{item.minimum_number_of_armies}}
        </td>
        <td>
          {{item.status}}
        </td>
        <td>
          <router-link :to="{ name: 'games-update', params: { gameId: item.id }}" class="btn btn-outline-warning btn-block active">
            Update
          </router-link>

          <a class="btn btn-outline-danger btn-block active" @click="deleteGame(item.id, index)">Delete</a>

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
      games: [],
      backupGames: [],
      info: '',
    }
  },
  methods: {
    deleteGame(id, index) {
      axios({
        method: 'delete',
        url: 'http://army-battle.online/api/games/delete/'+ id
      }).then(response => {
        this.info = response.data.message
      }).catch(function (error) {
        console.log(error);
      });

      this.deleteResponse(id, index)
    },

    deleteResponse(message, index) {
      this.games.splice(index, 1)
      this.backupGames.splice(index, 1)
      setTimeout(() => this.info = "", 1500);
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://army-battle.online/api/games")
      this.games = response.data.games
      this.backupGames = this.games
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>

</style>