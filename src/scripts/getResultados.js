
document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('resultados');
    if (datosGuardados) {
        const resultados = JSON.parse(datosGuardados);
        console.log('Datos recuperados de localStorage:', resultados);

        document.getElementById('totalWattsAC').textContent = resultados.totalWattsAC.toFixed(4) ;
        document.getElementById('totalWattsDC').textContent = resultados.totalWattsDC.toFixed(4) ;
        document.getElementById('consumoAC').textContent = resultados.consumoAC.toFixed(4) ;
        document.getElementById('consumoDC').textContent = resultados.consumoDC ;

        document.getElementById('consumo').textContent = resultados.Resultados[0];
        document.getElementById('batPar').textContent = resultados.Resultados[1];
        document.getElementById('batSer').textContent = resultados.Resultados[2];
        document.getElementById('totalBat').textContent = resultados.Resultados[3];

        document.getElementById('corPic').textContent = resultados.Resultados[4].toFixed(2);

        document.getElementById('modPar').textContent = resultados.Resultados[5];
        document.getElementById('modSer').textContent = resultados.Resultados[6];
        document.getElementById('totalMod').textContent = resultados.Resultados[7];

        document.getElementById('capCor').textContent = resultados.Resultados[8];
        
        


        // document.getElementById('consumo').textContent = resultados.valores[0].toFixed(4)?? 'N/A';
        // document.getElementById('batPar').textContent = resultados.valores[1]?? 'N/A';
        // document.getElementById('batSer').textContent = resultados.valores[2]?? 'N/A';
        // document.getElementById('totalBat').textContent = resultados.valores[3]?? 'N/A';

        // document.getElementById('corPic').textContent = resultados.valores[4]?? 'N/A';

        // document.getElementById('modPar').textContent = resultados.valores[5]?? 'N/A';
        // document.getElementById('modSer').textContent = resultados.valores[6]?? 'N/A';
        // document.getElementById('totalMod').textContent = resultados.valores[7]?? 'N/A';

        // document.getElementById('capCor').textContent = resultados.valores[8]?? 'N/A';

        
    } else {
        console.warn('No se encontraron datos en localStorage');
    }
});
