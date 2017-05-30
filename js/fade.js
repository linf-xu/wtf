(function ($) {
    $.extend($.fn, {
        fadeIn: function (speed, easing, complete) {
            if (typeof(speed) === 'undefined') speed = 400;
            if (typeof(easing) === 'undefined' || typeof(easing) !== 'string') easing = 'swing';

            $(this).css({
                display: 'block',
                opacity: 0
            }).animate({
                opacity: 1
            }, speed, easing, function () {
                // complete callback
                if (typeof(easing) === 'function') {
                    easing();
                } else if (typeof(complete) === 'function') {
                    complete();
                }
            });

            return this;
        },
        fadeOut: function (speed, easing, complete) {
            if (typeof(speed) === 'undefined') speed = 400;
            if (typeof(easing) === 'undefined' || typeof(easing) !== 'string') easing = 'swing';

            $(this).css({
                opacity: 1
            }).animate({
                opacity: 0
            }, speed, easing, function () {
                $(this).css('display', 'none');
                // complete callback
                if (typeof(easing) === 'function') {
                    easing();
                } else if (typeof(complete) === 'function') {
                    complete();
                }
            });

            return this;
        },
        fadeToggle: function (speed, easing, complete) {
            return this.each(function () {
                var el = $(this);
                el[(el.css('opacity') === 0 || el.css('display') === 'none') ? 'fadeIn' : 'fadeOut'](speed, easing, complete)
            })
        }
    })
})(Zepto);