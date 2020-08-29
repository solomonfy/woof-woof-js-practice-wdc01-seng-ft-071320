const url = "http://localhost:3000/pups/";

document.addEventListener("DOMContentLoaded", () => {
  const dogDiv = document.getElementById("dog-bar");
  const divDogInfo = document.getElementById("dog-info");

  function fetchDogs() {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => getDogs(data));
  }
  fetchDogs();

  // iterate over the array

  function getDogs(dogs) {
    for (const dog of dogs) {
      displayDog(dog);
    }
  }

  function displayDog(dog) {
    let span = document.createElement("span");
    span.innerText = dog.name;
    dogDiv.append(span);

    span.addEventListener("click", () => {
      divDogInfo.innerText = ""; // everytime there is a new click, clear the existing one

      let image = document.createElement("img");
      image.src = dog.image;

      let h2 = document.createElement("h2");
      h2.innerText = dog.name;

      let Btn = document.createElement("BUTTON");
      dog.isGoodDog === true
        ? (Btn.innerText = "Good Dog")
        : (Btn.innerText = "Bad Dog");

      Btn.addEventListener("click", () => {
        fetch(url + dog.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            isGoodDog: !dog.isGoodDog,
          }),
        })
          .then((resp) => resp.json())
          .then((updatedDog) => {
            updatedDog.isGoodDog
              ? (Btn.innerText = "Good Dog")
              : (Btn.innerText = "Bad Dog");
          });
      });
      divDogInfo.append(image, h2, Btn);
    });
  }

  // filter good dogs
  const dogFilterBtn = document.querySelector("#good-dog-filter");

  dogFilterBtn.addEventListener("click", () => {
    event.preventDefault();
    divDogInfo.innerText = "";

    if (dogFilterBtn.innerText === "Filter good dogs: OFF") {
      // if (dogFilterBtn.innerText.includes("OFF"))
      dogFilterBtn.innerText = "Filter good dogs: ON";
    } else dogFilterBtn.innerText = "Filter good dogs: OFF";
  });

  //
});
