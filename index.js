
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
}
myNameInput.addEventListener('input', checkCheckBox); // if I add an eventListener to my variable, I will follow every change of entry and every time my input has a change when my page is refresh
myLastName.addEventListener('input', checkCheckBox);
checkCheckBox();

let myInputEmail = document.querySelector('.js-inputEmail');
myInputEmail.style.display = 'none'; // how to hide an element with js

myCheckbox.addEventListener('change', function(){
  if(myCheckbox.checked === true){ // how to check if a box is checked or not 
    myInputEmail.style.display = 'block';
    
  }else if(myCheckbox.disabled === false){
    myInputEmail.style.display = 'none';  
  }
});


async function fetchData (){
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
      const data = await requestTypicode.json();
      console.log(data);
      const objetoData = data.firstName;
      console.log(objetoData)
      
      let msjSuccessfulSubmission = document.createElement('p')
      if (myCheckbox.checked === true){
        msjSuccessfulSubmission.innerHTML = `Thanks for your subscribe "${data.firstName}".` //when client doesn't subscribe, don't show the Subccessful Submission message
      }else {
        msjSuccessfulSubmission.innerHTML = `Add your Email and checked the box for subscribe.`
      }
      document.body.append(msjSuccessfulSubmission);
      setTimeout(()=>{
         //myCheckbox;
         myNameInput.value = '';
         myLastName.value = '';
         myCommentInput.value = ''; 
         myInputEmail.value = '';
         myInputEmail.style.display = 'none';
         myCheckbox.disabled = true;
         mySubmitButton.disabled = true;
        return msjSuccessfulSubmission.style.display = 'none';
      },2000);
    }
  }catch(err){
    console.error(err,'Oops something went wrong');
  };
}






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
