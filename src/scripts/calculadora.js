/**
 * CONFIGURACION Y LOGICA DE LA CALCULADORA
 *
 * Tabla de Pensiones Alimenticias 2026
 * Acuerdo Ministerial Nro. MDH-DM-2026-0005-A.
 *
 * Los porcentajes estan centralizados en este objeto para que Virtus Estudio
 * Juridico pueda auditarlos o actualizarlos con facilidad si la autoridad
 * publica una reforma.
 */

const tablaPensiones2026 = {
    anio: 2026,
    acuerdo: 'MDH-DM-2026-0005-A',
    sbu: 482,

    niveles: [
        {
            nivel: 1,
            minSBU: 1,
            maxSBU: 1.25,
            descripcion: 'De 1.00000 SBU hasta 1.25000 SBU',
            porcentajes: {
                unHijo: { menor3: 28.12, mayor3: 29.49 },
                dosHijos: { menor3: 39.71, mayor3: 43.13 },
                tresOMas: { menor3: 52.18, mayor3: 54.23 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 4.56 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 10.68 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 18.23 }
            }
        },
        {
            nivel: 2,
            minSBU: 1.25003,
            maxSBU: 3,
            descripcion: 'De 1.25003 SBU hasta 3.00000 SBU',
            porcentajes: {
                unHijo: { menor3: 34.84, mayor3: 36.96 },
                dosHijos: { menor3: 47.45, mayor3: 49.51 },
                tresOMas: { menor3: 47.45, mayor3: 49.51 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 10.68 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 18.23 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 25.54 }
            }
        },
        {
            nivel: 3,
            minSBU: 3.00003,
            maxSBU: 4,
            descripcion: 'De 3.00003 SBU hasta 4.00000 SBU',
            porcentajes: {
                unHijo: { menor3: 38.49, mayor3: 40.83 },
                dosHijos: { menor3: 38.49, mayor3: 40.83 },
                tresOMas: { menor3: 38.49, mayor3: 40.83 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 18.23 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 25.54 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 37.16 }
            }
        },
        {
            nivel: 4,
            minSBU: 4.00003,
            maxSBU: 6.5,
            descripcion: 'De 4.00003 SBU hasta 6.50000 SBU',
            porcentajes: {
                unHijo: { menor3: 39.79, mayor3: 42.21 },
                dosHijos: { menor3: 39.79, mayor3: 42.21 },
                tresOMas: { menor3: 39.79, mayor3: 42.21 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 25.54 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 29.30 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 37.16 }
            }
        },
        {
            nivel: 5,
            minSBU: 6.50003,
            maxSBU: 9,
            descripcion: 'De 6.50003 SBU hasta 9.00000 SBU',
            porcentajes: {
                unHijo: { menor3: 41.14, mayor3: 43.64 },
                dosHijos: { menor3: 41.14, mayor3: 43.64 },
                tresOMas: { menor3: 41.14, mayor3: 43.64 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 30.43 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 34.92 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 44.28 }
            }
        },
        {
            nivel: 6,
            minSBU: 9.00003,
            maxSBU: Infinity,
            descripcion: 'De 9.00003 SBU en adelante',
            porcentajes: {
                unHijo: { menor3: 42.53, mayor3: 45.12 },
                dosHijos: { menor3: 42.53, mayor3: 45.12 },
                tresOMas: { menor3: 42.53, mayor3: 45.12 }
            },
            discapacidad: {
                leve: { etiqueta: '30% - 49% de discapacidad', porcentajeSBU: 30.43 },
                moderada: { etiqueta: '50% - 74% de discapacidad', porcentajeSBU: 34.92 },
                severa: { etiqueta: '75% - 100% de discapacidad', porcentajeSBU: 44.28 }
            }
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const aportesIess = {
        ninguno: { etiqueta: 'No aplica', porcentaje: 0 },
        privado: { etiqueta: 'Empleado privado', porcentaje: 9.45 },
        publico: { etiqueta: 'Empleado p&uacute;blico', porcentaje: 9.35 },
        independiente: { etiqueta: 'Independiente', porcentaje: 11.45 }
    };

    const numHijosInput = document.getElementById('numHijos');
    const edadesContainer = document.getElementById('edades-container');
    const discapacidadInput = document.getElementById('discapacidad');
    const aporteIessInput = document.getElementById('aporte-iess');
    const form = document.getElementById('calc-form');
    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoValor = document.getElementById('resultado-valor');
    const detallesContainer = document.getElementById('resultado-detalles');
    const descargarCalculoBtn = document.getElementById('descargar-calculo');
    const printReport = document.getElementById('print-report');
    let ultimoCalculo = null;

    const formatoDolares = (valor) => `$${Number(valor).toFixed(2)}`;

    document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener('wheel', (event) => {
            if (document.activeElement === input) {
                event.preventDefault();
                input.blur();
            }
        }, { passive: false });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
            }
        });
    });

    const activarGuia = (clave) => {
        document.querySelectorAll('[data-guide-card], [data-guide-target]').forEach((elemento) => {
            const activo = elemento.dataset.guideCard === clave || elemento.dataset.guideTarget === clave;
            elemento.classList.toggle('guide-active', activo);
        });
    };

    const relacionGuiaCampos = {
        ingresos: 'ingresos',
        'aporte-iess': 'iess',
        numHijos: 'cargas',
        discapacidad: 'cargas'
    };

    form.addEventListener('focusin', (event) => {
        const clave = relacionGuiaCampos[event.target.id] || (event.target.closest('#edades-container') ? 'cargas' : null);
        if (clave) activarGuia(clave);
    });

    form.addEventListener('change', (event) => {
        const clave = relacionGuiaCampos[event.target.id] || (event.target.closest('#edades-container') ? 'cargas' : null);
        if (clave) activarGuia(clave);
    });

    const obtenerTextoEdad = (valorEdad) => {
        return valorEdad === 'mayor3' ? '3 años en adelante' : '0 a 2 años';
    };

    const obtenerFilaPorNivel = (nivel, cantidadHijos) => {
        if (nivel.nivel === 1) {
            if (cantidadHijos === 1) return { clave: 'unHijo', etiqueta: '1 hijo' };
            if (cantidadHijos === 2) return { clave: 'dosHijos', etiqueta: '2 hijos' };
            return { clave: 'tresOMas', etiqueta: '3 o más hijos' };
        }

        if (nivel.nivel === 2) {
            if (cantidadHijos === 1) return { clave: 'unHijo', etiqueta: '1 hijo' };
            return { clave: 'dosHijos', etiqueta: '2 o más hijos' };
        }

        return { clave: 'unHijo', etiqueta: '1 o más hijos' };
    };

    const obtenerTextoCantidadHijos = (cantidadHijos) => {
        return cantidadHijos === 1 ? '1 hijo' : `${cantidadHijos} hijos`;
    };

    const obtenerFilasVisiblesNivel = (nivel) => {
        if (nivel.nivel === 1) {
            return [
                { clave: 'unHijo', etiqueta: '1 hijo' },
                { clave: 'dosHijos', etiqueta: '2 hijos' },
                { clave: 'tresOMas', etiqueta: '3 o más' }
            ];
        }

        if (nivel.nivel === 2) {
            return [
                { clave: 'unHijo', etiqueta: '1 hijo' },
                { clave: 'dosHijos', etiqueta: '2 o más' }
            ];
        }

        return [{ clave: 'unHijo', etiqueta: '1 o más' }];
    };

    const obtenerNivelAplicable = (baseCalculo) => {
        const relacionSBU = baseCalculo / tablaPensiones2026.sbu;
        return tablaPensiones2026.niveles.find((nivel) => relacionSBU <= nivel.maxSBU)
            || tablaPensiones2026.niveles[tablaPensiones2026.niveles.length - 1];
    };

    const obtenerRangoDolares = (nivel) => {
        const desde = nivel.minSBU * tablaPensiones2026.sbu;
        const hasta = Number.isFinite(nivel.maxSBU)
            ? nivel.maxSBU * tablaPensiones2026.sbu
            : null;

        return {
            desde: formatoDolares(desde),
            hasta: hasta ? formatoDolares(hasta) : 'en adelante'
        };
    };

    const renderizarTablaOficial = (referenciaActiva = null) => {
        const tablaOficial = document.getElementById('tabla-oficial');
        if (!tablaOficial) return;

        tablaOficial.innerHTML = tablaPensiones2026.niveles.map((nivel) => {
            const rango = obtenerRangoDolares(nivel);
            const filas = obtenerFilasVisiblesNivel(nivel);
            const nivelActivo = Number(referenciaActiva?.nivel) === nivel.nivel;
            const discapacidadNivel = Object.values(nivel.discapacidad).map((regla) => `
                <span>
                    <strong>${regla.etiqueta.replace(' de discapacidad', '')}</strong>
                    ${regla.porcentajeSBU.toFixed(2)}%
                </span>
            `).join('');

            return `
                <article class="nivel-tabla ${nivelActivo ? 'nivel-tabla-activo' : ''}">
                    <div class="nivel-tabla-encabezado">
                        <h3>Nivel ${nivel.nivel}</h3>
                        <p>De <strong>${rango.desde}</strong> ${rango.hasta === 'en adelante' ? '<br>en adelante' : `a <strong>${rango.hasta}</strong>`}</p>
                        <span>${nivel.descripcion.toUpperCase()}</span>
                        <div class="nivel-discapacidad">
                            <p>Discapacidad</p>
                            ${discapacidadNivel}
                        </div>
                    </div>
                    <div class="nivel-tabla-grid">
                        <div class="tabla-celda tabla-celda-titulo">Hijos</div>
                        <div class="tabla-celda tabla-celda-titulo">0 a 2 años</div>
                        <div class="tabla-celda tabla-celda-titulo">3+ años</div>
                        ${filas.map((fila) => {
                            const filaActiva = nivelActivo && referenciaActiva?.filaClave === fila.clave;
                            const menorActivo = filaActiva && referenciaActiva?.edadClave === 'menor3';
                            const mayorActivo = filaActiva && referenciaActiva?.edadClave === 'mayor3';

                            return `
                                <div class="tabla-celda tabla-celda-hijos ${filaActiva ? 'tabla-fila-activa' : ''}">${fila.etiqueta}</div>
                                <div class="tabla-celda ${filaActiva ? 'tabla-fila-activa' : ''} ${menorActivo ? 'tabla-celda-activa' : ''}">${nivel.porcentajes[fila.clave].menor3.toFixed(2)}%</div>
                                <div class="tabla-celda ${filaActiva ? 'tabla-fila-activa' : ''} ${mayorActivo ? 'tabla-celda-activa' : ''}">${nivel.porcentajes[fila.clave].mayor3.toFixed(2)}%</div>
                            `;
                        }).join('')}
                    </div>
                </article>
            `;
        }).join('');
    };

    const sincronizarCamposDiscapacidad = () => {
        document.querySelectorAll('.discapacidad-hijo').forEach((bloque) => {
            bloque.classList.toggle('hidden', !discapacidadInput.checked);
        });
    };

    const textoPDF = (texto) => {
        const limpio = String(texto ?? '');
        let hex = 'FEFF';
        for (let i = 0; i < limpio.length; i++) {
            hex += limpio.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
        }
        return `<${hex}>`;
    };

    const crearPDFCalculo = (calculo) => {
        const ancho = 595.28;
        const alto = 841.89;
        const margen = 52;
        const wine = '0.290 0.055 0.090';
        const wineSoft = '0.420 0.105 0.145';
        const gold = '0.773 0.627 0.349';
        const gray = '0.280 0.280 0.280';
        const light = '0.965 0.950 0.920';
        const white = '1 1 1';

        const comandos = [];
        const yPDF = (y) => (alto - y).toFixed(2);
        const num = (v) => Number(v).toFixed(2);

        const rect = (x, y, w, h, color) => {
            comandos.push(`${color} rg ${num(x)} ${num(alto - y - h)} ${num(w)} ${num(h)} re f`);
        };
        const line = (x1, y1, x2, y2, color = '0.85 0.85 0.85', width = 1) => {
            comandos.push(`${color} RG ${num(width)} w ${num(x1)} ${yPDF(y1)} m ${num(x2)} ${yPDF(y2)} l S`);
        };
        const text = (value, x, y, size = 11, font = 'F1', color = '0 0 0') => {
            comandos.push(`BT ${color} rg /${font} ${size} Tf ${num(x)} ${yPDF(y)} Td ${textoPDF(value)} Tj ET`);
        };
        const centered = (value, y, size = 14, font = 'F2', color = '0 0 0') => {
            const approxWidth = String(value).length * size * 0.28;
            text(value, (ancho - approxWidth) / 2, y, size, font, color);
        };
        const wrap = (value, maxChars) => {
            const words = String(value).split(/\s+/);
            const lines = [];
            let current = '';
            words.forEach((word) => {
                const next = current ? `${current} ${word}` : word;
                if (next.length > maxChars && current) {
                    lines.push(current);
                    current = word;
                } else {
                    current = next;
                }
            });
            if (current) lines.push(current);
            return lines;
        };
        const row = (label, value, y) => {
            text(label, margen, y, 11, 'F2', gray);
            text(value, 330, y, 11, 'F2', wine);
            line(margen, y + 9, ancho - margen, y + 9, '0.88 0.84 0.78', 0.7);
        };

        rect(0, 0, ancho, 116, wine);
        centered('VIRTUS ESTUDIO JURÍDICO', 42, 18, 'F2', gold);
        centered('CÁLCULO REFERENCIAL DE PENSIÓN ALIMENTICIA', 72, 14, 'F2', white);
        centered(`Acuerdo ${tablaPensiones2026.acuerdo} · SBU ${tablaPensiones2026.anio}: ${formatoDolares(tablaPensiones2026.sbu)}`, 96, 9, 'F1', '0.90 0.82 0.64');

        text('PENSIÓN ESTIMADA', margen, 150, 13, 'F2', wine);
        text(formatoDolares(calculo.total), margen, 182, 34, 'F2', wine);
        text(`Fecha de emisión: ${calculo.fecha}`, 330, 154, 9, 'F1', gray);

        rect(margen, 215, ancho - (margen * 2), 155, light);
        text('Resumen del cálculo', margen + 18, 240, 13, 'F2', wine);
        row('Ingreso mensual:', formatoDolares(calculo.ingresos), 266);
        if (calculo.ingresoAjustadoAlSBU) {
            row('Base de cálculo:', `${formatoDolares(calculo.baseCalculo)} (mínimo legal: 1 SBU)`, 290);
            row('Hijos considerados:', calculo.textoCantidadHijos, 314);
            row('Nivel aplicado:', `Nivel ${calculo.nivel} (${calculo.relacionSBU.toFixed(2)} SBU)`, 338);
        } else {
            row('Hijos considerados:', calculo.textoCantidadHijos, 290);
            row('Nivel aplicado:', `Nivel ${calculo.nivel} (${calculo.relacionSBU.toFixed(2)} SBU)`, 314);
            row('Porcentaje usado:', `${calculo.porcentaje.toFixed(2)}%`, 338);
        }
        if (calculo.ingresoAjustadoAlSBU) {
            row('Porcentaje usado:', `${calculo.porcentaje.toFixed(2)}%`, 362);
        }

        let y = 410;
        text('Detalle por alimentado', margen, y, 13, 'F2', wine);
        y += 24;
        calculo.hijos.forEach((hijo, index) => {
            const altoFila = hijo.adicionalDiscapacidad > 0 ? 56 : 42;
            rect(margen, y - 17, ancho - (margen * 2), altoFila, '1 1 1');
            text(`${index + 1}. ${hijo.nombre}`, margen + 14, y, 11, 'F2', wine);
            text(hijo.edadTexto, margen + 210, y, 10, 'F1', gray);
            text(formatoDolares(hijo.total), ancho - margen - 82, y, 11, 'F2', wine);
            if (hijo.adicionalDiscapacidad > 0) {
                text(`Base ${formatoDolares(hijo.base)} + discapacidad ${formatoDolares(hijo.adicionalDiscapacidad)}`, margen + 14, y + 20, 9, 'F1', gray);
            }
            line(margen, y + altoFila - 18, ancho - margen, y + altoFila - 18, '0.88 0.84 0.78', 0.6);
            y += altoFila;
        });

        if (calculo.adicionalDiscapacidad > 0) {
            row('Adicional total por discapacidad:', formatoDolares(calculo.adicionalDiscapacidad), y + 8);
            y += 34;
        }

        rect(margen, y + 12, ancho - (margen * 2), 58, wineSoft);
        text('TOTAL MENSUAL ESTIMADO', margen + 18, y + 38, 12, 'F2', white);
        text(formatoDolares(calculo.total), ancho - margen - 120, y + 38, 18, 'F2', gold);

        y += 105;
        text('Aviso legal', margen, y, 11, 'F2', wine);
        y += 18;
        wrap('Los valores calculados se basan en la Tabla de Pensiones Alimenticias 2026 publicada por la autoridad competente. Este resultado es referencial y no reemplaza el criterio de un juez ni asesoría legal personalizada.', 84)
            .forEach((linea) => {
                text(linea, margen, y, 9.5, 'F1', gray);
                y += 14;
            });

        text('Virtus Estudio Jurídico · Bolívar y C. Belisario Quevedo, Salcedo', margen, alto - 38, 8.5, 'F1', gray);

        const stream = comandos.join('\n');
        const objects = [
            '<< /Type /Catalog /Pages 2 0 R >>',
            '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${num(ancho)} ${num(alto)}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
            '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
            '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
            `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
        ];

        let pdf = '%PDF-1.4\n';
        const offsets = [0];
        objects.forEach((obj, index) => {
            offsets.push(pdf.length);
            pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
        });
        const xref = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
        for (let i = 1; i < offsets.length; i++) {
            pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
        }
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

        return new Blob([pdf], { type: 'application/pdf' });
    };

    const descargarPDF = (calculo) => {
        if (!calculo) return;
        const blob = crearPDFCalculo(calculo);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `calculo-pension-virtus-${new Date().toISOString().slice(0, 10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const prepararReporteImpresion = (calculo) => {
        if (!calculo || !printReport) return;

        const filasHijos = calculo.hijos.map((hijo, index) => {
            const discapacidadTexto = hijo.adicionalDiscapacidad > 0
                ? `
                    <span class="print-money">${formatoDolares(hijo.adicionalDiscapacidad)}</span>
                    <small>${hijo.discapacidadDetalle?.porcentajeSBU}% de 1 SBU</small>
                `
                : '<span class="print-muted">No aplica</span>';

            return `
            <tr>
                <td>${index + 1}</td>
                <td>${hijo.nombre}</td>
                <td>${hijo.edadTexto}</td>
                <td>${formatoDolares(hijo.base)}</td>
                <td>${discapacidadTexto}</td>
            </tr>
            `;
        }).join('');

        const tablasOficiales = tablaPensiones2026.niveles.map((nivel) => {
            const rango = obtenerRangoDolares(nivel);
            const filas = obtenerFilasVisiblesNivel(nivel);
            const nivelActivo = Number(calculo.nivel) === nivel.nivel;
            const discapacidadNivel = Object.values(nivel.discapacidad).map((regla) => `
                <span>
                    <strong>${regla.etiqueta.replace(' de discapacidad', '')}</strong>
                    ${regla.porcentajeSBU.toFixed(2)}%
                </span>
            `).join('');

            return `
                <article class="print-table-level ${nivelActivo ? 'print-table-level-active' : ''}">
                    <div class="print-table-level-info">
                        <h3>Nivel ${nivel.nivel}</h3>
                        <p>De <strong>${rango.desde}</strong> ${rango.hasta === 'en adelante' ? 'en adelante' : `a <strong>${rango.hasta}</strong>`}</p>
                        <span>${nivel.descripcion.toUpperCase()}</span>
                        <div class="print-table-disability">
                            <p>Discapacidad</p>
                            ${discapacidadNivel}
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Hijos</th>
                                <th>0 a 2 a&ntilde;os</th>
                                <th>3+ a&ntilde;os</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filas.map((fila) => {
                                const filaActiva = nivelActivo && calculo.filaClave === fila.clave;
                                const menorActivo = filaActiva && calculo.edadClave === 'menor3';
                                const mayorActivo = filaActiva && calculo.edadClave === 'mayor3';

                                return `
                                    <tr class="${filaActiva ? 'print-table-row-active' : ''}">
                                        <td>${fila.etiqueta}</td>
                                        <td class="${menorActivo ? 'print-table-cell-active' : ''}">${nivel.porcentajes[fila.clave].menor3.toFixed(2)}%</td>
                                        <td class="${mayorActivo ? 'print-table-cell-active' : ''}">${nivel.porcentajes[fila.clave].mayor3.toFixed(2)}%</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </article>
            `;
        }).join('');

        const resumenIess = calculo.aporteIess?.porcentaje > 0
            ? `
                <section class="print-iess-detail">
                    <div>
                        <span>Aporte IESS aplicado</span>
                        <strong>${calculo.aporteIess.etiqueta} (${calculo.aporteIess.porcentaje.toFixed(2)}%)</strong>
                    </div>
                    <div>
                        <span>Descuento IESS</span>
                        <strong>-${formatoDolares(calculo.descuentoIess)}</strong>
                    </div>
                    <div>
                        <span>Base usada para el c&aacute;lculo</span>
                        <strong>${formatoDolares(calculo.baseCalculo)}</strong>
                    </div>
                </section>
            `
            : `
                <section class="print-iess-detail print-iess-detail-simple">
                    <div>
                        <span>Aporte IESS aplicado</span>
                        <strong>No aplica</strong>
                    </div>
                    <div>
                        <span>Base usada para el c&aacute;lculo</span>
                        <strong>${formatoDolares(calculo.baseCalculo)}</strong>
                    </div>
                </section>
            `;

        printReport.innerHTML = `
            <article class="print-page">
                <header class="print-header">
                    <img src="/logo-print.png" alt="Virtus Estudio Jur&iacute;dico">
                    <div>
                        <h1>C&aacute;lculo de Pensiones Alimenticias</h1>
                        <p>Herramienta referencial de Virtus Estudio Jur&iacute;dico</p>
                    </div>
                </header>

                <section class="print-summary">
                    <div>
                        <span>Ingresos del alimentante</span>
                        <strong>${formatoDolares(calculo.ingresos)}</strong>
                    </div>
                    <div>
                        <span>Nivel y porcentaje</span>
                        <strong>Nivel ${calculo.nivel} - ${calculo.porcentaje.toFixed(2)}%</strong>
                    </div>
                </section>

                ${resumenIess}

                <section class="print-section">
                    <h2>Hijos / cargas familiares registrados (${calculo.hijos.length})</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>N&deg;</th>
                                <th>Nombre del beneficiario</th>
                                <th>Rango de edad</th>
                                <th>Base individual</th>
                                <th>Adicional por discapacidad</th>
                            </tr>
                        </thead>
                        <tbody>${filasHijos}</tbody>
                    </table>
                </section>

                <section class="print-total">
                    <div>
                        <span>Total mensual a pagar</span>
                    </div>
                    <strong>${formatoDolares(calculo.total)}</strong>
                </section>

                <footer class="print-footer">
                    <span>Virtus Estudio Jur&iacute;dico</span>
                    <span>Bol&iacute;var y C. Belisario Quevedo, Salcedo</span>
                </footer>
            </article>

            <article class="print-page print-table-page">
                <header class="print-header print-header-centered">
                    <img src="/logo-print.png" alt="Virtus Estudio Jur&iacute;dico">
                    <div>
                        <h1>Tabla de Pensiones Alimenticias</h1>
                        <p>Actualizada al a&ntilde;o ${tablaPensiones2026.anio} &middot; Referencia aplicada al c&aacute;lculo</p>
                    </div>
                </header>

                <section class="print-official-tables">
                    ${tablasOficiales}
                </section>

                <footer class="print-footer">
                    <span>Virtus Estudio Jur&iacute;dico</span>
                    <span>Acuerdo ${tablaPensiones2026.acuerdo}</span>
                </footer>
            </article>
        `;
    };

    const imprimirCalculo = (calculo) => {
        if (!calculo) return;
        prepararReporteImpresion(calculo);
        window.print();
    };

    numHijosInput.addEventListener('input', () => {
        const cantidad = parseInt(numHijosInput.value, 10) || 0;
        edadesContainer.innerHTML = '';

        if (cantidad > 0) {
            edadesContainer.classList.remove('hidden');
            let html = '<h3>Edad de los hijos (indispensable para el cálculo)</h3>';

            for (let i = 1; i <= cantidad; i++) {
                html += `
                    <div class="edad-item">
                        <div class="hijo-numero">${i}</div>
                        <div class="hijo-campos">
                            <div>
                                <label for="nombre-hijo-${i}">Nombre:</label>
                                <input type="text" id="nombre-hijo-${i}" name="nombre-hijo-${i}" placeholder="Opcional">
                            </div>
                            <div>
                                <label for="edad-hijo-${i}">Rango de edad:</label>
                        <select id="edad-hijo-${i}" name="edad-hijo-${i}" required>
                            <option value="">Seleccione el rango de edad...</option>
                            <option value="menor3">0 a 2 años (11 meses 29 días)</option>
                            <option value="mayor3">3 años en adelante</option>
                        </select>
                            </div>
                        </div>
                        <div class="discapacidad-hijo hidden" data-hijo="${i}">
                            <label class="checkbox-label discapacidad-hijo-label">
                                <input type="checkbox" id="discapacidad-hijo-${i}" name="discapacidad-hijo-${i}">
                                <span class="custom-checkbox"></span>
                                Este alimentado tiene discapacidad
                            </label>
                            <div id="grado-discapacidad-hijo-${i}" class="discapacidad-detalle hidden">
                                <label for="grado-hijo-${i}">Grado de discapacidad:</label>
                                <select id="grado-hijo-${i}" name="grado-hijo-${i}">
                                    <option value="leve">30% - 49% de discapacidad</option>
                                    <option value="moderada">50% - 74% de discapacidad</option>
                                    <option value="severa">75% - 100% de discapacidad</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;
            }

            edadesContainer.innerHTML = html;
            sincronizarCamposDiscapacidad();
        } else {
            edadesContainer.classList.add('hidden');
        }
    });

    discapacidadInput.addEventListener('change', () => {
        sincronizarCamposDiscapacidad();

        if (!discapacidadInput.checked) {
            document.querySelectorAll('[id^="discapacidad-hijo-"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
            document.querySelectorAll('[id^="grado-discapacidad-hijo-"]').forEach((bloque) => {
                bloque.classList.add('hidden');
            });
        }
    });

    edadesContainer.addEventListener('change', (e) => {
        if (!e.target.matches('[id^="discapacidad-hijo-"]')) return;

        const numeroHijo = e.target.id.replace('discapacidad-hijo-', '');
        const gradoContainer = document.getElementById(`grado-discapacidad-hijo-${numeroHijo}`);
        gradoContainer.classList.toggle('hidden', !e.target.checked);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ingresos = parseFloat(document.getElementById('ingresos').value);
        const cantidadHijos = parseInt(numHijosInput.value, 10);
        const tieneDiscapacidad = discapacidadInput.checked;
        const aporteIess = aportesIess[aporteIessInput.value] || aportesIess.ninguno;

        if (isNaN(ingresos) || ingresos <= 0 || isNaN(cantidadHijos) || cantidadHijos <= 0) {
            alert('Por favor, ingrese valores válidos mayores a cero.');
            return;
        }

        let algunMayorA3 = false;
        for (let i = 1; i <= cantidadHijos; i++) {
            const edadSelect = document.getElementById(`edad-hijo-${i}`);
            if (!edadSelect || !edadSelect.value) {
                alert('Por favor, seleccione el rango de edad de todos los hijos.');
                return;
            }

            if (edadSelect.value === 'mayor3') {
                algunMayorA3 = true;
            }
        }

        const descuentoIess = (ingresos * aporteIess.porcentaje) / 100;
        const ingresoDespuesIess = ingresos - descuentoIess;
        const baseCalculo = Math.max(ingresoDespuesIess, tablaPensiones2026.sbu);
        const ingresoAjustadoAlSBU = ingresoDespuesIess < tablaPensiones2026.sbu;
        const relacionSBU = baseCalculo / tablaPensiones2026.sbu;
        const nivelAplicable = obtenerNivelAplicable(baseCalculo);
        const filaHijos = obtenerFilaPorNivel(nivelAplicable, cantidadHijos);
        const categoriaEdad = algunMayorA3 ? 'mayor3' : 'menor3';
        const porcentajeAplicable = nivelAplicable.porcentajes[filaHijos.clave][categoriaEdad];

        const pensionBase = (baseCalculo * porcentajeAplicable) / 100;

        let adicionalDiscapacidad = 0;
        const adicionalDiscapacidadPorHijo = Array(cantidadHijos).fill(0);
        const detalleDiscapacidadPorHijo = Array(cantidadHijos).fill(null);
        const discapacidadesAplicadas = [];
        if (tieneDiscapacidad) {
            for (let i = 1; i <= cantidadHijos; i++) {
                const discapacidadHijo = document.getElementById(`discapacidad-hijo-${i}`);
                if (!discapacidadHijo?.checked) continue;

                const grado = document.getElementById(`grado-hijo-${i}`).value;
                const reglaDiscapacidad = nivelAplicable.discapacidad[grado];
                const adicionalHijo = (tablaPensiones2026.sbu * reglaDiscapacidad.porcentajeSBU) / 100;
                adicionalDiscapacidad += adicionalHijo;
                adicionalDiscapacidadPorHijo[i - 1] = adicionalHijo;
                detalleDiscapacidadPorHijo[i - 1] = reglaDiscapacidad;
                discapacidadesAplicadas.push(`Hijo ${i}: ${reglaDiscapacidad.etiqueta}, ${reglaDiscapacidad.porcentajeSBU}% de 1 SBU (${formatoDolares(adicionalHijo)})`);
            }
        }

        const pensionMensual = pensionBase + adicionalDiscapacidad;
        const pensionBasePorHijo = pensionBase / cantidadHijos;
        const hijosCalculo = adicionalDiscapacidadPorHijo.map((adicionalHijo, index) => {
            const totalHijo = pensionBasePorHijo + adicionalHijo;
            const numeroHijo = index + 1;
            const nombreHijo = document.getElementById(`nombre-hijo-${numeroHijo}`)?.value.trim();
            const edadHijo = document.getElementById(`edad-hijo-${numeroHijo}`)?.value;
            return {
                nombre: nombreHijo || `Hijo ${numeroHijo}`,
                edadTexto: obtenerTextoEdad(edadHijo),
                base: pensionBasePorHijo,
                adicionalDiscapacidad: adicionalHijo,
                discapacidadDetalle: detalleDiscapacidadPorHijo[index],
                total: totalHijo
            };
        });

        const desglosePorHijo = hijosCalculo.map((hijo) => {
            if (hijo.adicionalDiscapacidad <= 0) {
                return `
                    <span class="hijo-resumen">
                        <span>${hijo.nombre} (${hijo.edadTexto})</span>
                        <strong>${formatoDolares(hijo.total)}</strong>
                    </span>
                `;
            }

            return `
                <span class="hijo-resumen">
                    <span>${hijo.nombre} (${hijo.edadTexto})</span>
                    <strong>${formatoDolares(hijo.total)}</strong>
                    <small>Base ${formatoDolares(hijo.base)} + discapacidad ${formatoDolares(hijo.adicionalDiscapacidad)}</small>
                </span>
            `;
        }).join('');
        const lineaBaseCalculo = ingresoAjustadoAlSBU
            ? `<li><span>Base de cálculo:</span> <strong>${formatoDolares(baseCalculo)} (mínimo legal: 1 SBU)</strong></li>`
            : '';
        const lineaIess = aporteIess.porcentaje > 0
            ? `
                <li><span>Aporte IESS aplicado:</span> <strong>${aporteIess.etiqueta} (${aporteIess.porcentaje.toFixed(2)}%)</strong></li>
                <li><span>Descuento IESS:</span> <strong>-${formatoDolares(descuentoIess)}</strong></li>
                <li><span>Ingreso neto para cálculo:</span> <strong>${formatoDolares(ingresoDespuesIess)}</strong></li>
            `
            : '<li><span>Aporte IESS aplicado:</span> <strong>No aplica</strong></li>';
        const lineaDiscapacidad = adicionalDiscapacidad > 0
            ? `<li><span>Adicional por discapacidad:</span> <strong>${formatoDolares(adicionalDiscapacidad)}</strong></li>`
            : '';

        resultadoValor.textContent = formatoDolares(pensionMensual);
        ultimoCalculo = {
            fecha: new Date().toLocaleString('es-EC'),
            ingresos,
            aporteIess,
            descuentoIess,
            ingresoDespuesIess,
            baseCalculo,
            ingresoAjustadoAlSBU,
            textoCantidadHijos: obtenerTextoCantidadHijos(cantidadHijos),
            nivel: nivelAplicable.nivel,
            filaClave: filaHijos.clave,
            edadClave: categoriaEdad,
            relacionSBU,
            porcentaje: porcentajeAplicable,
            adicionalDiscapacidad,
            total: pensionMensual,
            hijos: hijosCalculo
        };

        renderizarTablaOficial(ultimoCalculo);

        detallesContainer.innerHTML = `
            <ul>
                <li><span>Ingreso mensual:</span> <strong>${formatoDolares(ingresos)}</strong></li>
                ${lineaIess}
                ${lineaBaseCalculo}
                <li><span>Hijos considerados:</span> <strong>${obtenerTextoCantidadHijos(cantidadHijos)}</strong></li>
                <li><span>Nivel aplicado:</span> <strong>Nivel ${nivelAplicable.nivel} (${relacionSBU.toFixed(2)} SBU)</strong></li>
                <li><span>Porcentaje usado:</span> <strong>${porcentajeAplicable.toFixed(2)}%</strong></li>
                ${lineaDiscapacidad}
                <li class="li-desglose-hijos"><span>Referencia por hijo:</span> <strong>${desglosePorHijo}</strong></li>
                <li><span>Total mensual estimado:</span> <strong>${formatoDolares(pensionMensual)}</strong></li>
            </ul>
            <p class="resultado-fuente">
                Cálculo basado en el SBU ${tablaPensiones2026.anio} (${formatoDolares(tablaPensiones2026.sbu)}) y el Acuerdo ${tablaPensiones2026.acuerdo}.
            </p>
        `;

        resultadoContainer.classList.remove('hidden');
        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    renderizarTablaOficial();

    descargarCalculoBtn.addEventListener('click', () => {
        imprimirCalculo(ultimoCalculo);
    });
});
