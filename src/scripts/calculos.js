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
        let valores = [];
        document.querySelectorAll('table tbody tr').forEach((fila, index) => {
            const celda = fila.querySelector('td input');
            const clave = fila.querySelector('th')?.innerText || `Parámetro ${index + 1}`;
            if (celda) {
                const valor = parseFloat(celda.value) || 0;
                valores.push(valor);
                parametros[clave] = valor;
            } else {
                console.warn(`Celda de parámetro no encontrada en la fila ${index + 1}:`, fila);
            }
        });

        return valores;
    };

    const calculos = (valores, consumoAC, consumoDC) => {

        let ConsumoDiario =  (consumoAC/valores[10] + consumoDC)/valores[3];
        let BateriasPar = Math.ceil( ((ConsumoDiario*valores[1])/valores[2])/valores[5] );
        let BateriasSer = Math.ceil( valores[3]/valores[4])
        let TotalBat = BateriasPar * BateriasSer;

        let CorrientePico = (ConsumoDiario/valores[14])/valores[13];

        let ModulosPar = Math.ceil(CorrientePico/valores[8]);
        let ModulosSer = Math.ceil(valores[3]/valores[7])
        let TotalMod = ModulosPar*ModulosSer;

        let CapacidadCorto =  1.25*ModulosPar*valores[9];



        return [ConsumoDiario,BateriasPar,BateriasSer,TotalBat,CorrientePico,ModulosPar,ModulosSer,TotalMod,CapacidadCorto];
    };


    const realizarCalculos = () => {
        console.log('Realizando cálculos');
        
        const [totalWattsAC, totalWattsDC, consumoAC, consumoDC] = precalculos();
        
        let valores = obtenerValoresTablaParametros();

        const Resultados = calculos(valores,consumoAC,consumoDC);


        console.log(valores);

        
        const resultados = {
            totalWattsAC,
            totalWattsDC,
            consumoAC,
            consumoDC,
            Resultados
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
