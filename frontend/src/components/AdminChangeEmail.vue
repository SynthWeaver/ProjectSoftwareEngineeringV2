<template>
  <section id="admin-change-email-component">
    <article></article>
    <article>
      <h2>Email wijzigen</h2>
      <section>
        <label for="oldEmail">Oude email</label>
        <input type="text" name="oldEmail" v-model="oldEmail" />
        <label for="newEmail">Nieuwe email</label>
        <input type="text" name="newEmail" v-model="newEmail" />
        <label for="password">Wachtwoord</label>
        <input type="password" name="password" v-model="password" />
        <button @click="changeEmail()">Wijzigen</button>
      </section>
    </article>
    <article></article>
  </section>
</template>

<script>
export default {
  name: "AdminChangeEmail",
  data() {
    return {
        oldEmail: "",
        newEmail: "",
        password: "",
    };
  },
  methods: {
    changeEmail() {
      if(this.oldEmail.length <= 0 || this.newEmail.length <= 0 || this.password.length <= 0){
          alert("Vul alstublieft uw gegevens in.");
          return;
      }

      //email regex
      const regex = "^[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]{2,3}$";
      if(!this.oldEmail.match(regex) || !this.newEmail.match(regex)){
        alert("Email is fout");
        return;
      }

      const data = {
          oldEmail: this.oldEmail,
          newEmail: this.newEmail,
          password: this.password,
      };

      fetch("/api/admin/changeEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
          console.log("Success:", data);

          const hasUser = data.hasUser;

          if (hasUser) {
              alert("Email gewijzigd gelukt");

              //refresh to load show new admins
              this.$router.replace('/login');
              this.$router.replace('/admin');
          } else {
              alert("Er ging iets mis, klopt je wachtwoord wel? Probeer opnieuw.");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
    },
  }
};

</script>

<style scoped>
#admin-change-email-component {
  display: grid;
  grid-template-columns: auto auto auto;
  font-size: 1.5em;
  font-family: sans-serif;
}

/* Title */
#admin-change-email-component > article > h1 {
  color: blue;
  text-align: center;
  font-size: 2em;
}

#admin-change-email-component > article > section {
  display: grid;
}

#admin-change-email-component > article > section > label {
  font-size: 1.5em;
}

#admin-change-email-component > article > section > input {
  margin-bottom: 1px;
}

#admin-change-email-component > article > section > input[type="text"],
#admin-change-email-component > article > section > input[type="password"] {
  height: 1.5em;
}

/* Submit button */
#admin-change-email-component > article > section > button {
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
#admin-change-email-component > article > section > a {
  margin-top: 1rem;
}

/* MOBILE */
@media only screen and (max-width: 352px) {
  #admin-change-email-component {
    font-size: 1em;
  }

  #admin-change-email-component > article > h1 {
    font-size: 1.5em;
  }

  #admin-change-email-component > article > section > input[type="text"],
  #admin-change-email-component > article > section > input[type="password"] {
    height: 1em;
    margin-top: 2px;
  }
}
</style>
