<template>
  <v-dialog v-model="notification" persistent max-width="290">
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card-text class="text-center">
              {{ $store.state.notification.text }}</v-card-text
            >
          </v-col>
          <v-col cols="12">
            <v-row
              no-gutters
              justify="center"
              class="fill-height"
              align-content="center"
            >
              <v-btn dark small @click="closeNotification()">close</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  created() {},

  data() {
    return {
      close: {
        display: false,
        message: null,
      },
    };
  },

  computed: {
    notification: {
      get() {
        return this.$store.state.notification.value;
      },
      set(value) {
        this.$store.dispatch("setNotificationProperty", {
          property: "value",
          value,
        });
      },
    },
  },

  methods: {
    closeNotification() {
      this.$store.dispatch("setNotificationProperty", {
        property: "value",
        value: false,
      });
    },
  },
};
</script>
