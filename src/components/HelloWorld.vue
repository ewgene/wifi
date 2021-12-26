<template>
  <div id="face">
      <v-stage
        id="stage"
        ref="stage"
        :config="stageSize">
        <v-layer
          id="model"
          ref="model">
        </v-layer>
      </v-stage>    
  </div>
</template>

<script>
//import Konva from 'vue-konva'

export default {
  name: 'HelloWorld',
  props: {
    img: {
      width: Number,
      height: Number
    }
  },
  data () {
    return {
      stageSize: {
        container: "face",
        width: this.img.width,
        height: this.img.height,
        y: 0,
        x: window.innerWidth/2 - this.img.width/2,
        scaleX:1,
        scaleY:1,
        draggable: false,
      },
      stage: null,
      blockSnapSize: 20,
      lineStatus: "start",
      action: "drawLine",
      lineStartX: 0,
      lineStartY: 0,
      barriers: [],
      frequency: null,
      routers: []
    }
  },
  methods: {
    snapToGrid(axis){
      return Math.round(axis/this.blockSnapSize)*this.blockSnapSize;
    }
  },
/*  mounted() {
    this.stage = this.makeContainer()
  }*/
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
