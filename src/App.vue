<template>
  <div id="app">
    <ul id="toolbar">
      <li class="toolBarItem upload"
        @click="triggerInput">
        <i class="fa fa-upload"></i>
        <input class="planUpload" 
          type="file"
          ref="fileInput"
          @change="uploadPlan" />
      </li>
      <li class="toolBarItem">
        <select id="networkFrequency">
          <option value="2.4">Сеть Wi-Fi 2,4 ГГц</option>
          <option value="5">Сеть Wi-Fi 5 ГГц</option>
      </select>
      </li>
      <li class="toolBarItem">
        Ш: 
        <input class="dim"
          v-model="img.width" /> 
        В: 
        <input class="dim"
          v-model="img.height" />
      </li>
      <li class="toolBarItem">
        <label>Draw</label>
        <input id="drawLine" 
          checked="checked" 
          name="tool" 
          type="radio" 
          onchange="setTool(event)" />
      </li>
      <li class="toolBarItem" 
        style="width: 150px;">
        <label>Delete</label>
        <input id="delete" 
          name="tool" 
          type="radio" 
          onchange="setTool(event)" />
      </li>
      <li class="toolBarItem" 
        style="width: 150px;">
        <label>Move</label>
        <input id="move" 
          name="tool" 
          type="radio" 
          onchange="setTool(event)" />
      </li>
    </ul>
    <div id="back">
      <canvas
        id="plan"
        ref="canvas"
        :width="width"
        :height="height">
      </canvas>
    </div>
    <div v-if="uploaded">
      <HelloWorld :img="img" />
    </div>
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight+200,
      ctx: null,
      canvas: null,
      img: {
        width: 0,
        height: 0
      },
      uploaded: false
    }
  },
  methods: {
    triggerInput() {
      console.log(this.$refs.fileInput)
      this.$refs.fileInput.click()
    },
    uploadPlan(event) {
      let self = this
      var input = event.target
      if(input.files && input.files[0]) {
        console.log(input.files[0])
        var reader = new FileReader()
        reader.readAsDataURL(input.files[0])
        reader.onload = function(e) {
          self.img.src = e.target.result
        }
        reader.onerror = function() {
          console.log('read error')
        }
        self.img.onload = function() {
          console.log(self.img.height)
          let xPos = window.innerWidth/2 - self.img.width/2
          self.ctx.drawImage(self.img, xPos, 0)
        }
      }
      self.ctx.width = self.img.width
      self.ctx.height = self.img.height
      self.uploaded = true
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext("2d")
    this.img = document.createElement("img")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#back {
  padding-top: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
#face {
  padding-top: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
#toolbar{
  padding: 0px;
  margin: 0px;
  position: fixed;
  background-color: #fff;
  z-index: 100;
}
.toolBarItem {
  cursor: pointer;
  width: 150px;
  height: auto;
  border: 1px solid black;
  list-style: none;
  text-align: center;
  float: left;
  padding: 2px;
}
.upload {
  width: 30px;
}
.planUpload {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 9px;
  height: 9px;
}
.dim {
  display: inline-block;
  width: 35px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
</style>
