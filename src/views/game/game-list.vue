<template>
  <div class="game-wrapper">
    <TopBar></TopBar>
    <div class="container">
        <h1 class="game-title">Game List</h1>
        <div class="row">
          <div class="offset-md-2"></div>
          <div class="col-md-8">
            <form @submit.prevent="submit" class="form">
              <div class="form-group">
                <select class="form-control" v-model="choosedGameId">
                  <option :value="game.id" v-for="game in games" :key="game.id">{{ game.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <button type="submit" class="game-btn ml-0">Submit</button>
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
  name: "game-list",
  components: {
    TopBar
  },
  data() {
    return {
      games: null,
      choosedGameId: null
    }
  },
  async mounted() {
    try {
      const resGames = await axios.get('http://army-battle.test/api/games');
      this.games = resGames.data.games
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async submit() {
      const data = {
        game_id: this.choosedGameId,
        
      }
      console.log(data)
      const res = await axios.post('http://army-battle.test/api/game/run-attack', data);

      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>