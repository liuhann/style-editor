<template>
  <div id="app">
    <div class="header">
    </div>
    <div class="frames">
      <div class="code">
        <pre>{{ pretty }}</pre>
      </div>
      <div class="preview">
        <div class="device" :style="containerStyle">
          <div class="element" :style="elementStyle"></div>
        </div>
      </div>
      <div class="config-box">
        <prop-config :element="element" fontable @file-add="fileAdded" @file-remove="fileRemoved"></prop-config>
      </div>
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
        width: this.device.width + 'px',
        height: this.device.height + 'px'
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

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #2c3e50;

  height: 100%;
  .header {
    background: #fff;
    box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
    height: 32px;
  }
  .frames {
    height: calc(100% - 32px);
    display: flex;
  }
  .code {
    width: 320px;
    //border-right: 1px solid #0ae;
  }
  .preview {
    flex: 1;
    background-color: #FAFAFA;
    .device {
      position: relative;
      background: #fff;
      margin: 20px auto;
      border: 1px solid #d6d9dc;
      border-radius: 3px;
      box-shadow: 0 2px 8px rgba(59,64,69,0.1);
    }
  }
  .config-box {
    // box-shadow: 0 2px 8px rgba(59,64,69,0.1);
    overflow-y: auto;
    width: 320px;
  }
}
.config-box::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

.config-box::-webkit-scrollbar-thumb {
  background-color: #0ae;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
}
.config-box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}
</style>
