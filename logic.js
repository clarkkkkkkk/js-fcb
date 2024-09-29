// Variables - storage of values
let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;
// This variables will be used to monitor if the user already won once in the value of 2048, 4096, or 8192
// If one of these variables value became true, it means the player already won once in specific values.


function setGame(){

	board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; // This board will be used as the backend board to design and modify the tiles of the frontend board
    

//nested for loop
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			// Creates a div element
			let tile = document.createElement("div");

			// Assign an id base on the position of the tile
			tile.id = r.toString() + "-" + c.toString();

			// Retrieves the number of the tile from the backend board
			let num = board[r][c];


			updateTile(tile, num);

			document.getElementById("board").append(tile);
		}
	}

	setTwo();
	setTwo();
}

// This function is to update the color of the tile base on its num value
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	//to add a div class "tile"
	tile.classList.add("tile");

	if(num > 0){

		// add a class tile if there's a number inside the innterText
		tile.innerText = num.toString();

		if(num < 8192) {
			// to update the variable x to String
			// and every update number ex: x2
			// it will be updated same as color inside the style.css
			tile.classList.add("x" + num.toString());

		}
		else {
			tile.classList.add("x8192");
		}
	}
}

// function is a pre-built
// window.onload where is to run the system or the LOCAL FUNCTION
window.onload = function(){
	setGame();
}

function handleSlide(e){
	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes
		(e.code)){

			if(e.code == "ArrowLeft"){
				slideLeft();
				setTwo();
			}
			else if (e.code == "ArrowRight"){
				slideRight();
				setTwo();
			}
			else if (e.code == "ArrowUp"){
				slideUp();
				setTwo();
			}
			else if (e.code == "ArrowDown"){
				slideDown();
				setTwo();
			}

	}

document.getElementById("score").innerText = score;

	setTimeout(() =>{
		checkWin();	
	}, 100);
	

	if(hasLost() == true){

		setTimeout(() =>{
			alert("Game Over. You have lost the game. Game will restart");
			restartGame();
			alert("Click any arrow key to restart")
		}, 100);
	}
}

document.addEventListener("keydown", handleSlide);

//backend function or the process
function slide(tiles){


	// purpose of this method is to disregard the zero
	// [2, 0, 2, 2] >> [2, 2, 2]
	tiles = filterZero(tiles);

	for(let i = 0; i < tiles.length - 1; i++){

		if(tiles[i] == tiles[i+1]) { // [i+2] this means the tile if its the same value 
									 //true
			tiles[i] = tiles[i] * 2; // multiple itself
			tiles[i+1] = 0; // 4, 0, 2
			score += tiles[i]; // adds the merged tile value to the score
		}
	}

	tiles = filterZero(tiles); 

	while(tiles.length < columns){
		tiles.push(0);
	}
	return tiles;
}



// slideLeft funtion will use slide function to merge the adjacent
function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;


		for(let c = 0; c<columns; c++){

			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);

		}

	}
}



function filterZero(row){
	return row.filter(num => num != 0);
}



/* --------------second-day-------------- */

function slideRight(){

	for(let r=0; r<rows; r++){

		let row = board[r];

		// 2 2 2 0 -> 0 2 2 2
		row.reverse(); 

		row = slide(row); // use slide function to merge the same values
		// 4 2 0 0
		row.reverse();
		// 0 0 2 4


		board[r] = row;


		for(let c = 0; c<columns; c++){
				// Accesses the tile using it's id
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);

		}

	}
}


function slideUp(){

	for(let c=0; c<columns; c++){

		// 				row 0 		row 1 		 row 2 			row 3
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]]

		col = slide(col); // use slide function to merge the same values
		// to slide the function


		for(let r = 0; r<rows; r++){

			board[r][c] = col[r]
			// Accesses the tile using it's id
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}

	}
}


function slideDown(){

	for(let c=0; c<columns; c++){

		// 				row 0 		row 1 		 row 2 			row 3
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]]


		col.reverse();
		col = slide(col); // use slide function to merge the same values
		// to slide the function
		col.reverse();

		for(let r = 0; r<rows; r++){

			board[r][c] = col[r]
			// Accesses the tile using it's id
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}

	}
}


function hasEmptyTile(){

	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c] == 0){
				return true;
			}
		}
	}
	return false;

}

function setTwo(){

	if(hasEmptyTile() == false){
		return;
	}

	let found = false;


	while(found == false){

		// This will generates random value based on the  value of (0 to 3)
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);


		if(board[r][c] == 0){

			// updated: 0 -> 2
			board[r][c] = 2;
			let tile = document.getElementById(r.toString()
			 + "-" + c.toString());

			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}
}


function checkWin(){

	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){


			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got the 2048");
				is2048Exist = true;
			}
			else if(board[r][c] == 4069 && is4096Exist == false){
				alert("You are unstoppable at 4096! You are fantastically unstoppable!");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are incredibly awesome!");
				is8192Exist = true;
			}
		}
	}
}




function hasLost(){

	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			if(board[r][c] == 0){
				return false;
			}

	const currentTile = board[r][c];

	if( // to check if there's is much to upper tile (ROW)
		r > 0 && board[r-1][c] === currentTile || // to check if the current tile matches to the upper tile
		r < 3 && board[r+1][c] === currentTile || // to check if the current tile matches to the lower tile
		c > 0 && board[r][c-1] === currentTile || // to check if the current tile matches to the left tile
		c > 3 && board[r][c+1] === currentTile // to check if the current tile matches to the right tile // Maximum
	){
		return false;
	}

		}
	}
	// No possibe moves - meaning true, the user the lost.
	return true;
}


function restartGame(){

	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	score = 0;
	setTwo();
}




