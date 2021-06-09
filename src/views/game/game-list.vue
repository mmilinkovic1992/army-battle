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
              <div class="form-group text-center">
                <button type="submit" class="game-btn ml-0"><i class="far fa-hand-point-right"></i> Run Attack</button>
              </div>
            </form>
            <div v-if="playGame">
              <div class="army-card">
                <div class="army-title">Armies</div>
                <ul class="army-list">
                  <li v-for="(armies, index) in playGame.armies" :key="index" class="army-item" :class="[armies.units == 0 ? 'bg-red' : 'bg-green']">
                    <div><i class="fas fa-fighter-jet"></i> {{armies.name}} - <span>{{armies.units}}</span> <span v-if="armies.units == 0 ? '' : 'WINNER'"></span></div>
                  </li>
                </ul>
              </div>
          </div>
          </div>
          <div class="offset-md-2"></div>
        </div>
    </div>
    <div class="container">
      <div v-if="playGame" class="game-title">Game Logs</div>
      <div class="row">
        <div class="offset-md-1"></div>
        <div class="col-md-10">
          <div class="attack-wrapper" v-if="playGame">
              <div class="attack-wrapper-inner d-flex align-items-center justify-content-around" v-for="(logs, index) in playGame.battleLogs" :key="index">
                <div class="attack-left">
                  <p>{{logs.attacker.name }}</p>
                  <p>Units: {{logs.attacker.units }}</p>
                  <p>Attack Strategy: {{logs.attacker.attack_strategy }}</p>
                </div>
                <div>
                  <div>Attack</div>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </div>
                <div class="attack-right">
                  <p>{{logs.defender.name }}</p>
                  <p>Units: {{logs.defender.units }}</p>
                  <p>Attack Strategy: {{logs.defender.attack_strategy }}</p>
                </div>
              </div>
          </div>
        </div>
        <div class="offset-md-1"></div>
      </div>
    </div>
    <modal name="modal">
      <div v-if="playGame">
          <div v-for="(armie, index) in playGame.armies" :key="index">
            <div class="text-center font-bold" v-if="armie.units !== 0">{{ armie.name }} WINNER!</div>
          </div>
      </div>
    </modal>
  </div>
</template>

<script>
import TopBar from './components/top-bar'
import axios from 'axios'
import 'babel-polyfill';
import modal from 'vue-js-modal'
export default {
  name: "game-list",
  components: {
    TopBar
  },
  data() {
    return {
      games: null,
      choosedGameId: null,
      playGame: null,
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

      const res = await axios.post('http://army-battle.test/api/game/run-attack', data);
      this.playGame = res.data.game;

      console.log(this.countAttack)
      console.log(this.playGame)

      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      
    },
    showModal(){
      this.$modal.show('modal');
    },
    hideModal(){
        this.$modal.hide('modal');
    }
  }
}
</script>

<style scoped>

</style>