<template>
  <div class="game-wrapper">
    <div class="container">
        <TopBar></TopBar>
        <h1 class="game-title">Add army to the game</h1>
        <div class="row">
          <div class="offset-md-2"></div>
          <div class="col-md-8">
            <div class="message-success" v-if="messageSuccess">{{ messageSuccess }} <i class="fas fa-times" @click="closeMessage"></i></div>
            <div class="message-error" v-if="messageError">{{ messageError }}</div>
            <form class="form" @submit.prevent="assign" method="put">
              <div class="form-group">
                <label>Choose Game</label>
                <Multiselect
                  v-model="assignedGame"
                  :options="games"
                  :multiple="false"
                  :close-on-select="true"
                  placeholder="Choose game"
                  label="name"
                  track-by="id"
                  :allowEmpty="false"
                ></Multiselect>
              </div>
              <div class="form-group">
                <label>Choose minimun 5 armies</label>
                <Multiselect
                  v-model="assignedArmy"
                  :options="armies"
                  :multiple="true"
                  :close-on-select="false"
                  :min="5"
                  placeholder="Choose minimun 5 armies"
                  label="name"
                  track-by="id"
                  :allowEmpty="true"
                ></Multiselect>
              </div>
              <div class="form-group">
                <button 
                  type="submit" 
                  class="game-btn ml-0"
                >Add Army</button>
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
import 'babel-polyfill'
import Multiselect from 'vue-multiselect'
export default {
  name: "add-army",
  components: {
      TopBar,
      Multiselect
  },
  data() {
    return {
      games: [],
      armies: [],
      assignedGame: null,
      assignedArmy: null,
      dataArmyIds: null,
      messageSuccess: '',
      messageError: ''
    }
  },
  async mounted() {

    try {
      const resGames = await axios.get('http://army-battle.online/api/games');
      this.games = resGames.data.games
    } catch (error) {
      console.log(error)
    }

    try {
      const resArmies = await axios.get('http://army-battle.online/api/armies');
      this.armies = resArmies.data.armies
      
    } catch (error) {
      console.log(error)
    }

  },
  computed: {
    armyLoopIds() {
      let array = [];
      this.assignedArmy.forEach(element => {
        array.push(element.id);
        this.dataArmyIds = array;
      });
      return this.dataArmyIds;
    }
  },
  methods: {
    async assign() {
        const data = {
          game_id: this.assignedGame.id,
          army_ids: this.armyLoopIds
        }

        try {
          const res = await axios.put('http://army-battle.online/api/game/assign-army', data);
          this.messageSuccess = res.data.message;
        } catch (error) {
          this.messageError = 'Something went wrong.';
          console.log(error)
        }

        // if(data.army_id.length >= 5) {

        // } else {
        //   this.messageError = 'You must choose minimum 5 armies.';
        // }

      // this.$router.push("/game/game-list");
    },
    closeMessage() {
      if(this.messageSuccess) {
        this.messageSuccess = ''
      }

      if(this.messageError) {
        this.messageError = ''
      }
    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>