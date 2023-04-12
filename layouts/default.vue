<template>
  <v-app style="background: #c7d0d8">
    <Loading />
    <LayoutComponentNotification />

    <v-app-bar app clipped-left color="#FFFFFF">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="#5d7285"
      ></v-app-bar-nav-icon>
      <v-icon class="ml-3 mr-2" color="#0C7FDA">mdi-alpha-i-box</v-icon>
      <v-toolbar-title
        class="text-capitalize font-weight-medium"
        style="color: #5d7285"
      >
        {{ $auth.user.type }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="#FFFFFF">
      <v-list class="pa-3" rounded>
        <template v-for="route in navigation.routes">
          <v-list-item
            color="#0C7FDA"
            :to="{ name: route.name, params: route.params }"
            :key="route.text"
          >
            <v-list-item-icon>
              <v-icon v-text="route.icon" style="font-size: 25px"></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="align-self-center">
              <v-list-item-title
                class="text-capitalize font-weight-regular"
                style="color: #5d7285"
              >
                {{ route.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item
          style="position: absolute; bottom: 0; width: 93%"
          class="mb-4"
        >
          <v-btn
            block
            dark
            @click="logout"
            color="#667A8A"
            class="text-capitalize font-weight-medium pa-5"
            style="border-radius: 4.18px"
          >
            <v-icon left> mdi-logout </v-icon>Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavigationModel from "~/models/model.navigation";
import UserModel from "~/models/model.user";
export default {
  mounted() {
    this.navigation = new NavigationModel({ role: this.$auth.user.type });
  },
  data() {
    return {
      applicant: new UserModel({ type: this.$route.params.type }),
      drawer: true,
      navigation: new NavigationModel({ role: "applicant" }),
    };
  },

  computed: {
    user() {
      return this.$auth.user || new UserModel();
    },
    resource() {
      const { DO_SPACES_LINK, ASSET_DIRECTORY } = this.$config;
      return `${DO_SPACES_LINK}/${ASSET_DIRECTORY}/${this.user.type}s/attachments/`;
    },
  },

  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>


