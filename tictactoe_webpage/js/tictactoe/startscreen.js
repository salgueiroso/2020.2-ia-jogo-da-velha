
var game = new Phaser.Game(480, 480, Phaser.AUTO, 'game');

//500 456

var PIECE_WIDTH = 160,
    PIECE_HEIGHT = 160 ,
    BOARD_COLS = 3,
    BOARD_ROWS = 3;



game.state.add("boot", bootState);
game.state.add("main", mainState);

game.state.start("main");




