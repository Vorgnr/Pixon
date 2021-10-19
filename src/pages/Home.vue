<script setup>
import Grid from '@/components/Grid.vue';
import Toolbox from '@/components/Toolbox.vue';
import ColorPicker from '@/components/ColorPicker.vue';
</script>

<template>
  <header class="bg-indigo-400 toolbar">
    <toolbox
      :mode="mode"
      :grid-mode="gridMode"
      :form="form"
      :size="row"
      :can-undo="canUndo"
      :can-redo="canRedo"
      @changeMode="changeMode"
      @changeForm="changeForm"
      @changeGridMode="changeGridMode"
      @addRow="addRow"
      @delRow="delRow"
      @del="del"
      @save="save"
      @load="load"
      @undo="undo"
      @redo="redo"
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
      :grid-mode="gridMode"
      :form="form"
      :color="color"
      :size="row"
      :matrix="matrix"
      :line-width="1"
      :last-changed-cell="lastChangedCell"
      @cellChange="cellChange"
      @matrixChange="matrixChange"
    />
  </main>
</template>

<script>
class SizedArray {
  constructor(size) {
    this.size = size;
    this.array = [];
    this.length = 0;
  }

  unshift(el) {
    if (this.array.length === this.size) {
      this.pop();
    }

    this.length += 1;

    return this.array.unshift(el);
  }

  shift(el) {
    if (this.length > 0) {
      this.length -= 1;
      return this.array.shift(el);
    }
  }

  pop() {
    this.length -= 1;
    return this.array.pop();
  }
}

export default {
  data() {
    return {
      mode: 'pen',
      gridMode: 'grid',
      form: 'square',
      gridWidth: 0,
      gridHeight: 0,
      color: '#000',
      row: 64,
      matrix: {},
      lastChangedCell: null,
      previousState: new SizedArray(100),
      nextState: new SizedArray(100),
    };
  },

  computed: {
    canUndo() {
      return this.previousState.length > 0;
    },

    canRedo() {
      return this.nextState.length > 0;
    },
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
      return this.$refs.grid.clientHeight;
    },

    refreshGridDim() {
      this.gridWidth = this.getGridWidth();
      this.gridHeight = this.getGridHeight();
    },

    changeMode(mode) {
      this.mode = mode;
    },

    changeForm(form) {
      this.form = form;
    },

    changeGridMode(gridMode) {
      this.gridMode = gridMode;
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

    cellChange(cell, clear) {
      let newCell = this.matrix[cell];
      let cellChanged = false;
      if (clear) {
        newCell = false;
        cellChanged = true;
      } else if (!newCell || newCell.color !== this.color || newCell.form !== this.form) {
        cellChanged = true
        newCell = { color: this.color, form: this.form }
      }

      if (cellChanged) {
        this.setState({
          lastChangedCell: cell,
          matrix: {
            ...this.matrix,
            [cell]: newCell,
          },
          row: this.row,
        });
      }
    },

    matrixChange(changedCell) {
      const newCell = {
        color: this.color,
        form: this.form,
      };
      this.setState({
        matrix: {
          ...this.matrix,
          ...changedCell.reduce((acc, c) => {
            acc[c] = newCell;
            return acc
          }, {})
        },
        row: this.row,
      });
    },

    del() {
      this.lastChangedCell = null;
      this.matrix = {};
    },

    undo() {
      this.nextState.unshift(this.getState());
      const ps = this.previousState.shift();
      this.lastChangedCell = null;
      this.matrix = ps.matrix;
      this.row = ps.row;
    },

    redo() {
      this.previousState.unshift(this.getState());
      const ns = this.nextState.shift();
      this.lastChangedCell = null;
      this.matrix = ns.matrix;
      this.row = ns.row;
    },

    getState() {
      return {
        lastChangedCell: null,
        matrix: { ...this.matrix },
        row: this.row,
      };
    },

    setState(state) {
      this.lastChangedCell = state.lastChangedCell;
      this.previousState.unshift(this.getState());
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
      input.type = 'file';
      input.onchange = () => {
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = () => {
          const dataURL = reader.result;
          const json = atob(dataURL.substring(29));
          const result = JSON.parse(json);
          const { matrix, row } = result;

          this.setState({
            row,
            matrix: Object.keys(matrix).reduce((acc, k) => {
              const form = matrix[k].form || 'square'
              acc[k] = {
                color: matrix[k].color,
                form
              }

              return acc;
            }, {})
          });
        };
      };

      body.appendChild(input);
      input.click();
      body.removeChild(input);
    },
  },
};
</script>
