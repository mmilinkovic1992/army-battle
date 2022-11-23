<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <CForm inline>
              <CInput
                  class="mr-sm-2 my-2 my-sm-2"
                  placeholder="Search"
                  size="sm"
                  ref="searchDetails"
                  @keyup="searchArmies()"
              />
            </CForm>
            <CTableWrapper
                :items="armies"
                hover
                striped
                border
                small
                fixed
                caption="Armies"
                :fields="fields"
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>

import CTableWrapper from '../base/Table.vue'
import 'babel-polyfill';
import axios from "axios";

export default {
  name: "index",
  components: { CTableWrapper },
  methods: {
    searchArmies() {
      const searchParam = this.$refs.searchDetails.state.toLowerCase()
      this.armies = this.backupArmies
      this.armies = this.armies.filter(army => army.name.toLowerCase().includes(searchParam))
    }
  },
  data() {
    return {
      fields : ['name', 'units', 'attack_strategy', 'created_at', 'updated_at'],
      armies: null,
      backupArmies: null,
      searchValue: ""
    }
  },
  async mounted() {
    await axios.get('http://army-battle.online/api/armies')
        .then(response => (this.armies = response.data.armies))
    this.backupArmies = this.armies
  }

}
</script>

<style scoped>

</style>