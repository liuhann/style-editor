<template>
  <div id="app">
    <pre>{{ pretty }}</pre>
    <div class="container" :style="containerStyle">
      <div class="element" :style="elementStyle"></div>
    </div>
    <div class="config-box">
      <prop-config :element="element" fontable @file-add="fileAdded" @file-remove="fileRemoved"></prop-config>
    </div>
  </div>
</template>

<script>
import PropConfig from './components/PropConfig'
import template, { simplify } from './model/element'
import { getElementStyle } from './utils/styles'


function clone (obj) {
  // Handle the 3 simple types, and null or undefined
  if (obj == null || typeof obj !== 'object') return obj
  // Handle Array
  if (obj instanceof Array) {
    let copy = []
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }
  // Handle Object
  if (obj instanceof Object) {
    let copy = {}
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }
  return obj
}

export default {
  name: 'StyleEditor',
  components: { PropConfig },
  computed: {
    containerStyle () {
      return {
        position: 'absolute',
        width: this.device.width + 'px',
        height: this.device.height + 'px',
        left: (window.innerWidth / 2 - 160 - this.device.width / 2) + 'px',
        top: (window.innerHeight / 2 - this.device.height / 2) + 'px',
        'border-radius': '6px',
        'box-shadow': '0 1px 4px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.2)'
      }
    },
    elementStyle () {
      return getElementStyle(this.element, this.device)
    },
    pretty () {
      return JSON.stringify(simplify(this.element, template), null, 2)
    }
  },
  data () {
    return {
      device: {
        width: 320,
        height: 540
      },
      element: clone(template)
    }
  },
  methods: {
    fileAdded (file) {
      console.log(file)
    },
    fileRemoved (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #2c3e50;
}
.config-box {
  border-left: 1px solid #efefef;
  position: absolute;
  top: 0;
  overflow-y: auto;
  right: 0;
  bottom: 0;
  width: 320px;
}
</style>
