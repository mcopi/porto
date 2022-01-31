$(document).ready(() => {

    // HIDE ALERT FORM
    // $(".alert-success").show()

    $(".contact-form").submit(event => {
        event.preventDefault()

        let results = $('.contact-form').serializeArray()
        
        Email.send({
            Host: "smtp.gmail.com",
            Username: "testtaufik749@gmail.com",
            Password: "cigluwuewbjwsoku",
            To: `${results[1].value}`,
            From: "testtaufik749@gmail.com",
            Subject: `${results[0].value} - ${results[2].value} sent you messages`,
            Body: `${results[3].value}`

        }).then(() => {
            // SHOW ALERT FORM
            $(".alert-success").show(300)
            $('.contact-form :input').val('')
            
            // HIDE ALERT SETELAH 2 DETIK
            setTimeout(() => {
                $(".alert-success").hide(500)
            }, 2000)
        })

        // jQuery
        // $.each(results, function(index, x) {
        //     console.log(x)
        // })
        
    })
})