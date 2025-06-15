// Variables globales
let currentChart = null;

// Función para mostrar el formulario según la operación seleccionada
function showOperationForm() {
    const operationType = document.getElementById('operationType').value;
    const formContainer = document.getElementById('operationForm');
    
    // Limpiar el contenedor de resultados
    document.getElementById('numericResults').innerHTML = '';
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }

    let formHTML = '';
    
    switch(operationType) {
        case 'muestreoInfinito':
            formHTML = createMuestreoInfinitoForm();
            break;
        case 'muestreoFinito':
            formHTML = createMuestreoFinitoForm();
            break;
        case 'muestreoInfinitoQuant':
            formHTML = createMuestreoInfinitoQuantForm();
            break;
        case 'muestreoFinitoQuant':
            formHTML = createMuestreoFinitoQuantForm();
            break;
        case 'intervaloConfianza':
            formHTML = createIntervaloConfianzaForm();
            break;
        case 'tendenciaCentral':
            formHTML = createTendenciaCentralForm();
            break;
        case 'proporciones':
            formHTML = createProporcionesForm();
            break;
        case 'hipotesis':
            formHTML = createHipotesisForm();
            break;
        case 'diferenciaMedias':
            formHTML = createDiferenciaMediasForm();
            break;
        case 'hipotesisProporcion':
            formHTML = createHipotesisProporcionForm();
            break;
        case 'diferenciaProporciones':
            formHTML = createDiferenciaProporcionesForm();
            break;
        case 'regresionLineal':
            formHTML = createRegresionLinealForm();
            break;
        default:
            formHTML = '<p>Seleccione una operación para continuar</p>';
    }

    formContainer.innerHTML = formHTML;
}

// Funciones para crear formularios específicos
function createMuestreoInfinitoForm() {
    return `
        <h2>Muestreo para Población Infinita/Desconocida (Cualitativo)</h2>
        <div class="form-group">
            <label for="nivelConfianza">Nivel de Confianza (%):</label>
            <input type="number" id="nivelConfianza" min="0" max="100" value="95">
        </div>
        <div class="form-group">
            <label for="errorMuestreo">Error de Muestreo (%):</label>
            <input type="number" id="errorMuestreo" min="0" max="100" value="5">
        </div>
        <div class="form-group">
            <label for="proporcion">Proporción Esperada (0-1):</label>
            <input type="number" id="proporcion" min="0" max="1" step="0.01" value="0.5">
        </div>
        <button onclick="calcularMuestreoInfinito()">Calcular</button>
    `;
}

function createMuestreoFinitoForm() {
    return `
        <h2>Muestreo para Población Finita/Conocida (Cualitativo)</h2>
        <div class="form-group">
            <label for="poblacion">Tamaño de la Población:</label>
            <input type="number" id="poblacion" min="1">
        </div>
        <div class="form-group">
            <label for="nivelConfianza">Nivel de Confianza (%):</label>
            <input type="number" id="nivelConfianza" min="0" max="100" value="95">
        </div>
        <div class="form-group">
            <label for="errorMuestreo">Error de Muestreo (%):</label>
            <input type="number" id="errorMuestreo" min="0" max="100" value="5">
        </div>
        <div class="form-group">
            <label for="proporcion">Proporción Esperada (0-1):</label>
            <input type="number" id="proporcion" min="0" max="1" step="0.01" value="0.5">
        </div>
        <button onclick="calcularMuestreoFinito()">Calcular</button>
    `;
}

function createMuestreoInfinitoQuantForm() {
    return `
        <h2>Muestreo para Población Infinita/Desconocida (Cuantitativo)</h2>
        <div class="form-group">
            <label for="nivelConfianza">Nivel de Confianza (%):</label>
            <input type="number" id="nivelConfianza" min="0" max="100" value="95">
        </div>
        <div class="form-group">
            <label for="errorMuestreo">Error de Muestreo (%):</label>
            <input type="number" id="errorMuestreo" min="0" max="100" value="5">
        </div>
        <div class="form-group">
            <label for="desviacionEstandar">Desviación Estándar:</label>
            <input type="number" id="desviacionEstandar" min="0" step="0.01">
        </div>
        <button onclick="calcularMuestreoInfinitoQuant()">Calcular</button>
    `;
}

