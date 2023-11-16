const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");

let countries = [];
const getData = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) {
      renderError(`Something went wrong:${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    countries = data;
    renderCountry(data[0])
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getData);
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchDiv.innerHTML = "";
  if (e.target.value) {
    let searchCountry = countries.filter((item) =>
      item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(searchCountry);

    if (searchCountry.length == 1) {
      renderCountry(searchCountry[0]);
    } else {
      searchCountry.forEach((item) => createElem(item.name.common));
    }
  }
});

function createElem(item) {
  let searchElem = `<span class="list border border-2 rounded-2 p-1" role="button">${item}</span>`;
searchDiv.innerHTML +=searchElem;
}
searchDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("list")) {
    console.log(e.target.innerText);
    searchInput.value = e.target.innerText;
    searchDiv.innerHTML = "";
    const country = countries.filter(
      (item) => item.name.common == e.target.innerText
    );
    renderCountry(country[0]);
  }
});

const renderCountry = (country) => {
  console.log(country);
  const {
    name: { common },
    capital,
    region,
    flags: { svg },
    languages,
    currencies,
    population,
    borders,
    maps,
  } = country;
  console.log(maps.googleMaps);
  const countries = document.querySelector(".countries");

  countries.innerHTML = `
  <div class="card shadow-lg" style="width: 22rem">
  <img src="${svg}" class="card-img-top shadow" alt="..." />
  <div >
    <h5 class="p-2 text-center">${common}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-landmark"></i>
      <span class="fw-bold"> Capitals:</span> ${capital}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-comments"></i>
      <span class="fw-bold"> Languages:</span> ${Object.values(languages)}
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-money-bill-wave"></i>
      <span class="fw-bold"> Currencies:</span> ${
        Object.values(currencies)[0].name
      },
      ${Object.values(currencies)[0].symbol}
    </li>
    <li class="list-group-item">
    <i class="fa-solid fa-people-group"></i></i>
    <span class="fw-bold"> Population:</span> ${population.toLocaleString(
      "en-US"
    )}
  </li>
    <li class="list-group-item">
    <i class="fa-sharp fa-solid fa-road-barrier"></i>
    <span class="fw-bold"> Borders:</span>  ${borders ? borders : "None"}
  </li>
  </li>
  <li class="list-group-item">
    <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=${
      maps.googleMaps
    } target='_blank'> Go to google map</a> </li>
  </ul>
</div>
  `;
};
document.addEventListener("keydown", (e) => {
if (e.keyCode === 123) {
    e.preventDefault()
  }
});
