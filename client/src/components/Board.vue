<template>
    <div id="board_content">
        <v-card v-for="item in items" :key="item.id" class="d-inline-block mx-auto mr-6 mt-12">
            <v-container>
                <v-row justify="space-between">
                    <v-col cols="auto">
                        <v-img
                            max-height="500"
                            max-width="500"
                            :src=item.link />
                    </v-col>
                    <v-col cols="auto" class="text-center pl-0">
                        <v-row class="flex-column ma-0 fill-height" justify="center">
                            <v-col class="px-0">
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                {{ item.description }}
            </v-container>
        </v-card>
        <v-btn fab fixed right bottom @click="addLinkDialog = true">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <AddLinkDialog :show=addLinkDialog @refresh="loadItems()" @dialog-closed="addLinkDialog = false"/>
    </div>
</template>

<script>
const client = require('../client.js')

import AddLinkDialog from './AddLinkDialog'

export default {
    components: {
        AddLinkDialog
    },
    data () {
        return {
            drawer: false,
            items:[],
            addLinkDialog: false
        }
    },
    methods: {
        loadItems: function() {
            this.items = []
            const boardId = this.$route.params.boardId
            client.get(`/board/${boardId}`).then(response => {
                response.data.forEach(item => {
                    this.items.push(item)
                })
            })
        }
    },
    created: function() {
        this.loadItems()
    }
}
</script>
