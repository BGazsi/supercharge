var MemoryGame = (function(){"use strict";var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var proto$0={};
    function MemoryGame() {
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
    }DP$0(MemoryGame,"prototype",{"configurable":false,"enumerable":false,"writable":false});

    proto$0.shuffle = function() {
        var $mainContainer = $('.main-container'),
            deckSize = $('#deck-select').val(),
            actualClasses = JSON.parse(JSON.stringify(this.classes));
        actualClasses = actualClasses.slice(0, deckSize/2);

        $mainContainer.html('');
        for(var i = 0; i < deckSize; i++) {
            var select = Math.round((Math.random() * 1000) % (deckSize/2 - 1));

            if(actualClasses[select].left > 0) {
                var actualClassName = actualClasses[select].className;
                $mainContainer.append('<div class="rectangle ' + actualClassName + '"></div>');
                actualClasses[select].left--;
            } else {
                i--;
            }
        }

        this.orderRectangles(deckSize);

        $('.rectangle').on('click', $.proxy(this.rectangleClick, this));
        this.counter = 0;
    };

    proto$0.rectangleClick = function(e) {var this$0 = this;
        var $target = $(e.currentTarget);
        if($target.hasClass('active') || $('.active:not(.guessed)').length > 1) {
            return false;
        }
        $target.toggleClass('active');
        this.count();

        if(!this.$hasActive) {
            this.$hasActive = $target;
            return false;
        } else {
            setTimeout(function()  {
                if (this$0.$hasActive.attr('class') === $target.attr('class')) {
                    this$0.$hasActive.addClass('guessed');
                    $target.addClass('guessed');
                    this$0.$hasActive = false;

                    if($('.rectangle:not(.guessed)').length === 0) {
                        $('.main-container').html('<h1>Congratulations!</h1>');
                        this$0.setHighScore();
                    }
                } else {
                    this$0.$hasActive.removeClass('active');
                    $target.removeClass('active');
                    this$0.$hasActive = false;
                }
            }, 800);
        }
    };

    proto$0.count = function() {
        this.$counterElement.html(++this.counter);
    };

    proto$0.setHighScore = function() {
        if(this.counter < this.highScore || this.highScore < 0) {
            $('.high-score').html(this.counter);
            this.highScore = this.counter;
            $('.main-container h1').append('<br/>New highscore!');
        }
    };

    proto$0.orderRectangles = function(deckSize) {
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
    };
MIXIN$0(MemoryGame.prototype,proto$0);proto$0=void 0;return MemoryGame;})();

$(document).ready(function()  {
    var mg = new MemoryGame();

    $('.restart-btn').on('click', $.proxy(mg.shuffle, mg));
    $('#deck-select').change($.proxy(mg.shuffle, mg));

});