function createMuestreoFinitoQuantForm() {
    return `
        <h2>Muestreo para Población Finita/Conocida (Cuantitativo)</h2>
        <div class="form-group">
            <label for="poblacion">Tamaño de la Población:</label>
            <input type="number" id="poblacion" min="1">
        </div>
        <div class="form-group">
            <label for="nivelConfianza">Nivel de Confianza (%):</label>
            <input type="number" id="nivelConfianza" min="0" max="100" value="95">
        </div>
        <div class="form-group">
            <label for="errorMuestreo">Error de Muestreo (%):</label>
            <input type="number" id="errorMuestreo" min="0" max="100" value="5">
        </div>
        <div class="form-group">
            <label for="desviacionEstandar">Desviación Estándar:</label>
            <input type="number" id="desviacionEstandar" min="0" step="0.01">
        </div>
        <button onclick="calcularMuestreoFinitoQuant()">Calcular</button>
    `;
}

function createIntervaloConfianzaForm() {
    return `
        <h2>Intervalo de Confianza</h2>
        <div class="form-group">
            <label for="media">Media Muestral:</label>
            <input type="number" id="media" step="0.01">
        </div>
        <div class="form-group">
            <label for="desviacionEstandar">Desviación Estándar:</label>
            <input type="number" id="desviacionEstandar" min="0" step="0.01">
        </div>
        <div class="form-group">
            <label for="tamanoMuestra">Tamaño de la Muestra:</label>
            <input type="number" id="tamanoMuestra" min="1">
        </div>
        <div class="form-group">
            <label for="nivelConfianza">Nivel de Confianza (%):</label>
            <input type="number" id="nivelConfianza" min="0" max="100" value="95">
        </div>
        <button onclick="calcularIntervaloConfianza()">Calcular</button>
    `;
}

function createTendenciaCentralForm() {
    return `
        <h2>Medidas de Tendencia Central</h2>
        <div class="form-group">
            <label for="datos">Datos (separados por comas):</label>
            <input type="text" id="datos" placeholder="Ejemplo: 1,2,3,4,5">
        </div>
        <button onclick="calcularTendenciaCentral()">Calcular</button>
    `;
}

function createProporcionesForm() {
    return `
        <h2>Cálculo de Proporciones</h2>
        <div class="form-group">
            <label for="exitos">Número de Éxitos:</label>
            <input type="number" id="exitos" min="0">
        </div>
        <div class="form-group">
            <label for="total">Total de Observaciones:</label>
            <input type="number" id="total" min="1">
        </div>
        <button onclick="calcularProporcion()">Calcular</button>
    `;
}

function createHipotesisForm() {
    return `
        <h2>Prueba de Hipótesis para Media Poblacional</h2>
        <div class="form-group">
            <label for="mediaMuestral">Media Muestral:</label>
            <input type="number" id="mediaMuestral" step="0.01">
        </div>
        <div class="form-group">
            <label for="mediaPoblacional">Media Poblacional (H0):</label>
            <input type="number" id="mediaPoblacional" step="0.01">
        </div>
        <div class="form-group">
            <label for="desviacionEstandar">Desviación Estándar:</label>
            <input type="number" id="desviacionEstandar" min="0" step="0.01">
        </div>
        <div class="form-group">
            <label for="tamanoMuestra">Tamaño de la Muestra:</label>
            <input type="number" id="tamanoMuestra" min="1">
        </div>
        <div class="form-group">
            <label for="nivelSignificancia">Nivel de Significancia (%):</label>
            <input type="number" id="nivelSignificancia" min="0" max="100" value="5">
        </div>
        <button onclick="calcularHipotesisMedia()">Calcular</button>
    `;
}

