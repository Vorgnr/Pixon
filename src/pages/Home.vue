<script setup>
import Grid from "@/components/Grid.vue";
import Toolbox from "@/components/Toolbox.vue";
import ColorPicker from "@/components/ColorPicker.vue";
</script>

<template>
  <header class="bg-indigo-400 toolbar">
    <toolbox
      :mode="mode"
      @changeMode="changeMode"
      @addRow="addRow"
      @delRow="delRow"
      @del="del"
      :size="row"
    />
  </header>
  <aside class="sidebar">
    <color-picker
      @select-color="selectColor"
      :selected-color="color"
    />
  </aside>
  <main class="main" ref="grid">
    <grid
      :width="this.gridWidth"
      :height="this.gridHeight"
      :mode="mode"
      :color="color"
      :size="row"
      :matrix="matrix"
      @matrixChange="matrixChange"
      :lineWidth="2"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      mode: "pen",
      gridWidth: 300,
      gridHeight: 300,
      color: "#000",
      row: 64,
      matrix: {}
    };
  },

  created() {
    window.addEventListener("resize", this.refreshGridDim);
  },

  destroyed() {
    window.removeEventListener("resize", this.refreshGridDim);
  },

  mounted() {
    this.refreshGridDim();
  },

  updated() {
    this.refreshGridDim();
  },

  methods: {
    getGridWidth() {
      return this.$refs.grid.clientWidth - 33;
    },

    getGridHeight() {
      return this.$refs.grid.clientHeight - 15;
    },

    refreshGridDim() {
      this.gridWidth = this.getGridWidth();
      this.gridHeight = this.getGridHeight();
    },

    changeMode(mode) {
      this.mode = mode;
    },

    selectColor(color) {
      this.color = color;
    },

    addRow() {
      this.row += 1;
    },

    delRow() {
      if (this.row > 0) {
        this.row -= 1;
      }
    },

    matrixChange(cell, color) {
      this.matrix[cell] = color === false ? false : { color }
    },

    del() {
      this.matrix = {};
    }
  },
};
</script>
