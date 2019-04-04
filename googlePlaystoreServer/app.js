express = require('express')
morgan = require('morgan')
playstore = require('./playstore')
cors = require('cors')
app = express()
app.use(morgan('common'))
app.use(cors())

app.get('/apps',(req,res)=>{
  let genre =req.query.genre
  let sort = req.query.sort
  let genreArray= ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].map(genre=> genre.toLowerCase())
  let sortArray = ['rating','app']
  
  
  if(!genre && !sort){
    return res.status(200).send(playstore)
  }
  
  
  if(genre){
    if(!genreArray.includes(genre)){
      return res.status(400).send(`Sort must be one of followings\n ${genreArray.join(' or ')}`)
  }}



    
   
    if(sort){
     
      if(!sortArray.includes(sort)){
        return res.status(400).send('Sort must be one of title or rank')
        
      }
      
    }

    let searchResult = playstore.filter(app=>{
      //console.log(app.Genres.toLowerCase().includes(genre))
  
        return app.Genres.toLowerCase().includes(genre)
        
      })


      if(sort){
        
       
        sort=sort[0].toUpperCase()+sort.slice(1)
        searchResult.sort((a,b)=>{
          return a[sort]>b[sort]?1:a[sort]<b[sort]?-1:0
        })
      }


      
      let newResult = searchResult.map(element=>element)
      
    

  
   res.json(newResult)

    



})


module.exports=app
