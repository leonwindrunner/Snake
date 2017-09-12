var nowDirection = "right";
var nextDirection = "right";
var snakeHeadLeft;
var snakeHeadTop;
var snakeBodyTop;
var snakeBodyLeft;
var s1;
var s2;
var runSnake = true;
var runSnakeLeft;
var runSnakeRight;
var runSnakeUp;
var runSnakeDown;
var runEatSelf;

function start() {
	var screen = document.getElementById("container");
	screen.focus();
	document.onkeydown=function(event){
		var e = event || window.event;
		if(e && e.keyCode==38 && nextDirection!="down") nextDirection="up";
		else if (e && e.keyCode==37 && nextDirection!="right") nextDirection="left";
		else if (e && e.keyCode==40 && nextDirection!="up") nextDirection="down";
		else if (e && e.keyCode==39 && nextDirection!="left") nextDirection="right";				
	}
	s1=window.setInterval("screenFocus()",10);
	s2=window.setInterval("snakeMove()",100);
}

function screenFocus() {
	document.getElementById("container").focus();
}

function snakeMove() {
	var snakes = document.getElementsByClassName("snake");
	snakeHeadLeft = snakes[0].style.left;
	snakeHeadTop = snakes[0].style.top;
	snakeBodyTop;
	snakeBodyLeft;
	runSnakeLeft = (snakes[0].style.left=="0px"&&nextDirection=="left");
	runSnakeRight = (snakes[0].style.left=="580px"&&nextDirection=="right");
	runSnakeUp = (snakes[0].style.top=="0px"&&nextDirection=="up");
	runSnakeDown = (snakes[0].style.top=="580px"&&nextDirection=="down");
	runEatSelf = eatSelf();
	runSnake = runSnakeLeft || runSnakeRight || runSnakeUp || runSnakeDown || runEatSelf;
	
	function eatSelf() {
		var i;
		for (i=1;i<snakes.length;i++) {
			if(snakes[0].style.left==snakes[i].style.left&&snakes[0].style.top==snakes[i].style.top) {
				return true;
				break;
			}
		}
	}

	if(!runSnake) {
		if(nextDirection=="right")
			snakes[0].style.left=parseInt(snakes[0].style.left)+20+"px";
		else if(nextDirection=="left")
			snakes[0].style.left=parseInt(snakes[0].style.left)-20+"px";
		else if(nextDirection=="up")
			snakes[0].style.top=parseInt(snakes[0].style.top)-20+"px";
		else if(nextDirection=="down")
			snakes[0].style.top=parseInt(snakes[0].style.top)+20+"px";
		var i;
		for (i=1;i<snakes.length;i++){
			snakeBodyLeft=snakes[i].style.left;
			snakeBodyTop=snakes[i].style.top;
			snakes[i].style.left=snakeHeadLeft;
			snakes[i].style.top=snakeHeadTop;
			snakeHeadLeft=snakeBodyLeft;
			snakeHeadTop=snakeBodyTop;
		}
		checkEat();
	}else {
		var score=snakes.length-5;
		clearInterval(s1);
		clearInterval(s2);
		alert("You are DEAD!\nYour score is "+score+"!");
	}
}

function checkEat() {
	var foodPosition = document.getElementById("food");
	var snakePosition = document.getElementsByClassName("snake");
	if (foodPosition.style.top==snakePosition[0].style.top&&foodPosition.style.left==snakePosition[0].style.left){
		newFood();
		addSnake();
	}
}

function newFood() {
	var foodPosition = document.getElementById("food");
	foodPosition.style.top = parseInt(Math.random()*29)*20+"px";
	foodPosition.style.left = parseInt(Math.random()*29)*20+"px";
}

function addSnake() {
	var newBody;
	var snakes = document.getElementsByClassName("snake");
	var screen = document.getElementById("container"); 
	newBody = snakes[0].cloneNode(true);
	newBody.style.top = snakeBodyTop;
	newBody.style.left = snakeBodyLeft;
	screen.appendChild(newBody);
}