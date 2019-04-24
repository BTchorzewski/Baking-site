$(document).ready(function(){
    $('.navigation__burger').click(function(){
        $('.navigation__list').toggleClass('navigation__list--open');
    })
    $('.navigation__link').click(function(){
        $('.navigation__list').removeClass('navigation__list--open');
    })
})