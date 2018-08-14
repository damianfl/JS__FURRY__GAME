const Furry = require('./furry.js');
const Coin = require('./coin.js');

function Game() {
    this.board = document.querySelectorAll('#board div');

    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        if (this.board[this.index(this.furry.x, this.furry.y)] !== undefined) {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }

    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');

    };

    this.moveFurry = function () {
        this.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y + 1;
        }
        else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y - 1;
        }

        this.showFurry();
        this.checkCoinCollision();
        this.gameOver();

    };

    this.hideVisibleFurry = function () {

        var furryPosition = document.querySelector('.furry');
        if (furryPosition != null) {
            furryPosition.classList.remove('furry');
        }
    };

    var self = this;

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);

    };


    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
        }

    };

    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });

    this.checkCoinCollision = function () {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            var coinPosition = document.querySelector('.coin');
            coinPosition.classList.remove('coin');
            this.score += 25;
            var scoreValue = document.querySelector('#score strong');
            scoreValue.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();


        }

    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var boardId = document.querySelector('#board');
            boardId.classList.add('invisible');
            var scoreId = document.querySelector('#score');
            scoreId.classList.add('invisible');
            var overId = document.querySelector('#over');
            overId.classList.remove('invisible');
            var over = document.querySelector('#over');

            over.style.display = 'flex';
            over.style.flexDirection = 'column';
            over.style.justifyContent = 'center';

            over.innerHTML = `
            <div style = 'text-align: center;'>
            <strong id = 'yourScoreText' style = 'display: block;font-size: 50px; '></strong>
            <strong id = 'yourScore' style = 'display: block;font-size: 75px'></strong>
            <strong id = 'moti' style = 'display: block; font-size: 20px; '></strong>
            <button id= 'buttonRefresh' style = 'color: white;padding: 10px; border: none; background-color: black;margin-top: 50px;'>Zagraj jeszcze raz</button>
            </div>
                        `
            over.querySelector('#yourScoreText').innerHTML = 'Twoj wynik';
            over.querySelector('#yourScore').innerHTML = this.score;

            const moti = document.querySelector('#moti');
            if (this.score <= 200) {
                moti.innerText = 'Kiepski wynik :(( Spróboj jeszcze raz'
            } else if (this.score > 200 && this.score <= 300) {
                moti.innerText = 'Slabo Ci poszlo :-/ Spróbój jeszcze raz'
            } else if (this.score > 300) {
                moti.innerText = 'Calkiem niezle Ci poszlo'
            }

            var button = document.querySelector('#buttonRefresh');
            button.addEventListener('click', function () {
                window.location.reload()
            })


        }
    }
}
module.exports = Game;