<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" width="100%" persistent>
    <!-- header -->
    <v-card tile height="5vh">
      <v-row no-gutters class="fill-height" justify="center" align="center">
        <span class="text-capitalize font-weight-medium">
          {{ title }}
        </span>
      </v-row>
    </v-card>
    <!-- content -->
    <v-card tile height="69vh" class="pa-0">
      <object
        :data="resource"
        type="application/pdf"
        width="100%"
        height="100%"
        style="border: 0"
      ></object>
    </v-card>
    <v-card tile max-height="6vh">
      <slot name="footer"> </slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    title: {
      type: String,
      required: false,
      default: "Attachment",
    },
    src: {
      type: String,
      default: () => "",
    },
  },

  computed: {
    resource() {
      return this.src && typeof this.src == "object"
        ? this.src.data
        : `https://resource-storage.sgp1.cdn.digitaloceanspaces.com/${this.$config.ASSET_DIRECTORY}/${this.src}`;
    },
  },
};
</script>

<style></style>
