$(document).ready(function () {
    $('.slider').bxSlider({
        speed: 1500
    });
    svg4everybody();

    $('#tel').mask('8 (000) 000-00-00');

    $('.tab-bar__link').on('click', function (e) {
        e.preventDefault();

        var
            $this = $(this),
            item = $this.closest('.tab-bar__list-item'),
            container = $this.closest('.main4__top'),
            content = container.find('.description__tab-item'),
            ndx = item.index();

        item.addClass('active')
            .siblings()
            .removeClass('active');

        content.eq(ndx)
            .addClass('active-d')
            .siblings()
            .removeClass('active-d');
    });
});