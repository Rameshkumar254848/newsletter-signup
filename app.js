const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME: lastName
                } 

            }
        ]
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/fd6cb130d5";
     const options = {
        method: "POST",
        auth: "ramesh:4b6ec4c5f6d9c2bb426e5db1f2b5502e-us11"
     }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname +  "/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsondata);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});




// 4b6ec4c5f6d9c2bb426e5db1f2b5502e-us11

// fd6cb130d5