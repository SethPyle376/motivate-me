<template>
    <div id="login_form">
        <v-container
            fluid
            fill-height
        >
            <v-layout
                align-center
                justify-center
            >
                <v-flex
                    xs-12
                    sm8
                    md4
                >
                    <v-card class="elevation-12" align="center" justify="center">
                        <v-toolbar>
                            <v-toolbar-title>Welcome to Motivate Me</v-toolbar-title>
                        </v-toolbar>
                        <v-btn @click="login()" align="center" justify="center">
                            Sign in with Google
                        </v-btn>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

const client = require('../client.js')
const jwt = require('jsonwebtoken')

export default {
    methods: {
        login: function() {
            this.$gAuth.getAuthCode().then(response => {
                console.log(response)
                if (response) {
                    client.post('/login', {
                        "authCode": response
                    }).then(response => {
                        if (response.status == 200) {
                            const user = jwt.decode(response.data.token)
                            localStorage.setItem("user_token", response.data.token)
                            client.defaults.headers.common["Authorization"] = response.data.token
                            this.$router.push(`/app/board/${user.id}`)
                        } else {
                            // Error handling here
                        }
                    })
                }
            })
        }
    }
}
</script>