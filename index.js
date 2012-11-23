
/**
 * Module dependencies.
 */

var max = require('max')
  , min = require('min');

/**
 * Expose `Sparkline`.
 */

module.exports = Sparkline;

/**
 * Initialize a sparkline with `canvas`.
 *
 * @param {Canvas} canvas
 * @api public
 */

function Sparkline(canvas) {
  if (!canvas) throw new Error('sparkline canvas required');
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
}

/**
 * Update `data`.
 *
 * @param {Array} data
 * @api public
 */

Sparkline.prototype.update = function(data){
  var canvas = this.canvas;
  var ctx = this.ctx;
  var len = data.length;
  var w = canvas.width;
  var h = canvas.height;
  var _max = max(data);
  var _min = min(data);
  var sx = w / len;
  var x = 0;

  canvas.width = w;
  ctx.beginPath();
  for (var i = 0; i < len; ++i) {
    var n = data[i] - _min;
    ctx.lineTo(x += sx, h - h * (n / (_max - _min)));
  }
  ctx.stroke();
};
