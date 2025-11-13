document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario");
  const buscar = document.querySelector("#buscar");
  const resultado = document.querySelector("#resultado");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const texto = buscar.value.trim();

    if (texto === "") {
      resultado.innerHTML = "<p>Por favor, escribe un nombre de equipo.</p>";
      return;
    }

    resultado.innerHTML = "<p>Buscando equipo...</p>";

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${texto}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.teams) {
          resultado.innerHTML = "<p>No se encontró ningún equipo con ese nombre.</p>";
          return;
        }

        resultado.innerHTML = "";
        data.teams.forEach(equipo => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <img src="${equipo.strBadge}" alt="Escudo de ${equipo.strTeam}" />
            <h3>${equipo.strTeam}</h3>
            <p><strong>País:</strong> ${equipo.strCountry}</p>
            <p><strong>Estadio:</strong> ${equipo.strStadium}</p>
            <p><strong>Año:</strong> ${equipo.intFormedYear}</p>
            <p>${equipo.strDescriptionES?.slice(0, 100) || "Sin descripción disponible."}...</p>
          `;
          resultado.appendChild(card);
        });
      })
      .catch(error => {
        resultado.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});