<template>
  <v-app id="inspire">
    <v-container fluid>
    <v-row>
      <v-col class="col-12">
          <v-data-table
            :headers="headers"
            :items="blogs"
            sort-by="calories"
            class="elevation-10"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>CRUD POST</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      New Post
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="black darken-1">
                      <span class="headline white--text">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>

                        <v-row no-gutters class="pt-5">
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.title"
                              label="Title"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="editedItem.description"
                              outlined
                              dense
                              name="input-7-4"
                              label="About"
                            ></v-textarea>
                          </v-col>
                        </v-row>

                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pb-5">
                      <v-spacer></v-spacer>
                      <v-btn
                        dark
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        dark
                        @click="post"
                      >
                        {{ formBtn }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog tile dark v-model="dialogDelete" max-width="290">
                  <v-card>
                    <v-card-title class="headline white--text">Delete Post</v-card-title>
                    <v-card-text>Are you sure you want to delete this post?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn  depressed color="grey darken-4 white--text" @click="closeDelete">Cancel</v-btn>
                      <v-btn  depressed color="grey darken-4 red--text" @click="deleteItemConfirm">Delete</v-btn>
                      
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
                color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
                color="red"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <!-- -->
            </template>
          </v-data-table>
      </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
    data: () => ({ 
            dialog: false,
            dialogDelete: false,

            blogs: [],
            headers: [
              { text: 'Title', align: 'start', sortable: false, value: 'title' },
              { text: 'Description', value: 'description' },
              { text: 'Date Posted', value: 'date' },
              { text: 'Actions', value: 'actions', sortable: false }
            ],

            editedIndex: -1,
            editedItem: {
              url: '',
              title: '',
              date: new Date(),
              description: '',
              author: ''
            },
            defaultItem: {
              title: '',
              date: new Date(),
              description: '',
              author: ''
            },
      }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Post' : 'Edit Post'
      },

      formBtn () {
        return this.editedIndex === -1 ? 'Post' : 'Save'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        let id = this.$store.state.user_data.user_data.id

        this.$axios
        .get('http://127.0.0.1:8000/blogs?author='+id, { headers: {'Authorization': this.$cookies.get('token')} })
        .then(response => {
            this.blogs = response.data         
        })
        .catch(error => {
          // console.log(error);
          // console.log(this.$cookies.get('token'))
          // console.log(error.response.data);  
          // console.log(error.response.status);  
          // console.log(error.response.headers); 
        })
      },

      editItem (item) {
        this.editedIndex = this.blogs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.blogs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.delete()
        this.initialize()
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      delete() {
        let url = this.editedItem.url

        console.log('url: ' + url + 'token: ' +this.$cookies.get('token'))

        this.$axios
        .delete(url, { headers: {'Authorization': this.$cookies.get('token')} })
        .then(response => {
            this.initialize()
            this.error_message('Post Completely Deleted.')
        })
        .catch(error => {
          console.log(error);
          console.log(error.response.data);  
          console.log(error.response.status);  
          console.log(error.response.headers); 
        })
      },

      post () {
        if (this.editedIndex > -1) {
          let data = this.editedItem
          let url = this.editedItem.url

          this.$axios
          .put(url, data, { headers: {'Authorization': this.$cookies.get('token')} })
          .then(response => {
              this.initialize()
              this.success_message('Update Successful!')
          })
          .catch(error => {
            console.log(error.response.data);  
            console.log(error.response.status);  
            console.log(error.response.headers); 
          })

        } else {

        let url = 'http://127.0.0.1:8000/users/' + this.$store.state.user_data.user_data.id +'/'
        this.editedItem.author = url
        let data = this.editedItem

        console.log('userdata' + JSON.stringify(data))

        this.$axios
        .post('http://127.0.0.1:8000/blogs/', data, { headers: {'Authorization': this.$cookies.get('token')} })
        .then(response => {
            this.initialize()
            this.success_message('Post Successful!')
        })
        .catch(error => {
          console.log(error);
          console.log(error.response.data);  
          console.log(error.response.status);  
          console.log(error.response.headers); 
        })
        }
        this.close()
      // }
      },

      error_message(message) {
        this.$notify({
          group: 'foo',
          title: message,
          type: 'error',
        });
      },

      success_message(message){
          this.$notify({
            group: 'foo',
            title: 'Successful!',
            type: 'success',
            text: message
          });
      },
    },
}
</script>

<style>

</style>