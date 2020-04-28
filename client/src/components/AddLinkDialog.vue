<template>
  <v-row justify=center>
    <v-dialog
      v-model=show
      v-on:click:outside="dialogClosed"
      max-width="60%"
    >
      <v-fade-transition>
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-fade-transition>
      <v-card>
        <v-app-bar
          color="indigo darken-2"
          dark>
          <v-toolbar-title>Create Campaign</v-toolbar-title>
        </v-app-bar>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Link" v-model="linkInfo.link" class="no-border" required/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Description" v-model="linkInfo.description" class="no-border" required/>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="submit">Submit</v-btn>
            <v-btn @click="dialogClosed">Cancel</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const client = require('../client.js')

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      linkInfo: {
        link: '',
        description: '',
      },
      loading: false
    }
  },
  methods: {
    submit() {
      const boardId = this.$route.params.boardId
      client.post(`/board/${boardId}`, {
        "link": this.linkInfo.link,
        "description": this.linkInfo.description
      }).then(result => {
        console.log(result)
        this.$emit('refresh', true)
        this.dialogClosed()
      })
    },
    dialogClosed() {
      this.$emit('dialog-closed', true)
    }
  }
}
</script>