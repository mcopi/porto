import { mobileView } from '../js/function.js';

const removeActiveScroll = (newId) => {
    $(".nav-link").filter((index, e) => {
        if(e.className == 'nav-link active') {
            
            $(`#${e.id}`)
                .removeClass()
                .addClass("nav-link")

            $(`#${newId}`)
                .removeClass()
                .addClass("nav-link active")
        }
    })
}

$(document).ready(() => {
    $(window).scroll(() => {
        console.log($(window).scrollTop())
        // if($(window).scrollTop() < 500){
        //     removeActiveScroll('news')
        // } else if(($(window).scrollTop() >= 500) && ($(window).scrollTop() < 1200)){
        //     removeActiveScroll('byfilter')
        // } else if(($(window).scrollTop() >= 1200) && ($(window).scrollTop() < 1500)) {
        //     removeActiveScroll('about')
        // } else {
        //     removeActiveScroll('contact')
        // }
        if($(window).scrollTop() <= ($(`#filter`).offset().top - 250)) {
            removeActiveScroll('news')
        } else if($(window).scrollTop() <= ($(`#about-web`).offset().top - 200)) {
            removeActiveScroll('byfilter')
        } else if($(window).scrollTop() <= ($(`#contact-us`).offset().top - 200)) {
            removeActiveScroll('about')
        } else {
            removeActiveScroll('contact')
        }
    })
    
    $(".nav-link").click(
        () => {
            $(".nav-link").filter((index, e) => {
                if(e.className == 'nav-link active') {
                    $(`#${e.id}`)
                        .removeClass()
                        .addClass("nav-link")
                }
            })
    
            const target = window.event.target
            
            $(`#${target.id}`)
                .removeClass()
                .addClass("nav-link active")
    
            console.log($(`#news-web`).offset().top)
            console.log($(`#filter`).offset().top)
            console.log($(`#about-web`).offset().top)
            console.log($(`#contact-us`).offset().top)

            if(target.id == 'news') {
                window.scroll(0, 0)
            } else if(target.id == 'byfilter'){
                window.scroll(0, $(`#filter`).offset().top - 160)
                // if(mobileView) {
                //     window.scroll(0, 835)
                // } else {
                //     window.scroll(0, 720)
                // }
            } else if(target.id == 'about') {
                window.scroll(0, $(`#about-web`).offset().top - 100)
                // if(mobileView) {
                //     window.scroll(0, 1520)
                // } else {
                //     window.scroll(0, 1330)
                // }
            } else if(target.id == 'contact') {
                window.scroll(0, $(`#contact-us`).offset().top - 100)
                // if(mobileView) {
                //     window.scroll(0, 2230)
                // } else {
                //     window.scroll(0, 1650)
                // }
            }
    
            
    })
})

