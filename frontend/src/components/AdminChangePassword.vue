<template>
  <section id="admin-change-password-component">
    <article></article>
    <article>
      <h2>Wachtwoord wijzigen</h2>
      <section>
        <label for="oldPassword">Oude wachtwoord</label>
        <input type="password" name="oldPassword" v-model="oldPassword" />
        <label for="newPassword">Nieuwe wachtwoord</label>
        <input type="password" name="newPassword" v-model="newPassword" />
        <label for="newPassword2">Nieuwe wachtwoord herhalen</label>
        <input type="password" name="newPassword2" v-model="newPassword2" />
        <button @click="changePassword()">Wijzigen</button>
      </section>
    </article>
    <article></article>
  </section>
</template>

<script>
export default {
  name: "AdminChangePassword",
  data() {
    return {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
    };
  },
  methods: {
    changePassword() {
      if(this.oldPassword.length <= 0 || this.newPassword.length <= 0 || this.newPassword2.length <= 0){
          alert("Vul alstublieft uw gegevens in.");
          return;
      }

      if(this.newPassword != this.newPassword2){
          alert("Nieuwe wachtwoord en Nieuwe wachtwoord herhalen komen niet overeen");
          return;
      }

      const data = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          newPassword2: this.newPassword2,
      };

      fetch("/api/admin/changePassword", {
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
              alert("Wachtwoord gewijzigd gelukt");
          } else {
              alert("Er ging iets mis, klopt je wachtwoord wel? Probeer opnieuw.");
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
#admin-change-password-component {
  display: grid;
  grid-template-columns: auto auto auto;
  font-size: 1.5em;
  font-family: sans-serif;
}

/* Title */
#admin-change-password-component > article > h1 {
  color: blue;
  text-align: center;
  font-size: 2em;
}

#admin-change-password-component > article > section {
  display: grid;
}

#admin-change-password-component > article > section > label {
  font-size: 1.5em;
}

#admin-change-password-component > article > section > input {
  margin-bottom: 1px;
}

#admin-change-password-component > article > section > input[type="text"],
#admin-change-password-component > article > section > input[type="password"] {
  height: 1.5em;
}

/* Submit button */
#admin-change-password-component > article > section > button {
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
#admin-change-password-component > article > section > a {
  margin-top: 1rem;
}

/* MOBILE */
@media only screen and (max-width: 352px) {
  #admin-change-password-component {
    font-size: 1em;
  }

  #admin-change-password-component > article > h1 {
    font-size: 1.5em;
  }

  #admin-change-password-component > article > section > input[type="text"],
  #admin-change-password-component > article > section > input[type="password"] {
    height: 1em;
    margin-top: 2px;
  }
}
</style>