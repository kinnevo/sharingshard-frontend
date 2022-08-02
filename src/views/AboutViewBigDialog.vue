<template>
<div class="about">
    <h1 class="subheading grey--text">Dialogos de gran tamaño con scroll</h1>
    
    <v-container fluid class="my-5">

            <!--------------------- New Experience Dialog ------------------------->

            <v-dialog
              v-model="testDialog"
              :max-width=window.width
              >
              <v-card>
                <v-card-title class="text-h5 orange lighten-2">

                <v-col cols="12">
                  <v-row md-4>
                  New Experience
                  </v-row>
                  <v-row md-4>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeExp"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveExp"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-col>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="newExp.title"
                        label="Titulo"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                        <v-textarea
                          rows="10"
                          row-height="10"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                    </v-row>

                    <v-row>
                        <v-textarea
                          rows="10"
                          row-height="10"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                    </v-row>

                    <v-row>
                        <v-textarea
                          rows="10"
                          row-height="10"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                    </v-row>

                    <v-row>
                        <v-textarea
                          rows="10"
                          row-height="10"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                    </v-row>

                    <v-row>
                        <v-textarea
                          rows="10"
                          row-height="10"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                    </v-row>


                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeExp"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveExp"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


  </v-container>
</div>
</template>

<script>

export default {
    name: "AboutView",

created(){
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },


  data() {
    return {
      exp_info: "",
      testDialog: true,

      newExp: {
        title: "",
      },

      window: {
          width: 0,
          height: 0
      },

    }
  },

  methods: {
    handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    },

    closeExp(){
      this.testDialog = false;

    },
    saveExp(){

    },

  }
}
</script>
