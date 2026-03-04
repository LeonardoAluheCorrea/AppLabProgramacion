
const express= require('express')

const router= express.Router(); 

const fs= require('fs')


router.use('/', express.static('public'));

router.use('refugio', express.static('public/pagina-refugio'));

router.use('resources-refugio', express.static('public/resources-refugio'));

router.use('css', express.static('public/css'));

router.use(express.json());


//db
const database = require('../public/iniciarDB');
const { isUtf8 } = require('buffer');

console.log(__dirname)

router.get( "/info-refugios", async (req,res) =>{
 
    try{
      const refugios= await database.collection('refugios_content').find({}).toArray();  
      return res.send(refugios).status(200); 
    
    }catch(errr){
      console.log("Error");  
      return res.status(404)
    }
  } 
  );
  
  router.get( '/',(req,res) =>{
      
      
      res.render('index');
      
  });
  router.get( '/info_footer',async (req,res) =>{
      
    try {
        
      fs.readFile('/home/leonel/Desktop/segundoCuatrimestre/LaboratorioDeProgramacion/lab-prog-2023-intro-git/paginaWeb/public/pagina-refugio/info_footer.json', 'utf8', (err,data) =>{
        return res.send(data)
        if(err){
          console.log("errrorr")
        }
      })
    } catch (error) {
      console.log("errrorr")
    }
  
    
    
});
  

  router.post( '/refugio/:id',async (req,res) =>{
      
      try{  
        const insertOne= await database.collection('person').insertOne(req.body);
        console.log(`${insertOne.insertedCount} documents successfully inserted.\n`);
        r
  
      }catch(err){
        console.log("error insertar una persona en la db");
      }
  
      res.render('refugio', {id : req.params.id})    
  });
  
  router.get( '/refugio/:id', async (req,res) =>{
      
    try{
      const refugios= await database.collection('refugios_img').findOne({id: req.params.id});
      console.log(refugios);
  
      res.render('refugio', {img1 : refugios.img, img2 : refugios.img2, img3 : refugios.img3, idRefugio: refugios.id})
      
    }catch(errr){
      console.log("Error");  
      return res.status(404)
    }

  
  });

  
 


  module.exports = router