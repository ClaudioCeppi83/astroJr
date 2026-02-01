// Estructura completa de datos para la base de datos educativa del Sistema Solar

export interface Identificacion {
	nombre: string;
	simbolo: string;
	categoria: string;
	descubrimiento: {
		quien: string;
		fecha: string;
		lugar: string;
	};
	origenNombre: string;
}

export interface Fisicas {
	diametroKm: number;
	masa: string;
	densidad: string;
	gravedad: number;
	atmosfera: {
		composicion: string[];
		presion: string;
	};
	temperaturaMin: number;
	temperaturaMedia: number;
	temperaturaMax: number;
	albedo: number;
	velocidadEscape: string;
}

export interface Orbitales {
	periodoOrbitalDias: number;
	periodoRotacionHoras: number;
	inclinacionAxial: number;
	distanciaSolUA: number;
	distanciaSolKm: number;
	velocidadOrbital: string;
	excentricidad: number;
	inclinacionOrbital: number;    // deg
	longitudNodoAscendente: number; // deg
	argumentoPerihelio: number;     // deg
	anomaliaMediaJ2000: number;     // deg at J2000 epoch
}

export interface Apariencia {
	albedo: number;
	colorDominante: string;
	relieveNotable: string[];
}

export interface Educativo {
	descripcionNinos: string;
	datosCuriosos: string[];
	comparaciones: string;
}

export interface FenomenosFisicos {
	campoMagnetico?: {
		intensidad: string;
		descripcion: string;
	};
	resonanciaOrbital?: string;
	fenomenosLuz?: string[];
}

export interface CuerpoEstelarCompleto {
	id: string;
	identificacion: Identificacion;
	fisicas: Fisicas;
	orbitales: Orbitales;
	apariencia: Apariencia;
	educativo: Educativo;
	fenomenosFisicos?: FenomenosFisicos;
	satelites?: number;
	parent?: string;
	type?: string;
}

