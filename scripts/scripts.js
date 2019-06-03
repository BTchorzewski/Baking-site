$(document).ready(function(){
    $(".carousel1").owlCarousel({
        loop: true,
        autoplay: true,
        center: true,
        mouseDrag: true,
        nav: true,
        dots: false,
        items: 1
    });
    $(".carousel2").owlCarousel({
        loop: true,
        autoplay: true,
        center: true,
        mouseDrag: true,
        nav: true,
        dots: false,
        items: 1
    });
    $(".navigation__link").click(function(){
        $("#check-box").prop("checked", false)
    })
});