import { fetchByFilter, clickedFilter, fetchShuffle } from '../js/function.js';

$(document).ready(
    () => {

        let byFilter

        $("#filter .btn").click((e) => {
            
            e.preventDefault()

            
            if(e.currentTarget.className == 'btn btn-active' ) {
                // CLICK CURRENT FILTER
                // REMOVE AND FETCH RANDOM DATA
                clickedFilter(e.currentTarget.id)
                $('.row-byfilter').remove()
                fetchShuffle()

            } else {
                // REMOVE btn-active
                $("#filter .btn").filter((i, x) => clickedFilter(x.id))

                // ADD NEW btn-active
                const target = window.event.target
                
                $(`#${target.id}`)
                    .removeClass()
                    .addClass("btn btn-active")
                    .children().show()

                // REMOVE ROW AND FETCH NEW DATA
                $('.row-byfilter').remove()
                byFilter = $(`#${target.id}`).val()

                fetchByFilter(byFilter)
            }
        })

        fetchByFilter()
    }
)




// $.getJSON('data.json', data => {
//     console.log(data)
//     let newId = 0;
//     $.each(data, (i, x) => {
//         if (i % 5 == 0) {
//             newId += 1
//             $("#byfilter-news")
//                 .append(`<div class="row mt-4" id="byfilter-news-${newId}"></div>`)
//             $(`#byfilter-news-${newId}`)
//                 .append(
//                     `<div class="col-10 offset-1 col-md-2 offset-md-1 mb-2">
//                         <div class="card">
//                         <div class="row">
//                             <img src="img/${x.img_src}" alt="">
//                             <a class="col col-md-12 mt-md-2">${slicedTitle(x.name)}</a>
//                         </div>
//                         </div>
//                     </div>`
//                 )
//         } else {
//             $(`#byfilter-news-${newId}`).append(
//                 `<div class="col-10 offset-1 col-md-2 offset-md-0 mb-2">
//                     <div class="card">
//                     <div class="row">
//                         <img src="img/${x.img_src}" alt="">
//                         <a class="col col-md-12 mt-md-2">${x.name}</a>
//                     </div>
//                     </div>
//                 </div>`
//             )
        
//         }
//     })
// })