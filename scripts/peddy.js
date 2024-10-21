let allPets = [];
let currentSortOrder = "desc";

// fetch category data
const loadData = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await res.json();
    displayCategory(data.categories);
  } catch (error) {
    console.error("Error is found for :", error);
  }
};

// function for display category button
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("adopt-category-container");
  categories.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn-${pet.id}" onclick="displayPetBtCategory('${pet.category}','${pet.id}')" class="flex lg:gap-4 p-3 lg:p-6 rounded-2xl border px-10  lg:px-20 py:3 lg:py-6 items-center justify-center btn-category">
            <img src=${pet.category_icon} alt="" />
            <h4 class="font-bold text-2xl">${pet.category}</h4>
        </button>
    `;
    categoryContainer.appendChild(div);
  });
};

// get all pet data
const loadAllData = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();
    allPets = data.pets;
    displayAllPets(allPets);
  } catch (error) {
    console.error("Error is found for :", error);
  }
};

// display all pet
const displayAllPets = (pets) => {
  const petDetails = document.getElementById("pet-details");
  petDetails.innerText = "";

  if (pets.length == 0) {
    petDetails.classList.remove("grid");
    petDetails.innerHTML = `
    <div class="border bg-[#F8F8F8] py-24 rounded-3xl flex flex-col justify-center items-center space-y-3">
        <img src="images/error.webp" alt="" />
        <h2 class="text-4xl font-black">No Information Available</h2>
        <p class="text-center">
          There is no information available right now. We are working on it.
          Hopefully <br class="hidden lg:block" />
          Birds will come to our shop as soon as possible.
        </p>
      </div>
    `;
    return;
  } else {
    petDetails.classList.add("grid");
  }
  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="border rounded-xl p-5">
        <div class="space-y-2">
          <img class="rounded-lg mb-6" src=${
            pet?.image ?? "Not Available"
          } alt="" />
          <h3 class="font-bold text-xl">${pet?.pet_name ?? "Not Available"}</h3>
          <p>
            <i class="fa-solid fa-border-all"></i> Breed: ${
              pet?.breed ?? "Not Available"
            }
          </p>
          <p><i class="fa-regular fa-calendar"></i> Birth: ${
            pet?.date_of_birth ?? "Not Available"
          }</p>
          <p><i class="fa-solid fa-mercury"></i> Gender: ${
            pet?.gender ?? "Not Available"
          }</p>
          <p class="mb-4">
            <i class="fa-solid fa-dollar-sign"></i> Price: ${
              pet?.price ?? "Not Available"
            }$
          </p>
          <hr />
        </div>
        <div class="flex gap-4 mt-4 justify-between">
          <button onclick="showLikedPet('${pet.image}')"
            class="rounded-lg text-primary px-2 lg:px-4 py-2 border text-lg font-bold"
          >
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button onclick="countdownButton(this)"
            class="rounded-lg text-primary px-2 lg:px-4 py-2 border text-lg font-bold"
          >
            Adopt
          </button>
          <button onclick="loadPetIdData('${pet.petId}')"
            class="rounded-lg text-primary px-2 lg:px-4 py-2 border text-lg font-bold">
            Details
          </button>
        </div>
      </div>
    `;
    petDetails.appendChild(div);
  });
};

// function for get id of pets
const loadPetIdData = async (petId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    );
    const data = await res.json();
    showPetDetails(data.petData);
  } catch (error) {
    console.error("Error is found for :", error);
  }
};

// Function for show details button
const showPetDetails = (pet) => {
  const modal = document.getElementById("modal-content");
  modal.innerHTML = `
        <img class="w-full rounded-lg" src=${
          pet?.image ?? "Not Available"
        } alt="" />
            <div class="p-5 space-y-2">
              <h3 class="font-bold text-2xl"> ${
                pet?.pet_name ?? "Not Available"
              }</h3>
              <div class="grid grid-cols-2 gap-3">
                <p>
                  <i class="fa-solid fa-border-all"></i> Breed: ${
                    pet?.breed ?? "Not Available"
                  }
                </p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${
                  pet?.date_of_birth ?? "Not Available"
                }</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${
                  pet?.gender ?? "Not Available"
                }</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
                  pet?.price ?? "Not Available"
                }$</p>
                <p class="mb-4">
                  <i class="fa-solid fa-mercury"></i> Vaccinated :
                  ${pet?.vaccinated_status ?? "Not Available"}
                </p>
              </div>
              <hr />
              <h2 class="font-semibold">Details Information</h2>
              <p>
                ${pet?.pet_details ?? "Not Available"}
              </p>
  `;
  document.getElementById("petModal").showModal();
};

// function for liked pet images
const showLikedPet = (petImages) => {
  const showPetImage = document.getElementById("display-liked-image");
  const div = document.createElement("div");
  div.innerHTML = `
      <img class="rounded-lg" src=${petImages} alt="petImage" />
      `;
  showPetImage.appendChild(div);
};

// countdown modal functionality for adopt button
const countdownButton = (button) => {
  const countElement = document.getElementById("countdown");
  let countdown = 3;
  document.getElementById("count").showModal();
  countElement.innerText = countdown;
  let countInterval = setInterval(() => {
    countdown--;
    countElement.innerText = countdown;

    if (countdown <= 0) {
      clearInterval(countInterval);

      document.getElementById("count").close();

      button.innerText = "Adopted";
      button.classList.add("disabled", "opacity-50");
      button.disabled = true;
    }
  }, 1000);
};

// Display cat by category
const displayPetBtCategory = async (categoryName, id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();

  const petDetails = document.getElementById("pet-details");
  petDetails.innerText = "";

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  setTimeout(() => {
    spinner.classList.add("hidden");
    allPets = data.data;
    displayAllPets(allPets);
  }, 2000);

  removeClass();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active", "border-primary");
};

const removeClass = () => {
  const button = document.getElementsByClassName("btn-category");
  for (let btn of button) {
    btn.classList.remove("active", "border-primary");
  }
};

// function for sort by price
const sortPetsByPrice = () => {
  if (allPets.length === 0) return;

  const sortButton = document.getElementById("sort-price-btn");
  const sortIcon = sortButton.querySelector("i");

  if (currentSortOrder === "desc") {
    allPets.sort((a, b) => Number(b.price) - Number(a.price));
    currentSortOrder = "asc";
    sortIcon.classList.remove("fa-arrow-down");
    sortIcon.classList.add("fa-arrow-up");
  } else {
    allPets.sort((a, b) => Number(a.price) - Number(b.price));
    currentSortOrder = "desc";
    sortIcon.classList.remove("fa-arrow-up");
    sortIcon.classList.add("fa-arrow-down");
  }
  displayAllPets(allPets);
};

loadData();
loadAllData();
