const accesskey = "fzwaE59O8ReyY2kXYtkaLBA4_P8YfapRNqYJ_0W4rLU";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  results.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = image.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(imgElement);
    searchResult.appendChild(imageLink);
  });

  // Show the "Show More" button if there are more results
  if (results.length > 0) {
    showMoreBtn.style.display = "block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

function loadMoreImages() {
  page++;
  searchImages();
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear previous results
  searchImages();
});

showMoreBtn.addEventListener("click", loadMoreImages);
