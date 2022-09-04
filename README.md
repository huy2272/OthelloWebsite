# OthelloWebsite

### Set-up Instructions

* Setup steps:

1. Download Node.js
2. Make client and server folders
3. Using the terminal, cd to the client folder and type "npx create-react-app"

* USAGE STEPS (Make sure to have Node.js installed): Need to be done every time when pulling from github

1. Using the terminal, cd to the client folder and type "npm i"
2. Repeat the step above with the server folder
3. Using the terminal, cd to the server folder and type "nodemon index.js"
4. Using the terminal, cd to the client folder and type "npm start"

### Description
This group project aims to create a PvP Othello game using React.js 

Below the game there is also a leader board that takes data saved in a json file

### Game Rules

Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them.

After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black.

Now White plays. This player operates under the same rules, with the roles reversed: White lays down a white disc, causing black discs to flip.

Players alternate taking turns. If a player does not have any valid moves, play passes back to the other player. When neither player can move, the game ends. A game of Othello may end before the board is completely filled.

The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw.

### Credits
The game rules were taken from https://www.eothello.com/ 
