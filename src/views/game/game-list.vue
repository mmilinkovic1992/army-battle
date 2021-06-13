<template>
  <div class="game-wrapper">
    <TopBar></TopBar>
    <div class="container">
        <h1 class="game-title">Game List</h1>
        <div class="row">
          <div class="offset-md-2"></div>
          <div class="col-md-8">
            <div class="message-error" v-if="messageError">{{ messageError }} <i class="fas fa-times" @click="closeMessage"></i></div>
            <div class="message-success" v-if="messageSuccess">{{ messageSuccess }} <i class="fas fa-times" @click="closeMessage"></i></div>
            <form @submit.prevent="submit" class="form">
              <div class="form-group">
                <label>Choose a game</label>
                <select class="form-control" v-model="choosedGameId">
                  <option :value="game.id" v-for="game in games" :key="game.id">{{ game.name }}</option>
                </select>
              </div>
              <div class="form-group text-center">
                <button type="submit" class="game-btn ml-0"><i class="far fa-hand-point-right"></i> Run Attack</button>
                <button class="game-btn" @click.prevent="resetGame">Reset Game</button>
              </div>
            </form>
            <div v-if="playGame">
              <div class="army-card">
                <div class="attack-counter text-center">Attack Counter: <span>{{ countAttack }}</span></div>
                <div class="army-title">Armies</div>
                <ul class="army-list">
                  <li v-for="(armies, index) in playGame.armies" :key="index" class="army-item" :class="[armies.units != 0 ? 'bg-green' : 'bg-red']">
                    <div><i class="fas fa-fighter-jet"></i> {{armies.name}} - <span>{{armies.units}}</span></div>
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
            <div class="text-center winner" v-if="armie.units !== 0">{{ armie.name }} <span>WINS</span> after the {{ countAttack + 1 }}th attack.</div>
          </div>
      </div>
    </modal>
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
      choosedGameId: null,
      playGame: null,
      messageError: '',
      messageSuccess: '',
      countAttack: null
    }
  },
  async mounted() {
    try {
      const res = await axios.get('http://army-battle.test/api/games');
      this.games = res.data.games
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async submit() {
      const data = {
        game_id: this.choosedGameId,
      }
      if(data.game_id !== null) {
        const res = await axios.post('http://army-battle.test/api/game/run-attack', data);
        this.playGame = res.data.game;
      }else {
        this.messageError = 'Choose a game to run attack.'
      }

      if(this.playGame.status === 'started') {
        this.countAttack++
      }

      if(this.playGame.status === 'finished') {
        this.$modal.show('modal')
      } else {
        this.$modal.hide('modal')
      }
      console.log(this.playGame)
      
      // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          
    },
    closeMessage() {
      if(this.messageError) {
        this.messageError = '';
      }

      if(this.messageSuccess) {
        this.messageSuccess = '';
      }

    },
    async resetGame() {
      const data = {
        game_id: this.choosedGameId
      }

      if(data.game_id) {
        const res = await axios.post('http://army-battle.test/api/game/reset/' + data.game_id)
        this.games = null
        this.playGame = null
        this.$router.push("/game/add-army");

      } else {
        this.messageError = 'Choose a game to run attack.'
      }
    }
  }
}
</script>

<style scoped>

</style>
