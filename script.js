// generate order 
// add one each round
// light up the box?
// 

var blinking = false;

function randomNumber(from,to) {
  return Math.random()*(to-from)+from;
};

function findBox(selector) {
	return $(".field .box."+selector);
};

function blink(box) {
	blinking = true;
	box.addClass("blink");
	
	setTimeout(function() {
		box.removeClass("blink");
		blinking = false;
	}, 500);
};

function randomBox() {
	var colors = ["blue", "red", "yellow", "green"];
	var randomColor = colors[Math.floor(randomNumber(0, colors.length))];
	
	return findBox(randomColor);
};

function blinkBoxes(order) {
	var time = 0;
	
	order.forEach(function(box) {
		time += 1000;
		
		setTimeout(function() {
			blink(box);
		}, time);
	});
};

function matches(box, anotherBox) {
	return box.attr("class") === anotherBox.attr("class");
};

var order = [];
order.push(randomBox());
var currentIndex = 0;

function startGame() {
	blinkBoxes(order);

	$(".box").click(function() {
		if (!blinking) {
			blink($(this));
		
			if (matches($(this), order[currentIndex])) {
				currentIndex += 1;
			
				// if we are on last box
				if (currentIndex === order.length) {
					currentIndex = 0;
					order.push(randomBox());
					blinkBoxes(order);
				}
			} else {
				currentIndex = 0;
				order = [];
				alert("daa daaam.. LOST");
				$("button").removeAttr("disabled");
			}
		}
	});
};

$("button").click(function() {
	startGame();
	$(this).attr("disabled", true);
});