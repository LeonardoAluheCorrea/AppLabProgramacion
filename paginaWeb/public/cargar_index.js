
const gridRefugio=  document.querySelector(".container-refugios-grid");

// obtenemos el archivo 



document.addEventListener('DOMContentLoaded',() =>{



    fetch('/info-refugios').then(
        data => {
            return data.json()
        }).then(datos =>{
            cargarRefugios(datos);
        })
});


function cargarRefugios (datos)  { 

    datos.forEach(
        
        (refugio) => {
            const cardRefugio= document.createElement("div"); //creo una tarjeta donde se insertaran los datos

            let img= document.createElement("img");
            img.src= refugio.url;
    
            let refugioContent= document.createElement("div");
            refugioContent.className= "refugio-content";
            
            let enlace= document.createElement("a");

            
          
            enlace.href="/refugio/"+refugio.id;
            
            

            let nombre= document.createElement("h3");
            nombre.textContent= refugio.nombre;

            let descripcion= document.createElement("p");
            descripcion.textContent= refugio.descripcion;
    
            let altura= document.createElement("p");
            altura.textContent= "altura: "+refugio.descripcion;
    
            let dificultad= document.createElement("p");
            dificultad.textContent= "dificultad: "+refugio.dificultad;
    
            
            enlace.appendChild(nombre); //agrego el enlace a la etiqueta a 

            cardRefugio.appendChild(img); 
            
            refugioContent.appendChild(enlace);
            refugioContent.appendChild(descripcion);
            refugioContent.appendChild(altura);
            refugioContent.appendChild(dificultad);
            
            cardRefugio.appendChild(refugioContent);
            gridRefugio.appendChild(cardRefugio);
        } 
        
        
    )

};
    

    

