import { fetchAllDepartments } from '../modules/api.js';

let allDepartments = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchAllDepartments().then(data => {
    allDepartments = data;
    const sortedDepartments = sortDepartmentsAlphabetically(allDepartments);
    renderDepartments(sortedDepartments);
    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearch);
  });
});

function sortDepartmentsAlphabetically(departments) {
  return departments.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    //A viene antes que b , es para que este ordenado alfabeticamente
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function renderDepartments(departments) {
  const container = document.getElementById('departments-container');
  container.innerHTML = ''; 

  departments.forEach(department => {
    const cityCapital = department.cityCapital;

    //buscamos el nombre de la capital y lo guardamos en cityCapitalName, si no existe, lo dejamos en 'No disponible'
    const cityCapitalName = cityCapital && cityCapital.name ? cityCapital.name : 'No disponible';

    const card = `
      <div class="col-md-4 d-flex">
        <div class="card mt-4">
          <img src="../assets/img/img-colombia.webp" class="card-img-top bg-bordo" alt="imagen">
          <div class="card-body">
            <h5 class="card-title">${department.name}</h5>
            <p class="card-text">Población: ${department.population || 'No disponible'}</p>
            <a href="/pages/details.html?id=${department.id}" class="btn btn-primary">Detalles</a>
          </div>
        </div>
      </div>`;
    container.innerHTML += card;
  });
}

function handleSearch() {
  //this es como activar la funcion , y tolowercase metodo.
  const searchTerm = this.value.toLowerCase();
  //creamos un nuevo array con filter
  //includes para buscar coincidencias
  const filteredDepartments = allDepartments.filter(department => 
    department.name.toLowerCase().includes(searchTerm) ||
    (department.cityCapital && department.cityCapital.name.toLowerCase().includes(searchTerm))
  );

  //llamo a la funcion y le hago el sort y e pintado arreglado alafaveticamente
  const sortedFilteredDepartments = sortDepartmentsAlphabetically(filteredDepartments);
  renderDepartments(sortedFilteredDepartments);
}
