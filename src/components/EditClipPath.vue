<template>
  <div class="edit-clip-path">
    <item-block title="裁切类型">
      <el-select v-model="clip.type" @change="clipTypeChange" size="mini" :style="{width: '120px'}">
        <el-option value="none" label="无裁切"></el-option>
        <el-option value="polygon" label="多边形"></el-option>
        <el-option value="ellipse" label="椭圆"></el-option>
      </el-select>
    </item-block>

    <div class="clip-polygon">
      <item-block :title="`点${(index+1)}`" v-for="(point, index) of clip.points" :key="index" :label-width="60">
        <el-input-number size="mini" v-model="point[0]" :precision="2" :step="0.05" :max="10" :style="{marginRight: '5px'}"></el-input-number>
        <el-input-number size="mini" v-model="point[1]" :precision="2" :step="0.05" :max="10" :style="{marginRight: '5px'}"></el-input-number>
        <el-button type="text" icon="el-icon-delete" @click="removePoint(index)"></el-button>
      </item-block>
      <el-button icon="el-icon-plus" type="text" @click="addPoint">增加</el-button>
    </div>
  </div>
</template>

<script>
import ItemBlock from './ItemBlock'
export default {
  name: 'EditClipPath',
  components: { ItemBlock },
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      clip: this.value
    }
  },
  created () {},
  watch: {
    value () {
      this.clip = this.value
    },

    clip: {
      handler: function (val, oldVal) {
        this.$emit('input', this.clip)
      },
      deep: true
    }
  },
  methods: {
    clipTypeChange () {
      if (this.clip.type === 'polygon') {
        this.$set(this.clip, 'points', [[0, 0], [1, 0], [1, 1], [0, 1]])
        // this.clip.points =
      } else if (this.clip.type === 'ellipse') {
        this.$set(this.clip, 'points', [[0.5, 0.5], [0.5, 0.5]])
      } else {
        this.$set(this.clip, 'points', [])
      }
    },

    removePoint (index) {
      this.clip.points.splice(index, 1)
    },

    addPoint () {
      this.clip.points.push([0.5, 0.5])
    }
  }
}
</script>

<style lang="less">
.edit-clip-path {
  .van-stepper {
    float: left;
    margin-right: 5px;
  }
}
</style>
