
document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('resultados');
    if (datosGuardados) {
        const resultados = JSON.parse(datosGuardados);
        console.log('Datos recuperados de localStorage:', resultados);

        document.getElementById('totalWattsAC').textContent = resultados.totalWattsAC ?? 'N/A';
        document.getElementById('totalWattsDC').textContent = resultados.totalWattsDC ?? 'N/A';
        document.getElementById('consumoAC').textContent = resultados.consumoAC ?? 'N/A';
        document.getElementById('consumoDC').textContent = resultados.consumoDC ?? 'N/A';

        document.getElementById('consumo').textContent = resultados.Resultados[0].toFixed(2)?? 'N/A';
        document.getElementById('batPar').textContent = resultados.Resultados[1]?? 'N/A';
        document.getElementById('batSer').textContent = resultados.Resultados[2]?? 'N/A';
        document.getElementById('totalBat').textContent = resultados.Resultados[3]?? 'N/A';

        document.getElementById('corPic').textContent = resultados.Resultados[4].toFixed(2)?? 'N/A';

        document.getElementById('modPar').textContent = resultados.Resultados[5]?? 'N/A';
        document.getElementById('modSer').textContent = resultados.Resultados[6]?? 'N/A';
        document.getElementById('totalMod').textContent = resultados.Resultados[7]?? 'N/A';

        document.getElementById('capCor').textContent = resultados.Resultados[8]?? 'N/A';
        
    } else {
        console.warn('No se encontraron datos en localStorage');
    }
});