// Datos completos del sistema solar
export const SISTEMA_SOLAR_COMPLETO: CuerpoEstelarCompleto[] = [
	{
		id: 'sol',
		identificacion: {
			nombre: 'Sol',
			simbolo: '☉',
			categoria: 'Estrella de tipo espectral G2V (enana amarilla)',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Prehistoria',
				lugar: 'Tierra'
			},
			origenNombre: "Proviene del latín 'sol, solis', asociado al dios 'Sol invictus' y la raíz protoindoeuropea 'sauel' (luz)"
		},
		fisicas: {
			diametroKm: 1391016,
			masa: '1.9891 × 10^30 kg',
			densidad: '1411 kg/m³',
			gravedad: 274,
			atmosfera: {
				composicion: ['Hidrógeno (73.46%)', 'Helio (24.85%)', 'Oxígeno (0.78%)', 'Carbono (0.30%)', 'Hierro (0.16%)', 'Neón (0.12%)', 'Nitrógeno (0.09%)'],
				presion: 'Carece de superficie sólida; la fotosfera actúa como superficie aparente'
			},
			temperaturaMin: 5778,
			temperaturaMedia: 5778,
			temperaturaMax: 15000000,
			albedo: 0,
			velocidadEscape: '617.5 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 0,
			periodoRotacionHoras: 654.6,
			inclinacionAxial: 7.25,
			distanciaSolUA: 0,
			distanciaSolKm: 0,
			velocidadOrbital: '220 km/s (alrededor del centro galáctico)',
			excentricidad: 0,
			inclinacionOrbital: 0,
			longitudNodoAscendente: 0,
			argumentoPerihelio: 0,
			anomaliaMediaJ2000: 0
		},
		apariencia: {
			albedo: 0,
			colorDominante: 'Blanco (amarillento desde la Tierra por dispersión atmosférica)',
			relieveNotable: ['Manchas solares', 'Gránulos fotosféricos', 'Prominencias solares', 'Corona solar']
		},
		educativo: {
			descripcionNinos: 'Es una bola gigante y brillante de gas caliente que se encuentra en el centro de nuestro sistema. Nos da la luz y la energía necesaria para que existan las plantas, los animales y nosotros.',
			datosCuriosos: [
				'Contiene el 99.86% de toda la masa del sistema solar',
				'Su luz tarda unos 8 minutos y 20 segundos en viajar hasta nosotros',
				'En el futuro se inflará y se convertirá en una gigante roja',
				'Cada segundo convierte 4 millones de toneladas de materia en energía pura'
			],
			comparaciones: 'Su diámetro es 109 veces más grande que el de la Tierra'
		},
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: 'Variable, 1-100 gauss',
				descripcion: 'Genera el viento solar y protege el sistema de rayos cósmicos'
			}
		}
	},
	{
		id: 'mercurio',
		identificacion: {
			nombre: 'Mercurio',
			simbolo: '☿',
			categoria: 'Planeta interior (rocoso)',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Antes del 3000 a.C.',
				lugar: 'Mesopotamia'
			},
			origenNombre: 'En honor al dios romano Mercurio, el mensajero de los dioses'
		},
		fisicas: {
			diametroKm: 4879.4,
			masa: '3.302 × 10^23 kg',
			densidad: '5.43 g/cm³',
			gravedad: 3.7,
			atmosfera: {
				composicion: ['Potasio', 'Sodio', 'Oxígeno atómico', 'Argón', 'Helio'],
				presion: 'Casi nula (exosfera tenue)'
			},
			temperaturaMin: -183,
			temperaturaMedia: 166,
			temperaturaMax: 427,
			albedo: 0.11,
			velocidadEscape: '4.25 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 87.969,
			periodoRotacionHoras: 1407.6,
			inclinacionAxial: 0.034,
			distanciaSolUA: 0.387098,
			distanciaSolKm: 57909227,
			velocidadOrbital: '47.36 km/s',
			excentricidad: 0.205630,
			inclinacionOrbital: 7.004,
			longitudNodoAscendente: 48.331,
			argumentoPerihelio: 29.124,
			anomaliaMediaJ2000: 174.796
		},
		apariencia: {
			albedo: 0.11,
			colorDominante: 'Gris plateado, similar a la Luna',
			relieveNotable: ['Cuenca de Caloris', 'Planicies de lava', 'Cráteres de impacto', 'Pliegues de compresión']
		},
		educativo: {
			descripcionNinos: 'Es el planeta más pequeño y el que está más cerquita del Sol. ¡Se mueve muy rápido por el espacio!',
			datosCuriosos: [
				'En Mercurio ocurren amaneceres dobles donde el Sol sale, retrocede y vuelve a salir',
				'Tiene resonancia orbital 3:2, rotando tres veces cada dos órbitas',
				'Es el segundo planeta más denso después de la Tierra',
				'Un día en Mercurio dura 176 días terrestres'
			],
			comparaciones: 'Tiene un diámetro que es apenas el 38% del de la Tierra'
		},
		fenomenosFisicos: {
			resonanciaOrbital: 'Resonancia 3:2 con su periodo de traslación'
		}
	},
	{
		id: 'venus',
		identificacion: {
			nombre: 'Venus',
			simbolo: '♀',
			categoria: 'Planeta interior (rocoso)',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Antes del 1600 a.C.',
				lugar: 'Babilonia'
			},
			origenNombre: 'En honor a Venus, la diosa romana del amor y la belleza'
		},
		fisicas: {
			diametroKm: 12103.6,
			masa: '4.868 × 10^24 kg',
			densidad: '5.243 g/cm³',
			gravedad: 8.87,
			atmosfera: {
				composicion: ['Dióxido de carbono (96.5%)', 'Nitrógeno (3.5%)', 'Trazas de SO₂ y ácido sulfúrico'],
				presion: '92 atm (equivalente a 1 km bajo el mar terrestre)'
			},
			temperaturaMin: 462,
			temperaturaMedia: 464,
			temperaturaMax: 480,
			albedo: 0.76,
			velocidadEscape: '10.36 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 224.701,
			periodoRotacionHoras: 5832.5,
			inclinacionAxial: 177.36,
			distanciaSolUA: 0.723332,
			distanciaSolKm: 108209475,
			velocidadOrbital: '35.02 km/s',
			excentricidad: 0.006772,
			inclinacionOrbital: 3.39471,
			longitudNodoAscendente: 76.68069,
			argumentoPerihelio: 54.85229,
			anomaliaMediaJ2000: 50.115
		},
		apariencia: {
			albedo: 0.76,
			colorDominante: 'Amarillo blanquecino (nubes de ácido sulfúrico)',
			relieveNotable: ['Volcanes (Maat Mons)', 'Montañas Maxwell Montes', 'Llanuras volcánicas', 'Coronas (estructuras circulares)']
		},
		educativo: {
			descripcionNinos: 'Es el planeta más caliente de todos porque sus nubes espesas atrapan el calor como una manta. Se ve muy brillante en el cielo, ¡parece una estrella!',
			datosCuriosos: [
				'Gira al revés que la mayoría de los planetas (rotación retrógrada)',
				'Un día en Venus es más largo que un año venusiano',
				'Llueve ácido sulfúrico pero se evapora antes de tocar el suelo',
				'Es el planeta más brillante visto desde la Tierra'
			],
			comparaciones: 'Es casi del mismo tamaño que la Tierra, con un 95% de su diámetro'
		},
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: 'Prácticamente inexistente',
				descripcion: 'No tiene magnetosfera significativa'
			}
		}
	},
	{
		id: 'tierra',
		identificacion: {
			nombre: 'Tierra',
			simbolo: '🜨 o ⊕',
			categoria: 'Planeta interior (rocoso)',
			descubrimiento: {
				quien: 'Hogar de la humanidad',
				fecha: 'Conocida desde siempre',
				lugar: 'N/A'
			},
			origenNombre: "Del latín 'Terra', y del griego 'Gea' (madre tierra)"
		},
		fisicas: {
			diametroKm: 12742,
			masa: '5.972 × 10^24 kg',
			densidad: '5.514 g/cm³',
			gravedad: 9.80665,
			atmosfera: {
				composicion: ['Nitrógeno (78%)', 'Oxígeno (21%)', 'Argón (0.93%)', 'CO₂ (0.04%)', 'Vapor de agua (variable)'],
				presion: '1 atm (101.325 kPa)'
			},
			temperaturaMin: -89,
			temperaturaMedia: 15,
			temperaturaMax: 56,
			albedo: 0.30,
			velocidadEscape: '11.19 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 365.256363,
			periodoRotacionHoras: 23.934,
			inclinacionAxial: 23.44,
			distanciaSolUA: 1.00000011,
			distanciaSolKm: 149598023,
			velocidadOrbital: '29.78 km/s',
			excentricidad: 0.01671022,
			inclinacionOrbital: 0.00005,
			longitudNodoAscendente: -11.26064,
			argumentoPerihelio: 102.94719,
			anomaliaMediaJ2000: 100.46435
		},
		apariencia: {
			albedo: 0.30,
			colorDominante: 'Azul (por los océanos) con nubes blancas y continentes verdes/marrones',
			relieveNotable: ['Monte Everest (8,849 m)', 'Fosa de las Marianas (-11,034 m)', 'Grandes océanos', 'Continentes con biosfera']
		},
		educativo: {
			descripcionNinos: '¡Es nuestro hogar! El Planeta Azul, el único lugar que conocemos donde viven plantas, animales y personas. Tiene mucha agua y aire para respirar.',
			datosCuriosos: [
				'La Tierra no es una esfera perfecta, está un poco aplastada en los polos',
				'El 70.8% de su superficie está cubierta de agua',
				'Es el único planeta donde se conoce vida',
				'La Luna causa las mareas en nuestros océanos'
			],
			comparaciones: 'Es el planeta terrestre más grande y el quinto del sistema solar'
		},
		satelites: 1,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: '25-65 μT',
				descripcion: 'Protege de la radiación solar y permite las auroras'
			},
			fenomenosLuz: ['Eclipses solares', 'Eclipses lunares', 'Auroras boreales y australes']
		}
	},
	{
		id: 'luna',
		parent: 'tierra',
		identificacion: {
			nombre: 'Luna',
			simbolo: '☽',
			categoria: 'Satélite natural',
			descubrimiento: {
				quien: 'Conocida desde la antigüedad',
				fecha: 'Prehistoria',
				lugar: 'Visible desde la Tierra'
			},
			origenNombre: "Del latín 'luna' (la luminosa)"
		},
		fisicas: {
			diametroKm: 3474.8,
			masa: '7.349 × 10^22 kg',
			densidad: '3.34 g/cm³',
			gravedad: 1.62,
			atmosfera: {
				composicion: ['Helio', 'Argón', 'Sodio', 'Potasio (trazas)'],
				presion: 'Casi nula (10^-15 atm)'
			},
			temperaturaMin: -233,
			temperaturaMedia: -20,
			temperaturaMax: 123,
			albedo: 0.12,
			velocidadEscape: '2.38 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 27.32166,
			periodoRotacionHoras: 655.72,
			inclinacionAxial: 6.68,
			distanciaSolUA: 0.00257, // Real distance Earth-Moon in UA
			distanciaSolKm: 384400,
			velocidadOrbital: '1.022 km/s',
			excentricidad: 0.0549,
			inclinacionOrbital: 18.3, // Angle relative to Earth's equator (~5.1° from ecliptic)
			longitudNodoAscendente: 125.08,
			argumentoPerihelio: 318.15,
			anomaliaMediaJ2000: 135.27
		},
		apariencia: {
			albedo: 0.12,
			colorDominante: 'Gris blanquecino',
			relieveNotable: ['Mares lunares (llanuras volcánicas)', 'Cráter Tycho', 'Montañas brillantes', 'Mare Tranquillitatis']
		},
		educativo: {
			descripcionNinos: 'Es nuestra vecina más cercana en el espacio. Siempre nos mira con la misma cara y brilla por la noche reflejando la luz del Sol.',
			datosCuriosos: [
				'La Luna se aleja de la Tierra unos 3.8 cm cada año',
				'Su gravedad es la que causa las mareas en los océanos',
				'Es el único lugar fuera de la Tierra donde han caminado seres humanos',
				'Siempre muestra la misma cara a la Tierra (rotación síncrona)'
			],
			comparaciones: 'Su diámetro es un cuarto del de la Tierra'
		},
		fenomenosFisicos: {
			resonanciaOrbital: 'Rotación síncrona 1:1 con la Tierra',
			fenomenosLuz: ['Eclipses solares (vista desde la Tierra)', 'Fases lunares']
		}
	},
	{
		id: 'marte',
		identificacion: {
			nombre: 'Marte',
			simbolo: '♂',
			categoria: 'Planeta interior (rocoso)',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Antes del 2000 a.C.',
				lugar: 'Egipto y Babilonia'
			},
			origenNombre: 'En honor a Marte, el dios romano de la guerra'
		},
		fisicas: {
			diametroKm: 6794.4,
			masa: '6.4185 × 10^23 kg',
			densidad: '3.9335 g/cm³',
			gravedad: 3.72,
			atmosfera: {
				composicion: ['Dióxido de carbono (95.32%)', 'Nitrógeno (2.7%)', 'Argón (1.6%)', 'Oxígeno (0.13%)'],
				presion: '0.007 atm'
			},
			temperaturaMin: -153,
			temperaturaMedia: -46,
			temperaturaMax: 20,
			albedo: 0.15,
			velocidadEscape: '5.027 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 686.971,
			periodoRotacionHoras: 24.6597,
			inclinacionAxial: 25.19,
			distanciaSolUA: 1.523679,
			distanciaSolKm: 227392100,
			velocidadOrbital: '24.077 km/s',
			excentricidad: 0.09341233,
			inclinacionOrbital: 1.85061,
			longitudNodoAscendente: 49.57854,
			argumentoPerihelio: 286.4623,
			anomaliaMediaJ2000: 19.3564
		},
		apariencia: {
			albedo: 0.15,
			colorDominante: 'Rojo-anaranjado (por óxido de hierro)',
			relieveNotable: ['Monte Olimpo (volcán más alto del sistema solar)', 'Valles Marineris (cañón gigante)', 'Casquetes polares de hielo', 'Dunas de arena']
		},
		educativo: {
			descripcionNinos: 'El Planeta Rojo, lleno de polvo oxidado y rocas. Tiene el volcán más grande de todo el sistema solar y tormentas de arena gigantes.',
			datosCuriosos: [
				'El Monte Olimpo es tres veces más alto que el Everest (21-26 km)',
				'Tiene tormentas de polvo que pueden cubrir todo el planeta',
				'Los días en Marte duran casi igual que en la Tierra',
				'Tiene dos pequeñas lunas: Fobos y Deimos'
			],
			comparaciones: 'Su diámetro es aproximadamente la mitad del de la Tierra'
		},
		satelites: 2,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: 'Débil y localizado',
				descripcion: 'Solo quedan remanentes magnéticos en la corteza'
			}
		}
	},
	{
		id: 'jupiter',
		identificacion: {
			nombre: 'Júpiter',
			simbolo: '♃',
			categoria: 'Planeta gigante gaseoso',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Antes del 1000 a.C.',
				lugar: 'Babilonia'
			},
			origenNombre: 'En honor a Júpiter, rey de los dioses romanos'
		},
		fisicas: {
			diametroKm: 142984,
			masa: '1.899 × 10^27 kg',
			densidad: '1.326 g/cm³',
			gravedad: 24.79,
			atmosfera: {
				composicion: ['Hidrógeno (89.8%)', 'Helio (10.2%)', 'Metano', 'Amoníaco', 'Vapor de agua'],
				presion: 'Variable con la profundidad'
			},
			temperaturaMin: -161,
			temperaturaMedia: -110,
			temperaturaMax: 24000,
			albedo: 0.52,
			velocidadEscape: '59.54 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 4332.59,
			periodoRotacionHoras: 9.925,
			inclinacionAxial: 3.13,
			distanciaSolUA: 5.204267,
			distanciaSolKm: 778500000,
			velocidadOrbital: '13.07 km/s',
			excentricidad: 0.04839266,
			inclinacionOrbital: 1.3053,
			longitudNodoAscendente: 100.55615,
			argumentoPerihelio: 273.8777,
			anomaliaMediaJ2000: 18.818
		},
		apariencia: {
			albedo: 0.52,
			colorDominante: 'Bandas naranjas, blancas y marrones',
			relieveNotable: ['Gran Mancha Roja (tormenta gigante)', 'Bandas de nubes', 'Anillos tenues', 'Óvalos atmosféricos']
		},
		educativo: {
			descripcionNinos: 'El rey de los planetas, ¡es el más grande de todos! Es una bola gigante de gas con tormentas que duran siglos, como la Gran Mancha Roja.',
			datosCuriosos: [
				'Gira tan rápido que el día dura menos de 10 horas',
				'La Gran Mancha Roja es una tormenta más grande que la Tierra',
				'Tiene 97 lunas conocidas',
				'Su masa es mayor que la de todos los demás planetas juntos'
			],
			comparaciones: 'Podría contener 1,300 Tierras en su interior'
		},
		satelites: 97,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: '4.28 gauss (el más fuerte del sistema solar)',
				descripcion: 'Genera auroras espectaculares y un potente cinturón de radiación'
			}
		}
	},
	{
		id: 'saturno',
		identificacion: {
			nombre: 'Saturno',
			simbolo: '♄',
			categoria: 'Planeta gigante gaseoso',
			descubrimiento: {
				quien: 'Conocido desde la antigüedad',
				fecha: 'Antes del 700 a.C.',
				lugar: 'Asiria'
			},
			origenNombre: 'En honor a Saturno, dios romano de la agricultura'
		},
		fisicas: {
			diametroKm: 120536,
			masa: '5.683 × 10^26 kg',
			densidad: '0.687 g/cm³',
			gravedad: 10.44,
			atmosfera: {
				composicion: ['Hidrógeno (96.3%)', 'Helio (3.25%)', 'Metano', 'Amoníaco'],
				presion: 'Variable'
			},
			temperaturaMin: -191,
			temperaturaMedia: -140,
			temperaturaMax: 11700,
			albedo: 0.47,
			velocidadEscape: '35.5 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 10759.22,
			periodoRotacionHoras: 10.656,
			inclinacionAxial: 26.73,
			distanciaSolUA: 9.53707,
			distanciaSolKm: 1426725400,
			velocidadOrbital: '9.69 km/s',
			excentricidad: 0.0541506,
			inclinacionOrbital: 2.48446,
			longitudNodoAscendente: 113.715,
			argumentoPerihelio: 339.392,
			anomaliaMediaJ2000: 320.34675
		},
		apariencia: {
			albedo: 0.47,
			colorDominante: 'Amarillo pálido con bandas',
			relieveNotable: ['Sistema de anillos espectacular', 'Hexágono en el polo norte', 'Bandas atmosféricas', 'Tormentas ovales']
		},
		educativo: {
			descripcionNinos: 'Es famoso por sus hermosos anillos brillantes hechos de hielo y rocas. Es muy ligero, ¡si hubiera una bañera gigante, Saturno flotaría!',
			datosCuriosos: [
				'Es menos denso que el agua',
				'Sus anillos tienen millones de fragmentos de hielo',
				'Tiene un hexágono gigante en su polo norte',
				'Posee más de 140 lunas conocidas'
			],
			comparaciones: 'Es el segundo planeta más grande después de Júpiter'
		},
		satelites: 146,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: '0.2 gauss',
				descripcion: 'Más débil que el de Júpiter pero aún sustancial'
			}
		}
	},
	{
		id: 'urano',
		identificacion: {
			nombre: 'Urano',
			simbolo: '♅',
			categoria: 'Planeta gigante helado',
			descubrimiento: {
				quien: 'William Herschel',
				fecha: '13 de marzo de 1781',
				lugar: 'Bath, Inglaterra'
			},
			origenNombre: 'En honor a Urano, dios griego del cielo'
		},
		fisicas: {
			diametroKm: 51118,
			masa: '8.686 × 10^25 kg',
			densidad: '1.274 g/cm³',
			gravedad: 8.69,
			atmosfera: {
				composicion: ['Hidrógeno (83%)', 'Helio (15%)', 'Metano (2%)', 'Amoníaco (0.01%)'],
				presion: 'Variable'
			},
			temperaturaMin: -224,
			temperaturaMedia: -205,
			temperaturaMax: 4727,
			albedo: 0.30,
			velocidadEscape: '21.3 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 30685.4,
			periodoRotacionHoras: 17.24,
			inclinacionAxial: 97.77,
			distanciaSolUA: 19.19126,
			distanciaSolKm: 2870972200,
			velocidadOrbital: '6.81 km/s',
			excentricidad: 0.04716771,
			inclinacionOrbital: 0.772556,
			longitudNodoAscendente: 74.22988,
			argumentoPerihelio: 96.73436,
			anomaliaMediaJ2000: 142.9557
		},
		apariencia: {
			albedo: 0.30,
			colorDominante: 'Azul verdoso (por metano en la atmósfera)',
			relieveNotable: ['Anillos oscuros', 'Atmósfera uniforme', 'Manchas nubosas tenues']
		},
		educativo: {
			descripcionNinos: 'Un gigante de hielo de color azul clarito. Es muy curioso porque gira de lado, como si estuviera rodando por el espacio.',
			datosCuriosos: [
				'Es el planeta con la atmósfera más fría del sistema solar',
				'Gira casi completamente de lado (97.7°)',
				'Sus estaciones duran 21 años cada una',
				'Fue el primer planeta descubierto con un telescopio'
			],
			comparaciones: 'Es cuatro veces más grande que la Tierra'
		},
		satelites: 29,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: '0.23 gauss',
				descripcion: 'Inclinado 59° respecto al eje de rotación'
			}
		}
	},
	{
		id: 'neptuno',
		identificacion: {
			nombre: 'Neptuno',
			simbolo: '♆',
			categoria: 'Planeta gigante helado',
			descubrimiento: {
				quien: 'Johann Galle y Urbain Le Verrier',
				fecha: '23 de septiembre de 1846',
				lugar: 'Observatorio de Berlín'
			},
			origenNombre: 'En honor a Neptuno, dios romano del mar'
		},
		fisicas: {
			diametroKm: 49528,
			masa: '1.024 × 10^26 kg',
			densidad: '1.638 g/cm³',
			gravedad: 11.15,
			atmosfera: {
				composicion: ['Hidrógeno (>84%)', 'Helio (>12%)', 'Metano (2%)', 'Amoníaco (0.01%)'],
				presion: 'Variable'
			},
			temperaturaMin: -235,
			temperaturaMedia: -220,
			temperaturaMax: 7000,
			albedo: 0.41,
			velocidadEscape: '23.71 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 60190.03,
			periodoRotacionHoras: 16.11,
			inclinacionAxial: 28.32,
			distanciaSolUA: 30.06896,
			distanciaSolKm: 4498252900,
			velocidadOrbital: '5.43 km/s',
			excentricidad: 0.00858587,
			inclinacionOrbital: 1.767975,
			longitudNodoAscendente: 131.7217,
			argumentoPerihelio: 273.24966,
			anomaliaMediaJ2000: 267.7672
		},
		apariencia: {
			albedo: 0.41,
			colorDominante: 'Azul profundo (por metano)',
			relieveNotable: ['Gran Mancha Oscura', 'Nubes blancas', 'Anillos tenues', 'Vientos supersónicos']
		},
		educativo: {
			descripcionNinos: 'El planeta más lejano y ventoso, de un color azul intenso. Allí soplan los vientos más fuertes de todo el sistema solar.',
			datosCuriosos: [
				'Tiene los vientos más rápidos del sistema solar (2,100 km/h)',
				'Llueven diamantes en su interior debido a la presión extrema',
				'Es tan lejano que tarda 165 años terrestres en dar una vuelta al Sol',
				'Fue descubierto mediante cálculos matemáticos antes de ser visto'
			],
			comparaciones: 'Es casi del mismo tamaño que Urano'
		},
		satelites: 16,
		fenomenosFisicos: {
			campoMagnetico: {
				intensidad: '0.14 gauss',
				descripcion: 'Inclinado 47° respecto al eje de rotación'
			}
		}
	},
	{
		id: 'fobos',
		parent: 'marte',
		identificacion: {
			nombre: 'Fobos',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Asaph Hall', fecha: '1877', lugar: 'Washington' },
			origenNombre: 'Hijo de Ares (Marte), significa Miedo'
		},
		fisicas: {
			diametroKm: 22.2,
			masa: '1.0659 × 10^16 kg',
			densidad: '1.876 g/cm³',
			gravedad: 0.0057,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -112, temperaturaMedia: -40, temperaturaMax: -4,
			albedo: 0.071,
			velocidadEscape: '11.39 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 6.898, // Normalized relative to Moon speed
			periodoRotacionHoras: 165.55, // Synchronous with normalized orbit
			inclinacionAxial: 0,
			distanciaSolUA: 0.000062,
			distanciaSolKm: 9377,
			velocidadOrbital: '2.138 km/s',
			excentricidad: 0.0151,
			inclinacionOrbital: 1.093,
			longitudNodoAscendente: 45, argumentoPerihelio: 0, anomaliaMediaJ2000: 45
		},
		apariencia: {
			albedo: 0.071,
			colorDominante: 'Gris oscuro carbonáceo',
			relieveNotable: ['Cráter Stickney', 'Surcos superficiales']
		},
		educativo: {
			descripcionNinos: 'Una luna con forma de patata que orbita muy cerca de Marte. ¡Está tan cerca que sale y se pone dos veces al día!',
			datosCuriosos: [
				'Se está acercando a Marte y algún día chocará o se romperá',
				'Tiene un cráter gigante llamado Stickney que casi la partió en dos',
				'Es una de las lunas menos reflectantes del sistema solar'
			],
			comparaciones: 'Es mucho más pequeña que nuestra Luna, ¡cabría dentro de una ciudad!'
		}
	},
	{
		id: 'deimos',
		parent: 'marte',
		identificacion: {
			nombre: 'Deimos',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Asaph Hall', fecha: '1877', lugar: 'Washington' },
			origenNombre: 'Hijo de Ares (Marte), significa Terror'
		},
		fisicas: {
			diametroKm: 12.4,
			masa: '1.4762 × 10^15 kg',
			densidad: '1.471 g/cm³',
			gravedad: 0.003,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -112, temperaturaMedia: -40, temperaturaMax: -4,
			albedo: 0.068,
			velocidadEscape: '5.55 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 21.32, // Normalized to Moon speed (slowest)
			periodoRotacionHoras: 655.72, // Synchronous with Moon speed
			inclinacionAxial: 0,
			distanciaSolUA: 0.00015,
			distanciaSolKm: 23460,
			velocidadOrbital: '1.351 km/s',
			excentricidad: 0.0002,
			inclinacionOrbital: 0.93,
			longitudNodoAscendente: 225, argumentoPerihelio: 0, anomaliaMediaJ2000: 225
		},
		apariencia: {
			albedo: 0.068,
			colorDominante: 'Gris oscuro',
			relieveNotable: ['Superficie suave por el regolito', 'Cráter Swift', 'Cráter Voltaire']
		},
		educativo: {
			descripcionNinos: 'La luna más pequeña y lejana de Marte. Parece una pequeña roca espacial flotando tranquilamente.',
			datosCuriosos: [
				'Es tan pequeña que desde Marte parece una estrella brillante',
				'Su superficie es muy suave porque el polvo tapa sus cráteres',
				'Tarda 30 horas en dar una vuelta completa a Marte'
			],
			comparaciones: 'Es la luna más pequeña de los planetas rocosos'
		}
	},
	{
		id: 'ganimedes',
		parent: 'jupiter',
		identificacion: {
			nombre: 'Ganímedes',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Galileo Galilei', fecha: '1610', lugar: 'Padua' },
			origenNombre: 'Héroe divino de la mitología griega, copero de los dioses'
		},
		fisicas: {
			diametroKm: 5268,
			masa: '1.4819 × 10^23 kg',
			densidad: '1.936 g/cm³',
			gravedad: 1.428,
			atmosfera: { composicion: ['Oxígeno tenue'], presion: 'Casi nula' },
			temperaturaMin: -203, temperaturaMedia: -163, temperaturaMax: -121,
			albedo: 0.43,
			velocidadEscape: '2.741 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 11.71,
			periodoRotacionHoras: 281.04,
			inclinacionAxial: 0.2,
			distanciaSolUA: 0.007155, // 1,070,400 km / 149,597,870 km
			distanciaSolKm: 1070400,
			velocidadOrbital: '10.88 km/s',
			excentricidad: 0.0013,
			inclinacionOrbital: 0.2,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 180
		},
		apariencia: {
			albedo: 0.43, colorDominante: 'Marrón y gris con manchas brillantes',
			relieveNotable: ['Regiones oscuras antiguas', 'Surcos brillantes jóvenes', 'Cráteres radiados']
		},
		educativo: {
			descripcionNinos: '¡Es la luna más grande de todo el sistema solar! Es incluso más grande que el planeta Mercurio.',
			datosCuriosos: [
				'Es la única luna que tiene su propio campo magnético',
				'Se cree que tiene un océano de agua salada bajo su corteza de hielo',
				'Su atmósfera tiene una capa muy delgada de oxígeno'
			],
			comparaciones: 'Es más grande que el planeta Mercurio pero tiene menos masa'
		}
	},
	{
		id: 'calisto',
		parent: 'jupiter',
		identificacion: {
			nombre: 'Calisto',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Galileo Galilei', fecha: '1610', lugar: 'Padua' },
			origenNombre: 'Ninfa de Artemisa en la mitología griega'
		},
		fisicas: {
			diametroKm: 4821,
			masa: '1.0759 × 10^23 kg',
			densidad: '1.834 g/cm³',
			gravedad: 1.236,
			atmosfera: { composicion: ['Dióxido de carbono tenue'], presion: 'Casi nula' },
			temperaturaMin: -193, temperaturaMedia: -139, temperaturaMax: -108,
			albedo: 0.17,
			velocidadEscape: '2.44 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 27.32,
			periodoRotacionHoras: 655.68,
			inclinacionAxial: 0,
			distanciaSolUA: 0.012585, // 1,882,700 km / 149,597,870 km
			distanciaSolKm: 1882700,
			velocidadOrbital: '8.204 km/s',
			excentricidad: 0.0074,
			inclinacionOrbital: 0.28,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 270
		},
		apariencia: {
			albedo: 0.17, colorDominante: 'Marrón oscuro y gris',
			relieveNotable: ['Cráter Valhalla (multianillo)', 'Superficie más craterizada del sistema solar']
		},
		educativo: {
			descripcionNinos: 'Una luna llena de pecas blancas que son en realidad cráteres muy antiguos. ¡Es como un museo de impactos espaciales!',
			datosCuriosos: [
				'Es el objeto con más cráteres de todo el sistema solar',
				'Valhalla es un cráter gigante con anillos que parecen ondas en el agua',
				'Es la luna galileana más lejana de Júpiter'
			],
			comparaciones: 'Es casi del mismo tamaño que Mercurio'
		}
	},
	{
		id: 'io',
		parent: 'jupiter',
		identificacion: {
			nombre: 'Ío',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Galileo Galilei', fecha: '1610', lugar: 'Padua' },
			origenNombre: 'Sacerdotisa de Hera, amante de Zeus'
		},
		fisicas: {
			diametroKm: 3643,
			masa: '8.9319 × 10^22 kg',
			densidad: '3.528 g/cm³',
			gravedad: 1.796,
			atmosfera: { composicion: ['Dióxido de azufre'], presion: 'Casi nula' },
			temperaturaMin: -183, temperaturaMedia: -143, temperaturaMax: 1600,
			albedo: 0.63,
			velocidadEscape: '2.558 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 2.89,
			periodoRotacionHoras: 69.36,
			inclinacionAxial: 0,
			distanciaSolUA: 0.002819, // 421,700 km / 149,597,870 km
			distanciaSolKm: 421700,
			velocidadOrbital: '17.334 km/s',
			excentricidad: 0.0041,
			inclinacionOrbital: 0.05,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 0
		},
		apariencia: {
			albedo: 0.63, colorDominante: 'Amarillo, azufre y naranja (parece una pizza)',
			relieveNotable: ['Volcanes activos (Pele, Loki)', 'Lagos de lava de azufre', 'Montañas de silicato']
		},
		educativo: {
			descripcionNinos: '¡La luna volcánica! Parece una pizza gigante debido al azufre de sus más de 400 volcanes activos.',
			datosCuriosos: [
				'Es el lugar con más volcanes activos del sistema solar',
				'Sus nubes de gas volcánico pueden llegar a cientos de km de altura',
				'Aunque está lejos del Sol, por dentro está muy caliente por los tirones de Júpiter'
			],
			comparaciones: 'Es un poco más grande que nuestra Luna'
		}
	},
	{
		id: 'europa',
		parent: 'jupiter',
		identificacion: {
			nombre: 'Europa',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Galileo Galilei', fecha: '1610', lugar: 'Padua' },
			origenNombre: 'Hija del rey de Tiro, amante de Zeus'
		},
		fisicas: {
			diametroKm: 3121,
			masa: '4.7998 × 10^22 kg',
			densidad: '3.013 g/cm³',
			gravedad: 1.314,
			atmosfera: { composicion: ['Oxígeno tenue'], presion: 'Casi nula' },
			temperaturaMin: -220, temperaturaMedia: -160, temperaturaMax: -125,
			albedo: 0.67,
			velocidadEscape: '2.025 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 5.81,
			periodoRotacionHoras: 139.44,
			inclinacionAxial: 0.1,
			distanciaSolUA: 0.004485, // 670,900 km / 149,597,870 km
			distanciaSolKm: 670900,
			velocidadOrbital: '13.74 km/s',
			excentricidad: 0.009,
			inclinacionOrbital: 0.47,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 135
		},
		apariencia: {
			albedo: 0.67, colorDominante: 'Blanco brillante con rayas marrones',
			relieveNotable: ['Líneas de fractura (lineae)', 'Corteza de hielo lisa', 'Terreno de caos']
		},
		educativo: {
			descripcionNinos: 'Una bola de cristal gigante en el espacio. Su superficie es de hielo muy liso y tiene rayas que parecen carreteras.',
			datosCuriosos: [
				'Debajo de su capa de hielo hay un océano escondido con más agua que en la Tierra',
				'Es uno de los lugares más probables para encontrar vida extraterrestre',
				'Su superficie es tan lisa que casi no tiene cráteres'
			],
			comparaciones: 'Es un poco más pequeña que nuestra Luna'
		}
	},
	{
		id: 'titan',
		parent: 'saturno',
		identificacion: {
			nombre: 'Titán',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Christiaan Huygens', fecha: '1655', lugar: 'Países Bajos' },
			origenNombre: 'Hijos de Urano y Gea en la mitología griega'
		},
		fisicas: {
			diametroKm: 5150,
			masa: '1.3452 × 10^23 kg',
			densidad: '1.88 g/cm³',
			gravedad: 1.352,
			atmosfera: { composicion: ['Nitrógeno (95%)', 'Metano (5%)'], presion: '1.5 atm' },
			temperaturaMin: -180, temperaturaMedia: -179, temperaturaMax: -178,
			albedo: 0.22,
			velocidadEscape: '2.639 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 26.11, // Normalized (1.6373 * 15.945)
			periodoRotacionHoras: 626.64, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.008167,
			distanciaSolKm: 1221870,
			velocidadOrbital: '5.57 km/s',
			excentricidad: 0.028,
			inclinacionOrbital: 0.33,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 300
		},
		apariencia: {
			albedo: 0.22, colorDominante: 'Naranja anaranjado mate',
			relieveNotable: ['Lagos de metano (Kraken Mare)', 'Dunas de hidrocarburos', 'Ríos de etano']
		},
		educativo: {
			descripcionNinos: '¡La única luna con una atmósfera espesa! Es como una versión congelada y naranja de la Tierra primitiva.',
			datosCuriosos: [
				'Es la única luna que tiene nubes, lluvia y lagos de metano líquido',
				'Su atmósfera es tan densa que podrías "nadar" en el aire con alas',
				'Es más grande que el planeta Mercurio'
			],
			comparaciones: 'Es la segunda luna más grande del sistema solar'
		}
	},
	{
		id: 'encelado',
		parent: 'saturno',
		identificacion: {
			nombre: 'Encélado',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Herschel', fecha: '1789', lugar: 'Inglaterra' },
			origenNombre: 'Gigante de la mitología griega'
		},
		fisicas: {
			diametroKm: 504,
			masa: '1.08 × 10^20 kg',
			densidad: '1.61 g/cm³',
			gravedad: 0.113,
			atmosfera: { composicion: ['Vapor de agua tenue'], presion: 'Casi nula' },
			temperaturaMin: -240, temperaturaMedia: -198, temperaturaMax: -128,
			albedo: 0.99,
			velocidadEscape: '239 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 2.24, // Normalized
			periodoRotacionHoras: 53.76, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.001590,
			distanciaSolKm: 237948,
			velocidadOrbital: '12.63 km/s',
			excentricidad: 0.0047,
			inclinacionOrbital: 0.009,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 60
		},
		apariencia: {
			albedo: 0.99, colorDominante: 'Blanco nieve brillante',
			relieveNotable: ['Rayas de tigre (géiseres)', 'Llanuras de hielo liso', 'Cráteres antiguos']
		},
		educativo: {
			descripcionNinos: 'Una bola de nieve gigante que lanza chorros de agua al espacio. ¡Es el objeto más blanco y brillante que existe!',
			datosCuriosos: [
				'Tiene géiseres gigantes que lanzan agua desde un océano subterráneo',
				'Esa agua forma uno de los anillos de Saturno (el anillo E)',
				'Es casi 100% reflectante, como un espejo de hielo'
			],
			comparaciones: 'Es tan pequeño que cabría dentro del Reino Unido'
		}
	},
	{
		id: 'rea',
		parent: 'saturno',
		identificacion: {
			nombre: 'Rea',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Giovanni Cassini', fecha: '1672', lugar: 'París' },
			origenNombre: 'Madre de los dioses olímpicos'
		},
		fisicas: {
			diametroKm: 1528,
			masa: '2.306 × 10^21 kg',
			densidad: '1.23 g/cm³',
			gravedad: 0.264,
			atmosfera: { composicion: ['Oxígeno y dióxido de carbono tenuísimos'], presion: 'Nula' },
			temperaturaMin: -220, temperaturaMedia: -174, temperaturaMax: -120,
			albedo: 0.95,
			velocidadEscape: '635 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 7.40, // Normalized
			periodoRotacionHoras: 177.6, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.003523,
			distanciaSolKm: 527040,
			velocidadOrbital: '8.48 km/s',
			excentricidad: 0.0012,
			inclinacionOrbital: 0.34,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 240
		},
		apariencia: {
			albedo: 0.95, colorDominante: 'Gris claro',
			relieveNotable: ['Cráter Tirawa', 'Bandas reflectantes brillantes', 'Acantilados de hielo']
		},
		educativo: {
			descripcionNinos: 'Una luna de hielo muy antigua y llena de cráteres. Es la segunda luna más grande de Saturno.',
			datosCuriosos: [
				'Es principalmente una bola de hielo sucio con algo de roca',
				'Tiene una atmósfera tan delgada que es casi imposible de detectar',
				'Se cree que podría tener un sistema de anillos muy tenue (no confirmado)'
			],
			comparaciones: 'Es aproximadamente del tamaño de nuestra Luna'
		}
	},
	{
		id: 'japeto',
		parent: 'saturno',
		identificacion: {
			nombre: 'Jápeto',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Giovanni Cassini', fecha: '1671', lugar: 'París' },
			origenNombre: 'Titán de la mitología griega, padre de Prometeo'
		},
		fisicas: {
			diametroKm: 1469,
			masa: '1.805 × 10^21 kg',
			densidad: '1.08 g/cm³',
			gravedad: 0.223,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -190, temperaturaMedia: -143, temperaturaMax: -130,
			albedo: 0.3,
			velocidadEscape: '573 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 129.88, // Normalized
			periodoRotacionHoras: 3117.12, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.023802,
			distanciaSolKm: 3561300,
			velocidadOrbital: '3.26 km/s',
			excentricidad: 0.028,
			inclinacionOrbital: 15.47,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 150
		},
		apariencia: {
			albedo: 0.3, colorDominante: 'Blanco y negro (dos caras)',
			relieveNotable: ['Cresta ecuatorial gigante', 'Cráter Turgis', 'Llanuras oscuras de Cassini Regio']
		},
		educativo: {
			descripcionNinos: 'La luna del "ying-yang". Tiene un lado blanco como la nieve y otro lado negro como el carbón.',
			datosCuriosos: [
				'Tiene una montaña gigante que rodea todo su ecuador, ¡parece una nuez!',
				'Es la luna de Saturno con la órbita más inclinada',
				'Su lado oscuro atrapa el calor del Sol mucho mejor que el lado brillante'
			],
			comparaciones: 'Es la tercera luna más grande de Saturno'
		}
	},
	{
		id: 'dione',
		parent: 'saturno',
		identificacion: {
			nombre: 'Dione',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Giovanni Cassini', fecha: '1684', lugar: 'París' },
			origenNombre: 'Titánide de la mitología griega'
		},
		fisicas: {
			diametroKm: 1122,
			masa: '1.095 × 10^21 kg',
			densidad: '1.478 g/cm³',
			gravedad: 0.232,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -200, temperaturaMedia: -186, temperaturaMax: -150,
			albedo: 0.99,
			velocidadEscape: '510 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 4.48, // Normalized
			periodoRotacionHoras: 107.52, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.002522,
			distanciaSolKm: 377400,
			velocidadOrbital: '10.03 km/s',
			excentricidad: 0.0022,
			inclinacionOrbital: 0.019,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 180
		},
		apariencia: {
			albedo: 0.99, colorDominante: 'Gris brillante',
			relieveNotable: ['Acantilados de hielo brillantes (chasmata)', 'Cráter Evander', 'Llanuras suaves']
		},
		educativo: {
			descripcionNinos: 'Una luna con acantilados de hielo gigantes que brillan como cristales bajo la luz del Sol.',
			datosCuriosos: [
				'Comparte su órbita con otras dos lunas diminutas (Helena y Polideuco)',
				'Tiene una superficie llena de grietas que parecen telarañas brillantes',
				'Se cree que puede tener agua líquida muy profundo en su interior'
			],
			comparaciones: 'Es más pequeña que nuestra Luna'
		}
	},
	{
		id: 'tetis',
		parent: 'saturno',
		identificacion: {
			nombre: 'Tetis',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Giovanni Cassini', fecha: '1684', lugar: 'París' },
			origenNombre: 'Titánide del mar, madre de Aquiles'
		},
		fisicas: {
			diametroKm: 1062,
			masa: '6.17 × 10^20 kg',
			densidad: '0.98 g/cm³',
			gravedad: 0.145,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -200, temperaturaMedia: -187, temperaturaMax: -150,
			albedo: 1.2,
			velocidadEscape: '394 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 3.09, // Normalized
			periodoRotacionHoras: 74.16, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.001969,
			distanciaSolKm: 294619,
			velocidadOrbital: '11.35 km/s',
			excentricidad: 0.0001,
			inclinacionOrbital: 0.019,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 120
		},
		apariencia: {
			albedo: 1.2, colorDominante: 'Gris muy brillante',
			relieveNotable: ['Ithaca Chasma (gran cañón)', 'Cráter Odysseus', 'Superficie de hielo muy puro']
		},
		educativo: {
			descripcionNinos: '¡La luna del gran cañón! Tiene una grieta tan larga que recorre casi toda la luna de un lado a otro.',
			datosCuriosos: [
				'Su cañón Ithaca Chasma es tan grande que cabría el Gran Cañón del Colorado muchas veces',
				'Es casi toda de hielo de agua pura, ¡por eso brilla tanto!',
				'Tiene un cráter gigante llamado Odiseo que cubre una gran parte de su cara'
			],
			comparaciones: 'Es una de las lunas más brillantes de Saturno'
		}
	},
	{
		id: 'mimas',
		parent: 'saturno',
		identificacion: {
			nombre: 'Mimas',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Herschel', fecha: '1789', lugar: 'Inglaterra' },
			origenNombre: 'Hijo de Gea en la mitología griega'
		},
		fisicas: {
			diametroKm: 396,
			masa: '3.75 × 10^19 kg',
			densidad: '1.15 g/cm³',
			gravedad: 0.063,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -210, temperaturaMedia: -209, temperaturaMax: -180,
			albedo: 0.96,
			velocidadEscape: '159 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 1.54, // Normalized
			periodoRotacionHoras: 36.96, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.001240,
			distanciaSolKm: 185520,
			velocidadOrbital: '14.28 km/s',
			excentricidad: 0.0202,
			inclinacionOrbital: 1.57,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 0
		},
		apariencia: {
			albedo: 0.96, colorDominante: 'Gris',
			relieveNotable: ['Cráter Herschel (forma de ojo)', 'Surcos y cráteres']
		},
		educativo: {
			descripcionNinos: '¡La luna que parece la Estrella de la Muerte! Tiene un cráter tan grande que parece un ojo gigante mirándote.',
			datosCuriosos: [
				'El cráter Herschel es tan grande que si la luna fuera un poco más pequeña, el choque la habría destruido',
				'Es el objeto más pequeño del sistema solar que tiene forma redonda por su propia gravedad',
				'Curiosamente, tiene un mapa de temperaturas que parece el personaje Pac-Man'
			],
			comparaciones: 'Cabería cómodamente dentro de España'
		}
	},
	{
		id: 'titania',
		parent: 'urano',
		identificacion: {
			nombre: 'Titania',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Herschel', fecha: '1787', lugar: 'Inglaterra' },
			origenNombre: 'Reina de las hadas en Shakespeare'
		},
		fisicas: {
			diametroKm: 1578,
			masa: '3.527 × 10^21 kg',
			densidad: '1.711 g/cm³',
			gravedad: 0.379,
			atmosfera: { composicion: ['Dióxido de carbono tenue'], presion: 'Nula' },
			temperaturaMin: -213, temperaturaMedia: -203, temperaturaMax: -184,
			albedo: 0.27,
			velocidadEscape: '770 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 17.41, // Normalized (2.0 * 8.706)
			periodoRotacionHoras: 417.84, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.002914,
			distanciaSolKm: 435910,
			velocidadOrbital: '3.64 km/s',
			excentricidad: 0.0011,
			inclinacionOrbital: 0.34,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 270
		},
		apariencia: {
			albedo: 0.27, colorDominante: 'Gris con tintes rojizos',
			relieveNotable: ['Messina Chasma (cañón gigante)', 'Cráter Gertrude', 'Valles de fallas']
		},
		educativo: {
			descripcionNinos: 'La reina de las lunas de Urano. Es la más grande de todas y tiene cañones profundos que parecen cicatrices.',
			datosCuriosos: [
				'Es la octava luna más grande del sistema solar',
				'Su nombre viene de una obra de teatro de William Shakespeare',
				'Tiene un sistema de cañones gigantes que se extienden por miles de kilómetros'
			],
			comparaciones: 'Es aproximadamente la mitad del tamaño de nuestra Luna'
		}
	},
	{
		id: 'oberon',
		parent: 'urano',
		identificacion: {
			nombre: 'Oberón',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Herschel', fecha: '1787', lugar: 'Inglaterra' },
			origenNombre: 'Rey de las hadas en Shakespeare'
		},
		fisicas: {
			diametroKm: 1523,
			masa: '3.014 × 10^21 kg',
			densidad: '1.63 g/cm³',
			gravedad: 0.346,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -213, temperaturaMedia: -203, temperaturaMax: -193,
			albedo: 0.23,
			velocidadEscape: '730 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 26.93, // Normalized (2.0 * 13.463)
			periodoRotacionHoras: 646.32, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.003901,
			distanciaSolKm: 583520,
			velocidadOrbital: '3.15 km/s',
			excentricidad: 0.0014,
			inclinacionOrbital: 0.05,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 45
		},
		apariencia: {
			albedo: 0.23, colorDominante: 'Gris oscuro',
			relieveNotable: ['Montaña de 6 km de altura', 'Cráter Hamlet', 'Cráter Falstaff']
		},
		educativo: {
			descripcionNinos: 'El rey de las lunas de Urano. Es la luna más lejana del planeta y está llena de cráteres antiguos.',
			datosCuriosos: [
				'Tiene una montaña misteriosa que es tres veces más alta que el Monte Everest',
				'Es la luna más alejada de las cinco grandes lunas de Urano',
				'Muchos de sus cráteres tienen materiales oscuros desconocidos en su fondo'
			],
			comparaciones: 'Es casi del mismo tamaño que Titania'
		}
	},
	{
		id: 'umbriel',
		parent: 'urano',
		identificacion: {
			nombre: 'Umbriel',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Lassell', fecha: '1851', lugar: 'Inglaterra' },
			origenNombre: 'Espíritu oscuro en un poema de Alexander Pope'
		},
		fisicas: {
			diametroKm: 1169,
			masa: '1.17 × 10^21 kg',
			densidad: '1.39 g/cm³',
			gravedad: 0.2,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -213, temperaturaMedia: -203, temperaturaMax: -193,
			albedo: 0.21,
			velocidadEscape: '520 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 8.29, // Normalized (2.0 * 4.144)
			periodoRotacionHoras: 198.96, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.001778,
			distanciaSolKm: 266000,
			velocidadOrbital: '4.67 km/s',
			excentricidad: 0.0039,
			inclinacionOrbital: 0.205,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 180
		},
		apariencia: {
			albedo: 0.21, colorDominante: 'Gris muy oscuro',
			relieveNotable: ['Cráter Wunda (anillo brillante)', 'Cráter Skynd', 'Superficie muy oscura']
		},
		educativo: {
			descripcionNinos: 'La luna más oscura de Urano. Refleja muy poca luz, como si estuviera siempre a la sombra.',
			datosCuriosos: [
				'Es la luna más oscura de Urano, refleja la mitad de luz que las demás',
				'Tiene un cráter misterioso con un anillo blanco muy brillante llamado Wunda',
				'Está tan llena de cráteres que parece una bola de golf gris oscuro'
			],
			comparaciones: 'Es aproximadamente del tamaño de Dione (luna de Saturno)'
		}
	},
	{
		id: 'ariel',
		parent: 'urano',
		identificacion: {
			nombre: 'Ariel',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Lassell', fecha: '1851', lugar: 'Inglaterra' },
			origenNombre: 'Espíritu del aire en Shakespeare'
		},
		fisicas: {
			diametroKm: 1158,
			masa: '1.35 × 10^21 kg',
			densidad: '1.67 g/cm³',
			gravedad: 0.269,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -213, temperaturaMedia: -203, temperaturaMax: -193,
			albedo: 0.39,
			velocidadEscape: '560 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 5.04, // Normalized (2.0 * 2.52)
			periodoRotacionHoras: 120.96, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.001277,
			distanciaSolKm: 191020,
			velocidadOrbital: '5.51 km/s',
			excentricidad: 0.0012,
			inclinacionOrbital: 0.041,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 90
		},
		apariencia: {
			albedo: 0.39, colorDominante: 'Gris claro',
			relieveNotable: ['Valles sinuosos', 'Cráter Laica', 'Llanuras lisas']
		},
		educativo: {
			descripcionNinos: 'La luna más brillante y joven de Urano. Tiene una superficie más suave y con menos cráteres que sus vecinas.',
			datosCuriosos: [
				'Es la más brillante de todas las lunas de Urano',
				'Tiene valles profundos que parecen ríos congelados',
				'Su superficie ha cambiado mucho a lo largo del tiempo, borrando viejos cráteres'
			],
			comparaciones: 'Es un poco más pequeña que Umbriel pero brilla mucho más'
		}
	},
	{
		id: 'miranda',
		parent: 'urano',
		identificacion: {
			nombre: 'Miranda',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'Gerard Kuiper', fecha: '1948', lugar: 'EE.UU.' },
			origenNombre: 'Hija de Próspero en Shakespeare'
		},
		fisicas: {
			diametroKm: 471,
			masa: '6.59 × 10^19 kg',
			densidad: '1.2 g/cm³',
			gravedad: 0.079,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -213, temperaturaMedia: -203, temperaturaMax: -187,
			albedo: 0.32,
			velocidadEscape: '190 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 2.83, // Normalized (2.0 * 1.413)
			periodoRotacionHoras: 67.92, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.000865,
			distanciaSolKm: 129390,
			velocidadOrbital: '6.66 km/s',
			excentricidad: 0.0013,
			inclinacionOrbital: 4.34,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 0
		},
		apariencia: {
			albedo: 0.32, colorDominante: 'Gris',
			relieveNotable: ['Verona Rupes (clín oficial más alto)', 'Coronas (formas ovaladas)', 'Terreno de parches']
		},
		educativo: {
			descripcionNinos: '¡La luna rompecabezas! Parece que alguien la hubiera roto en mil pedazos y luego la hubiera pegado mal.',
			datosCuriosos: [
				'Tiene el acantilado más alto del sistema solar (Verona Rupes), de 20 km de altura',
				'Si saltaras desde ese acantilado, tardarías 10 minutos en llegar al suelo',
				'Su superficie es una mezcla extraña de valles, cráteres y llanuras'
			],
			comparaciones: 'Es la más pequeña de las grandes lunas de Urano'
		}
	},
	{
		id: 'triton',
		parent: 'neptuno',
		identificacion: {
			nombre: 'Tritón',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'William Lassell', fecha: '1846', lugar: 'Inglaterra' },
			origenNombre: 'Hijo de Poseidón (Neptuno), mensajero de los mares'
		},
		fisicas: {
			diametroKm: 2706,
			masa: '2.14 × 10^22 kg',
			densidad: '2.061 g/cm³',
			gravedad: 0.779,
			atmosfera: { composicion: ['Nitrógeno tenue', 'Metano'], presion: '0.00001 atm' },
			temperaturaMin: -237, temperaturaMedia: -235, temperaturaMax: -230,
			albedo: 0.76,
			velocidadEscape: '1.455 km/s'
		},
		orbitales: {
			periodoOrbitalDias: -14.98, // Normalized retrograde period
			periodoRotacionHoras: 359.5, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.002371, // 354,800 km
			distanciaSolKm: 354800,
			velocidadOrbital: '4.39 km/s',
			excentricidad: 0.00001,
			inclinacionOrbital: 156.885,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 45
		},
		apariencia: {
			albedo: 0.76, colorDominante: 'Rosado y blanco',
			relieveNotable: ['Terreno de piel de melón', 'Géiseres de nitrógeno', 'Llanuras de hielo nitrogenado']
		},
		educativo: {
			descripcionNinos: '¡Una luna que viaja al revés! Gira alrededor de Neptuno en dirección contraria a como lo hace el planeta.',
			datosCuriosos: [
				'Es uno de los lugares más fríos de todo el sistema solar',
				'Tiene volcanes de hielo que lanzan nitrógeno líquido y polvo al cielo',
				'En el futuro, la gravedad de Neptuno la romperá y formará un anillo gigante'
			],
			comparaciones: 'Es un poco más pequeña que nuestra Luna'
		}
	},
	{
		id: 'caronte',
		parent: 'pluton',
		identificacion: {
			nombre: 'Caronte',
			simbolo: '🌑',
			categoria: 'Satélite natural',
			descubrimiento: { quien: 'James Christy', fecha: '1978', lugar: 'EE.UU.' },
			origenNombre: 'Barquero del inframundo en la mitología griega'
		},
		fisicas: {
			diametroKm: 1212,
			masa: '1.586 × 10^21 kg',
			densidad: '1.702 g/cm³',
			gravedad: 0.288,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -258, temperaturaMedia: -233, temperaturaMax: -213,
			albedo: 0.37,
			velocidadEscape: '590 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 12.77, // Normalized (relative to our Moon speed scale)
			periodoRotacionHoras: 306.48, // Synchronous
			inclinacionAxial: 0,
			distanciaSolUA: 0.000131, // 19,570 km
			distanciaSolKm: 19570,
			velocidadOrbital: '0.21 km/s',
			excentricidad: 0.00005,
			inclinacionOrbital: 0.001,
			longitudNodoAscendente: 0, argumentoPerihelio: 0, anomaliaMediaJ2000: 180
		},
		apariencia: {
			albedo: 0.37, colorDominante: 'Gris con un polo norte rojizo',
			relieveNotable: ['Mordor Macula (polo norte oscuro)', 'Cañones gigantes', 'Llanuras gélidas']
		},
		educativo: {
			descripcionNinos: 'La compañera de baile de Plutón. Es tan grande comparada con Pluto que ambos giran uno alrededor del otro como si estuvieran cogidos de la mano.',
			datosCuriosos: [
				'Es la luna más grande en comparación con su planeta de todo el sistema solar',
				'Tiene una mancha oscura y rojiza en su polo norte que los científicos llaman "Mordor"',
				'Siempre muestra la misma cara a Plutón, y Plutón siempre le muestra la misma cara a ella'
			],
			comparaciones: 'Es aproximadamente la mitad del tamaño de Plutón'
		}
	},
	{
		id: 'ceres',
		identificacion: {
			nombre: 'Ceres',
			simbolo: '🪐',
			categoria: 'Planeta enano',
			descubrimiento: { quien: 'Giuseppe Piazzi', fecha: '1801', lugar: 'Palermo' },
			origenNombre: 'Diosa romana de la agricultura'
		},
		fisicas: {
			diametroKm: 946,
			masa: '9.39 × 10^20 kg',
			densidad: '2.162 g/cm³',
			gravedad: 0.28,
			atmosfera: { composicion: ['Vapor de agua tenue'], presion: 'Casi nula' },
			temperaturaMin: -140, temperaturaMedia: -105, temperaturaMax: -38,
			albedo: 0.09,
			velocidadEscape: '510 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 1681.6,
			periodoRotacionHoras: 9.07,
			inclinacionAxial: 4,
			distanciaSolUA: 2.767,
			distanciaSolKm: 413903000,
			velocidadOrbital: '17.90 km/s',
			excentricidad: 0.076,
			inclinacionOrbital: 10.59,
			longitudNodoAscendente: 80.3, argumentoPerihelio: 73.5, anomaliaMediaJ2000: 60
		},
		apariencia: {
			albedo: 0.09, colorDominante: 'Gris oscuro',
			relieveNotable: ['Cráter Occator (puntos brillantes)', 'Ahuna Mons (volcán de hielo)', 'Cráter Kerwan']
		},
		educativo: {
			descripcionNinos: '¡El rey del cinturón de asteroides! Es el planeta enano más cercano a nosotros y el objeto más grande entre Marte y Júpiter.',
			datosCuriosos: [
				'Tiene unos puntos blancos muy brillantes que resultaron ser depósitos de sal',
				'Es el único planeta enano que se encuentra en el sistema solar interior',
				'Se cree que tiene mucha agua, incluso más que toda el agua dulce de la Tierra'
			],
			comparaciones: 'Es mucho más pequeño que la Luna, pero gigantesco comparado con un asteroide'
		}
	},
	{
		id: 'pluton',
		identificacion: {
			nombre: 'Plutón',
			simbolo: '♇',
			categoria: 'Planeta enano',
			descubrimiento: { quien: 'Clyde Tombaugh', fecha: '1930', lugar: 'Arizona' },
			origenNombre: 'Dios romano del inframundo'
		},
		fisicas: {
			diametroKm: 2376,
			masa: '1.303 × 10^22 kg',
			densidad: '1.854 g/cm³',
			gravedad: 0.62,
			atmosfera: { composicion: ['Nitrógeno', 'Metano', 'Monóxido de carbono'], presion: '0.00001 atm' },
			temperaturaMin: -240, temperaturaMedia: -229, temperaturaMax: -218,
			albedo: 0.5,
			velocidadEscape: '1.212 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 90560,
			periodoRotacionHoras: 153.3,
			inclinacionAxial: 122.5,
			distanciaSolUA: 39.48,
			distanciaSolKm: 5906376200,
			velocidadOrbital: '4.67 km/s',
			excentricidad: 0.2488,
			inclinacionOrbital: 17.16,
			longitudNodoAscendente: 110.3, argumentoPerihelio: 113.8, anomaliaMediaJ2000: 200
		},
		apariencia: {
			albedo: 0.5, colorDominante: 'Marrón rojizo y blanco',
			relieveNotable: ['Tombaugh Regio (el "corazón")', 'Montañas de hielo de agua', 'Glaciares de nitrógeno']
		},
		educativo: {
			descripcionNinos: 'El planeta enano con un gran corazón. Tiene una llanura de hielo gigante con forma de corazón que se ve desde el espacio.',
			datosCuriosos: [
				'Durante un tiempo fue considerado el noveno planeta del sistema solar',
				'Hace tanto frío que allí el nitrógeno se vuelve sólido como el hielo',
				'Un año en Plutón dura casi 250 años terrestres'
			],
			comparaciones: 'Es más pequeño que nuestra Luna'
		}
	},
	{
		id: 'eris',
		identificacion: {
			nombre: 'Eris',
			simbolo: '🪐',
			categoria: 'Planeta enano',
			descubrimiento: { quien: 'Michael Brown y equipo', fecha: '2005', lugar: 'California' },
			origenNombre: 'Diosa griega de la discordia'
		},
		fisicas: {
			diametroKm: 2326,
			masa: '1.66 × 10^22 kg',
			densidad: '2.52 g/cm³',
			gravedad: 0.82,
			atmosfera: { composicion: ['Metano tenue (cuando está cerca del sol)'], presion: 'Nula la mayor parte del tiempo' },
			temperaturaMin: -243, temperaturaMedia: -231, temperaturaMax: -217,
			albedo: 0.96,
			velocidadEscape: '1.385 km/s'
		},
		orbitales: {
			periodoOrbitalDias: 203600,
			periodoRotacionHoras: 25.9,
			inclinacionAxial: 78,
			distanciaSolUA: 67.67,
			distanciaSolKm: 10123000000,
			velocidadOrbital: '3.43 km/s',
			excentricidad: 0.44,
			inclinacionOrbital: 44.2,
			longitudNodoAscendente: 35.8, argumentoPerihelio: 151.6, anomaliaMediaJ2000: 120
		},
		apariencia: {
			albedo: 0.96, colorDominante: 'Blanco brillante',
			relieveNotable: ['Superficie cubierta de escarcha de metano', 'Terreno muy reflectante']
		},
		educativo: {
			descripcionNinos: 'Un mundo lejano y helado que es casi tan grande como Plutón. ¡Vive tan lejos que tarda más de 500 años en dar una vuelta al Sol!',
			datosCuriosos: [
				'Su descubrimiento hizo que los científicos decidieran crear la categoría de "Planetas Enanos"',
				'Es uno de los objetos más brillantes del sistema solar porque está cubierto de nieve fresca',
				'Tiene una pequeña luna llamada Disnomia'
			],
			comparaciones: 'Es un poco más pequeño que Plutón pero tiene más masa (es más pesado)'
		}
	},
	{
		id: 'haumea',
		identificacion: {
			nombre: 'Haumea',
			simbolo: '🪐',
			categoria: 'Planeta enano',
			descubrimiento: { quien: 'José Luis Ortiz / Michael Brown', fecha: '2004', lugar: 'España / EE.UU.' },
			origenNombre: 'Diosa hawaiana del nacimiento'
		},
		fisicas: {
			diametroKm: 1632,
			masa: '4 × 10^21 kg',
			densidad: '2.6 g/cm³',
			gravedad: 0.401,
			atmosfera: { composicion: [], presion: 'Nula' },
			temperaturaMin: -241, temperaturaMedia: -223, temperaturaMax: -213,
			albedo: 0.7,
			velocidadEscape: '840 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 103700,
			periodoRotacionHoras: 3.91,
			inclinacionAxial: 13,
			distanciaSolUA: 43.34,
			distanciaSolKm: 6484000000,
			velocidadOrbital: '4.48 km/s',
			excentricidad: 0.19,
			inclinacionOrbital: 28.2,
			longitudNodoAscendente: 121.1, argumentoPerihelio: 240.2, anomaliaMediaJ2000: 300
		},
		apariencia: {
			albedo: 0.7, colorDominante: 'Blanco cristalino',
			relieveNotable: ['Forma de balón de rugby', 'Superficie de hielo cristalino', 'Gran mancha roja']
		},
		educativo: {
			descripcionNinos: '¡El planeta que gira como una peonza! Gira tan rápido que se ha estirado y tiene forma de balón de rugby o de huevo.',
			datosCuriosos: [
				'Un día allí solo dura 4 horas, ¡es el objeto grande que más rápido gira!',
				'Tiene un anillo delgado a su alrededor, igual que Saturno pero mucho más pequeño',
				'Su superficie está cubierta de hielo brillante que parece cristal'
			],
			comparaciones: 'Tiene aproximadamente el mismo ancho que Plutón, pero es mucho más delgado'
		}
	},
	{
		id: 'makemake',
		identificacion: {
			nombre: 'Makemake',
			simbolo: '🪐',
			categoria: 'Planeta enano',
			descubrimiento: { quien: 'Michael Brown y equipo', fecha: '2005', lugar: 'California' },
			origenNombre: 'Creador de la humanidad en la mitología Rapa Nui'
		},
		fisicas: {
			diametroKm: 1430,
			masa: '3.1 × 10^21 kg',
			densidad: '1.7 g/cm³',
			gravedad: 0.5,
			atmosfera: { composicion: ['Metano y nitrógeno transitorios'], presion: 'Nula' },
			temperaturaMin: -244, temperaturaMedia: -243, temperaturaMax: -230,
			albedo: 0.77,
			velocidadEscape: '800 m/s'
		},
		orbitales: {
			periodoOrbitalDias: 112890,
			periodoRotacionHoras: 22.48,
			inclinacionAxial: 0,
			distanciaSolUA: 45.71,
			distanciaSolKm: 6850000000,
			velocidadOrbital: '4.41 km/s',
			excentricidad: 0.15,
			inclinacionOrbital: 29.0,
			longitudNodoAscendente: 79.6, argumentoPerihelio: 294.8, anomaliaMediaJ2000: 240
		},
		apariencia: {
			albedo: 0.77, colorDominante: 'Marrón rojizo',
			relieveNotable: ['Superficie de metano helado', 'Poca cantidad de nitrógeno']
		},
		educativo: {
			descripcionNinos: 'Un pequeño mundo rojo y helado muy lejano. Fue descubierto un poco después de Pascua, ¡por eso lleva el nombre de un dios de la Isla de Pascua!',
			datosCuriosos: [
				'Es el segundo planeta enano más brillante visto desde la Tierra después de Plutón',
				'No tiene una atmósfera permanente, solo aparece un poco cuando se acerca al Sol',
				'Tarda más de 300 años en dar una sola vuelta al Sol'
			],
			comparaciones: 'Es un poco más pequeño que Plutón'
		}
	},
	{
		id: 'halley',
		type: 'comet',
		identificacion: {
			nombre: 'Cometa Halley',
			simbolo: '☄️',
			categoria: 'Cometa',
			descubrimiento: { quien: 'Edmond Halley (predicción)', fecha: '1705', lugar: 'Inglaterra' },
			origenNombre: 'Astronomo Edmond Halley'
		},
		fisicas: {
			diametroKm: 11,
			masa: '2.2 × 10^14 kg',
			densidad: '0.6 g/cm³',
			gravedad: 0.002,
			atmosfera: { composicion: ['Agua', 'Monóxido de carbono', 'Metano (en la coma)'], presion: 'Nula' },
			temperaturaMin: -200, temperaturaMedia: -70, temperaturaMax: 50,
			albedo: 0.04,
			velocidadEscape: '2 m/s'
		},
		orbitales: {
			periodoOrbitalDias: -27740, // Retrograde
			periodoRotacionHoras: 170,
			inclinacionAxial: 18,
			distanciaSolUA: 17.8,
			distanciaSolKm: 2670000000,
			velocidadOrbital: '54.0 km/s',
			excentricidad: 0.9671,
			inclinacionOrbital: 18.22,
			longitudNodoAscendente: 58.4, argumentoPerihelio: 111.3, anomaliaMediaJ2000: 180 // Start far away
		},
		apariencia: {
			albedo: 0.04, colorDominante: 'Negro (más oscuro que el carbón)',
			relieveNotable: ['Núcleo de hielo y polvo', 'Chorros de gas', 'Coma brillante y cola']
		},
		educativo: {
			descripcionNinos: '¡El viajero del tiempo! Es una bola de nieve sucia que nos visita cada 75 o 76 años. Cuando se acerca al Sol, le sale una cola brillante y hermosa.',
			datosCuriosos: [
				'Es el cometa más famoso de la historia',
				'Aunque se ve blanco y brillante, su núcleo es en realidad más negro que el carbón',
				'La última vez que nos visitó fue en 1986 y volverá en el año 2061'
			],
			comparaciones: 'Es muy pequeño, ¡podrías cruzarlo en bici en menos de una hora!'
		}
	}
] as const;
