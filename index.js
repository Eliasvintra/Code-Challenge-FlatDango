// Your code here
// create a variable to store my resource
const base_url = "http://localhost:3000/films";
const movie_list = document.getElementById("films"); // variable to store id-films

document.addEventListener("DOMContentLoaded", () => {
  const delete_item = document.getElementsByClassName("film item");
  delete_item[0].remove(); //removing the default li so as to create my own li
  get_movie(base_url); //calling the get_movie function after html page loads
});

//fetching the movies in db.json
function get_movie(base_url) {
  fetch(base_url)
    .then((res) => res.json())
    .then((movies) => {
      movies.forEach((movie) => {
        display_movie(movie); //pass the individual movie received to display_movie function
      });
    });
}

// display the movie titles via li
function display_movie(movie) {
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  //add content to the created li
  li.textContent = `${movie.title.toUpperCase()}`;
  //append li to the movie_list
  movie_list.appendChild(li);
  //call add_click_event function
  add_click_event();
}

//adding the click event and looping through 
function add_click_event() {
  let children = movie_list.children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    child.addEventListener("click", () => {
      fetch(`${base_url}/${i + 1}`)
        .then((res) => res.json())
        .then((movie) => {
          const ticket_btn = document.getElementById("buy-ticket");
          ticket_btn.textContent = "Purchase Ticket!"; //add text to my button

          movie_details(movie);
        });
    });
  }
}

//posting movie details
function movie_details(childMovie) {
  const poster_preview = document.getElementById("poster");
  poster_preview.src = `${childMovie.poster}`;

  const movie_title = document.querySelector("#title");
  movie_title.textContent = `${childMovie.title}`;

  const movie_time = document.querySelector("#runtime");
  movie_time.textContent = `${childMovie.runtime} minutes`;

  const movie_description = document.querySelector("#film-info");
  movie_description.textContent = `${childMovie.description}`;

  const show_time = document.querySelector("#showtime");
  show_time.textContent = `${childMovie.showtime}`;

  const my_tickets = document.querySelector("#ticket-num");
  my_tickets.textContent = `${childMovie.capacity - childMovie.tickets_sold}`; //getting the remaining tickets i subtract sold tickets from total capacity
}

//sold out tickets
const btn = document.getElementById("buy-ticket");

btn.addEventListener("click", (event) => {
  event.preventDefault();

  let ticket_bal = parseInt(document.querySelector("#ticket-num").textContent);

  if (ticket_bal > 0) {
    ticket_bal -= 1;
    document.querySelector("#ticket-num").textContent = ticket_bal;
  } else if (parseInt(ticket_bal, 10) === 0) {
    btn.textContent = "SOLD OUT!";
  }
});
