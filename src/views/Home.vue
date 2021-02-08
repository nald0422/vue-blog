<template>
  <v-app id="inspire">
    <v-container>
            <v-subheader><h4>Posts</h4></v-subheader>
            <v-row no-gutters dense>
                <v-col cols="12"
                    sm="6"
                    md="4" v-for="blog in blogs" :key="blog.id">
                    
                    <v-card
                        class="mx-auto mb-10"
                        max-width="344"
                        tile
                        min-height="150"
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
  data () {
    return {
      blogs: [],
      like: {
                status: false,
                likes: 5,
            },
            
            share: {
                status: false,
                shares: 0,
            },
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
            // initialize list of posts
            this.$axios
            .get('http://127.0.0.1:8000/blogs')
            .then(response => {
                this.blogs = response.data
                console.log('username: ' + this.blogs[0].author)
            })
            .catch(error => {
                console.log(error);
            })
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
  }
}
</script>
