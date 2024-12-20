const url = 'http://localhost:3000/movies';

window.addEventListener('load', fetchData);

// HTML KODEN som är kopplad till color behöver ändras, Det här styr färgen i hennes kod men vi har price istället som 4e värde i databasen. Vi får fundera på den ex rad 15
function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((movies) => {
      if (movies.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        movies.forEach((movie) => {
          html += `
        <li
          class="bg-${movie.price}-200 basis-1/4 text-${movie.price}-900 p-2 rounded-md border-2 border-${movie.price}-400 flex flex-col justify-between">
          <h3>Title: ${movie.title}</h3>
          <p>Release date: ${movie.releaseDate}</p>
          <p>Director: ${movie.director}</p>
          <p>Price: ${movie.price}</p>
          <div>
            <button
              class="border border-${movie.price}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentMovie(${movie.id})">
              Update
            </button>
            <button class="border border-${movie.price}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteMovie(${movie.id})">
              Delete
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        listContainer.insertAdjacentHTML('beforeend', html);
      }
    });
}

function setCurrentMovie(id) {
  console.log('current', id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((movie) => {
      console.log(movie);
      movieForm.title.value = movie.title;
      movieForm.releaseDate.value = movie.releaseDate;
      movieForm.price.value = movie.price;
      movieForm.director.value = movie.director;

      localStorage.setItem('currentId', movie.id);
    });
}

function deleteMovie(id) {
  console.log('delete', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
}

movieForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverMovieObject = {
    title: '',
    releaseDate: '',
    director: '',
    price: ''
  };
  serverMovieObject.title = movieForm.title.value;
  serverMovieObject.releaseDate = movieForm.releaseDate.value;
  serverMovieObject.director = movieForm.director.value;
  serverMovieObject.price = movieForm.price.value;

  const id = localStorage.getItem('currentId');
  if (id) {
    serverMovieObject.id = id;
  }

  const request = new Request(url, {
    method: serverMovieObject.id ? 'PUT' : 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(serverMovieObject)
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem('currentId');
    movieForm.reset();
  });
}
