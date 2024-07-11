// Configuración del gráfico y exportación a SVG
var ctx = document.getElementById('canvas');
ctx.width = 600;
ctx.height = 400;

var chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
			backgroundColor: "#0170B9",
    }]
  },
  options: {
		plugins: {
			title: {
				display: true,
				text: 'Custom Chart Title',
				align: 'start'
			},
			subtitle: {
				display: true,
				text: 'Custom Chart Subtitle',
				align: 'start'
			}
		},
    scales: {
      y: {
        beginAtZero: true
      }
    },
		animation: {
      duration: 0, // Disable animations
    },
		responsive: false
  }
});

// Función para crear el enlace SVG
function createSvgLink(filename, linkText, chart) {
  // Verificar si la duración de la animación y la responsividad están desactivadas
  if (chart.options.animation.duration !== 0) {
    console.warn('Cannot create SVG: "animation" duration is not set to 0');
    return;
  }
  if (chart.options.responsive !== false) {
    console.warn('Cannot create SVG: "responsive" is not set to false');
    return;
  }
  tweakLib();
  // Crear un contexto SVG usando Canvas2Svg.js
  let svgContext = new C2S(chart.width, chart.height);
  let svgChart = new Chart(svgContext, chart.config);

  // Crear el enlace de descarga
  let link = document.createElement('a');
  link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContext.getSerializedSvg());
  link.download = filename;
  link.textContent = linkText;

  // Agregar el enlace a la página
  document.getElementById('wrapper').appendChild(link);
}

// Llamar a la función para crear el enlace SVG
createSvgLink('chart.svg', 'Download SVG', chart);


function tweakLib() {

  C2S.prototype.getContext = function(contextId) {
    if (contextId === '2d' || contextId === '2D') {
      return this;
    }
    return null;
  }
  C2S.prototype.style = function() {
    return this.__canvas.style;
  }
  C2S.prototype.getAttribute = function(name) {
    return this[name];
  }
  C2S.prototype.addEventListener = function(type, listener, eventListenerOptions) {
    // nothing to do here, but we need this function :)
  }


}
