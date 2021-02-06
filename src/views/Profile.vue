<template>
  <v-app id="inspire">
        <v-parallax
                height="200"
                src="../assets/graphy--dark.png"
        >

        <v-row
            align="center"
            justify="left"
            >
            <v-col
                class="text-left pl-10"
                cols="11"
            >
                <v-avatar
                    color="primary"
                    size="80"
                    class="mb-3 ml-3"
                >
                    <span class="white--text headline"> {{ avatar_initials }} </span>
                    <!-- <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    > -->
                </v-avatar>
                <h1 class="display-1 font-weight-thin">
                    {{ user.username }}
                </h1>
                <h4 class="subheading">
                    {{ user.email }}
                </h4>
            </v-col>

            <v-col align-self="start" class="mt-2" cols="1">
                <v-btn outlined color="white" text fab>
                    <v-icon>
                        mdi-open-in-new
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        </v-parallax>
        
        <v-container>
            <v-subheader>Posts</v-subheader>
            <v-row no-gutters dense>
                <v-col cols="12"
                    sm="6"
                    md="4" v-for="n in 5" :key="n">
                    <v-card
                        class="mx-auto mb-10"
                        max-width="344"
                    >
                        <v-card-text>
                        <div>Word of the Day</div>
                        <p class="display-1 text--primary">
                            el·ee·mos·y·nar·y
                        </p>
                        <p>adjective</p>
                        <div class="text--primary">
                            relating to or dependent on charity; charitable.<br>
                            "an eleemosynary educational institution."
                        </div>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn
                            text
                            color="teal accent-4"
                            @click="reveal = true"
                        >
                            Learn More
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card
                            v-if="reveal"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%;"
                        >
                            <v-card-text class="pb-0">
                            <p class="display-1 text--primary">
                                Origin
                            </p>
                            <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            <v-btn
                                text
                                color="teal accent-4"
                                @click="reveal = false"
                            >
                                Close
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            user: {
                id: '',
                url: '',
                username: '',
                email: ''
            },

            blogs: [],
            
            avatar_initials: ''
        }
    },

    created() {

        // Condition if view is from owner || visitor
        if(typeof this.$route.query.id === 'undefined') {

            this.user = this.$store.state.user_data.user_data
            this.initialize(this.user.id)

        } else {

            let id = this.$route.query.id

            console.log('id: ' +id)

            // initialize user's profile
            this.get_user(id)
            this.initialize(id)

        }
    },

    methods: {
        initialize(id) {
            // initialize list of posts

            let user_id = id

            console.log(user_id)

            this.$axios
            .get('http://127.0.0.1:8000/blogs?author='+user_id)
            .then(response => {
                this.blogs = response.data
                this.initialize_user()   
            })
            .catch(error => {
                console.log(error);
            })
        },
        

        get_user(id) {
            this.$axios
            .get('http://127.0.0.1:8000/users/'+id)
            .then(response => {
                this.user = response.data        
                this.initialize_user() 
            })
            .catch(error => {
                console.log(error);
            })
        },

        initialize_user() {
            this.avatar_initials = this.user.username[0].toUpperCase() 
                                    + this.user.username[1].toUpperCase()
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>