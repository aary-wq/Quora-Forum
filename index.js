const express = require("express");

const app = express();
const path = require("path");
const {v4:uuidv4} = require("uuid");
let methodOverride = require("method-override");
app.listen("8082",(req,res)=>{
console.log("Server listening at port 8082......");
});

app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username:"Aary",
        content:"We are glad to see you again!..."
    },
    {   
        id : uuidv4(),
        username:"Ramesh",
        content:"I got a job at Microsoft!..."
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
console.log(req.body);
if(req.body.username!='' && req.body.content!='')
posts.push({id:uuidv4(),username:req.body.username,content:req.body.content});
//posts.push(req.body);
res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    
    let post = posts.find((p) =>{
        return p.id === id;
    });
    console.log(post);
    if(post)
    res.render("specific.ejs",{post})
    else
    res.send("<h1>No Such Post Exists</h1>")
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) =>{
        return p.id === id;
    });
    let newcontent = req.body.content;
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) =>{
        return p.id === id;
    });
    res.render("edit.ejs",{post});
    //res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) =>{
        return p.id != id;
    });
    console.log(posts);
    res.redirect("/posts");
});