function createDiferenciaMediasForm() {
    return `
        <h2>Prueba de Hipótesis para Diferencia de Medias</h2>
        <div class="form-group">
            <label for="media1">Media Muestral 1:</label>
            <input type="number" id="media1" step="0.01">
        </div>
        <div class="form-group">
            <label for="media2">Media Muestral 2:</label>
            <input type="number" id="media2" step="0.01">
        </div>
        <div class="form-group">
            <label for="desviacion1">Desviación Estándar 1:</label>
            <input type="number" id="desviacion1" min="0" step="0.01">
        </div>
        <div class="form-group">
            <label for="desviacion2">Desviación Estándar 2:</label>
            <input type="number" id="desviacion2" min="0" step="0.01">
        </div>
        <div class="form-group">
            <label for="tamano1">Tamaño de Muestra 1:</label>
            <input type="number" id="tamano1" min="1">
        </div>
        <div class="form-group">
            <label for="tamano2">Tamaño de Muestra 2:</label>
            <input type="number" id="tamano2" min="1">
        </div>
        <div class="form-group">
            <label for="nivelSignificancia">Nivel de Significancia (%):</label>
            <input type="number" id="nivelSignificancia" min="0" max="100" value="5">
        </div>
        <button onclick="calcularHipotesisDiferenciaMedias()">Calcular</button>
    `;
}

function createHipotesisProporcionForm() {
    return `
        <h2>Prueba de Hipótesis para Proporción</h2>
        <div class="form-group">
            <label for="proporcionMuestral">Proporción Muestral:</label>
            <input type="number" id="proporcionMuestral" min="0" max="1" step="0.01">
        </div>
        <div class="form-group">
            <label for="proporcionPoblacional">Proporción Poblacional (H0):</label>
            <input type="number" id="proporcionPoblacional" min="0" max="1" step="0.01">
        </div>
        <div class="form-group">
            <label for="tamanoMuestra">Tamaño de la Muestra:</label>
            <input type="number" id="tamanoMuestra" min="1">
        </div>
        <div class="form-group">
            <label for="nivelSignificancia">Nivel de Significancia (%):</label>
            <input type="number" id="nivelSignificancia" min="0" max="100" value="5">
        </div>
        <button onclick="calcularHipotesisProporcion()">Calcular</button>
    `;
}

function createDiferenciaProporcionesForm() {
    return `
        <h2>Prueba de Hipótesis para Diferencia de Proporciones</h2>
        <div class="form-group">
            <label for="proporcion1">Proporción Muestral 1:</label>
            <input type="number" id="proporcion1" min="0" max="1" step="0.01">
        </div>
        <div class="form-group">
            <label for="proporcion2">Proporción Muestral 2:</label>
            <input type="number" id="proporcion2" min="0" max="1" step="0.01">
        </div>
        <div class="form-group">
            <label for="tamano1">Tamaño de Muestra 1:</label>
            <input type="number" id="tamano1" min="1">
        </div>
        <div class="form-group">
            <label for="tamano2">Tamaño de Muestra 2:</label>
            <input type="number" id="tamano2" min="1">
        </div>
        <div class="form-group">
            <label for="nivelSignificancia">Nivel de Significancia (%):</label>
            <input type="number" id="nivelSignificancia" min="0" max="100" value="5">
        </div>
        <button onclick="calcularHipotesisDiferenciaProporciones()">Calcular</button>
    `;
}

function createRegresionLinealForm() {
    return `
        <h2>Regresión Lineal</h2>
        <div class="form-group">
            <label for="datosX">Valores X (separados por comas):</label>
            <input type="text" id="datosX" placeholder="Ejemplo: 1,2,3,4,5">
        </div>
        <div class="form-group">
            <label for="datosY">Valores Y (separados por comas):</label>
            <input type="text" id="datosY" placeholder="Ejemplo: 2,4,6,8,10">
        </div>
        <button onclick="calcularRegresionLineal()">Calcular</button>
    `;
}

// Funciones de cálculo
function calcularMuestreoInfinito() {
    const nivelConfianza = parseFloat(document.getElementById('nivelConfianza').value) / 100;
    const errorMuestreo = parseFloat(document.getElementById('errorMuestreo').value) / 100;
    const proporcion = parseFloat(document.getElementById('proporcion').value);
    
    const z = getZValue(nivelConfianza);
    const n = Math.ceil((Math.pow(z, 2) * proporcion * (1 - proporcion)) / Math.pow(errorMuestreo, 2));
    
    mostrarResultado(`Tamaño de muestra necesario: ${n}`);
}

