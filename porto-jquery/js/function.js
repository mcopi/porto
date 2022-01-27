const mobileView = window.matchMedia('(max-width: 576px)').matches

const dataByDimensions = (x) => {
    let totalData

    mobileView === true ? totalData = 5 
    : x === 'news' ? totalData = 9
    : totalData = 8

    return totalData
}

const slicedTitle = (words, total) => {
    if (words.length > total) {
        let trimmed = words.substr(0, total)
        trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")))
        return trimmed
    }
    else {
        return words
    }
}

const checkSize = (data) => {
    if (mobileView) {
        return slicedTitle(data, 45)
    } else {
        return slicedTitle(data, 90)
    }
}

const fetchTop = () => {
    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines',
        type: 'get',
        dataType: 'json',
        data: {
            'apiKey': '61826c69deba4033b34f8cd95f22c0ee',
            'country': 'id'
        },
        success: function(data) {
            
            // mobileView === true ? totalData = 5 : totalData = 9
            $.each(data.articles.slice(0, dataByDimensions('news')), (i, x) => {
                if (i == 0) {
                    $(".container-img").append(
                        `<img id="main-highlight" src="${x.urlToImage}" alt="news-img" style="width: 100%">
                        <strong><a id="main-title" href=${x.url} target="_blank">${x.title}</a></strong>`
                    )
                } else if (i < 3) {
                    $("#side-news").append(
                        `<div class="row mb-2 mb-md-0">
                            <img src="${x.urlToImage}" alt="news-img">
                            <a id="main" value=${i} href=${x.url} target="_blank" class="col col-md-12 my-md-2" id="side-title-1">${checkSize(x.title)}</a>
                        </div>`
                    )
                } else {
                    
                    $("#bottom-news").append(
                        `<div class="col-10 offset-1 col-md-2 offset-md-0 mb-2" id="bot-news-${i}"></div>`
                    )
        
                    $(`#bot-news-${i}`).append(
                        `<div class="card">
                            <div class="row">
                                <img src="${x.urlToImage}" alt="news-img" id="img-4">
                                <a href=${x.url} target="_blank" class="col col-md-12 mt-md-2" id="title-4">
                                    ${checkSize(x.title)}
                                </a>
                            </div>
                        </div>`
                    )
                }
            })
        }
    })
}

const byFilterHtml = (data, id) => {
    $(`#byfilter-news-${id}`)
        .append(
            `<div class="col-10 offset-1 col-md-6 offset-md-0">
                <div class="card mb-2">
                <div class="row">
                    <div class="col-6 col-md-6">
                        <img src="${data.urlToImage}" alt="">
                    </div>
                    <div class="col-6 col-md-6">
                        <a>${checkSize(data.title)}</a>
                    </div>
                </div>
                </div>
            </div>`
        )
}

const fetchByFilter = (x = 'technology') => {
    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines',
        type: 'get',
        dataType: 'json',
        data: {
            'apiKey': '61826c69deba4033b34f8cd95f22c0ee',
            'country': 'id',
            'category': `${x}`
        },
        beforeSend: () => { $('.spinner-border').show() },
        success: data => {
            let newId = 0
            $.each(data.articles.slice(0, dataByDimensions()), (i, x) => {
                if (i % 2 == 0) {
                    newId += 1
                    $(".byfilter-news-wrapper")
                        .append(`<div class="row row-byfilter" id="byfilter-news-${newId}"></div>`)
                    byFilterHtml(x, newId)
                } else {
                    byFilterHtml(x, newId)
                }
            })
        }, 
        complete: () => { $('.spinner-border').hide()}
    })
}

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5)
}

const fetchShuffle = () => {
    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines',
        type: 'get',
        dataType: 'json',
        data: {
            'apiKey': '61826c69deba4033b34f8cd95f22c0ee',
            'country': 'id'
        },
        beforeSend: () => { $('.spinner-border').show() },
        success: data => {
            let newId = 0
            let dataOutput = shuffle(data.articles)

            $.each(dataOutput.slice(0, 8), (i, x) => {
                if (i % 2 == 0) {
                    newId += 1
                    $(".byfilter-news-wrapper")
                        .append(`<div class="row row-byfilter" id="byfilter-news-${newId}"></div>`)
                    byFilterHtml(x, newId)
                } else {
                    byFilterHtml(x, newId)
                }
            })
        },
        complete: () => { $('.spinner-border').hide()}
    })
}

const clickedFilter = (data) => {
    $(`#${data}`)
        .removeClass()
        .addClass('btn')
        .children('.bi').css('display', 'none')
}

export { mobileView, slicedTitle, fetchTop, fetchByFilter, clickedFilter, fetchShuffle }