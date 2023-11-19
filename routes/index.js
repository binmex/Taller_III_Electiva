const route = require('express').Router()
'use strict'
const fs = require('fs')
const query = fs.readFileSync('./data.json')
const temp = JSON.parse(query)
var obj=""
var error=""
var flag=true

//Routes
route.get('/', (req, res) => {
    res.render('index', { title: "Home :: SGRC" })
})
route.get('/newEntry', (req, res) => {
    res.render('insert', { title: "Agregar reserva de auto :: SGRC","error":error, "flag": flag})
})
route.get('/searchEntry', (req, res) => {
    res.render('search', { title: "Buscar reserva de auto :: SGRC", 'temp': temp })
})
route.get('/editEntry/', (req, res) => {
    res.render('edit', { title: "Editar reserva de auto :: SGRC", "temp": temp, "obj": obj })

})
route.post('editById/:id',(res,req)=>{    
    res.render('/', { title: "Holi de nuevo", "temp": temp, "obj": obj })
})
route.get('/delEntry', (req, res) => {
    res.render('delete', { title: "Eliminar reserva de auto :: SGRC", "temp": temp })
})
route.get('/getBoking/:id',(req,res)=>{
    let id=findBoking(req.params.id)
})

//Insert data
route.post('/addBooking', (req, res) => {
    const { clients, service, dateBooking,observations } = req.body
    const id = temp[temp.length - 1].id + 1;
    const data = {
        'id': id,
        'client': clients,
        'service': service,
        'booking': dateBooking,
        'observations': observations
    }
    //validate the data
    flag = true
    temp.forEach(temp => {
        if (dateBooking == temp["booking"] && car == temp["client"]) {
            flag = false
        }
    })
    if (flag != false) {
        //write the data
        temp.push(data)
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))
        //to home
        res.redirect('/')
    }else{
        res.redirect('/newEntry')
        error = "Lo sentimos, por favor elija otro auto o fecha y hora, ya que se encuentra una reserva activa."
    }
})

//Edit data
route.post('/editData/:id',async (req,res)=>{
    await console.log(req.body)
        const { id,persons, car, dateBooking, observations } = req.body
        await temp.forEach(t=>{
            if(t.id==id){
                t.client=persons
                t.service=car
                t.booking=dateBooking
                t.observations=observations
            }
        })
        fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2))
        res.redirect('/')
})

route.post('/deleteData/:id', async (req, res) => {
    const { id, persons, car, dateBooking, dateDelivery, observations } = req.body;

    await temp.forEach((t, index) => {
        if (t.id == id) {
            temp.splice(index, 1);
            console.log("Eliminado");
        }
    });

    fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2));
    res.redirect('/');
});


module.exports = route,temp;
