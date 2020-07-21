<template>
  <div class="_CustomPagination">
    <template v-if="getNumberOfTabs && getNumberOfTabs !== 1">
      <template v-if="showFirstElement">
        <slot
          v-bind="{
            number: 1,
            
            classObj: {
              isActive: getNumberOfTabs === 0,
              isMin: true,
            },
          }"
        >
        </slot>
        <slot name="divisor" v-bind="{isFirst: true}">...</slot>
      </template>

      <slot v-for="num in displayNumbers"
        v-bind="{
          number: data.initial + num,

          classObj: {
            isActive: (data.initial + num) === value,
            isLast: num === displayNumbers,
            isFirst: num === 1,
          },
        }"
      ></slot>
      
      <template v-if="showLastElement">
        <slot name="divisor" v-bind="{isLast: true}">...</slot>
        <slot
          v-bind="{
            number: getNumberOfTabs,

            classObj: {
              isActive: getNumberOfTabs === value,
              isMax: true,
            },
          }"
        >
        </slot>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    numberOfTabs: {
      type: Number,
    },
    scope: {
      type: Number,
      default: 4,
    },

    listLength: {
      type: Number,
    },
    pageSize: {
      type: Number,
    },
  },
  data() {
    return {
      current: this.value, 
    }
  },
  computed: {
    getNumberOfTabs() {
      const listLength = this.listLength
      const pageSize = this.pageSize
      const numberOfTabs = this.numberOfTabs
      
      if (((listLength || pageSize) && numberOfTabs) || (!listLength && !pageSize && !numberOfTabs))
        throw `You must either provide both "pageSize" and "listLength" or only "numberOfTabs"!`
      
      if (numberOfTabs)
        return this.numberOfTabs

      if (!listLength || !pageSize)
        throw `You must provide "listLength" and "pageSize", listLength: ${listLength}, pageSize: ${pageSize}`
      
      return Math.ceil(listLength / pageSize)
    },
    
    displayNumbers() {
      const { initial, final, implement } = this.data
      const total = final - initial + implement 
      if (total > this.getNumberOfTabs)
        return this.getNumberOfTabs
      return total
    },
    data() {
      const val = this.value
      const max = this.getNumberOfTabs
      let off = this.scope

      if (off < 1)
        off = 2
      if (val === 0)
        throw `"v-model/value" has to be bigger than 0, it is ` + val
      if (val > max)
        throw `"v-model/value" has to be less than max {${max}}, it is ${val}`
      
      const implement = (val - off < 0) ?
        off - val :
          ((max - val) < off) ?
            ((max - val) - off + 1) : 0

      let initial = implement ? (val - off + implement) : (val - off)

      if (initial < 0)
        initial = 0


      return {
        implement,
        initial,
        final: !implement ? (val + off - 1 - implement) : (val + off - 1),
      }
    },
    showFirstElement() {
      const { initial, implement } = this.data
      return initial > 0
    },
    showLastElement() {
      const { initial, final, implement } = this.data
      return (final + implement) < this.getNumberOfTabs
    },
  },
  watch: {
    current(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.current = val
    },
  },
}

</script>

<style scoped>

._CustomPagination {
  display: flex;
  justify-content: center;
}

</style>
