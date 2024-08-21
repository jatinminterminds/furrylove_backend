
$('.dog-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true
});



$(window).ready(function () {
    setInterval(function () {
        $('.dog-slider').addClass("d-block")
    }, 300);

});

$('.details-slide').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});
