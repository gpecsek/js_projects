const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();

const poly = [[89, 9], [13, 19], [19, 56], [98, 36], [89, 9]]

function draw(p) {
  p.map(x => ctx.lineTo(x[0], x[1]));
  ctx.stroke();
}

function inside(p, vs) {
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0], yi = vs[i][1];
    var xj = vs[j][0], yj = vs[j][1];
    var intersect = ((yi > p[1]) != (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

draw(poly)
canvas.addEventListener('mousemove', function(evt) {
  ctx.clearRect(100, 0, canvas.width, canvas.height);
  let x = inside([ evt.x - rect.left, evt.y - rect.top ], poly)
  ctx.fillText(x, 110, 20);
}, false);

console.log(rect.left);
console.log(rect.top);

console.log(rect);