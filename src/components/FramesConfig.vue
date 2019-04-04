<template>
<div class="animation-config">
  <div class="preview">
    <div class="box">
    </div>
    预览
  </div>
  <div class="frames">
    <item-block label="动画名称">
      <el-input v-model="animation.name"></el-input>
    </item-block>
  </div>
  <el-dialog
    title="设置关键帧"
    :visible.sync="dialogVisible"
    width="320px"
    :before-close="handleClose">
    <div class="frame-dialog-content">
      <edit-len label="进度百分比" v-model="currentFrame.percent"></edit-len>
      <edit-transform v-model="currentFrame.transform"></edit-transform>
      <edit-clip-path v-model="currentFrame.clip"></edit-clip-path>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import { Button, ButtonGroup, InputNumber, Table, TableColumn } from 'element-ui'
import EditTransform from './EditTransform'
import EditClipPath from './EditClipPath'
import FRAME from '../model/frame'
import ItemBlock from './ItemBlock'
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
export default {
  name: 'FramesConfig',
  props: {
    animation: {
      type: Object
    }
  },
  components: { ItemBlock, EditClipPath, EditTransform },
  data () {
    return {
      activeNames: [],
      currentFrame: null,
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>

<style lang="less">

</style>
