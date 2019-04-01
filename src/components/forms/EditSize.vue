<template>
<div class="edit-size">
  <edit-len label="宽度" v-model="value.width"></edit-len>
  <item-block title="锁定比例">
    <el-button-group size="mini">
      <el-button v-for="(relate, index) of relates"
                 :class="index === relatedIndex ? 'current': ''"
                 @click="chooseIndex(index)"
                 size="mini"
                 :key="index"
                 :icon="relate.icon"
                 round>{{relate.value}}</el-button>
    </el-button-group>
  </item-block>
  <edit-len label="高度" v-model="value.height"></edit-len>
</div>
</template>

<script>
import EditLen from './EditLen'
import ItemBlock from './ItemBlock'
export default {
  name: 'EditSize',
  components: {
    ItemBlock,
    EditLen
  },
  props: {
    value: {
      type: Object
    },
    device: {
      type: Object
    }
  },
  data () {
    return {
      relatedIndex: -1
    }
  },
  watch: {
    'value.width': function (newVal, oldVal) {
      if (this.relatedIndex > -1) {

      }
    }
  },
  computed: {
    relates () {
      return [{
        icon: 'el-icon-sort',
        value: ''
      }, {
        value: '4:3'
      }, {
        value: '3:2'
      }, {
        value: '2:1'
      }]
    }
  },
  created () {

  },
  methods: {
    chooseIndex (index) {
      this.relatedIndex = index
    },
    changeSize (v) {
      if (this.value.fix) {
        if (v === 'width') {
          this.value.height = this.value.width
        } else {
          this.value.width = this.value.height
        }
      }
    }
  }
}
</script>

<style lang="less">
.edit-size {
  .el-button-group {
    .current {
      background: #333;
      color: #fff;
    }
  }
}
</style>
