/* Create your app which should work like this:
    1. User has an input and button
    2. When a user types a search term and clicks the button an API request should be made to NYT using your api key
    3. Show all relevant posts on the page (HINT: the images require [`https://static01.nyt.com/`]in front of the url returned from NYT)
    4. When a user makes a new search, it should clear the previous results from the screen */

/* Algorithm
1_fetch the API NY time, make a Get request. 
2_Iterate the result.
3_display de result with DOM, title, body and img */    


async function fetchArticle(){
  const apiKey = 'EGA7ShrpG9u0bCNQRnSTuff9yWXLIGwZ';
  try{
    const inputSearch = document.querySelector('.js-input').value.toLowerCase();
    const data = await fetch (`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputSearch}&api-key=${apiKey}`);
    if (!data.ok){
      throw new Error('Source not found')
    }else{
      const result = await data.json();
      console.log(result.response.docs);             // array with all the article information
      
      const container = document.querySelector('.js-container') //A) I bring my container and I start to put all the small div, with the information
      container.innerHTML = ''; // I have to remenber that I just bring this container in the line before, but I didn`t use, so after a fetch the articles I clean the container and then I use de container to fill it with the new articles. 
      
      result.response.docs.forEach(element =>{
        const divElement = document.createElement('div')//B) Container for each element
        divElement.className = 'containerElement';      // className to put same css later
        container.appendChild(divElement);
        
        const titleElement = document.createElement('h3') //1) our first element inside of our containerElement 
        titleElement.innerHTML = element.abstract;
        divElement.appendChild(titleElement);
        
        const bodyElement = document.createElement('p') // 2)
        bodyElement.innerHTML = element.lead_paragraph;
        divElement.appendChild(bodyElement);
        
        //console.log(element.multimedia[0].url); I get just the url
        if(element.multimedia && element.multimedia.length > 0){ // 3)
          const imgElement = document.createElement('img')
        imgElement.src = `https://static01.nyt.com/${element.multimedia[0].url}` // cuando utilizo src, inmediatamente le tengo que dar un camino o una url en donde pueda encontrar esa imagen, por lo tanto le doy el http q me da el ejercicio seguido del "resources" de donde especificamente se encontraria mi imagen en el array, podemos ir probando el lugar con console,log y agregar el lugar especifico con un placeholder.
        divElement.appendChild(imgElement);
        imgElement.className = 'css-img';
        }
      });
    }

  }catch(err){
    console.error(err);
  }
}