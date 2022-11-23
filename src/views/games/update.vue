<template>
  <div class="game-wrapper">
    <div class="container">
      <h1 class="game-title">Update Game</h1>
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
          <form @submit.prevent="update()" method="post" class="form">
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
  name: "update",
  data() {
    return {
      game:null,
      gameName: '',
      numberOfSteps: null,
      numberOfArmies: null,
      message: '',
      response : null
    }
  },
  methods: {
    async update() {
      const data = {
        name: this.gameName,
        number_of_turns: this.numberOfSteps,
        minimum_number_of_armies: this.numberOfArmies
      }

      let id = this.$route.params.gameId
      await axios.post('http://army-battle.online/api/games/update/' + id, data)
          .then(res => this.response = res.data)
          .catch(err => console.error(err))

      this.message = this.response.message
      setTimeout(() => this.message = "", 1500);
    }
  },
  async mounted() {
    try {
      let id = this.$route.params.gameId
      const response = await axios.get('http://army-battle.online/api/game/' + id);
      this.game = response.data.game
      this.gameName = this.game.name
      this.numberOfSteps = this.game.number_of_turns
      this.numberOfArmies = this.game.minimum_number_of_armies
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>

</style>