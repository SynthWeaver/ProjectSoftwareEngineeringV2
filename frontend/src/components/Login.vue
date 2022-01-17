<template>
  <section id="login-component">
    <h1>Souvenirbeurs</h1>
    <article>
      <label for="email">Email</label>
      <input type="text" name="email" v-model="email" v-on:keyup.enter="onEnter" />
      <label for="password">Wachtwoord</label>
      <input type="password" name="password" v-model="password" v-on:keyup.enter="onEnter" />
      <button @click="login()">Log in</button>
      <a href="#" @click="forgotPassword()">Wachtwoord vergeten</a>
    </article>
  </section>
</template>

<script>
export default {
    name: "Login",
    data() {
      return {
          email: "",
          password: "",
      };
    },
    methods: {
        login: function () {
            //check input values are not empty
            if(this.email.length <= 0 || this.password.length <= 0){
                alert("Vul alstublieft uw gegevens in.")
                return;
            }

            //put email and password in variable
            const data = {
                email: this.email,
                password: this.password,
            };

            //make a post request to server with data
            fetch("/api/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                //on response server

                //check if data is empty
                if (data.hasUser) {
                  //on login succesfull

                  //set session and check it
                  if(this.$session.login()){
                    //go to admin page
                    this.$router.replace('/admin');
                  }
                  
                } else {
                  //login failed
                  alert("Email of wachtwoord is verkeerd, probeer opnieuw.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        },

        forgotPassword(){
            //check email is empty
            if(this.email.length <= 0){
                alert("Vul alstublieft eerst uw email in.");
            }else{
                //todo: code van Yas
                alert("Je wachtwoord is: '...'");  
            }         
        },

        onEnter: function() {
            this.login();
        },
    },
};

</script>

<style scoped>
#login-component {
  font-size: 1.5em;
  font-family: sans-serif;
}

/* Title */
#login-component > h1 {
  color: blue;
  text-align: center;
  font-size: 2em;
}

#login-component > article {
  display: grid;
}

#login-component > article > label {
  font-size: 1.5em;
}

#login-component > article > input {
  margin-bottom: 1px;
}

#login-component > article > input[type="text"],
#login-component > article > input[type="password"] {
  height: 1.5em;
}

/* Submit button */
#login-component > article > button {
  margin-bottom: 0;
  margin-top: 0.25em;
  background-color: #00009e;
  border: 0;
  color: white;
  font-size: 2em;
  padding: 3px 0;
  border-radius: 5px;
  box-shadow: 5px 5px 5px black;
  cursor: pointer;
}

/* forgot password  */
#login-component > article > a {
  margin-top: 1rem;
}

/* MOBILE */
@media only screen and (max-width: 352px) {
  #login-component {
    font-size: 1em;
  }

  #login-component > h1 {
    font-size: 1.5em;
  }

  #login-component > article > input[type="text"],
  #login-component > article > input[type="password"] {
    height: 1em;
    margin-top: 2px;
  }
}
</style>
