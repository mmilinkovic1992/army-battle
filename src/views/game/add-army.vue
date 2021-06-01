<template>
  <div class="game-wrapper">
    <div class="container">
        <TopBar></TopBar>
        <h1 class="game-title">Add army to the game</h1>
        <div class="row">
          <div class="offset-md-2"></div>
          <div class="col-md-8">
            <div class="message" v-if="message">{{ message }}</div>
            <form class="form" @submit.prevent="assign" method="put">
              <div class="form-group">
                <label>Choose Game</label>
                <select class="form-control" v-model="assignedGame">
                  <option :value="game.id" v-for="game in games" :key="game.id">{{ game.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Choose Army</label>
                <select class="form-control" v-model="assignedArmy">
                  <option :value="army.id" v-for="army in armies" :key="army.id">{{ army.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <button type="submit" class="game-btn ml-0">Add Army</button>
              </div>
            </form>
          </div>
          <div class="offset-md-2"></div>
        </div>
    </div>
  </div>
</template>

<script>
import TopBar from './components/top-bar'
import axios from 'axios'
import 'babel-polyfill';
export default {
  name: "add-army",
  components: {
      TopBar
  },
  data() {
    return {
      games: null,
      armies: null,
      assignedGame: null,
      assignedArmy: null,
      message: ''
    }
  },
  async mounted() {

    try {
      const resGames = await axios.get('http://army-battle.test/api/games');
      this.games = resGames.data.games
    } catch (error) {
      console.log(error)
    }

    try {
      const resArmies = await axios.get('http://army-battle.test/api/armies');
      this.armies = resArmies.data.armies
    } catch (error) {
      console.log(error)
    }

  },
  methods: {
    async assign() {
      const data = {
        game_id: this.assignedGame,
        army_id: this.assignedArmy
      }

      try {
        const res = await axios.put('http://army-battle.test/api/game/assign-army', data);
        this.message = res.data.message;
      } catch (error) {
        console.log(error)
      }

      this.$router.push("/game/game-list");
    }
  }
}
</script>

<style scoped>

</style>