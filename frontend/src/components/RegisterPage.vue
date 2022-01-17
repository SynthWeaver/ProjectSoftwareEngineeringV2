<template>
  <section id="register-component">
    <article></article>
    <article>
      <h2>Maak administrator</h2>
      <section>
        <label for="email">Email</label>
        <input type="text" name="email" v-model="email" />
        <label for="password">Wachtwoord</label>
        <input type="password" name="password" v-model="password" />
        <label for="password2">Wachtwoord herhalen</label>
        <input type="password" name="password2" v-model="password2" />
        <button @click="register()">Registreren</button>
      </section>
    </article>
    <article></article>
  </section>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            email: "",
            password: "",
            password2: "",
        };
    },
    methods: {
        register: function () {
            //check for empty input values
            if(this.email.length <= 0 || this.password.length <= 0 || this.password2.length <= 0){
                alert("Vul alstublieft uw gegevens in.");
                return;
            }

            //check if passwords match
            if(this.password != this.password2){
                alert("Wachtwoord en wachtwoord herhalen komen niet overeen");
                return;
            }

            //email regex
            const regex = "^[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]{2,3}$";
            if(!this.email.match(regex)){
              alert("Email is fout");
              return;
            }

            //put data in object
            const data = {
                email: this.email,
                password: this.password,
            };

            //send data to backend
            fetch("/api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                //check for a successfull regestration
                if (data.hasUser) {
                    alert("Registratie gelukt");
                    
                    //refresh to load show new admins
                    this.$router.replace('/login');
                    this.$router.replace('/admin');
                } else {
                  alert("Er ging iets mis, probeer opnieuw.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        },
    },
};

</script>

<style scoped>
#register-component {
  display: grid;
  grid-template-columns: auto auto auto;
  font-size: 1.5em;
  font-family: sans-serif;
}

/* Title */
#register-component > article > h1 {
  color: blue;
  text-align: center;
  font-size: 2em;
}

#register-component > article > section {
  display: grid;
}

#register-component > article > section > label {
  font-size: 1.5em;
}

#register-component > article > section > input {
  margin-bottom: 1px;
}

#register-component > article > section > input[type="text"],
#register-component > article > section > input[type="password"] {
  height: 1.5em;
}

/* Submit button */
#register-component > article > section > button {
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
#register-component > article > section > a {
  margin-top: 1rem;
}

/* MOBILE */
@media only screen and (max-width: 352px) {
  #register-component {
    font-size: 1em;
  }

  #register-component > article > h1 {
    font-size: 1.5em;
  }

  #register-component > article > section > input[type="text"],
  #register-component > article > section > input[type="password"] {
    height: 1em;
    margin-top: 2px;
  }
}
</style>
