document.getElementById("addReservation").addEventListener('click',()=>{
    const clients = document.getElementById('persons').value
    const service = document.getElementById('service').value
    const dateBooking = document.getElementById('dateBooking').value
    const observations = document.getElementById('observations').value

   var xhr = new XMLHttpRequest();

  xhr.open("POST", "/addBooking", true);
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
        //window.location.href = xhr.responseText;
    }
  }
  xhr.setRequestHeader('Content-Type','application/json')
  //clients, service, dateBooking,observations
  const data ={
    clients: clients,
    service: service, // Cambiado de name a nombre
    dateBooking: dateBooking,
    observations: observations
  };
  xhr.send(JSON.stringify(data)); // Convertir a cadena JSON antes de enviar
  
})