function calcularMuestreoFinito() {
    const poblacion = parseInt(document.getElementById('poblacion').value);
    const nivelConfianza = parseFloat(document.getElementById('nivelConfianza').value) / 100;
    const errorMuestreo = parseFloat(document.getElementById('errorMuestreo').value) / 100;
    const proporcion = parseFloat(document.getElementById('proporcion').value);
    
    const z = getZValue(nivelConfianza);
    const n = Math.ceil((poblacion * Math.pow(z, 2) * proporcion * (1 - proporcion)) / 
        ((poblacion - 1) * Math.pow(errorMuestreo, 2) + Math.pow(z, 2) * proporcion * (1 - proporcion)));
    
    mostrarResultado(`Tamaño de muestra necesario: ${n}`);
}

// Funciones de cálculo adicionales
function calcularMuestreoInfinitoQuant() {
    const nivelConfianza = parseFloat(document.getElementById('nivelConfianza').value) / 100;
    const errorMuestreo = parseFloat(document.getElementById('errorMuestreo').value) / 100;
    const desviacionEstandar = parseFloat(document.getElementById('desviacionEstandar').value);
    
    const z = getZValue(nivelConfianza);
    const n = Math.ceil((Math.pow(z, 2) * Math.pow(desviacionEstandar, 2)) / Math.pow(errorMuestreo, 2));
    
    mostrarResultado(`Tamaño de muestra necesario: ${n}`);
}

function calcularMuestreoFinitoQuant() {
    const poblacion = parseInt(document.getElementById('poblacion').value);
    const nivelConfianza = parseFloat(document.getElementById('nivelConfianza').value) / 100;
    const errorMuestreo = parseFloat(document.getElementById('errorMuestreo').value) / 100;
    const desviacionEstandar = parseFloat(document.getElementById('desviacionEstandar').value);
    
    const z = getZValue(nivelConfianza);
    const n = Math.ceil((poblacion * Math.pow(z, 2) * Math.pow(desviacionEstandar, 2)) / 
        ((poblacion - 1) * Math.pow(errorMuestreo, 2) + Math.pow(z, 2) * Math.pow(desviacionEstandar, 2)));
    
    mostrarResultado(`Tamaño de muestra necesario: ${n}`);
}

function calcularIntervaloConfianza() {
    const media = parseFloat(document.getElementById('media').value);
    const desviacionEstandar = parseFloat(document.getElementById('desviacionEstandar').value);
    const tamanoMuestra = parseInt(document.getElementById('tamanoMuestra').value);
    const nivelConfianza = parseFloat(document.getElementById('nivelConfianza').value) / 100;
    
    const z = getZValue(nivelConfianza);
    const errorEstandar = desviacionEstandar / Math.sqrt(tamanoMuestra);
    const margenError = z * errorEstandar;
    
    const limiteInferior = media - margenError;
    const limiteSuperior = media + margenError;
    
    mostrarResultado(`Intervalo de Confianza: [${limiteInferior.toFixed(4)}, ${limiteSuperior.toFixed(4)}]`);
}

function calcularTendenciaCentral() {
    const datosStr = document.getElementById('datos').value;
    const datos = datosStr.split(',').map(x => parseFloat(x.trim()));
    
    const media = datos.reduce((a, b) => a + b, 0) / datos.length;
    const mediana = calcularMediana(datos);
    const moda = calcularModa(datos);
    
    mostrarResultado(`
        Media: ${media.toFixed(4)}<br>
        Mediana: ${mediana.toFixed(4)}<br>
        Moda: ${moda.join(', ')}
    `);
}

function calcularProporcion() {
    const exitos = parseInt(document.getElementById('exitos').value);
    const total = parseInt(document.getElementById('total').value);
    
    const proporcion = exitos / total;
    
    mostrarResultado(`Proporción: ${proporcion.toFixed(4)} (${(proporcion * 100).toFixed(2)}%)`);
}

