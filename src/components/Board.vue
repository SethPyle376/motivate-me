<template>
    <div id="test">
        <v-card v-for="item in items" :key="item.message" class="d-inline-block mx-auto mr-6 mt-12">
            <v-container>
                <v-row justify="space-between">
                    <v-col cols="auto">
                        <v-img
                            max-height="500"
                            max-width="500"
                            src="https://giantbomb1.cbsistatic.com/uploads/scale_medium/1/12139/2754840-bethesda.jpg"/>
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
                {{ item.message }}
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    message: "hello"
                },
                {
                    message: "world"
                },
                {
                    message: "hello"
                },
                {
                    message: "world"
                },             
                {
                    message: "hello"
                },
                {
                    message: "world"
                }
            ]
        }
    }
}
</script>
