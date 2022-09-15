var
    // define useful elements
    body = document.getElementsByTagName("body")[0],
    header = document.getElementsByTagName("header")[0],
    ball = document.getElementById("ball"),
    player_1 = document.getElementById("player_1"),player_2 = document.getElementById("player_2"),
    player_1_score = document.getElementById("player_1_score"),
    player_2_score = document.getElementById("player_2_score");

var
    // bx and by are position, others are width and height of ball
	bx = ball.offsetLeft, by = ball.offsetTop,
	bw = ball.offsetWidth, bh = ball.offsetHeight,
    // dx and dy are speed
	dx = 3, dy = 2.5;

var
    // p1x and p1y are position, others are width and height for player 1
	p1x = player_1.offsetLeft, p1y = player_1.offsetTop,
	p1w = player_1.offsetWidth, p1h = player_1.offsetHeight,
    // player one paddle speed and direction
	p1sy = 2.5, p1dy = 0;

var
    // p2x and p2y are position, others are width and height for player two
	p2x = player_2.offsetLeft, p2y = player_2.offsetTop,
	p2w = player_2.offsetWidth, p2h = player_2.offsetHeight,
    // player two paddle speed and direction
	p2sy = 2.5, p2dy = 0;


// random color generator
function randomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i=0; i<6; i++) {
        color += letters[Math.floor(Math.random()*16)];
    }
    return color
}

// move ball
function AnimateBall() {
    if (paused) {
        return;
    }

    if (bx + dx > p1x + p1w) {
        // reset and celebrate
        player_1_score.innerHTML ++;
        bx = body.offsetWidth / 2;
        by = body.offsetWidth / 2;
        dx = 0;
        dy = 0;
        myInterval = setInterval(function () {body.style.backgroundColor = randomColor();}, 100);
        setTimeout(function () {clearInterval(myInterval); body.style.backgroundColor = "white"; j++;}, 1000);

    } else if (bx + dx < p2x - p2w) {
        // reset and celebrate
        player_2_score.innerHTML ++;
        bx = body.offsetWidth / 2;
        by = body.offsetWidth / 2;
        dx = 0;
        dy = 0;
        myInterval = setInterval(function () {body.style.backgroundColor = randomColor();}, 50);
        setTimeout(function () {clearInterval(myInterval); body.style.backgroundColor = "white"; j++;}, 1000);

    } else {
        bx += dx;
        by += dy;
        ball.style.left = bx + "px";
        ball.style.top = by + "px";

        if (bx + dx < 0 || bx + bw + dx > body.offsetWidth || (bx + dx > p1x - p1w && (p1y < by && by < p1y + p1h))) {dx = -dx; ball.style.backgroundColor = randomColor();}

        if (bx + dx < p2x + p2w && (p2y < by && by < p2y + p2h)) {
            dx = -dx; ball.style.backgroundColor = randomColor();
        }

        if (by + dy < 0 || by + bh + dy > body.offsetHeight || by + dy - header.offsetTop < header.offsetHeight) {dy = -dy; ball.style.backgroundColor = randomColor();}
    }

}

// move paddles
function AnimatePaddle() {

    if (paused) {
        return;
    }

    if (p1y + p1dy + p1h > body.offsetHeight || p1y + p1dy < header.offsetHeight) {
        p1dy = 0;
    }

    if (p2y + p2dy + p2h > body.offsetHeight || p2y + p2dy < header.offsetHeight) {
        p2dy = 0;
    }
    p1y += p1dy;
	player_1.style.top = p1y + "px";

    p2y += p2dy;
	player_2.style.top = p2y + "px";
}

// listen for keypress and change direction
let k = 0;
let j = 0;
let paused = false;
document.addEventListener("keydown", function(e) {
    if (k == 0 && e.key !== "p") {
        // start animation
        dy = (Math.random() + 0.4) * dy;
        var st = setInterval(AnimateBall, 10);
        var at = setInterval(AnimatePaddle, 10);
        k ++;
    }
    // reset after point
    if (j !== 0 && e.key !== "p") {
        var arr = [-1, 1];
        dx = 3 * arr[Math.round(Math.random())];
        dy = 2.5 * arr[Math.round(Math.random())] * (Math.random() + 0.4);
        j = 0;
    }
    if (e.key == "ArrowUp") {
        p1dy = - p1sy;
    } else if (e.key == "ArrowDown") {
        p1dy =  p1sy
    } else if (e.key == "w") {
        p2dy = - p2sy
    } else if (e.key == "s") {
        p2dy =  p2sy
    } else if (e.key == "p") {
        if (paused) {
            paused = false;
        } else {
            paused = true;
        }
    }
})

