const express =require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");

const app=express();

mongoose.connect("mongodb+srv://abhishek:abhi975312@cluster0.0qmmi.mongodb.net/todolistdb")

const itemsSchema = {
  name: String
}

const item = mongoose.model("item",itemsSchema);

const item1= new item({
  name: "first task"
});
const item2= new item({
  name: "second task"
});
const item3= new item({
  name: "third task"
});

const deafaultItems = [item1 , item2, item3];




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get("/",function(req,res)
{
  var today=new Date();
  var currDay=today.getDay();

  var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var day=weekDays[currDay]+", "+today.toLocaleDateString();

  item.find({},function(err,foundItems){
    // if(foundItems.length === 0)
    // {
    //
    //   item.insertMany(deafaultItems,function(err){
    //     if(err)
    //     {
    //       console.log(err);
    //     }
    //     else
    //     {
    //       console.log("success!");
    //     }
    //   });
    //   res.redirect("/");
    // }
    // else
      res.render("list" ,{kindofday:day, newListItem: foundItems});
});
});

app.post("/",function(req,res){

//  const itemName=;
  const insertItem = new item({
    name: req.body.task
  });

  insertItem.save();
  res.redirect("/");
})

app.post("/delete",function(req,res){
  const delId=req.body.checkbox;

  item.findByIdAndRemove(delId,function(err){
    if(err)console.log(err);
    else console.log("success!");
  });
  res.redirect("/");
});
// items
app.get("/about",function(req,res){
  res.render("about")
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
//app.listen(port);


app.listen(port,function(){
  console.log("server started!");
});
