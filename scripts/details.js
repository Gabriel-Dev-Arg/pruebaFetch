//importacion 
import { fetchDepartmentById, fetchCiudadesById, fetchAreasNaturalesById } from '../modules/api.js';

//creacion parametros url
const urlParams = new URLSearchParams(window.location.search);
const departmentId = urlParams.get('id');
let departmentData = null;


//usamos la api
fetchDepartmentById(departmentId)
    .then(department => {
        if (!department) {
            console.error("No se encontraron datos para este departamento.");
            return;
        }
        departmentData = department;
        renderCheckboxes();
        renderDepartmentInfo();
        //si esta chequeado renderiza las ciudades
        if (document.getElementById('Ciudades-checkbox').checked) {
            fetchCiudadesById(departmentId).then(ciudades => {
                if (ciudades) renderCiudades(ciudades);
            });
        }
        //si esta chequeado renderiza las areas
        if (document.getElementById('Áreas Naturales-checkbox').checked) {
            //utilizacion del metodo then
            fetchAreasNaturalesById(departmentId).then(areas => {console.log(areas[0].naturalAreas); renderAreasNaturales(areas[0].naturalAreas);
            });
        }
    });

function renderCheckboxes() {
    const checkboxContainer = document.getElementById('checkbox-container');
    const fields = ['Ciudades', 'Áreas Naturales',];

    fields.forEach(field => {
        const checkbox = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${field}" id="${field}-checkbox" checked>
                <label class="form-check-label" for="${field}-checkbox">
                    ${field}
                </label>
            </div>
        `;
        checkboxContainer.innerHTML += checkbox;
    });

    checkboxContainer.addEventListener('change', () => {
        renderDepartmentInfo();
        if (document.getElementById('Áreas Naturales-checkbox') && document.getElementById('Áreas Naturales-checkbox').checked) {
            fetchAreasNaturalesById(departmentId).then(areas => {
        renderAreasNaturales(areas[0].naturalAreas);
            });
        } else {
            document.getElementById('areas-container').innerHTML = '';
        }

        if (document.getElementById('Ciudades-checkbox') && document.getElementById('Ciudades-checkbox').checked) {
            fetchCiudadesById(departmentId).then(ciudades => {
            renderCiudades(ciudades);
            });
        } else {
            document.getElementById('ciudades-container').innerHTML = '';
        }
    });
}

function renderDepartmentInfo() {
    if (!departmentData) return;
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';
    const departmentHtml = `
        <div class="text-center mb-4">
            <img class="img-fluid rounded" src="../assets/img/casa-colombia.jpg" alt="${departmentData.name}" style="max-height: 300px; object-fit: cover;">
        </div>
        <h2 class="text-primary mb-3">${departmentData.name || 'N/A'}</h2>
        <div class="fs-6">
            <p><strong>Descripción:</strong> ${departmentData.description || 'N/A'}</p>
            <p><strong>Población:</strong> ${departmentData.population || 'N/A'}</p>
            <p><strong>Superficie:</strong> ${departmentData.surface || 'N/A'} KM²</p>
        </div>
    `;
    detailsContainer.innerHTML = departmentHtml;


    const fields = ['description'];
    fields.forEach(field => {
        const checkbox = document.getElementById(`${field}-checkbox`);
        if (checkbox && checkbox.checked) {
            const value = departmentData[field] || 'N/A';
            detailsContainer.innerHTML += `<p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${value}</p>`;
        }
    });
}

function renderCiudades(ciudades) {
    const ciudadesContainer = document.getElementById('ciudades-container');
    if (!ciudadesContainer) {
        console.error("El contenedor de ciudades no está disponible.");
        return;
    }
    ciudadesContainer.innerHTML = '<h3 class="mb-4 text-center">Ciudades</h3>';
    if (ciudades && ciudades.length > 0) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row row-cols-2 row-cols-md-4 g-4';
    const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];
        ciudades.forEach((ciudad, index) => {
            const colorClass = colors[index % colors.length];
            const cardHtml = `
                <div class="col">
                    <div class="card h-100 ${colorClass} text-white shadow">
                        <div class="card-body d-flex align-items-center justify-content-center">
                            <h6 class="card-title text-center mb-0">${ciudad.name}</h6>
                        </div>
                    </div>
                </div>
            `;
            rowDiv.innerHTML += cardHtml;
        });
        ciudadesContainer.appendChild(rowDiv);
    }
}

function renderAreasNaturales(areas) {
    const areasContainer = document.getElementById('areas-container');
    if (!areasContainer) {
        console.error("El contenedor de áreas naturales no está disponible.");
        return;
    }

    areasContainer.innerHTML = '<h3 class="mb-4 text-center">Áreas Naturales</h3>';

    if (areas && areas.length > 0) {
        const uniqueAreas = new Set();
        areas.forEach(area => {
            uniqueAreas.add(area.name);
        });

        const rowDiv = document.createElement('div');
        rowDiv.className = 'row row-cols-2 row-cols-md-4 g-4';
        const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];

        Array.from(uniqueAreas).forEach((name, index) => {
            const colorClass = colors[index % colors.length];
            const area = areas.find(area => area.name === name);
            const cardHtml = `
                <div class="col">
                    <div class="card h-100 ${colorClass} text-white shadow">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                            <h5 class="card-title mb-2">${name}</h5>
                            <p class="card-text">Área: ${parseFloat(area.landArea).toFixed(2)} KM²</p>
                        </div>
                    </div>
                </div>
            `;
            rowDiv.innerHTML += cardHtml;
        });

        areasContainer.appendChild(rowDiv);
    }
}

