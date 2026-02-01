"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUniverseStore } from "@/lib/store";
import type { CuerpoEstelarCompleto } from "@/lib/sistemaSolarData";

/**
 * Hook para cargar datos completos del Sistema Solar desde Firebase
 */
export function useSistemaSolarCompleto() {
	const { setUniverseData, setLoading } = useUniverseStore();
	const [datosCompletos, setDatosCompletos] = useState<Record<string, CuerpoEstelarCompleto>>({});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				console.log("🌌 Cargando Sistema Solar completo desde Firebase...");
				
				const querySnapshot = await getDocs(collection(db, "sistemaSolar"));
				const datosDB: Record<string, CuerpoEstelarCompleto> = {};
				const datosVisualizacion: Record<string, any> = {};
				
				querySnapshot.forEach((doc) => {
					const data = doc.data() as CuerpoEstelarCompleto;
					datosDB[doc.id] = data;
					
					// Mapear a estructura de visualización 3D
					const visualData = mapearParaVisualizacion(data);
					datosVisualizacion[doc.id] = visualData;
				});
				
				setDatosCompletos(datosDB);
				setUniverseData(datosVisualizacion);
				
				console.log("✨ Sistema Solar cargado:", Object.keys(datosDB));
			} catch (err) {
				console.error("❌ Error cargando Sistema Solar:", err);
				setError("No se pudo cargar el Sistema Solar");
				setLoading(false);
			}
		}

		fetchData();
	}, [setUniverseData, setLoading]);

	return { datosCompletos, error };
}

/**
 * Mapea los datos completos a la estructura simplificada para visualización 3D
 */
function mapearParaVisualizacion(data: CuerpoEstelarCompleto) {
	// Escalado logarítmico para visualización
	let size = 1;
	let dist = 10;
	
	const r = data.fisicas.diametroKm / 2; // Radio
	const d = data.orbitales.distanciaSolUA;
	
	if (data.id === 'sol') {
		size = 12; // Sun should be very imposing
		dist = 0;
	} else if (data.parent) {
		// Satélites (ej: Luna)
		if (data.id === 'caronte') {
			// Special case for Charon to maintain ~1:2 ratio with Pluto (binary system)
			size = (Math.log10(r) * 0.6) - 0.85;
		} else {
			size = (Math.log10(r) * 0.1875) - 0.325;
		}
		if (size < 0.1) size = 0.1; 
		dist = data.orbitales.distanciaSolUA * 1000;
	} else {
		// Planetas y Planetas Enanos
		size = (Math.log10(r) * 0.6) + 0.1;
		dist = data.orbitales.distanciaSolUA;
	}

	return {
		name: data.identificacion.nombre,
		color: obtenerColorHex(data.apariencia.colorDominante),
		size: size,
		dist: dist,
		category: data.identificacion.categoria,
		desc: data.educativo.descripcionNinos,
		type: data.type || data.identificacion.categoria,
		grav: `${data.fisicas.gravedad} m/s²`,
		orbit: `${Math.round(data.orbitales.periodoOrbitalDias)} días`,
		parent: data.parent,
		funFact: data.educativo.datosCuriosos[0] || "Dato curioso no disponible",
		// Datos adicionales para panel educativo
		simbolo: data.identificacion.simbolo,
		temperaturaMedia: data.fisicas.temperaturaMedia,
		masa: data.fisicas.masa,
		satelites: data.satelites,
		descubrimiento: data.identificacion.descubrimiento,
		datosCuriosos: data.educativo.datosCuriosos,
		relieveNotable: data.apariencia.relieveNotable,
		orbitalElements: {
			semiMajorAxis: data.orbitales.distanciaSolUA,
			eccentricity: data.orbitales.excentricidad,
			inclination: data.orbitales.inclinacionOrbital,
			ascendingNode: data.orbitales.longitudNodoAscendente,
			argumentOfPerihelion: data.orbitales.argumentoPerihelio,
			meanAnomalyAtEpoch: data.orbitales.anomaliaMediaJ2000,
			periodDays: data.orbitales.periodoOrbitalDias || 1, // Avoid division by zero
			rotationPeriodHours: data.orbitales.periodoRotacionHoras,
			inclinacionAxial: data.orbitales.inclinacionAxial
		}
	};
}

/**
 * Convierte descripción de color a código hexadecimal
 */
function obtenerColorHex(colorDesc: string): number {
	const coloresBase: Record<string, number> = {
		'blanco': 0xFFFFFF,
		'amarillo': 0xFFCC00,
		'gris': 0xA5A5A5,
		'rojo': 0xE27B58,
		'azul': 0x2E8BC0,
		'naranja': 0xF97316,
		'verde': 0x22C55E
	};

	const colorLower = colorDesc.toLowerCase();
	
	for (const [clave, valor] of Object.entries(coloresBase)) {
		if (colorLower.includes(clave)) {
			return valor;
		}
	}
	
	// Casos específicos
	if (colorLower.includes('verde')) return 0xB2FFFF;
	if (colorLower.includes('profundo')) return 0x3E54E8;
	
	return 0xFFFFFF; // Blanco por defecto
}
