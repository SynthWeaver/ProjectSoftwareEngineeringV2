<template>
    <section id="adminpage-component">
        <!-- Header -->
        <article><h1 class="header-text">Hallo, {{this.email}}</h1></article>
        
        <!-- Menu -->
        <article>
            <h2>Menu</h2>
            <button @click="showOpenOrders()">Bestellingen in behandeling</button>
            <button @click="showSendOrderSettings()">Bestelling verzonden</button>
            <button @click="showChangeEmailSettings()">Email wijzigen</button>
            <button @click="showChangePasswordSettings()">Wachtwoord wijzigen</button>
            <button @click="showRegisterPage()">Maak administrator</button>
            <button @click="showAdminListPage()">Lijst met administratoren</button>
            <button @click="showEditProductPage()">Product toevoegen</button>
        </article>

        <!-- Content -->
        <article>
            <!-- New orders  -->
            <div>
                <OrderHistory name="Bestellingen in behandeling"
                    apiUrl="/api/orders/new"
                />
            </div>

            <!-- Old orders  -->
            <div class="hidden">
                <OrderHistory name="Bestellingen verzonden"
                    apiUrl="/api/orders/old"
                />
            </div>
            
            <!-- Admin change email -->
            <div class="hidden">
                <AdminChangeEmail/>
            </div>

            <!-- Admin change password -->
            <div class="hidden">
                <AdminChangePassword/>
            </div>

            <!-- Admin register account -->
            <div class="hidden">
                <RegisterPage/>
            </div>

            <!-- Admin list of admins -->
            <div class="hidden">
                <AdminList/>
            </div>
        </article>
    </section>
</template>

<script>
    import OrderHistory from './OrderHistory.vue';
    import AdminChangeEmail from './AdminChangeEmail.vue';
    import AdminChangePassword from './AdminChangePassword.vue';
    import RegisterPage from './RegisterPage.vue';
    import AdminList from './AdminList.vue';
    export default {
        name:"AdminPage",
        components: {
            OrderHistory,
            AdminChangeEmail,
            AdminChangePassword,
            RegisterPage,
            AdminList,
        },
        data() {
            return {
                email: "???",
            };
        },
        created() {
            this.getEmail();
        },
        methods: {
            //get email for welcome message
            getEmail: function () {
                fetch("/api/user", {
                    method: "GET",
                })
                .then((response) => response.json())
                .then((json) =>{
                    if(json.user){
                        this.email = json.user.email;
                    }  
                });
            },

            showOpenOrders: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const openOrderElementQuery = "#adminpage-component > article:nth-child(3) > div:first-child";
                const openOrderElement = document.querySelector(openOrderElementQuery);
                openOrderElement.classList.remove("hidden");
            },

            showSendOrderSettings: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const sendOrderElementQuery = "#adminpage-component > article:nth-child(3) > div:nth-child(2)";
                const sendOrderElement = document.querySelector(sendOrderElementQuery);
                sendOrderElement.classList.remove("hidden");
            },

            showChangeEmailSettings: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const accountSettingsElementQuery = "#adminpage-component > article:nth-child(3) > div:nth-child(3)";
                const accountSettingsElement = document.querySelector(accountSettingsElementQuery);
                accountSettingsElement.classList.remove("hidden");
            },

            showChangePasswordSettings: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const accountSettingsElementQuery = "#adminpage-component > article:nth-child(3) > div:nth-child(4)";
                const accountSettingsElement = document.querySelector(accountSettingsElementQuery);
                accountSettingsElement.classList.remove("hidden");
            },

            showRegisterPage: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const registerQuery = "#adminpage-component > article:nth-child(3) > div:nth-child(5)";
                const registerElement = document.querySelector(registerQuery);
                registerElement.classList.remove("hidden");
            },

            showAdminListPage: function () {
                //hide all content
                this.hideAllContent();
                
                //show specific content
                const adminListQuery = "#adminpage-component > article:nth-child(3) > div:nth-child(6)";
                const adminListElement = document.querySelector(adminListQuery);
                adminListElement.classList.remove("hidden");
            },

            showEditProductPage: function(){
                this.$router.replace('/editproduct');
            },

            hideAllContent: function(){
                const allContentChildrenQuery = "#adminpage-component > article:nth-child(3) > div";
                const contentChildren = document.querySelectorAll(allContentChildrenQuery);

                contentChildren.forEach(child => {
                    child.classList.add("hidden");
                });
            },
        },
    }     
</script>

<style scoped>
    *{
        margin: 0;
    }
    .header-text{
        margin-top: 1%;
        margin-bottom: 3%;
        text-align: center;
    }
    h2{
        font-size: 30px;
        font-style: bold;
        margin-bottom: 1rem;
    }
    button{
        text-align: left;
        padding-left: 5%;
        width: 90%;
      
    }
   
    #adminpage-component{
        display: grid;
        grid-template-columns: 25% auto;
        padding: 0 2%;
    }

    /* Header */
    #adminpage-component > article:first-child{
        grid-column-start: 1;
        grid-column-end: 3;
    }

    /* Menu */
    #adminpage-component > article:nth-child(2) {
        
    }

    #adminpage-component > article:nth-child(2)>p {
        color: -webkit-link;
        cursor: pointer;
        text-decoration: underline;
        margin-bottom: 0.5rem;
    }

    /* Content */
    #adminpage-component > article:nth-child(3) {

    }

    #adminpage-component > article:nth-child(3) > div:last-child {
        
    }

    .hidden{
        display: none;
    }


</style>
