async function fetchArticle() {
  const apiKey = "EGA7ShrpG9u0bCNQRnSTuff9yWXLIGwZ";

  try {
    const inputSearch = document.getElementById("js-inputSearch").value.toLowerCase();
    const requestNY = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputSearch}&api-key=${apiKey}`
    );
    if (!requestNY.ok) {
      throw new Error("could not fetch resource");
    } else {
      const datum = await requestNY.json();                            // If you don't use await with requestNY.json(), you'll get a promise instead of the resulting JavaScript object. Without await, you would be working with the promise itself rather than the resolved value of the promise.
      console.log(datum);
      console.log(datum.response.docs);                               // 'resolve: an array of 10'(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      console.log(datum.response.docs[0].multimedia[0].url);
      

      let container = document.querySelector(".js-container");
      container.innerHTML = '';                                       //is used to clean up the contents of the container before adding new items after each search.

      const title = document.createElement("h3");
      title.innerHTML = datum.response.docs[0].lead_paragraph;
      container.appendChild(title);

      const body = document.createElement("p");
      body.textContent = datum.response.docs[0].abstract;
      container.appendChild(body);

      const imgArticle = document.createElement("img");
      imgArticle.src = `https://static01.nyt.com/${datum.response.docs[0].multimedia[0].url}`;
      imgArticle.className = "css-img";
      container.appendChild(imgArticle);
    }
  } catch (err) {
    console.error(err);
  }
}
