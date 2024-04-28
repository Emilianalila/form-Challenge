//Sending form information to an test API that simulates a RESTful server, using javaScript.
//Then I make an HTTP request using fetch(Post), getting a promise as a result. I use async/await to handle it asynchronously waiting for it to resolve or not.
//I use the method addEventListener(), which allows my application to respond to specific user events example:"click a submit button" without having to reload the page.

let myNameInput = document.querySelector('.js-name'); //using "querySelector"
let myLastName = document.querySelector('.js-lastName');
let mySubmitButton = document.querySelector('.js-submitButton');
let myCheckbox = document.getElementById('myCheck');// using "getElementById"
let myCommentInput = document.getElementById('comment-input')

myCheckbox.disabled = true;
mySubmitButton.disabled = true;

function checkCheckBox (){
  if(myNameInput.value.length > 0 && myLastName.value.length > 0){
    myCheckbox.disabled = false;
    mySubmitButton.disabled = false;
  }else{
    myCheckbox.disabled = true;
    mySubmitButton.disabled = true;
  } 
}// utilizo esta manera porq aqui tengo q escuchar dos input que tienen las mismas validaciones, por eso es mas facil, crear una funcion sola y despues ejecutarlas en dos metodos diferentes sin repetir el codigo de la funcion dos veces.
myNameInput.addEventListener('input', checkCheckBox); // if I add an eventListener to my variable, "I will follow every change of entry " and every time my input has a change when my page is refresh
myLastName.addEventListener('input', checkCheckBox);
checkCheckBox();

let myInputEmail = document.querySelector('.js-inputEmail');
myInputEmail.style.display = 'none'; // how to hide an element with js

myCheckbox.addEventListener('change', function(){ //aqui tengo q chequear una sola casilla
  if(myCheckbox.checked === true){ // how to check if a box is checked or not 
    myInputEmail.style.display = 'block';
    
  }else if(myCheckbox.disabled === false){
    myInputEmail.style.display = 'none';  
  }
});

async function fetchData(){
  let data;
  if (myCheckbox.disabled === false && myCheckbox.checked === true){ // && myInputEmail.value.length > 0
    data = {
      firstName: myNameInput.value,
      lastName: myLastName.value,
      comment: myCommentInput.value,
      isSubscribed: true,
      email: myInputEmail.value
    };
  }else {
    console.log("Checked the box and add your Email")
  }
  const options = {
    method: 'POST', // Método HTTP POST
    headers: {  
      'Content-Type': 'application/json'                          // Tipo de contenido de la solicitud (en este caso, JSON)
    },
    body: JSON.stringify(data)                                   // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
  };
  try{
    const requestTypicode = await fetch ("https://jsonplaceholder.typicode.com/users", options);
    if (!requestTypicode.ok) {
      throw new Error("could not fetch resource");
    }else{
      const data = await requestTypicode.json(); // very importan, always remenber the await, this give me de data in format object
      console.log(data);
      console.log(data.firstName)
      /* const displayData = document.createElement('div');
      displayData.innerHTML = `Name: ${data.firstName}`;
      document.body.append(displayData); */
      let msjSuccessfulSubmission = document.createElement('p')
      msjSuccessfulSubmission.className = 'css-mjsSuccessful';
      console.log(msjSuccessfulSubmission.className = 'css-mjsSuccessful')
      if (myCheckbox.checked === true){
        msjSuccessfulSubmission.innerHTML = `Thanks for your subscribe "${data.firstName}".` //when client doesn't subscribe, don't show the Subccessful Submission message
      }else {
        msjSuccessfulSubmission.innerHTML = `Add your Email and checked the box for subscribe.`
      }
      document.body.append(msjSuccessfulSubmission);
      
      setTimeout(()=>{
         myNameInput.value = '';
         myLastName.value = '';
         myCommentInput.value = ''; 
         myInputEmail.value = '';
         myInputEmail.style.display = 'none';
         myCheckbox.disabled = true;
         mySubmitButton.disabled = true;
        return msjSuccessfulSubmission.style.display = 'none';
      },3000);
    }
  }catch(err){
    console.error(err,'Oops something went wrong');
  };
}
  

  //JSONPlaceholder doesn't store data sent with POST requests, so you won't be able to recover that data with a subsequent GET request. If you need similar functionality in your application, consider using a real server or a suitable data storage service, such as "firebase".
  // Si el campo de entrada está vacío cuando se envía el formulario, tu código personalizado dentro del controlador de eventos de envío mostrará un mensaje en la consola, pero el comportamiento predeterminado del navegador de enviar el formulario aún ocurrirá.(esto pasa cuando no utilizo el e.preventDefault())
  
  /* try{ ejercicio solicitud "Get" en jsonplaceholder
    const getDataSent = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!getDataSent.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data2 = await getDataSent.json();
    console.log(data2);
    // Display the data in a new div on the page
    const displayData2 = document.createElement('p');
    displayData2.innerHTML = `Showing data received: ${data2[0].name}` ;
    document.body.append(displayData2); // Nombre: ${data2.firstName}, Apellido: ${data2.lastName}, Email: ${data2.email}

  }catch(err){
    console.error(err, 'Oopsss')
  }} */






/* Exacto, estás utilizando una REST API (en este caso, jsonplaceholder.typicode.com) para realizar una solicitud GET y obtener datos. 
Cuando realizas una solicitud HTTP utilizando fetch, obtienes una promesa como resultado. 
Utilizas async/await para manejar de manera asíncrona esta promesa y 'esperar' a que se resuelva antes de continuar con el código. tambien se pueden utilizar promesas y sus metodos .then y catch para manejar los resultados (async/await es mas legible y facil de utilizar)
El uso de async/await hace que tu código sea más legible y fácil de entender, ya que te permite escribir código asíncrono de manera 
similar al código síncrono tradicional. En lugar de utilizar callbacks o promesas encadenadas, puedes usar await para esperar a que 
una promesa se resuelva antes de continuar con la ejecución del código. Esto hace que tu código sea más claro y menos propenso a errores.
En resumen, estás utilizando async/await para manejar la promesa devuelta por la solicitud HTTP y así poder trabajar de manera más cómoda con los datos obtenidos de la REST API. */





/* let myCheckbox = document.getElementById('myCheck');
let myNameInput = document.querySelector('.js-name');

myCheckbox.disabled = true;

myNameInput.addEventListener('input', function() {
  const myName = myNameInput.value;
  if(myName === ""){
    console.log('Agrega un nombre');
    myCheckbox.disabled = true;
  } else {
    console.log('Nombre ingresado:', myName);
    myCheckbox.disabled = false;
  }
}); */
