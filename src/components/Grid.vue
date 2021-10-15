<template>
  <canvas
    id="canva"
    :width="width"
    :height="height"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    @mouseup="mouseUp"
  />
</template>

<script>
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
  },
  emits: ['cellChange', 'matrixChange'],

  data() {
    return {
      isDrawing: false,
    };
  },

  computed: {
    cellLen() {
      return this.width / this.size;
    },

    drawLen() {
      return this.cellLen - this.lineWidth;
    },

    halfLineWidth() {
      return this.lineWidth / 2;
    },
  },

  mounted() {
    const canva = document.getElementById('canva');
    const ctx = canva.getContext('2d');
    this.ctx = ctx;
    this.ctx.shadowBlur = 0;
    this.draw();
  },

  updated() {
    this.draw();
  },

  methods: {
    drawLine(x, x1, y, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, x1);
      this.ctx.lineTo(y, y2);
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = '#cbd5e0';
      this.ctx.stroke();
    },

    drawDot(x, y) {
      const circleWidth = this.drawLen * 0.1;
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth + 1;
      this.ctx.strokeStyle = '#cbd5e0';
      this.ctx.arc(x, y, circleWidth, 0, 2 * Math.PI);
      this.ctx.stroke();
    },

    drawGrid() {
      if (this.gridMode === 'none') {
        return;
      }

      if (this.gridMode === 'grid') {
        for (let index = 1; index < this.size; index++) {
          const y = index * this.cellLen;
          this.drawLine(
            this.halfLineWidth,
            y,
            this.width - this.halfLineWidth,
            y
          );
          this.drawLine(
            y,
            this.halfLineWidth,
            y,
            this.width - this.halfLineWidth
          );
        }
      }

      if (this.gridMode === 'dot') {
        for (let row = 1; row < this.size; row++) {
          for (let col = 1; col < this.size; col++) {
            this.drawDot(
              ((row  * this.cellLen) - this.cellLen * .5),
              ((col  * this.cellLen) - this.cellLen * .5)
            )
          }
        }
      }
    },

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.width);
      this.drawGrid();
      this.drawCells();
    },

    drawForm({ cell, startX, startY }) {
      const { form, color } = this.matrix[cell];
      if (form === 'square') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(startX, startY, this.drawLen, this.drawLen);
      } else if (form === 'circle') {
        const center = this.drawLen / 2;
        const circleWidth = this.drawLen * 0.38;
        this.ctx.beginPath();
        this.ctx.arc(startX + center, startY + center, center - circleWidth * 0.5, 0, 2 * Math.PI);
        this.ctx.lineWidth = circleWidth;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
      }
    },

    drawCell(cell) {
      const { x, y } = readCord(cell);
      const startX = x * this.cellLen + this.halfLineWidth;
      const startY = y * this.cellLen + this.halfLineWidth;
      
      if (this.matrix[cell]) {
        this.drawForm({ cell, startX, startY })
      }

      if (this.matrix[cell] === false) {
        this.ctx.clearRect(startX, startY, this.drawLen, this.drawLen);
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
      const stack = [cell]
      const cellToChange = []
      let i = 0; 
      // Limit loop with arbitrary number
      while (stack.length > 0 && i < 15000) {
        i++;
        const c = stack.pop();
        cellToChange.push(c)
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
      Object.keys(this.matrix)
        .filter((cell) => Boolean(this.matrix[cell]))
        .forEach((cell) => this.drawCell(cell));
    },

    getClickedCell(event) {
      const canvasRect = this.ctx.canvas.getBoundingClientRect();
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

    mouseMove(event) {
      if (!this.isDrawing) {
        return;
      }

      this.mouseEvent(event);
    },
  },
};
</script>
