/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const itemsPerPage = 9;
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      student = list[i];

      const li = document.createElement("li");
      li.className = "student-tem cf";
      studentList.appendChild(li);

      const divOne = document.createElement("div");
      divOne.className = "student-details";
      li.appendChild(divOne);

      const img = document.createElement("img");
      img.className = "avatar";
      img.src = student.picture.large;
      img.alt = "Profile Picture";
      divOne.appendChild(img);

      const h3 = document.createElement("h3");
      h3.innerHTML = `${student.name.first} ${student.name.last}`;
      divOne.appendChild(h3);

      const spanOne = document.createElement("span");
      spanOne.className = "email";
      spanOne.innerHTML = student.email;
      divOne.appendChild(spanOne);

      const divTwo = document.createElement("div");
      divTwo.className = "joined-details";
      li.appendChild(divTwo);

      const spanTwo = document.createElement("span");
      spanTwo.className = "date";
      spanTwo.innerHTML = `Joined ${student.registered.date}`;
      divTwo.appendChild(spanTwo);

      li.insertBefore(divOne, divTwo);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const itemsPerPage = 9;
  const store_numbers = Math.ceil(list.length / itemsPerPage); // Math.ceil - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
  const ul = document.querySelector(".link-list");
  ul.innerHTML = "";
  for (let i = 0; i < store_numbers; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);

    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = i + 1;
    li.appendChild(button);
    if (i === 0) {
      button.className = "active";
    }

    ul.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const allButtons = ul.querySelectorAll("button");
        for (let i = 0; i < allButtons.length; i++) {
          allButtons[i].className = "";
        }

        e.target.className = "active";
        showPage(list, e.target.textContent);
      }
    });
  }
}

// Call functions
showPage(data, 1);
addPagination(data);

/**
 * create searchBar
 */
const searchLabel = document.createElement("label");
searchLabel.for = "search";
searchLabel.className = "student-search";

const searchSpan = document.createElement("span");
searchSpan.innerHTML = "Search by name";
searchLabel.appendChild(searchSpan);

const searchInput = document.createElement("input");
searchInput.id = "search";
searchInput.setAttribute("aria-placeholder", "Search by name");
searchLabel.appendChild(searchInput);

const searchButton = document.createElement("button");
searchButton.type = "button";
searchButton.innerHTML = '<img src="img/icn-search.svg" alt="Search icon">';
searchLabel.appendChild(searchButton);

const header = document.querySelector(".header");
header.appendChild(searchLabel);

// Create a function to filter the list based on the search query
function filterList(searchQuery) {
  const filteredList = data.filter((student) => {
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    if (fullName.includes(searchQuery.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });
  return filteredList;
}

// Create a function to handle search and pagination
function handleSearchAndPagination() {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", () => {
    const CurrentValue = searchInput.value;
    const filteredList = filterList(CurrentValue);
    showPage(filteredList, 1);
    addPagination(filteredList);
    if (filteredList.length === 0) {
      alert("No results found"); // No results found
    }
  });
}

// Call the handleSearchAndPagination function
handleSearchAndPagination();
