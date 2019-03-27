<template>
  <div id="app">
    <div class="container">

    </div>
    <div class="config-box">
      <prop-config :element="element" fontable></prop-config>
    </div>
  </div>
</template>

<script>
import PropConfig from './PropConfig'
import template from '../model/elements'
export default {
  name: 'StyleEditor',
  components: { PropConfig },
  data () {
    return {
      element: template
    }
  }
}
</script>

<style scoped>

</style>
