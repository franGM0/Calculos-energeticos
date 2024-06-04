document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado');

    const precalculos = () => {
        let totalWattsAC = 0;
        let totalWattsDC = 0;
        let consumoDC = 0;
        let consumoAC = 0;

        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila, index) => {
            const tipoSelect = fila.querySelector('select');
            const cantidadInput = fila.querySelector('.cantidad');
            const potenciaInput = fila.querySelector('.potencia');
            const consumoEnergiaInput = fila.querySelector('.consumo-energia');

            if (tipoSelect && cantidadInput && potenciaInput && consumoEnergiaInput) {
                const tipo = tipoSelect.value;
                const cantidad = parseFloat(cantidadInput.value) || 0;
                const potencia = parseFloat(potenciaInput.value) || 0;
                const consumoEnergia = parseFloat(consumoEnergiaInput.value) || 0;

                if (tipo === 'AC') {
                    totalWattsAC += cantidad * potencia;
                    consumoAC += consumoEnergia;
                } if (tipo === 'DC') {
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
        let valores = [];
        document.querySelectorAll('table tbody tr').forEach((fila, index) => {
            const celda = fila.querySelector('td input');
            const clave = fila.querySelector('th')?.innerText || `Parámetro ${index + 1}`;
            if (celda) {
                const valor = parseFloat(celda.value) || 0;
                if(valor != 0){
                    valores.push(valor);
                }
                parametros[clave] = valor;
            } else {
                console.warn(`Celda de parámetro no encontrada en la fila ${index + 1}:`, fila);
            }
        });

        return valores;
    };

    let calculos = (valores, consumoAC, consumoDC) => {
        let ConsumoDiario = (( consumoAC/ ((valores[9])/100 ) ) + consumoDC) / valores[2];
        let BateriasPar = Math.ceil(( (ConsumoDiario * valores[0]) / (valores[1] / 100) ) / valores[4]);
        let BateriasSer = Math.ceil(valores[2] / valores[3]);
        let TotalBat = BateriasPar * BateriasSer;

        let CorrientePico = (ConsumoDiario / (valores[13] / 100)) / valores[12];

        let ModulosPar = Math.ceil(CorrientePico / valores[7]);
        let ModulosSer = Math.ceil(valores[2] / valores[6]);
        let TotalMod = ModulosPar * ModulosSer;

        let CapacidadCorto = 1.25 * ModulosPar * valores[8];

        return [ConsumoDiario, BateriasPar, BateriasSer, TotalBat, CorrientePico, ModulosPar, ModulosSer, TotalMod, CapacidadCorto];
    };

    const verificarCampos = () => {
        let camposCompletos = true;

        document.querySelectorAll('#tabla-cuerpo tr').forEach((fila) => {
            const tipoSelect = fila.querySelector('select');
            const cantidadInput = fila.querySelector('.cantidad');
            const potenciaInput = fila.querySelector('.potencia');
            const consumoEnergiaInput = fila.querySelector('.consumo-energia');

            if (!tipoSelect.value || !cantidadInput.value || !potenciaInput.value || !consumoEnergiaInput.value) {
                camposCompletos = false;
            }
        });

        document.querySelectorAll('table tbody tr').forEach((fila) => {
            const celda = fila.querySelector('td input');
            if (!celda.value) {
                camposCompletos = false;
            }
        });

        return camposCompletos;
    };

    const realizarCalculos = () => {
        if (!verificarCampos()) {
            alert('Por favor, llene todos los espacios antes de continuar.');
            return;
        }

        console.log('Realizando cálculos');
        const [totalWattsAC, totalWattsDC, consumoAC, consumoDC] = precalculos();
        let valores = obtenerValoresTablaParametros();
        const Resultados = calculos(valores, consumoAC, consumoDC);

        console.log(valores);

        const resultados = {
            totalWattsAC,
            totalWattsDC,
            consumoAC,
            consumoDC,
            Resultados,
            valores
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
