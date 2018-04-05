$(document).ready(function () {

    $('.slider').bxSlider({
        speed: 1000
    });


    svg4everybody();

    $('#tel').mask('8 (000) 000-00-00');

    //tab-bar
    (function () {
        var flag=true;
        $('.tab-bar__link').on('click', function (e) {
            e.preventDefault();

            var
                $this = $(this),
                item = $this.closest('.tab-bar__list-item'),
                container = $this.closest('.main4__top'),
                content = container.find('.description__tab-item'),
                ndx = item.index(),
                activeItem = content.filter('.active-d'),
                reqItem = content.eq(ndx),
                duration = 500;

            if(flag){
                flag=false;
                item.addClass('active')
                    .siblings()
                    .removeClass('active');

                activeItem.fadeOut(duration, function() {
                    reqItem.fadeIn(duration, function() {
                        reqItem.addClass('active-d')
                            .siblings()
                            .removeClass('active-d');
                        flag = true;
                    });
                });
            }
        });
    }());

    // acco
    (function () {
        var flag = true;

        $('.acco-item__link').on('click', function (e) {
            e.preventDefault();
            var
                $this = $(this),
                container = $this.closest('.acco-list'),
                item = $this.closest('.acco-item'),
                currentContent = item.find('.acco-item__txt'),
                duration = 500;

            if(flag){
                flag = false;
                if(!item.hasClass('active-acco')){
                    item.addClass('active-acco')
                        .siblings()
                        .removeClass('active-acco')
                        .find('.acco-item__txt')
                        .slideUp(500);
                    currentContent.slideDown(duration, function () {
                        flag = true;
                    });
                } else{
                    item.removeClass('active-acco');
                    currentContent.slideUp(duration, function () {
                        flag = true;
                    });
                }
            }
        });
    }());
});