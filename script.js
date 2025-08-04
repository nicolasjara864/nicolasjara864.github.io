function downloadPDF() {
    const element = document.querySelector('.container-lg');

    const opt = {
        margin: [15, 2, 15, 2],  // Margenes más equilibrados [top, left, bottom, right] en mm
        filename: 'CV Nicolas Jaramillo Ortega.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            scrollY: 0,
            letterRendering: true, // Mejor renderizado para tamaño carta
            windowHeight: element.scrollHeight // Altura completa del contenido
        },
        jsPDF: {
            unit: 'mm',
            format: 'letter',
            orientation: 'portrait',
            compress: true // Comprimir el PDF para optimizar espacio
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'] // Evita cortar elementos
        }
    };

    // Configuración adicional para evitar cortes
    html2pdf().set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function(pdf) {
            // Ajustar automáticamente el contenido
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10); // Ajustar tamaño de fuente si es necesario
            }
        })
        .save();
}
