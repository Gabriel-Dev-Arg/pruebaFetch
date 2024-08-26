import { fetchInvasiveSpecies } from '../modules/api.js';  

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('species-table');


  fetchInvasiveSpecies()
    .then(data => {
      data.forEach(species => {
        let rowClass = '';
        if (species.riskLevel === 1) rowClass = 'table-primary';
        else if (species.riskLevel === 2) rowClass = 'table-success';

        const row = `
      <tr class="${rowClass}">
        <td>${species.name}</td>
        <td>${species.scientificName}</td>
        <td>${species.impact}</td>
        <td>${species.manage}</td>
        <td>${species.riskLevel}</td>
        <td><img src="${species.urlImage}" alt="${species.name}" class="species-img"></td>
      </tr>`;
        tableBody.innerHTML += row;
      });
    });
});
