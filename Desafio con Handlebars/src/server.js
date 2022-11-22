const express = require('express');
const handlebars = require('express-handlebars');
const path = require("path");

const viewsFolder = path.join(__dirname,"views")
const app = express();
app.listen(8080,()=>{
    console.log('listening in port 8080')
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productos = [];

// Inicializar nuestro motor (solo se hace con handlebars)

app.engine("handlebars",handlebars.engine());

// Donde tengo las vistas de mi proyecto

app.set("views",viewsFolder);

// Defino el motor de plantilla a utilizar
app.set("view engine","handlebars");

app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/form",(req,res)=>{
    res.render("form")
});

app.get("/products",(req,res)=>{
    res.render("productos",{
        product1: productos
    })
    console.log(productos);
});

app.post("/products",(req,res)=>{
    let producto = req.body;
    console.log(producto);
    if(producto == null)
    {
        res.json({error: "Nada"})
        return;
    }

    let idNuevo = 0;
    if(productos.length > 0){// si el arreglo ya tiene un producto, sumo +1 a ese id para setear en el nuevo producto
        idNuevo = productos.length + 1;
    }
    else{
        idNuevo = 1;
    }//no hay productos en el arreglo, primer producto con id = 1
       
    const nuevoProducto = { //creo objeto producto obteniendo los datos de la solicitud(body), y creo el nuevo id
        id: idNuevo,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
    }
    
    productos.push(nuevoProducto);
    res.json({mensaje: 'Se agrego el producto correctamente.'})
    // console.log(nuevoProducto)
});

// l