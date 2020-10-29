var count = 0;
var currentPlayer = 0;
var plays = 0;
var matrix = [];
var winner = -1;
var game_url = null;

var mainState = {
    

        getMove: function(url_) {

            game_url = url_;

            $.ajax({
                url: game_url,
                headers: {
                    'Content-Type': 'application/json'
                },
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: JSON.stringify({
                    "game": this.getVectorGame()
                }),
                success: function (result) {
                    var p = piecesGroup.getByName('piece' + result.move[0].toString() + 'x' + result.move[1].toString());
                    mainState.selectPiece(p);
                },
                error: function () {
                    console.log("error");
                }
            });

            
        },

        getVectorGame: function() {

            var game_vector = new Array(9);
            var count = 0;
            for(var x =0; x < 3; x++) {
                for(var y = 0; y < 3; y++) {
                    if(matrix[x][y] == Infinity){
                        game_vector[count] = 0
                    }
                    else if(matrix[x][y] == 0){
                        game_vector[count] = 1
                    }
                    else {
                        game_vector[count] = 2
                    }
                    count += 1

                }
            }

            return game_vector;
        },

        getInverseDiagonalValues: function (input) {
            if (toString.call(input) !== "[object Array]")
                return false;

            var column_array = [];

            for(var x = 0; x < 3; x++) {
                var value = input[x][2 - x];
                column_array.push(value);
            }

            return column_array;
        },

        getDiagonalValues: function (input) {
            if (toString.call(input) !== "[object Array]")
                return false;

            var column_array = [];

            for(var x = 0; x < 3; x++) {
                var value = input[x][x];
                column_array.push(value);
            }

            return column_array;
        },

        getRowValues: function (input, index) {
            if (toString.call(input) !== "[object Array]")
                return false;

            return input[index];
        },

        getColumnValues: function(input, index) {
            if (toString.call(input) !== "[object Array]")
                return false;

            var column_array = [];

            for(var x = 0; x < 3; x++) {
                var value = input[x][index];
                column_array.push(value);
            }

            return column_array;
        },

        sum: function (input){

            if (toString.call(input) !== "[object Array]")
                return false;

            var total =  0;
            for(var i=0;i<input.length;i++)
            {
                if(isNaN(input[i])){
                    continue;
                 }
                  total += Number(input[i]);
               }
             return total;
            },

        createMatrixGame: function () {

            for(var i=0; i<3; i++) {
                matrix[i] = new Array(3);
            }

            for(var x =0; x < 3; x++) {
                for(var y = 0; y < 3; y++) {
                    matrix[x][y] = Infinity;
                }
            }
        },

        restartComponents: function () {

            document.getElementById("restart_button").style.display = 'none';
            document.getElementById("game_message").className = "alert alert-warning";
            document.getElementById("game_message").innerHTML = "Clique em <strong>Iniciar o jogo</strong> para começar a jogar";

        },

        preload: function() {
            plays = 0;
            winner = -1;
            currentPlayer = 0;
            this.restartComponents();
            this.createMatrixGame();


            game.load.spritesheet("background", "/assets/tictactoe_board.png", PIECE_WIDTH, PIECE_HEIGHT);
            game.load.spritesheet("pieces", "/assets/tictactoe_pieces.png", 130, 130);
            game.load.image('line', "/assets/tictactoe_line.png")
            game.load.image('border', "/assets/tictactoe_border.png")

        },

        create: function() {
            game.stage.backgroundColor = "#FFFFFF";

            this.prepareBoard();
            this.createLines();
            this.unblockGame();
        },

        update: function() {

        },

    createLines: function () {
        var line1 = this.add.sprite(160, 0, 'line');
        var line2 = this.add.sprite(320, 0, 'line');
        var line3 = this.add.sprite(0, 162, 'line');
        line3.angle = 270;
        var line4 = this.add.sprite(0, 322, 'line');
        line4.angle = 270;
        var border = this.add.sprite(-1, -1, 'border');

    },

    prepareBoard: function() {
            var piecesIndex = 0,
                i, j,
                piece;

            BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
            BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);

            piecesAmount = BOARD_COLS * BOARD_ROWS;


            piecesGroup = game.add.group();

            var count = 0;

            for (i = 0; i < BOARD_ROWS; i++)
            {
                for (j = 0; j < BOARD_COLS; j++)
                {

                    piece = piecesGroup.create(j * PIECE_WIDTH + PIECE_WIDTH/2, i * PIECE_HEIGHT + PIECE_HEIGHT/2, "background", count);

                    count = count + 1;

                    piece.name = 'piece' + i.toString() + 'x' + j.toString();
                    piece.currentIndex = piecesIndex;
                    piece.anchor.x = 0.5;
                    piece.anchor.y = 0.5;
                    piece.face = "blank";

                    piece.inputEnabled = true;
                    piece.moveToPosition = false;
                    piece.events.onInputDown.add(this.selectPiece, this);

                    piece.posX = i;
                    piece.posY = j;
                    piecesIndex++;




                }
            }
        },

        render: function() {

        },


        checkIfFinishedGame: function () {

            var sum_values = -1;

            //Check Lines
            for(var x = 0; x < 3; x++) {
                var line_array = this.getRowValues(matrix, x);
                sum_values = this.sum(line_array);
                console.log("Lines " + sum_values);
                if (sum_values === 0) {
                    winner = 0;
                    return true;
                }
                else if(sum_values === 3) {
                    winner = 1;
                    return true;
                }
            }



            //Check Columns
            for(var y = 0; y < 3; y++) {
                line_array = this.getColumnValues(matrix, y);
                sum_values = this.sum(line_array);
                console.log("Columns " + sum_values);
                if (sum_values === 0) {
                    winner = 0;
                    return true;
                }
                else if(sum_values === 3) {
                    winner = 1;
                    return true;
                }
            }


            //Check Diagonal
            line_array = this.getDiagonalValues(matrix);
            sum_values = this.sum(line_array);
            console.log("Diagonal " + sum_values);
            if (sum_values === 0) {
                    winner = 0;
                    return true;
                }
                else if(sum_values === 3) {
                    winner = 1;
                    return true;
                }

             //Check Diagonal
            line_array = this.getInverseDiagonalValues(matrix);
            sum_values = this.sum(line_array);
            console.log("Sec Diagonal " + sum_values);
            if (sum_values === 0) {
                    winner = 0;
                    return true;
                }
                else if(sum_values === 3) {
                    winner = 1;
                    return true;
                }




            return false;

        },

        getPieceByIndex: function(index) {

            var marker = piecesGroup.iterate('currentIndex', index, Phaser.Group.RETURN_CHILD);

            return marker;

        },

        blockGame: function() {
            var amount_pieces = BOARD_COLS * BOARD_ROWS;

            for(var i = 0; i < amount_pieces; i++) {
                var piece = this.getPieceByIndex(i);
                piece.inputEnabled = false;
            }

        },

        unblockGame: function() {
            var amount_pieces = BOARD_COLS * BOARD_ROWS;

            for(var i = 0; i < amount_pieces; i++) {
                var piece = this.getPieceByIndex(i);
                piece.inputEnabled = true;
            }

        },

        selectPiece: function (piece) {

            if(piece.face === "blank") {
                plays += 1;
                piece.loadTexture('pieces', 1 - currentPlayer , false);


                if(currentPlayer === 0) {
                    piece.face = "X";
                    document.getElementById("game_message").innerText = "Sua vez de jogar.";
                    matrix[piece.posX][piece.posY] = 0;
                    
                }
                else if(currentPlayer === 1) {
                    piece.face = "O";
                    document.getElementById("game_message").innerText = "Jogada do computador.";
                    matrix[piece.posX][piece.posY] = 1;
                    mainState.getMove(game_url);

                    
                }
                currentPlayer = 1 - currentPlayer;
            }
            else {
                //TODO: restore a blank piece
            }

            console.log(matrix);
            if(this.checkIfFinishedGame()) {
                if(winner === 0) {
                    document.getElementById("game_message").className = "alert alert-danger";
                    document.getElementById("game_message").innerText = "Você perdeu. O computador ganhou!!!";
                    document.getElementById("restart_button").style.display = '';
                }
                else if(winner === 1) {
                    document.getElementById("game_message").className = "alert alert-success";
                    document.getElementById("game_message").innerText = "Parabéns. Você ganhou.";
                    document.getElementById("restart_button").style.display = '';
                }
                this.blockGame();

            }
            else {
                if(plays === 9) {
                    document.getElementById("game_message").className = "alert alert-info";
                    document.getElementById("game_message").innerText = "Fim do Jogo. Jogo emaptado!";
                    document.getElementById("restart_button").style.display = '';
                    this.blockGame();
                }
            }

            

        }


    };