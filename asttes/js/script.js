$(document).ready(function() {
  // Clave API
  var apiKey = 'YOUR_API_KEY';

  // Función para manejar el evento submit del formulario
  $('#searchForm').submit(function(event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener el ID del superhéroe del campo de entrada
    var heroId = $('#heroId').val();

    // Función para obtener la información del superhéroe
    function fetchHeroInfo(heroId) {
      // Mostrar un mensaje de "Iniciando búsqueda..." en la consola
      console.log('Iniciando búsqueda del superhéroe con ID:', heroId);

      // Construcción de la URL de la solicitud AJAX
      var apiUrl = 'https://superheroapi.com/api/' + apiKey + '/' + heroId;

      // Realizar una solicitud AJAX GET a la API
      $.ajax({
        url: apiUrl,
        method: 'GET',

        // Función de éxito para manejar la respuesta de la API
        success: function(response) {
          // Mostrar la respuesta en la consola
          console.log('Respuesta recibida:', response);

          // Verificar si la respuesta es válida antes de mostrar la información
          if (response.response === 'success') {
            displayHeroInfo(response);
          } else {
            // Mostrar un mensaje de error en la consola y una alerta al usuario
            console.error('Error al buscar el superhéroe:', response.error);
            alert('Error al buscar el superhéroe. Por favor, inténtalo de nuevo.');
          }
        },

        // Función de error para manejar errores en la solicitud
        error: function(xhr, status, error) {
          // Mostrar el error en la consola
          console.error('Error al buscar el superhéroe:', error);

          // Mostrar un mensaje de error al usuario
          alert('Error al buscar el superhéroe. Por favor, inténtalo de nuevo.');
        }
      });
    }

    // Llamar a la función para obtener la información del superhéroe
    fetchHeroInfo(heroId);
  });

  // Función para mostrar la información del superhéroe
  function displayHeroInfo(hero) {
    // Mostrar la información del superhéroe en la consola
    console.log('Mostrando información del superhéroe:', hero);

    // Construir el contenido HTML con la información del superhéroe
    var heroInfo = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${hero.name}</h5>
          <p class="card-text">Inteligencia: ${hero.powerstats.intelligence}</p>
          <p class="card-text">Fuerza: ${hero.powerstats.strength}</p>
          <p class="card-text">Velocidad: ${hero.powerstats.speed}</p>
          <p class="card-text">Durabilidad: ${hero.powerstats.durability}</p>
          <p class="card-text">Poder: ${hero.powerstats.power}</p>
          <p class="card-text">Combate: ${hero.powerstats.combat}</p>
        </div>
      </div>
    `;

    // Insertar el contenido HTML en el elemento #heroInfo
    $('#heroInfo').html(heroInfo);

    // Crear un gráfico de CanvasJS con las estadísticas del superhéroe
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Estadísticas del Superhéroe"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00'%'",
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: parseInt(hero.powerstats.intelligence), label: "Inteligencia" },
          { y: parseInt(hero.powerstats.strength), label: "Fuerza" },
          { y: parseInt(hero.powerstats.speed), label: "Velocidad" },
          { y: parseInt(hero.powerstats.durability), label: "Durabilidad" },
          { y: parseInt(hero.powerstats.power), label: "Poder" },
          { y: parseInt(hero.powerstats.combat), label: "Combate" }
        ]
      }]
    });

    // Renderizar el gráfico
    chart.render();
  }
});
