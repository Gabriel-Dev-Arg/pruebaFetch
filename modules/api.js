export function fetchAllDepartments() {
  const apiUrl = 'https://api-colombia.com/api/v1/Department';
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}
// scripts/modules/api.js

export function fetchDepartmentById(departmentId) {
  const apiUrl = `https://api-colombia.com/api/v1/Department/${departmentId}`;
  return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
          console.error('Error en la llamada a la API del departamento:', error);
          return null;
      });
}

export function fetchCiudadesById(departmentId) {
  const apiUrl = `https://api-colombia.com/api/v1/Department/${departmentId}/cities`;
  return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
          console.error('Error en la llamada a la API de ciudades:', error);
          return null;
      });
}

export function fetchAreasNaturalesById(departmentId) {
  const apiUrl = `https://api-colombia.com/api/v1/Department/${departmentId}/naturalareas`;
  return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
          console.error('Error en la llamada a la API de áreas naturales:', error);
          return null;
      });
}


export function fetchInvasiveSpecies() {
  const apiUrl = 'https://api-colombia.com/api/v1/InvasiveSpecie';
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching invasive species:', error);
      return [];
    });
}
