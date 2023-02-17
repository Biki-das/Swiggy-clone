let restaurantsElm = document.querySelector("#root");
let restaurants = [];
let resLists = "";
let searchTerm = "";
let searchInput = document.querySelector("#search");
let sortInput = document.querySelector("#sort");
// <img src="https://img.icons8.com/ios-glyphs/30/null/hearts.png"/>
async function getRestuarants() {
  let res = await fetch("./Data.json");
  let data = await res.json();
  listRestuants(data);
}

function listRestuants(object) {
  restaurants.push(object);
  restaurants[0].map((res) => {
    let resCard = document.createElement("div");
    resCard.classList.add("res-cards");

    let resContainer = document.createElement("div");
    resContainer.classList.add("container");

    let resImg = document.createElement("img");
    resImg.src = res.restuarantImg;
    resImg.classList.add("res-img");

    let resName = document.createElement("h2");
    resName.classList.add("res-name");
    resName.textContent = res.restuarantName;

    let resStar = document.createElement("img");
    resStar.src = "../Assests/star.svg";
    resStar.classList.add("rating-star-img");

    let tagDiv = document.createElement("div");
    tagDiv.classList.add("tags");

    let resInfoDiv = document.createElement("div");
    resInfoDiv.classList.add("res-info");

    let ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    res.rating > 4.0
      ? (ratingDiv.style.background = "green")
      : (ratingDiv.style.background = "orange");

    let ratingText = document.createElement("p");
    ratingText.textContent = res.rating;

    let deliveryTime = document.createElement("p");
    deliveryTime.classList.add("delivery-time");
    deliveryTime.textContent = res.ETA + " mins ";

    restaurantsElm.appendChild(resCard);
    resCard.appendChild(resContainer);
    resContainer.appendChild(resImg);
    resContainer.appendChild(resName);
    resContainer.appendChild(tagDiv);
    resContainer.appendChild(resInfoDiv);
    resInfoDiv.appendChild(ratingDiv);
    resInfoDiv.appendChild(deliveryTime);

    res.Tags.map((tag) => {
      let tags = document.createElement("p");
      tags.textContent = tag;
      tagDiv.appendChild(tags);
    });

    ratingDiv.appendChild(ratingText);
    ratingDiv.appendChild(resStar);
    resLists = document.querySelectorAll(".res-cards");
  });

  //search functionality

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase().replace(/ /g, "");
    resLists.forEach((resList) => {
      let resNames = resList.children[0].children[1].textContent;
      let resTags = resList.children[0].children[2].textContent;
      if (resNames.toLowerCase().replace(/ /g, "").includes(searchTerm)) {
        resList.classList.remove("hide");
      } else {
        resList.classList.add("hide");
      }
    });
  });

  // sorting functionality

  sortInput.addEventListener("change", (e) => {
    let ratingList = [];
    let timeList = [];

    if (e.target.value === "") {
      resLists.forEach((resList) => {
        restaurantsElm.appendChild(resList);
      });
    }

    if (e.target.value === "Rating") {
      resLists.forEach((resList) => {
        ratingList.push(resList);
      });

      ratingList.sort(function (a, b) {
        let aa = Number(a.children[0].children[3].childNodes[0].textContent);
        let bb = Number(b.children[0].children[3].childNodes[0].textContent);
        return aa - bb;
      });

      ratingList.forEach((rlist) => {
        restaurantsElm.insertBefore(rlist, restaurantsElm.firstChild);
      });
    }

    if (e.target.value === "ETA") {
      resLists.forEach((resList) => {
        timeList.push(resList);
      });

      timeList.sort(function (a, b) {
        let aa = Number(
          a.children[0].children[3].children[1].textContent.substr(0, 2)
        );
        let bb = Number(
          b.children[0].children[3].children[1].textContent.substr(0, 2)
        );
        return bb - aa;
      });

      timeList.forEach((tlist) => {
        restaurantsElm.insertBefore(tlist, restaurantsElm.firstChild);
      });
    }
  });
}

getRestuarants();
