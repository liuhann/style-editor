<template>
  <div class="style-config">
    <edit-font v-model="element.font" v-if="fontable && element.font"></edit-font>
  </div>
</template>

<script>
import EditFont from './forms/EditFont'
import Vue from 'vue'
import { Button, InputNumber, ColorPicker, Radio } from 'element-ui'

Vue.use(Button)
Vue.use(InputNumber)
Vue.use(ColorPicker)
Vue.use(Radio)

export default {
  name: 'PropConfig',
  props: {
    element: {
      type: Object
    },
    fontable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EditFont
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">

</style>
