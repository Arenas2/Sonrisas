
app.directive('background', function() {

	var body = $('html')

    var tl = new TimelineMax({
      repeat:-1,
      yoyo: true
    });

    var reverseRepeat = function(tl) {
      tl.reverse(0); // 0 sets the playhead at the end of the animation
    }

    tl.fromTo(body, 18, {backgroundPosition:'0% 82%', easy:Power1.easyIn}, {backgroundPosition:'100% 19%',  easy:Power1.easyIn})

});
