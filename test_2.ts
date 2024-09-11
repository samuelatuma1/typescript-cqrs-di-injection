var data = {
    service_id: 'service_lxk9m85',
    template_id: 'template_59nj9cj',
    user_id: '9PWo4M8oeghNfddHq',
    accessToken: 'ti1qgA2nwAJAkJO8nOF2s',
    template_params: {
        title: "Test",
        to_name: "sbs",
        from_name: "sss",
        message: "sss",
        reply_to: "atumasamuelokpara@gmail.com"
    }
};
 
async function testMail(){
    try{
        let req = await fetch( 'https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (req.ok){
            console.log("here")
            let res = await req.text()
            console.log({res})
        }
        else{
            console.log("here 2")
            
            let res = await req.text()
            console.log({res})
        }
    }
    catch(ex){
        console.log("here 3")

        console.log({ex})
    }
}

testMail()