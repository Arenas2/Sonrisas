app.directive('konva', function() {

     var width = window.innerWidth;
     var height = window.innerHeight;
     var stage = new Konva.Stage({container: 'container', width: width, height: height});
    //
    //  const layer = new Konva.Layer();
    //
    //  var background = new Konva.Rect({
    //      x: 0,
    //      y: 0,
    //      width: width,
    //      height: height,
    //      fillLinearGradientStartPoint: {
    //          x: 0,
    //          y: height / 2
    //      },
    //      fillLinearGradientEndPoint: {
    //          x: width * 8,
    //          y: height / 2
    //      },
    //      fillLinearGradientColorStops: [
    //          0,
    //          '#ff2400',
    //          .125,
    //          '#e81d1d',
    //          .250,
    //          '#e8b71d',
    //          .375,
    //          '#e3e81d',
    //          .5,
    //          '#1de840',
    //          .625,
    //          '#1ddde8',
    //          .750,
    //          '#2b1de8',
    //          .875,
    //          '#dd00f3',
    //          1,
    //          '#dd00f3'
    //      ]
    //  });
    //
    //  var amplitude = 100;
    //  var period = 2000;
    // // in ms
    // var centerX = stage.getWidth() / 2;
    //
    //  var anim = new Konva.Animation(function(frame) {
    //      background.fillLinearGradientColorStops({});
    //      //- background.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
    //  }, layer);
    //  anim.start();
    //
    //
    //  var color = '#f7d64c';
    //
    //
    //
    //  layer.add(background);
    //
    //  stage.add(layer);

    var layer = new Konva.Layer();

    var linearGradPentagon = new Konva.Rect({
             x: 0,
             y: 0,
             width: width,
             height: height,
          fillLinearGradientStartPoint: {
              x: 0,
              y: 0
          },
          fillLinearGradientEndPoint: {
              x: width,
              y: height
          },
        fillLinearGradientColorStops: [
            0, 'white', 1, 'black'
        ],
    });

    layer.add(linearGradPentagon);

    stage.add(layer);


    TweenPlugin.activate([ColorPropsPlugin]);

    var tmpColors = {
        color0: '#ff2400',
        color1: '#e81d1d'
    };

    var tl = new TimelineLite({repeat:1});

    var time = 4;

    tl
        .to(tmpColors, 0, { colorProps: { color0: '#ff2400', color1: '#e81d1d' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#e81d1d', color1: '#e8b71d' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#e8b71d', color1: '#e3e81d' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#e3e81d', color1: '#1de840' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#1de840', color1: '#1ddde8' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#1de840', color1: '#2b1de8' }, ease: Linear.easeNone, onUpdate: applyProps })
        .to(tmpColors, time, { colorProps: { color0: '#2b1de8', color1: '#dd00f3' }, ease: Linear.easeNone, onUpdate: applyProps })


    ;

    function applyProps() {
        linearGradPentagon.setAttrs({
            fillLinearGradientColorStops: [.5, tmpColors.color0, 1, tmpColors.color1]
        });
        layer.batchDraw();
    }

});
