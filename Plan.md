The game will consist of 3 main objects
the game object that will control the game
the gameboard object that will house the grid and control updating it
and the player object that will hold the name and chosen grid identifier

The Game object:
The game object will be the game master basically it will control everything and handle the logic it will have an instance of the gameboard and players
and it will control turn order score management and win states it will have function that take in things like active player and click position and it will then
update the grid
it will also scan the grid each time a click is made to check for win condition or grid lock-up for a draw condition it will then apply score and reset the game for another round
The game object will be made by an IIFE so as to avoid multiple instances of it

The Gameboard object:
The gameboard will house the 2d array that makes up the grid and will have functions that take in the position the current player clicked and will update it
in the gameboard to display the correct symbol to represent the players choice it will also have a function to wipe the grid on round end
The gameboard object will be made by an IIFE so as to avoid multiple instances of it
it will also contain the function to check if the grid is full and if there are any rows columns or diagonals containing just one players symbols

The player object:
The player object will house the players name and chosen symbol
