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
import Armies from "../../data/Armies";

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
  mounted() {
    this.armies = Armies.methods.getArmies().armies
    this.backupArmies = this.armies
  }

}
</script>

<style scoped>

</style>