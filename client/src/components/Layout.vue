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
            <v-list>
                <v-list-item
                    v-for="board in boards"
                    :key="board.id"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ board.name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
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
            boards: []
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
        }
    },
    created: function() {
        this.loadBoards()
    }
}
</script>