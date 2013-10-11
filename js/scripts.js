var scr_width = window.screen.width
var scr_height = window.screen.height


var stage = new Kinetic.Stage({
  container: 'container',
  width: scr_width,
  height: scr_height
});

var layer = new Kinetic.Layer();

var layer1 = new Kinetic.Layer();
var width = scr_width;
var height = scr_height;
var colors = ['red', 'orange', 'green', 'blue', 'purple'];
var maxMoveDist = 5;
var maxOpacityChange = 0.01

// create 5 strings
for(var n = 0; n < 5; n++) {
  var points = [];
  // generate 10 random points
  for(var i = 0; i < 20; i++) {
    var max = i % 2 === 0 ? width : height;
    points[i] = Math.random() * max;
  }

  var worm = new Kinetic.Spline({
    points: points,
    strokeWidth: 10,
    stroke: colors[n],
    lineCap: 'round',
    opacity: Math.random()
  });

  layer1.add(worm);
}

stage.add(layer1);


var rect = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: scr_width,
  height: scr_height,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4,
  opacity: .1
});

var circle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 20,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

var circle2 = new Kinetic.Circle({
  x: stage.getWidth() / 3,
  y: stage.getHeight() / 3,
  radius: 20,
  fill: 'blue',
  stroke: 'black',
  strokeWidth: 4
});

var blueBlob = new Kinetic.Blob({
  points: [{
    x: 73,
    y: 140
  }, {
    x: 340,
    y: 23
  }, {
    x: 500,
    y: 109
  }, {
    x: 300,
    y: 170
  }],
  stroke: 'blue',
  strokeWidth: 10,
  fill: '#aaf',
  tension: 0.8
  });


layer.add(rect);
// add the shape to the layer
layer.add(blueBlob);
// layer.add(redBlob);
layer.add(circle);
layer.add(circle2);

// add the layer to the stage
stage.add(layer);

// circle.on('click', function() {
//   anim.start();
// });

circle2.on('click', function() {
  mutateBlob();
});

layer.on('mousemove', function() {
  moveToMouse();
})



function mutateBlob() {
  var tween = new Kinetic.Tween({
    node: blueBlob, 
    duration: 1,
    tension: Math.random() * 4,
    easing: Kinetic.Easings.ElasticEaseInOut
  });
  tween.play()
}

var circ_tween = new Kinetic.Tween({node: circle});

function moveToMouse() {
  var mouse_pos = stage.getMousePosition();
  circ_tween.pause();
  circ_tween = new Kinetic.Tween({
    node: circle, 
    duration: 3,
    x: mouse_pos.x,
    y: mouse_pos.y,
    easing: Kinetic.Easings.ElasticEaseOut
  });
  circ_tween.play()
}

var anim = new Kinetic.Animation(function(frame) {
  var worms = layer1.getChildren();

  for(var n = 0; n < worms.length; n++) {
    var worm = worms[n];
    var points = worm.getPoints();
    var newPoints = [];
    var newOpacity = worm.getOpacity() + (2 * Math.random() * maxOpacityChange) - maxOpacityChange;

    if(newOpacity < 0) {
      newOpacity = 0;
    }
    else if(newOpacity > 1) {
      newOpacity = 1;
    }

    for(var i = 0; i < points.length; i++) {
      newPoints.push({
        x: points[i].x + (2 * Math.random() * maxMoveDist) - maxMoveDist,
        y: points[i].y + (2 * Math.random() * maxMoveDist) - maxMoveDist
      });
    }
    worm.setPoints(newPoints);
    worm.setOpacity(newOpacity);
  }
}, layer1);

anim.start();