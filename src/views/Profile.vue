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

            <v-col align-self="start" class="mt-2" cols="1" v-show="open_status">
                <v-btn outlined color="white" text fab @click="open_tab()"  target="_blank">
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
                    md="4" v-for="blog in blogs" :key="blog.id">
                    
                    <v-card
                        class="mx-auto mb-10"
                        max-width="344"
                        tile
                        min-height="150"
                        :transition="scroll-y-reverse-transition"
                    >
                        <v-card-text>                        
                        <p class="display-1 text--primary">
                            {{ blog.title }}
                        </p>
                        <v-divider class="my-4"></v-divider>
                        <div class="text--primary">
                            {{ blog.description }}
                        </div>
                        <p> {{ blog.date }} </p>
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="grow">
                                <!-- <v-list-item-avatar color="primary">
                                    <span class="white--text"> {{ avatar_initials }} </span>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title>{{ user.username }}</v-list-item-title>
                                </v-list-item-content> -->

                                <v-row
                                align="center"
                                justify="end"
                                >
                                <v-icon class="mr-1"
                                    @click="increment_likes()"
                                    color="red">
                                    mdi-heart
                                </v-icon>
                                <span class="subheading mr-2"> {{ like.likes }} </span>
                                <span class="mr-1">·</span>
                                <v-icon 
                                    class="mr-1"
                                    @click="increment_shares()"
                                    color="grey">
                                    mdi-export-variant
                                </v-icon>
                                <span class="subheading"> {{ share.shares }} </span>
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                        <!-- <v-chip
                            link
                            class="ma-2"
                            color="primary"
                            >
                            Post
                        </v-chip> -->
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

            like: {
                status: false,
                likes: 5,
            },
            
            share: {
                status: false,
                shares: 0,
            },

            blogs: [],
            
            avatar_initials: '',
            open_status: false
        }
    },

    created() {

        // Condition if view is from owner || visitor
        if(typeof this.$route.query.id === 'undefined') {

            this.user = this.$store.state.user_data.user_data
            this.initialize(this.user.id)
            this.open_status = true

        } else {

            let id = this.$route.query.id
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
        },

        increment_likes() {
            if(this.like.status == false) {
                this.like.likes++
                this.like.status = true
            } else {
                this.like.likes--
                this.like.status = false
            }
        },

        increment_shares() {
            if(this.share.status == false) {
                this.share.shares++
                this.share.status = true
            } else {
                this.share.shares--
                this.share.status = false
            }
        },

        open_tab() {
            let routeData = this.$router.resolve({name: 'UserProfile', query: {id: this.user.id}});
            window.open(routeData.href, '_blank');
        }
    }
    
}
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>