function calcularHipotesisMedia() {
    const mediaMuestral = parseFloat(document.getElementById('mediaMuestral').value);
    const mediaPoblacional = parseFloat(document.getElementById('mediaPoblacional').value);
    const desviacionEstandar = parseFloat(document.getElementById('desviacionEstandar').value);
    const tamanoMuestra = parseInt(document.getElementById('tamanoMuestra').value);
    const nivelSignificancia = parseFloat(document.getElementById('nivelSignificancia').value) / 100;
    
    const z = (mediaMuestral - mediaPoblacional) / (desviacionEstandar / Math.sqrt(tamanoMuestra));
    const zCritico = getZValue(1 - nivelSignificancia);
    
    const resultado = Math.abs(z) > zCritico ? 
        'Se rechaza la hipótesis nula' : 
        'No se rechaza la hipótesis nula';
    
    mostrarResultado(`
        <h3>Prueba de Hipótesis para Media Poblacional</h3>
        Estadístico Z: ${z.toFixed(4)}<br>
        Z Crítico: ±${zCritico.toFixed(4)}<br>
        ${resultado}
    `);
}

function calcularHipotesisDiferenciaMedias() {
    const media1 = parseFloat(document.getElementById('media1').value);
    const media2 = parseFloat(document.getElementById('media2').value);
    const desviacion1 = parseFloat(document.getElementById('desviacion1').value);
    const desviacion2 = parseFloat(document.getElementById('desviacion2').value);
    const tamano1 = parseInt(document.getElementById('tamano1').value);
    const tamano2 = parseInt(document.getElementById('tamano2').value);
    const nivelSignificancia = parseFloat(document.getElementById('nivelSignificancia').value) / 100;
    
    const errorEstandar = Math.sqrt(
        (Math.pow(desviacion1, 2) / tamano1) + 
        (Math.pow(desviacion2, 2) / tamano2)
    );
    
    const z = (media1 - media2) / errorEstandar;
    const zCritico = getZValue(1 - nivelSignificancia);
    
    const resultado = Math.abs(z) > zCritico ? 
        'Se rechaza la hipótesis nula' : 
        'No se rechaza la hipótesis nula';
    
    mostrarResultado(`
        <h3>Prueba de Hipótesis para Diferencia de Medias</h3>
        Estadístico Z: ${z.toFixed(4)}<br>
        Z Crítico: ±${zCritico.toFixed(4)}<br>
        ${resultado}
    `);
}

function calcularHipotesisProporcion() {
    const proporcionMuestral = parseFloat(document.getElementById('proporcionMuestral').value);
    const proporcionPoblacional = parseFloat(document.getElementById('proporcionPoblacional').value);
    const tamanoMuestra = parseInt(document.getElementById('tamanoMuestra').value);
    const nivelSignificancia = parseFloat(document.getElementById('nivelSignificancia').value) / 100;
    
    const errorEstandar = Math.sqrt(
        (proporcionPoblacional * (1 - proporcionPoblacional)) / tamanoMuestra
    );
    
    const z = (proporcionMuestral - proporcionPoblacional) / errorEstandar;
    const zCritico = getZValue(1 - nivelSignificancia);
    
    const resultado = Math.abs(z) > zCritico ? 
        'Se rechaza la hipótesis nula' : 
        'No se rechaza la hipótesis nula';
    
    mostrarResultado(`
        <h3>Prueba de Hipótesis para Proporción</h3>
        Estadístico Z: ${z.toFixed(4)}<br>
        Z Crítico: ±${zCritico.toFixed(4)}<br>
        ${resultado}
    `);
}

