const express=require("express");
const app=express();
require('dotenv').config()
const https=require("https");
const bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
    const query=req.body.cityname;
    const apikey=process.env.APIKEY;
    const unit="Metric";
    const url=process.env.URL+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
            const weatherdata=JSON.parse(data);
            console.log(weatherdata);
            const temp=weatherdata.main.temp;
            const feels_like=weatherdata.main.feels_like;
            const temp_min=weatherdata.main.temp_min;
            const temp_max=weatherdata.main.temp_max;
            const pressure=weatherdata.main.pressure;
            const humidity=weatherdata.main.humidity;
            const description=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const url=process.env.URLIMG+icon+"@2x.png"
            res.write("<p>The description of temperature in "+req.body.cityname+" is "+description+"</p>")
            res.write("<h1>The temperature in "+req.body.cityname+" is "+temp+" degrees Celcius</h1>");
            res.write("<h1>Feels like is "+feels_like+" degrees Celcius</h1>");
            res.write("<h1>Minimum temperature is "+temp_min+" degrees Celcius</h1>");
            res.write("<h1>Maximum temperature is "+temp_max+" degrees Celcius</h1>");
            res.write("<h1>Pressure is "+pressure+"</h1>");
            res.write("<h1>Humidity is "+humidity+"%</h1>");
            //res.write("<img src="+url+">");
            res.send();
        });
    });
});


let port = process.env.PORT;
	if (port == null || port == "") {
  	port = 3000;
	}
app.listen(port,function()
{
    console.log("server is starting at port number 3000");
});