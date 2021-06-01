<template>
  <div class="game-wrapper">
    <div class="container">
        <TopBar></TopBar>
        <h1 class="game-title">Create Game</h1>
        <div class="row">
          <div class="offset-md-2"></div>
          <div class="col-md-8">
            <div class="message" v-if="message">{{ message }}</div>
            <form @submit.prevent="create" method="post" class="form">
              <div class="form-group">
                <label>Game name*</label>
                <input type="text" placeholder="Game name" class="form-control" required v-model="gameName">
              </div>
              <div class="form-group">
                <label>Number of steps (40-80)*</label>
                <input type="number" placeholder="Number of steps (40-80)" min="40" max="80" class="form-control" required v-model="numberOfSteps">
              </div>
              <div class="form-group">
                <label>Number of armies (minimum 5)*</label>
                <input type="number" placeholder="Number of armies (minimum 5)" min="5" class="form-control" required v-model="numberOfArmies">
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
import TopBar from './components/top-bar'
import axios from 'axios'
export default {
  name: "create",
  components: {
    TopBar
  },
  data() {
    return {
      gameName: '',
      numberOfSteps: null,
      numberOfArmies: null,
      message: ''
    }
  },
  methods: {
    create() {
      const data = {
        name: this.gameName,
        number_of_turns: this.numberOfSteps,
        minimum_number_of_armies: this.numberOfArmies
      }

      axios.post('http://army-battle.test/api/game/create', data)
        .then(res => this.message = res.data.message)
        .catch(err => console.error(err))

      this.gameName = '';
      this.numberOfSteps = null;
      this.numberOfArmies = null;

      this.$router.push("/game/create-army");
    }
  }
}
</script>

<style scoped>

</style>