function calcularHipotesisDiferenciaProporciones() {
    const proporcion1 = parseFloat(document.getElementById('proporcion1').value);
    const proporcion2 = parseFloat(document.getElementById('proporcion2').value);
    const tamano1 = parseInt(document.getElementById('tamano1').value);
    const tamano2 = parseInt(document.getElementById('tamano2').value);
    const nivelSignificancia = parseFloat(document.getElementById('nivelSignificancia').value) / 100;
    
    const proporcionCombinada = (proporcion1 * tamano1 + proporcion2 * tamano2) / (tamano1 + tamano2);
    const errorEstandar = Math.sqrt(
        proporcionCombinada * (1 - proporcionCombinada) * 
        ((1/tamano1) + (1/tamano2))
    );
    
    const z = (proporcion1 - proporcion2) / errorEstandar;
    const zCritico = getZValue(1 - nivelSignificancia);
    
    const resultado = Math.abs(z) > zCritico ? 
        'Se rechaza la hipótesis nula' : 
        'No se rechaza la hipótesis nula';
    
    mostrarResultado(`
        <h3>Prueba de Hipótesis para Diferencia de Proporciones</h3>
        Estadístico Z: ${z.toFixed(4)}<br>
        Z Crítico: ±${zCritico.toFixed(4)}<br>
        ${resultado}
    `);
}

function calcularRegresionLineal() {
    const datosX = document.getElementById('datosX').value.split(',').map(x => parseFloat(x.trim()));
    const datosY = document.getElementById('datosY').value.split(',').map(y => parseFloat(y.trim()));
    
    const n = datosX.length;
    const sumX = datosX.reduce((a, b) => a + b, 0);
    const sumY = datosY.reduce((a, b) => a + b, 0);
    const sumXY = datosX.reduce((sum, x, i) => sum + x * datosY[i], 0);
    const sumX2 = datosX.reduce((sum, x) => sum + x * x, 0);
    
    const pendiente = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercepto = (sumY - pendiente * sumX) / n;
    
    // Calcular coeficiente de correlación
    const mediaX = sumX / n;
    const mediaY = sumY / n;
    const numerador = datosX.reduce((sum, x, i) => sum + (x - mediaX) * (datosY[i] - mediaY), 0);
    const denominadorX = Math.sqrt(datosX.reduce((sum, x) => sum + Math.pow(x - mediaX, 2), 0));
    const denominadorY = Math.sqrt(datosY.reduce((sum, y) => sum + Math.pow(y - mediaY, 2), 0));
    const correlacion = numerador / (denominadorX * denominadorY);
    
    mostrarResultado(`
        Ecuación de la recta: y = ${pendiente.toFixed(4)}x + ${intercepto.toFixed(4)}<br>
        Coeficiente de correlación: ${correlacion.toFixed(4)}
    `);
    
    // Crear gráfico de dispersión
    crearGraficoDispersion(datosX, datosY, pendiente, intercepto);
}

// Funciones auxiliares
function calcularMediana(datos) {
    const ordenados = [...datos].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);
    return ordenados.length % 2 === 0 ?
        (ordenados[mitad - 1] + ordenados[mitad]) / 2 :
        ordenados[mitad];
}

function calcularModa(datos) {
    const frecuencias = {};
    datos.forEach(x => frecuencias[x] = (frecuencias[x] || 0) + 1);
    const maxFrecuencia = Math.max(...Object.values(frecuencias));
    return Object.keys(frecuencias)
        .filter(x => frecuencias[x] === maxFrecuencia)
        .map(Number);
}

function crearGraficoDispersion(datosX, datosY, pendiente, intercepto) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Calcular puntos para la línea de regresión
    const minX = Math.min(...datosX);
    const maxX = Math.max(...datosX);
    const lineaX = [minX, maxX];
    const lineaY = lineaX.map(x => pendiente * x + intercepto);
    
    currentChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Datos',
                data: datosX.map((x, i) => ({x: x, y: datosY[i]})),
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }, {
                label: 'Línea de regresión',
                data: lineaX.map((x, i) => ({x: x, y: lineaY[i]})),
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    });
}

// Función auxiliar para obtener el valor Z según el nivel de confianza
function getZValue(nivelConfianza) {
    const zValues = {
        0.90: 1.645,
        0.95: 1.96,
        0.99: 2.576
    };
    return zValues[nivelConfianza] || 1.96;
}

// Función para mostrar resultados
function mostrarResultado(mensaje) {
    const resultsDiv = document.getElementById('numericResults');
    resultsDiv.innerHTML = `<div class="success">${mensaje}</div>`;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showOperationForm();
}); 