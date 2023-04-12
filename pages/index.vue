<template>
  <v-row
    no-gutters
    class="fill-height"
    justify="center"
    align-content="center"
    style="background-color: #c7d0d8"
  >
    <v-col cols="12" lg="9" class="pa-7">
      <v-card width="100%" style="border-radius: 10px">
        <!-- <v-card outlined width="100%"> -->
        <v-form
          v-model="form.valid"
          @submit.prevent="
            submit({ email: form.email, password: form.password })
          "
        >
          <v-row no-gutters class="pa-8">
            <v-col cols="12" lg="6">
              <v-layout justify-center align-center>
                <v-flex shrink>
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="500"
                    max-width="500"
                    src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=1060&t=st=1674492559~exp=1674493159~hmac=4ff72f6d869d781ece89a7adff3203042f56c7f91dd822d4b0e25bfad265b92a"
                  ></v-img>
                </v-flex> </v-layout
            ></v-col>
            <v-col cols="12" lg="6" class="mt-8">
              <v-col cols="12">
                <v-text-field
                  dense
                  label="E-mail"
                  type="email"
                  outlined
                  :rules="[$rules.email]"
                  v-model="form.email"
                ></v-text-field>
                <!-- </v-col>

              <v-col cols="12" class="my-1"> -->
                <v-text-field
                  dense
                  label="Password"
                  type="password"
                  outlined
                  v-model="form.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="my-1">
                <v-row no-gutters justify="center">
                  <v-col cols="12" lg="6" md="4" sm="6" class="pa-2">
                    <v-btn
                      block
                      :disabled="!form.valid"
                      type="submit"
                      color="#2d3436"
                      class="white--text"
                    >
                      login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import util from "~/plugins/util";

export default {
  layout: "plain",
  mixins: [util],

  mounted() {
    if (this.$auth.loggedIn) {
      this.$auth.logout();
    }
  },

  data() {
    return {
      form: {
        valid: false,
        email: "",
        password: "",
      },
    };
  },

  methods: {
    submit({ email = "", password = "" } = {}) {
      this.$store.dispatch("setLoadingProperty", {
        value: true,
        property: "value",
      });
      this.$auth
        .loginWith("local", { data: { email, password } })
        .then(() => {
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.$store.dispatch("setNotificationProperty", {
            value: error.response.data.err,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
            property: "value",
          });
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });
        });
    },
  },
};
</script>

<style>
</style>