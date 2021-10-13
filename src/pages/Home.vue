<script setup>
import Grid from '@/components/Grid.vue';
import Toolbox from '@/components/Toolbox.vue';
import ColorPicker from '@/components/ColorPicker.vue';
</script>

<template>
  <header class="bg-indigo-400 toolbar">
    <toolbox
      :mode="mode"
      :size="row"
      @changeMode="changeMode"
      @addRow="addRow"
      @delRow="delRow"
      @del="del"
      @save="save"
      @load="load"
    />
  </header>
  <aside class="sidebar">
    <color-picker
      :selected-color="color"
      @select-color="selectColor"
    />
  </aside>
  <main
    ref="grid"
    class="main"
  >
    <grid
      :width="gridWidth"
      :height="gridHeight"
      :mode="mode"
      :color="color"
      :size="row"
      :matrix="matrix"
      :line-width="2"
      @matrixChange="matrixChange"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      mode: 'pen',
      gridWidth: 300,
      gridHeight: 300,
      color: '#000',
      row: 64,
      matrix: {},
    };
  },

  created() {
    window.addEventListener('resize', this.refreshGridDim);
  },

  unmounted() {
    window.removeEventListener('resize', this.refreshGridDim);
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
      this.matrix[cell] = color === false ? false : { color };
    },

    del() {
      this.matrix = {};
    },

    getState() {
      return {
        matrix: this.matrix,
        row: this.row,
      };
    },

    setState(state) {
      this.matrix = state.matrix;
      this.row = state.row;
    },

    save() {
      let body = document.body;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(
        new Blob([JSON.stringify(this.getState(), null, 2)], {
          type: 'application/json',
        })
      );
      a.setAttribute('download', 'draw');
      body.appendChild(a);
      a.click();
      body.removeChild(a);
    },

    load() {
      let body = document.body;
      const input = document.createElement('input');
      input.type = 'file'
      input.onchange = () => {
        console.log('change')
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = () => {
          const dataURL = reader.result;
          const json = atob(dataURL.substring(29));
          const result = JSON.parse(json);
          this.setState(result)
        };
      }

      body.appendChild(input);
      input.click();
      body.removeChild(input);
    },
  },
};
</script>
