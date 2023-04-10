'use strict';

// Create a 10 X 10 Fields
// The character * can be always at the default of position (0,0) when the user starts the game
// The controls for the character are:
// Up = U or u key
// Down = D or d key
// Left = L or l key
// Right = R or r key
// If a user entered an invalid key (e.g. p or t), output “Enter (u, d, l or r.) and allow the user to enter again
// The number of holes generated should be lesser than the fields generated
// When the character drops into a hole, output “Sorry, you fell down a hole!” and the game ends
// When the character hits the boundaries, output “Out of bounds - Game End!” and the game ends
// When the character gets the hat, output “Congrats, you found your hat!” and and the game ends

// Get input from the user through the terminal

const prompt = require('prompt-sync')({ sigint: true });

// Clear the terminal screen

const clear = require('clear-screen');

// Create some global variables

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const column = 10;
const field = [[]];

const generateField = () => {
    // Nested for-loop : Outer 'for' is to loop through the row and inner 'for' to loop through the column

    // Outer array - row
    for (let i = 0; i < row; i++) {

        field[i] = [];

        // Inner array - column

        for (let j = 0; j < column; j++) {
            field[i][j] = fieldCharacter;
        }; // Inner for loop
    }; // Outer for loop

    // Creating field with 20% random holes

    const holeRandom = 0.2;

    const holes = Math.floor(row * column * holeRandom);

    for (let i = 0; i < holes; i++) {
        const holeRow = Math.floor(Math.random() * row);
        const holeCol = Math.floor(Math.random() * column);

        field[holeRow][holeCol] = hole;
    };

    // Random position of hat

    const hatRow = Math.floor(Math.random() * row);
    const hatCol = Math.floor(Math.random() * column);

    field[hatRow][hatCol] = hat;
};

const print = () => {
    clear();

    // Map method is to loop through:
    // 1. All the columns and join the elements with space
    // 2. All the rows and joing the elements with next line ('/n')

    const displayField = field.map(row => row.join('')).join('\n')

    console.log(displayField);
}

const startGame = () => {

    generateField();

    // Path character movement

    let currentRow = 0;
    let currentCol = 0;

    field[currentRow][currentCol] = pathCharacter; // Starting position of character

    // While loop will keep looping until it is terminated explicitly by a 'break' condition

    while (true) {
        clear();
        print();

        const input = prompt('Enter U, D, L, or R: ').toLowerCase();

        let newRow = currentRow;
        let newCol = currentCol;

        if (input === 'u') {
            newRow -= 1;
        } else if (input === 'd') {
            newRow += 1;
        } else if (input === 'l') {
            newCol -= 1;
        } else if (input === 'r') {
            newCol += 1;
        } else {
            console.log('Did you enter U, D, L, or R?');
            continue;
        }

        if (newRow < 0 || newRow >= row || newCol < 0 || newCol > column) {
            console.log('You have drifted off the field - Game Over!');
            break;
        }

        const newPosition = field[newRow][newCol];

        if (newPosition === hole) {
            console.log('You fell down a hole - Game Over!');
            break;
        } else if (newPosition === hat) {
            console.log('Yay, your hat is found - Success!');
            break;
        };

        // Lets the path character track to new rows and columns in the field from inital starting position

        field[newRow][newCol] = pathCharacter;

        // Changes the let variables above to take the state of the updated positions

        currentRow = newRow;
        currentCol = newCol;
    };
};

startGame();