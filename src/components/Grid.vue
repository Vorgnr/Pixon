<template>
  <canvas
    id="grid"
    :width="width"
    :height="height"
  />
  <canvas
    id="canva"
    :width="width"
    :height="height"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    @mouseup="mouseUp"
    @touchstart="touchStart"
    @touchend="touchEnd"
    @touchleave="touchLeave"
    @touchmove="touchMove"
  />
</template>

<script>
import Drawer from '@/libs/Drawer';

let tapedTwice = false;
const writeCord = (x, y) => `${x}:${y}`;
const readCord = (cell) => {
  const cord = cell.split(':');
  const x = Number.parseInt(cord[0]);
  const y = Number.parseInt(cord[1]);
  return { x, y };
};

export default {
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    size: {
      type: Number,
      default: 64,
    },
    lineWidth: {
      type: Number,
      default: 1,
    },
    mode: {
      type: String,
      default: 'pen',
    },
    gridMode: {
      type: String,
      default: 'grid',
    },
    matrix: {
      type: Object,
      default() {
        return {};
      },
    },
    form: {
      type: String,
      default: 'square'
    },
    color: {
      type: String,
      default: '#000'
    },
    lastChangedCell: {
      type: String,
      default: null,
    }
  },

  emits: ['cellChange', 'matrixChange'],

  data() {
    return {
      isDrawing: false,
      gridDimUpdate: false,
    };
  },

  computed: {
    cellLen() {
      return this.width / this.size;
    },

    heightSize() {
      return this.height / this.cellLen;
    },

    drawLen() {
      return this.cellLen - this.lineWidth;
    },

    halfLineWidth() {
      return this.lineWidth / 2;
    },
  },

  watch: {
    height(current, previous) {
      this.$nextTick(() => {
        if (current !== previous && current > 0 && this.width > 0) {
          this.draw();
        }
      })
    },

    width(current, previous) {
      this.$nextTick(() => {
        if (current !== previous && current > 0 && this.height > 0) {
          this.draw();
        }
      })
    },

    lastChangedCell(current) {
      this.$nextTick(() => {
        if (current) {
          this.drawCell(current);
        }
      })
    },

    matrix() {
      if (!this.lastChangedCell) {
        this.drawCells();
      }
    },

    size() {
      this.draw();
    },

    gridMode() {
      this.drawGrid();
    }
  },

  mounted() {
    const canva = document.getElementById('canva');
    const gridCanva = document.getElementById('grid');
    const ctx = canva.getContext('2d');
    const grid = gridCanva.getContext('2d');
    this.$d = new Drawer(ctx, { shadowBlur: 0 });
    this.$g = new Drawer(grid, { shadowBlur: 0 });
  },

  methods: {
    drawLine(x, x1, y, y2) {
      this.$g.drawLine({
        x,
        x1,
        y,
        y2,
        lineWidth: this.lineWidth,
        strokeStyle: '#cbd5e0',
      });
    },

    isGridUpToDate() {
      return (
        this.gridDimUpdate ===
        `${this.width}x${this.height}x${this.size}x${this.gridMode}`
        && !this.isDrawnOnce
      );
    },

    setGridDimUpdate() {
      this.isDrawnOnce = true;
      this.gridDimUpdate = `${this.width}x${this.height}x${this.size}x${this.gridMode}`;
    },

    drawGrid() {
      if (this.isGridUpToDate()) {
        return;
      } else {
        this.$g.clear({ width: this.width, height: this.height });
      }

      this.setGridDimUpdate();
      if (this.gridMode === 'none') {
        return;
      }

      if (this.gridMode === 'grid') {
        for (let index = 1; index < this.size; index++) {
          const y = index * this.cellLen;
          this.drawLine(
            y,
            this.halfLineWidth,
            y,
            this.height - this.halfLineWidth
          );
        }

        for (let index = 1; index < this.heightSize; index++) {
          const y = index * this.cellLen;
          this.drawLine(
            this.halfLineWidth,
            y,
            this.width - this.halfLineWidth,
            y
          );
        }
      }

      if (this.gridMode === 'dot') {
        for (let row = 1; row < this.size; row++) {
          for (let col = 1; col < this.heightSize; col++) {
            this.$g.drawDot({
              x: row * this.cellLen - this.cellLen * 0.5,
              y: col * this.cellLen - this.cellLen * 0.5,
              lineWidth: this.lineWidth + 1,
              strokeStyle: '#cbd5e0',
              circleWidth: this.drawLen * 0.1,
            });
          }
        }
      }
    },

    draw() {
      this.drawCells();
      this.drawGrid();
    },

    drawForm({ cell, startX, startY }) {
      const { form, color } = this.matrix[cell];
      const empty = form.indexOf('empty') > -1;

      if (form.indexOf('square') === 0) {
        let opts;
        if (empty) {
          const strokeLen = this.drawLen * 0.18;
          opts = {
            x: startX + strokeLen * 0.5,
            y: startY + strokeLen * 0.5,
            width: this.drawLen - strokeLen,
            height: this.drawLen - strokeLen,
            stroke: color,
            lineWidth: this.drawLen * 0.18,
          };
        } else {
          opts = { fill: color };
        }
        const radius = form.indexOf('rounded') > -1 ? 5 : 0;
        this.$d.drawRect({
          x: startX,
          y: startY,
          width: this.drawLen,
          height: this.drawLen,
          radius,
          ...opts,
        });
      } else if (form.indexOf('circle') === 0) {
        const circleWidth = this.drawLen * 0.38;
        const center = this.drawLen / 2;
        let opts = {
          x: startX + center,
          y: startY + center,
        };
        if (empty) {
          opts.lineWidth = circleWidth;
          opts.strokeStyle = color;
          opts.r = center - circleWidth * 0.5;
        } else {
          opts.fillStyle = color;
          opts.r = this.drawLen * 0.5;
        }
        this.$d.drawCircle(opts);
      }
    },

    drawCell(cell) {
      const { x, y } = readCord(cell);
      const startX = x * this.cellLen + this.halfLineWidth;
      const startY = y * this.cellLen + this.halfLineWidth;

      if (this.matrix[cell]) {
        this.drawForm({ cell, startX, startY });
      }

      if (this.matrix[cell] === false) {
        this.$d.clear({
          x: startX,
          y: startY,
          width: this.drawLen,
          height: this.drawLen,
        });
      }
    },

    clearCell(cell) {
      if (this.matrix[cell] !== false) {
        this.$emit('cellChange', cell, true);
      }
    },

    fillCell(cell) {
      this.$emit('cellChange', cell);
    },

    fillZone(cell, color, m) {
      let matrix = this.matrix || m;
      if (matrix[cell]) {
        return;
      }
      const stack = [cell];
      const cellToChange = [];
      let i = 0;
      // Limit loop with arbitrary number
      while (stack.length > 0 && i < 15000) {
        i++;
        const c = stack.pop();
        cellToChange.push(c);
        const { x, y } = readCord(c);
        if (x > 0) {
          const nord = writeCord(x - 1, y);
          if (!matrix[nord]) {
            stack.unshift(nord);
          }
        }
        if (x < this.size) {
          const south = writeCord(x + 1, y);
          if (!matrix[south]) {
            stack.unshift(south);
          }
        }
        if (y > 0) {
          const east = writeCord(x, y - 1);
          if (!matrix[east]) {
            stack.unshift(east);
          }
        }
        if (y < this.size) {
          const west = writeCord(x, y + 1);
          if (!matrix[west]) {
            stack.unshift(west);
          }
        }
      }

      this.$emit('matrixChange', cellToChange);
    },

    drawCells() {
      this.$d.clear({ width: this.width, height: this.height });
      Object.keys(this.matrix)
        .filter((cell) => Boolean(this.matrix[cell]))
        .forEach((cell) => this.drawCell(cell));
    },

    getClickedCell(event) {
      const canvasRect = this.$d.getClick();
      const canvasX = event.clientX - canvasRect.left;
      const canvasY = event.clientY - canvasRect.top;
      const row = Math.floor(canvasX / this.cellLen);
      const cell = Math.floor(canvasY / this.cellLen);
      return writeCord(row, cell);
    },

    mouseDown(event) {
      this.isDrawing = true;
      this.button = event.button;
      this.shiftKey = event.shiftKey;
      this.mouseEvent(event);
    },

    mouseUp() {
      this.isDrawing = false;
    },

    mouseLeave() {
      this.isDrawing = false;
    },

    touchStart(event) {
      if (!tapedTwice) {
        tapedTwice = true;
        setTimeout(function () {
          tapedTwice = false;
        }, 300);
        return false;
      }
      event.preventDefault();
      this.isDrawing = true;
    },

    touchEnd() {
      this.isDrawing = false;
    },

    getTouchedCell(event) {
      const canvasRect = this.$d.getClick();
      const canvasX = event.targetTouches[0].clientX - canvasRect.left;
      const canvasY = event.targetTouches[0].clientY - canvasRect.top;
      const row = Math.floor(canvasX / this.cellLen);
      const cell = Math.floor(canvasY / this.cellLen);
      return writeCord(row, cell);
    },

    touchLeave() {
      this.isDrawing = false;
    },

    getAction() {
      if (this.mode === 'rubber' || this.shiftKey) {
        return 'clearCell';
      }

      if (this.mode === 'fill') {
        return 'fillZone';
      }

      return 'fillCell';
    },

    mouseEvent(event) {
      const clickedCell = this.getClickedCell(event);
      this[this.getAction()](clickedCell);
    },

    touchEvent(event) {
      const touchedCell = this.getTouchedCell(event);
      this[this.getAction()](touchedCell);
    },

    touchMove(event) {
      if (!this.isDrawing) {
        return;
      }

      this.touchEvent(event);
    },

    mouseMove(event) {
      if (!this.isDrawing) {
        return;
      }

      this.mouseEvent(event);
    },
  },
};
</script>
