<template>
  <v-textarea
    v-bind="$attrs"
    v-on="$listeners"
    dense
    outlined
    persistent-hint
    :hint="required ? $attrs.hint || 'Required' : $attrs.hint || 'Optional'"
  ></v-textarea>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>