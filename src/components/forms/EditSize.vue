<template>
<div class="edit-position config-group">
  <item-block title="锁定比例">
    <el-checkbox v-model="value.fix"></el-checkbox>
  </item-block>
  <edit-len label="宽度" v-model="value.width" @change="changeSize('width')"></edit-len>
  <edit-len label="高度" v-model="value.height" @change="changeSize('height')"></edit-len>
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
      // position: this.value
    }
  },
  watch: {
  },
  computed: {
  },
  created () {

  },
  methods: {
    changeSize (v) {
      if (this.value.fix) {
        debugger
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
.position-preview {
  width: 80vw;
  height: 80vw;
}

</style>
