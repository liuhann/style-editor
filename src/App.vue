<template>
  <div id="app">
    <div class="container" :style="containerStyle">
      <div class="element" :style="elementStyle"></div>
    </div>
    <div class="config-box">
      <prop-config :element="element" fontable></prop-config>
    </div>
  </div>
</template>

<script>
import PropConfig from './components/PropConfig'
import template from './model/elements'
export default {
  name: 'StyleEditor',
  components: { PropConfig },
  computed: {
    containerStyle () {
      return {
        position: 'absolute',
        width: this.device.width + 'px',
        height: this.device.height + 'px',
        left: (window.innerWidth / 2 - this.device.width / 2) + 'px',
        top: (window.innerHeight / 2 - this.device.height / 2) + 'px',
        'border-radius': '6px',
        'box-shadow': '0 1px 4px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.2)'
      }
    }
  },
  data () {
    return {
      device: {
        width: 375,
        height: 667
      },
      elementStyle: '',
      element: template
    }
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.config-box {
  position: absolute;
  top: 0;
  overflow-y: auto;
  right: 0;
  bottom: 0;
  width: 320px;
}
</style>
