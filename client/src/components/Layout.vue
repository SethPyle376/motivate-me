<template>
    <div id="layout">
        <v-app-bar
        app
        clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Motivate Me</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        >
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-item two-line>
                    <v-list-item-avatar>
                        <img :src="profile.profilePicture">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Welcome!</v-list-item-title>
                        <v-list-item-subtitle>{{ profile.firstName }} {{ profile.lastName }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-list>
                <v-list-tile
                    v-for="board in boards"
                    :key="board.id"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ board.name }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-btn align="center">
                Create Board
            </v-btn>
        </v-navigation-drawer>
        <router-view></router-view>
    </div>
</template>

<script>
const client = require('../client.js')
const jwt = require('jsonwebtoken')

export default {
    data() {
        return {
            drawer: false,
            boards: [],
            profile: {
                firstName: "",
                lastName: "",
                profilePicture: ""
            }
        }
    },
    methods: {
        loadBoards: function() {
            if (localStorage.getItem("user_token")) {
                const profile = jwt.decode(localStorage.getItem("user_token"))
                client.get(`/boards/${profile.id}`).then((response) => {
                    if (response.status == 401) {
                        localStorage.removeItem("user_token")
                        this.$router.push("/login")
                    }
                    response.data.forEach(board => {
                        this.boards.push(board)
                    })
                })
            }
        },
        loadProfile: function() {
            client.get(`/user`).then(response => {
                this.profile.firstName = response.data.first_name
                this.profile.lastName = response.data.last_name
                this.profile.profilePicture = response.data.picture
            })
        }
    },
    created: function() {
        this.loadBoards()
        this.loadProfile()
    }
}
</script>