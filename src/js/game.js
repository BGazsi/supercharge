class MemoryGame {
    constructor() {
        this.classes = [
            {'className': 'angular', 'left': 2},
            {'className': 'd3', 'left': 2},
            {'className': 'jenkins', 'left': 2},
            {'className': 'postcss', 'left': 2},
            {'className': 'react', 'left': 2},
            {'className': 'redux', 'left': 2},
            {'className': 'sass', 'left': 2},
            {'className': 'supercharge', 'left': 2},
            {'className': 'ts', 'left': 2},
            {'className': 'webpack', 'left': 2}
        ];

        this.$hasActive = false;
        this.shuffle();
        this.counter = 0;
        this.highScore = -1;
        this.$counterElement = $('.counter');
    }

    shuffle() {
        let $mainContainer = $('.main-container'),
            deckSize = $('#deck-select').val(),
            actualClasses = JSON.parse(JSON.stringify(this.classes));
        actualClasses = actualClasses.slice(0, deckSize/2);

        $mainContainer.html('');
        for(let i = 0; i < deckSize; i++) {
            let select = Math.round((Math.random() * 1000) % (deckSize/2 - 1));

            if(actualClasses[select].left > 0) {
                let actualClassName = actualClasses[select].className;
                $mainContainer.append('<div class="rectangle ' + actualClassName + '"></div>');
                actualClasses[select].left--;
            } else {
                i--;
            }
        }

        this.orderRectangles(deckSize);

        $('.rectangle').on('click', $.proxy(this.rectangleClick, this));
        this.counter = 0;
    }

    rectangleClick(e) {
        let $target = $(e.currentTarget);
        if($target.hasClass('active') || $('.active:not(.guessed)').length > 1) {
            return false;
        }
        $target.toggleClass('active');
        this.count();

        if(!this.$hasActive) {
            this.$hasActive = $target;
            return false;
        } else {
            setTimeout(() => {
                if (this.$hasActive.attr('class') === $target.attr('class')) {
                    this.$hasActive.addClass('guessed');
                    $target.addClass('guessed');
                    this.$hasActive = false;

                    if($('.rectangle:not(.guessed)').length === 0) {
                        $('.main-container').html('<h1>Congratulations!</h1>');
                        this.setHighScore();
                    }
                } else {
                    this.$hasActive.removeClass('active');
                    $target.removeClass('active');
                    this.$hasActive = false;
                }
            }, 800);
        }
    }

    count() {
        this.$counterElement.html(++this.counter);
    }

    setHighScore() {
        if(this.counter < this.highScore || this.highScore < 0) {
            $('.high-score').html(this.counter);
            this.highScore = this.counter;
            $('.main-container h1').append('<br/>New highscore!');
        }
    }

    orderRectangles(deckSize) {
        if(deckSize < 10) {
            if(deckSize % 3 === 0) {
                $('.main-container').width('390px');
            } else {
                $('.main-container').width('520px');
            }
        } else if(deckSize < 18){
            if(deckSize % 5 === 0) {
                $('.main-container').width('650px');
            } else if(deckSize % 4 === 0) {
                $('.main-container').width('520px');
            }
        } else {
            $('.main-container').width('650px');
        }
    }
}

$(document).ready(() => {
    var mg = new MemoryGame();

    $('.restart-btn').on('click', $.proxy(mg.shuffle, mg));
    $('#deck-select').change($.proxy(mg.shuffle, mg));

});