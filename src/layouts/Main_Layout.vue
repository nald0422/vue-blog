<template>
  <v-app id="inspire">
    <v-app-bar
      absolute
      dark
      dense
      app=true
    >
      <!-- <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template> -->

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-app-bar-title>
        Demo
      </v-app-bar-title> -->

      <v-spacer></v-spacer>
      
      <!-- <v-text-field
            class="mt-6"
            solo
            label="Search"
            dense
            prepend-inner-icon="mdi-magnify"
      ></v-text-field>    -->
      
      <v-spacer></v-spacer>

      <!-- <v-btn
        outlined
        @click="signOff()"
      >Log Out</v-btn> -->

      <!-- <v-btn class="ml-4 mr-4"
        outlined
      >Sign Up</v-btn> -->

      <!-- <v-divider class="mx-4" vertical></v-divider> -->

      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          dark
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              dense
            >
              <v-icon dark>
                mdi-format-quote-open-outline
              </v-icon>
            </v-btn>
          </template>

          <v-card :elevation="10">
            <v-list>
              <v-list-item>
                <v-list-item-avatar color=indigo>
                  <v-icon dark>
                    mdi-account-circle
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user.username }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <!-- <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="message"
                    color="purple"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable messages</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="hints"
                    color="purple"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
              </v-list-item>
            </v-list> -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="signOff()"
              >
                <v-icon left>
                  mdi-account-arrow-right-outline
                </v-icon>
                Log out
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>


    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      app="true"
      style="height: 100%"
      fixed="true"
    >
      <v-list
        nav
        dense
      >
        <!-- <v-subheader>Navigate</v-subheader> -->
        <v-list-item-group
          v-model="group"
          active-class="light-blue darken-4--text text--accent-4"
        >
          <v-list-item :to="link.route" v-for="(link, i) in links" :key="i">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <v-col>
            <!-- <v-sheet
              min-height="70vh"
              rounded="sm"
              :elevation="10"
              class="px-3 py-3"
            > -->
                <!-- <v-card :elevation="10"> -->
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                <!-- </v-card> -->
            <!-- </v-sheet> -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      
      menu: false,
      
      links: [
          { icon: 'mdi-home', text: 'Home', route: '/home' },
          { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
          { icon: 'mdi-post', text: 'Profile', route: '/profile' },
          { icon: 'mdi-account', text: 'Account', route: '/account' },
      ],
      drawer: true,
      app: true,

      group: 0,

      user: {
        id: '',
        username: '',
        email: ''
      }

    }),

    methods: {
      signOff() {
            this.$cookies.remove('token')
            this.remove_user()
            this.$router.push('/login')
        },

      remove_user() {
            this.$store.commit('userModel/mutate_remove_user')
        },
    },

    created() {
      this.user = this.$store.state.user_data.user_data   
    }
  }
</script>