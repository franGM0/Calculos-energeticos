document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado');

    const calcularTotalWattsAC = () => {
        let totalWattsAC = 0;
        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const cantidadInput = fila.querySelector('.cantidad');
            const potenciaInput = fila.querySelector('.potencia');

            if (tipoSelect && cantidadInput && potenciaInput) {
                const tipo = tipoSelect.value;
                if (tipo === 'AC') {
                    const cantidad = parseFloat(cantidadInput.value) || 0;
                    const potencia = parseFloat(potenciaInput.value) || 0;
                    totalWattsAC += cantidad * potencia;
                }
            } else {
                console.warn(`Fila ${index + 1} incompleta:`, {
                    tipoSelect,
                    cantidadInput,
                    potenciaInput
                });
            }
        });
        return totalWattsAC;
    };

    const calcularConsumoAC = () => {
        let consumoAC = 0;

        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const consumoEnergiaInput = fila.querySelector('.consumo-energia');

            if (tipoSelect && consumoEnergiaInput) {
                const tipo = tipoSelect.value;
                if (tipo === 'AC') {
                    const consumoEnergia = parseFloat(consumoEnergiaInput.value) || 0;;
                    consumoAC += consumoEnergia;
                }
            } else {
                console.warn(`Fila ${index + 1} incompleta:`, {
                    tipoSelect,
                    consumoEnergiaInput,
                    
                });
            }
        });
        return consumoAC;       
    }

    const calcularTotalWattsDC = () => {
        let totalWattsDC = 0;
        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const cantidadInput = fila.querySelector('.cantidad');
            const potenciaInput = fila.querySelector('.potencia');

            if (tipoSelect && cantidadInput && potenciaInput) {
                const tipo = tipoSelect.value;
                if (tipo === 'DC') {
                    const cantidad = parseFloat(cantidadInput.value) || 0;
                    const potencia = parseFloat(potenciaInput.value) || 0;
                    totalWattsDC += cantidad * potencia;
                }
            } else {
                console.warn(`Fila ${index + 1} incompleta:`, {
                    tipoSelect,
                    cantidadInput,
                    potenciaInput
                });
            }
        });
        return totalWattsDC;
    };

    const calcularConsumoDC = () => {
        let consumoDC = 0;

        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const consumoEnergiaInput = fila.querySelector('.consumo-energia');

            if (tipoSelect && consumoEnergiaInput) {
                const tipo = tipoSelect.value;
                if (tipo === 'DC') {
                    const consumoEnergia = parseFloat(consumoEnergiaInput.value) || 0;;
                    consumoDC += consumoEnergia;
                }
            } else {
                console.warn(`Fila ${index + 1} incompleta:`, {
                    tipoSelect,
                    consumoEnergiaInput,
                    
                });
            }
        });
        return consumoDC;       
    }

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

        const totalWattsAC = calcularTotalWattsAC();
        const totalWattsDC = calcularTotalWattsDC();
        const consumoAC    = calcularConsumoAC();
        const consumoDC    = calcularConsumoDC();
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
