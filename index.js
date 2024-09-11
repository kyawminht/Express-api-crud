const express=require('express');
const app=express();
const fs=require('fs');

app.use(express.json());
const movies=JSON.parse(fs.readFileSync('./data/movies.json'));
app.get('/api/movies',(req,res)=>{
    res.json({
        status:'success',
        count:movies.length,
        data:{
            movies:movies
        }
    });
});

app.post('/api/movie',(req,res)=>{
    newId=movies[movies.length - 1].id +1;
    newMovie=Object.assign({id:newId},req.body);

    movies.push(newMovie);
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({message:"data created",data:newMovie})
    })
   
});

app.get('/api/movie/:id',(req,res)=>{
    const {id}=req.params;
   const movie= movies.filter((movie)=>movie.id == id);

    res.json({
        message:'success',
        data:{
            movie:movie,
        }
    })
  
    

});

app.patch('/api/movie/:id',(req,res)=>{
    const {id}=req.params;
   const movie= movies.filter((movie)=>movie.id == id);
   if (movie){
    
   }
    res.json({
        message:'success',
        data:{
            movie:movie,
        }
    })

});

app.delete('/api/movie/:id',(req,res)=>{
    const {id}=req.params;
    const movie=movies.findIndex((movie)=>movie.id == id);
    if (movie){
        movies.splice(movie,1);
        fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
            res.json({message:'success'})
        })
    }
});

app.listen('3000',()=>{
    console.log("server is running ")
});