<template>
  <v-app id="inspire">
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-cener justify-center style="margin-top: 0rem">
                <v-flex xs12 sm8 md5>
                    <div class="column" style="height: 150px">
                        <div class="col self-center">
                            <div class="session">
                                <div class="left" alt="SVGBackgrounds.com">
                                    <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                        <path class="st0" d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z"/>
                                    </svg>      
                                </div>

                                <v-form action="" class="log-in" autocomplete="off"> 
                                    <h4><span>Welcome!</span></h4>
                                    <div class="floating-label">
                                        <input 
                                          v-model="user_username" 
                                          placeholder="Username" 
                                          type="text" 
                                          name="username" 
                                          id="username" 
                                          autocomplete="off">
                                        <label for="username">Username:</label>
                                    </div>
                                    <div class="floating-label">
                                        <input 
                                          v-model="user_password" 
                                          placeholder="Password" 
                                          type="password" 
                                          name="password" 
                                          id="password" 
                                          autocomplete="off">
                                        <label for="password">Password:</label>
                                    </div>
                                    <v-btn color="primary" dense depressed @click="onSubmit()">Log in</v-btn>
                                </v-form>
                            </div>
                        </div>                    
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            user_username: '',
            user_password: '',

            detail: '',
        }
    },

    methods: {
        onSubmit(e) {

            this.$axios
            .post('http://127.0.0.1:8000/auth/login/', {username: this.user_username, password: this.user_password})
            .then(response => {
                if (response.data.length < 1) {
                    this.showNotif('Incorrect Username or Password')
                } 
                else {
                    // Get logged in user 
                    this.set_user(response.data.user)

                    this.$cookies.set('token', "Bearer " + response.data.access, '1d')

                    // console.log('cookie : ' + this.$cookies.get('token'))

                    // Notify of success authentication
                    this.success_message()
                    this.$router.push('/home')
                }
            })
            .catch(error => {
                console.log(error.response.data);  
                //  console.log(error.response.status);  
                //  console.log(error.response.headers); 
                this.showNotif(error.response.data)
            })
        },

        set_user(user) {
            this.$store.commit('user_data/mutate_set_user', user)
        },

        success_message(){
          this.$notify({
              group: 'foo',
              title: 'Successful!',
              type: 'success',
              text: 'Logged in'
            });
        },

        showNotif(message) {
            // this.$q.notify({
            //     message: message,
            //     color: this.notification.color,
            //     icon: this.notification.icon
            // })
            this.$notify({
              group: 'foo',
              title: 'Request Invalid',
              type: 'error',
              text: message
            });
        }
    }
}
</script>

<style scoped lang="scss">
* {
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif;
    font-weight:  300; 
    margin:  0; 
}

$primary: #0c6af7;	

html, body {
  height:  100vh; 
  width:  100vw;
  margin:  0 0; 
  display:  flex; 
  align-items:  flex-start; 
  justify-content:  flex-start; 
//   background:  #f3f2f2; 
  background-image: url("../assets/Bullseye-Gradient.svg");
}

h4 {
  font-size:  24px; 
  font-weight:  600; 
  color:  #000; 
  opacity:  .85; 
}

label {
  font-size:  12.5px; 
  color:  #000;
  opacity:  .8;
  font-weight:  400; 
}

form {
  padding:  40px 30px; 
  background:  #fefefe; 
  display:  flex; 
  flex-direction:  column;
  align-items:  flex-start; 
  padding-bottom:  20px; 

  h4 {
    margin-bottom:  20px;
    color:  rgba(#000, .5);
    span {
      color:  rgba(#000, 1);
      font-weight:  700; 
    }
  }

  p {
    line-height:  155%; 
    margin-bottom:  5px; 
    font-size:  14px; 
    color:  #000; 
    opacity:  .65;
    font-weight:  400; 
    max-width:  200px; 
    margin-bottom:  40px; 
  }
}

a.discrete {
    color:  rgba(#000, .4); 
    font-size:  14px; 
    border-bottom:  solid 1px rgba(#000, .0);
    padding-bottom:  4px;  
    margin-left:  auto; 
    font-weight:  300; 
    transition:  all .3s ease; 
    margin-top:  40px; 

    &:hover {
      border-bottom:  solid 1px rgba(#000, .2);
    }
  }

button {
  -webkit-appearance:  none; 
  width:  auto;
  min-width:  100px;
  text-align:  center; 
  padding:  15px 40px;
  margin-top:  5px; 
  background-color:  saturate($primary, 30%); 
  color:  #fff; 
  font-size:  14px;
  margin-left:  auto; 
  font-weight:  500; 
  box-shadow:  0px 2px 6px -1px rgba(0,0,0,.13); 
  border:  none;
  transition:  all .3s ease; 
  outline: 0; 

  &:hover {
    transform:  translateY(-3px);
    box-shadow:  0 2px 6px -1px rgba($primary, .65);

    &:active {
      transform:  scale(.99);
    }
  }
}

input {
  font-size:  16px; 
  padding:  20px 0px; 
  height:  56px; 
  border:  none; 
  border-bottom:  solid 1px rgba(0,0,0,.1); 
  background:  #fff; 
  min-width:  280px; 
  box-sizing:  border-box; 
  transition:  all .3s linear; 
  color:  #000; 
  font-weight:  400; 
  -webkit-appearance:  none;   

  &:focus {
    border-bottom:  solid 1px $primary; 
    outline: 0; 
    box-shadow:  0 2px 6px -8px rgba($primary, .45);
  }
}

.floating-label {
  position:  relative; 
  margin-bottom:  10px; 

  label {
    position:  absolute; 
    top: calc(50% - 7px);
    left:  0; 
    opacity:  0; 
    transition:  all .3s ease; 
  }

  input:not(:placeholder-shown) {
    padding:  28px 0px 12px 0px; 
  }

  input:not(:placeholder-shown) + label {
    transform:  translateY(-10px); 
    opacity:  .7; 
  }
}

.session {
  display:  flex; 
  flex-direction:  row; 
  width:  auto; 
  height:  auto; 
  margin:  auto auto; 
  background:  #ffffff; 
  border-radius:  4px; 
  box-shadow:  0px 6px 8px -1px rgba(0,0,0,.12);
}

.left {
  width:  220px; 
  height:  auto; 
  min-height:  100%; 
  position:  relative; 
  background-image: url("../assets/Bullseye-Gradient.svg");
  background-size:  cover;
  border-top-left-radius:  4px; 
  border-bottom-left-radius:  4px; 

  svg {
    height:  40px; 
    width:  auto; 
    margin:  20px; 
  }
}

.doc-container {
    margin-top: 1rem;
}

.st0{
    fill:#fff;
}
</style>