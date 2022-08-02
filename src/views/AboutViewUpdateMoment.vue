<template>
  <div class="about">
    <h1 class="subheading grey--text">Dialogos de gran tamaño con scroll</h1>
      <p> {{youTubeVideo}} </p>
    <v-container fluid class="my-5">

      <!--------------------- Edit and Update Moments Dialog ------------------------->

      <v-dialog
        v-model="momentDialog"
        :max-width=window.width
        >
        <v-card>
          <v-card-title class="text-h5 orange lighten-2">

            <v-row cols=12>
              <v-col md-8>
              Edit and Update a Moment within an Experience
              </v-col>

              <v-col md-4>
                <v-card-actions>
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
              </v-col>                
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-container>

              <v-row>
                  <v-text-field
                    v-model="newExp.owner"
                    label="An experience from: "
                  ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  v-model="newExp.title"
                  label="Title"
                ></v-text-field>
              </v-row>

              <v-row>
                  <v-textarea
                    rows="5"
                    row-height="5"
                    v-model="newExp.description"
                    label="Description"
                  ></v-textarea>
              </v-row>

              <v-row>
                <v-text-field
                  v-model="newExp.time"
                  label="Watch the point of reference moment at"
                  suffix=" Seconds"
                ></v-text-field>
              </v-row>

              <v-row>
                  <v-textarea
                    rows="5"
                    row-height="5"
                    v-model="newExp.moment"
                    label="Moment to explore the challenge"
                    background-color="grey"
                  ></v-textarea>
              </v-row>



              <v-row>
                <LazyYoutube
                  ref="youtubeLazyVideo"
                  max-width="720px"
                  aspect-ratio="16:9"
                  thumbnail-quality="standard"
                  :src="newExp.url"
                />

                <div class="buttons">
                  <v-btn @click="handleClick('playVideo', 'youtubeLazyVideo')">
                    Play
                  </v-btn>
                  <v-btn @click="handleClick('pauseVideo', 'youtubeLazyVideo')">
                    Pause
                  </v-btn>
                  <v-btn @click="handleClick('stopVideo', 'youtubeLazyVideo')">
                    Stop
                  </v-btn>
                  <v-btn @click="handleClick('resetView', 'youtubeLazyVideo')">
                    Reset
                  </v-btn>
                </div>
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

    // this.youTubeVideo = this.getYouTubeID("https://www.youtube.com/embed/sz2W3QfXnHc?start=33&end=200"  );
    this.youTubeVideo = this.getYouTubeID("https://www.youtube.com/watch?v=g6bn6XrhYdc");


  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },


  data() {
    return {
      exp_info: "",
      momentDialog: false,
      youTubeVideo: "",

      newExp: {
        title: "Grafic design hacks",
        description: "Grafic design hacks",
        owner: "zavala55.testnet",
        url: "https://www.youtube.com/watch?v=NkQPhyRcF54",
        rewards: 9,
        moment: "to be defined",
        time: 223,
        expire_date: 100,
        topic: 1,
      },

      window: {
          width: 0,
          height: 0
      },

    }
  },

  methods: {
    handleClick(event, ref) {
        this.$refs[ref][event]();
    },

    handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    },

    closeExp(){
      this.momentDialog = false;

    },
    saveExp(){

    },

    getYouTubeID(url){
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/u)
      /* eslint-disable no-useless-escape */
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/iu)[0] : url[0]
    },

  }
}
</script>
