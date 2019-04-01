<template>
<div class="edit-transform">
  <edit-len label="移动X" v-model="transform.translate[0]"></edit-len>
  <edit-len label="移动Y" v-model="transform.translate[1]"></edit-len>
  <edit-len label="移动Z" v-model="transform.translate[2]"></edit-len>
  <edit-len label="缩放" v-model="transform.scale" :with-unit="false"></edit-len>
  <edit-len label="旋转X" v-model="transform.rotate[0]"></edit-len>
  <edit-len label="旋转Y" v-model="transform.rotate[1]"></edit-len>
  <edit-len label="旋转Z" v-model="transform.rotate[2]"></edit-len>
</div>
</template>

<script>
import EditLen from './EditLen'
export default {
  name: 'EditTransform',
  components: { EditLen },
  props: {
    transform: {
      type: Object
    }
  }
}
</script>

<style lang="less">

</style>
