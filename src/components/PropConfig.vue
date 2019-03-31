<template>
  <div class="style-config">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="字体" size="mini" name="font" v-if="fontable && element.font">
        <edit-font v-model="element.font" ></edit-font>
      </el-collapse-item>
      <el-collapse-item title="大小" size="mini" name="size">
        <edit-size v-model="element.size"></edit-size>
      </el-collapse-item>
      <el-collapse-item title="位置" size="mini" name="position">
        <edit-position v-model="element.position"></edit-position>
      </el-collapse-item>
      <el-collapse-item title="背景" size="mini" name="background">
        <edit-background v-model="element.background"></edit-background>
      </el-collapse-item>
      <el-collapse-item title="边框" size="mini" name="border">
        <edit-border v-model="element.border"></edit-border>
      </el-collapse-item>
      <el-collapse-item title="裁剪" size="mini" name="clip">
        <edit-clip-path v-model="element.clip"></edit-clip-path>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import EditFont from './forms/EditFont'
import EditPosition from './forms/EditPosition'
import Vue from 'vue'
import { Button, InputNumber, ColorPicker, Radio, Select, Option, Checkbox, Collapse, CollapseItem, Upload } from 'element-ui'
import EditBackground from './forms/EditBackground'
import EditBorder from './forms/EditBorder'
import EditClipPath from './forms/EditClipPath'
import EditSize from './forms/EditSize'

Vue.use(Button)
Vue.use(InputNumber)
Vue.use(ColorPicker)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Upload)

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
    EditSize,
    EditClipPath,
    EditBorder,
    EditBackground,
    EditPosition,
    EditFont
  },
  data () {
    return {
      activeNames: []
    }
  }
}
</script>

<style lang="less">
.el-radio {
  margin-right: 2px;
}
.el-checkbox {
  margin-right: 2px;
}
.el-input-number--mini {
  width: 100px;
}
.el-collapse-item__header {
  padding-left: 10px;
  /*height: 28px;*/
  /*line-height: 28px;*/
}
.el-collapse-item__content {
  padding-bottom: 5px;
}
</style>
