class Drawer {
  constructor(context2d, opts = {}) {
    this.ctx = context2d;
    this.ctx.shadowBlur = opts.shadowBlur;
  }

  getClick() {
    return this.ctx.canvas.getBoundingClientRect();
  }

  drawLine({ x, x1, y, y2, lineWidth, strokeStyle }) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, x1);
    this.ctx.lineTo(y, y2);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }

  drawDot({ x, y, circleWidth, lineWidth, strokeStyle }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.arc(x, y, circleWidth, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawCircle({ x, y, r, lineWidth, strokeStyle, fillStyle }) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (fillStyle) {
      this.ctx.fillStyle = fillStyle;
      this.ctx.fill();
    }
    if (strokeStyle) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.stroke();
    }
  }

  clear({ x = 0, y = 0, width, height }) {
    if (width) {
      this.ctx.clearRect(x, y, width, height);
    }
  }

  /**
   * Draws a rounded rectangle using the current state of the canvas.
   * If you omit the last three params, it will draw a rectangle
   * outline with a 5 pixel border radius
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} x The top left x coordinate
   * @param {Number} y The top left y coordinate
   * @param {Number} width The width of the rectangle
   * @param {Number} height The height of the rectangle
   * @param {Number} [radius = 5] The corner radius; It can also be an object
   *                 to specify different radii for corners
   * @param {Number} [radius.tl = 0] Top left
   * @param {Number} [radius.tr = 0] Top right
   * @param {Number} [radius.br = 0] Bottom right
   * @param {Number} [radius.bl = 0] Bottom left
   * @param {Boolean} [fill = false] Whether to fill the rectangle.
   * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
   */
  drawRect({ x, y, width, height, radius = 0, fill, stroke, lineWidth }) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius.tl, y);
    this.ctx.lineTo(x + width - radius.tr, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.ctx.lineTo(x + width, y + height - radius.br);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    this.ctx.lineTo(x + radius.bl, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.ctx.lineTo(x, y + radius.tl);
    this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    this.ctx.closePath();
    if (fill) {
      this.ctx.fillStyle = fill;
      this.ctx.fill();
    }
    if (stroke) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = stroke;
      this.ctx.stroke();
    }
  }
}

export default Drawer;