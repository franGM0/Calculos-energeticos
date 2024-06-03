document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado');

    const precalculos = () => {
        let totalWattsAC = 0;
        let totalWattsDC = 0;
        let consumoDC    = 0;
        let consumoAC    = 0;

        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const cantidadInput = fila.querySelector('.cantidad');
            const potenciaInput = fila.querySelector('.potencia');
            const consumoEnergiaInput = fila.querySelector('.consumo-energia');
            

            if (tipoSelect && cantidadInput && potenciaInput) {
                const tipo = tipoSelect.value;
                if (tipo === 'AC') {
                    const cantidad = parseFloat(cantidadInput.value) || 0;
                    const potencia = parseFloat(potenciaInput.value) || 0;
                    const consumoEnergia = parseFloat(consumoEnergiaInput.value) || 0;

                    totalWattsAC += cantidad * potencia;
                    consumoAC += consumoEnergia;

                }
                if (tipo === 'DC') {
                    const cantidad = parseFloat(cantidadInput.value) || 0;
                    const potencia = parseFloat(potenciaInput.value) || 0;
                    const consumoEnergia = parseFloat(consumoEnergiaInput.value) || 0;

                    totalWattsDC += cantidad * potencia;
                    consumoDC += consumoEnergia;

                }
            } else {
                console.warn(`Fila ${index + 1} incompleta:`, {
                    tipoSelect,
                    cantidadInput,
                    potenciaInput,
                    consumoEnergiaInput

                });
            }
        });
        return [totalWattsAC, totalWattsDC, consumoAC, consumoDC];
    };

    const obtenerValoresTablaParametros = () => {
        const parametros = {};
        document.querySelectorAll('table tbody tr').forEach((fila, index) => {
            const celda = fila.querySelector('td input');
            const clave = fila.querySelector('th')?.innerText || `Parámetro ${index + 1}`;
            if (celda) {
                const valor = parseFloat(celda.value) || 0;
                parametros[clave] = valor;
            } else {
                console.warn(`Celda de parámetro no encontrada en la fila ${index + 1}:`, fila);
            }
        });
        return parametros;
    };

    const realizarCalculos = () => {
        console.log('Realizando cálculos');
        
        const [totalWattsAC, totalWattsDC, consumoAC, consumoDC] = precalculos();
        const parametros   = obtenerValoresTablaParametros();

        
        const resultados = {
            totalWattsAC,
            totalWattsDC,
            parametros,
            consumoAC,
            consumoDC
        };

        console.log('Resultados calculados:', resultados);

        localStorage.setItem('resultados', JSON.stringify(resultados));

        window.location.href = '/resultados-fotovoltaicos';
    };

    const botonCalcular = document.getElementById('calcular-btn');
    if (botonCalcular) {
        console.log('Botón encontrado');
        botonCalcular.addEventListener('click', realizarCalculos);
    } else {
        console.error('No se encontró el botón para calcular');
    }
});
