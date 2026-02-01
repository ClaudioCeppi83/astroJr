import * as THREE from 'three';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export interface OrbitalElements {
	semiMajorAxis: number;        // a (AU for planets, relative units for moons)
	eccentricity: number;         // e (0 to 1)
	inclination: number;          // i (orbital inclination in degrees)
	ascendingNode: number;        // Ω (longitude of the ascending node in degrees)
	argumentOfPerihelion: number; // ω (argument of perihelion in degrees)
	meanAnomalyAtEpoch: number;   // M0 (mean anomaly at t=0 in degrees)
	periodDays: number;           // T (orbital period in Earth days)
	rotationPeriodHours?: number; // Sidereal rotation period
	inclinacionAxial?: number;    // Axial tilt (obliquity) in degrees
}

/**
 * Solves Kepler's Equation for the Eccentric Anomaly (E) using Newton-Raphson method.
 * Kepler's Equation: M = E - e * sin(E)
 * 
 * @param M Mean Anomaly in radians
 * @param e Eccentricity
 * @returns Eccentric Anomaly (E) in radians
 */
function solveKepler(M: number, e: number): number {
	let E = M; // Initial guess
	const threshold = 1e-6;
	const maxIterations = 10;

	for (let i = 0; i < maxIterations; i++) {
		const delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
		E -= delta;
		if (Math.abs(delta) < threshold) break;
	}
	return E;
}

/**
 * Calculates the cartesian position of a celestial body in its orbit.
 * Note: Our coordinate system in Three.js uses Y as UP, while astronomy often uses Z.
 * 
 * @param elements Precise Keplerian elements
 * @param time Time elapsed in the simulation
 * @param distanceScale Global visual scale for distances
 * @returns THREE.Vector3 position relative to the parent body
 */
export function calculateOrbitalPosition(
	elements: OrbitalElements,
	time: number,
	distanceScale: number = 100
): THREE.Vector3 {
	// 1. Calculate Mean Anomaly (M) at current time
	const meanMotion = (2 * Math.PI) / elements.periodDays;
	const M = (elements.meanAnomalyAtEpoch * DEG_TO_RAD) + (meanMotion * time);

	// 2. Resolve Eccentric Anomaly (E)
	const E = solveKepler(M, elements.eccentricity);

	// 3. Visual Distance Scaling (Didactic approach)
	// We use different power laws for planets and moons to make both visible at once.
	let a: number;
	const isMoon = elements.semiMajorAxis < 0.05; 

	if (!isMoon) {
		// Planets: Scale down solar system breadth using a power of 0.8
		a = (Math.pow(elements.semiMajorAxis, 0.8) * 0.85 + 0.15) * distanceScale;
	} else {
		// Moons: Separate moons while keeping them clustered around the parent
		a = (Math.pow(elements.semiMajorAxis, 0.4) * 45) + 4.0;
	}

	// 4. Position in the orbital plane (Peripheral coordinates P, Q)
	const e = elements.eccentricity;
	const P = a * (Math.cos(E) - e);
	const Q = a * Math.sin(E) * Math.sqrt(1 - e * e);

	// 5. Transform to 3D Space (Heliocentric/Parent-centric)
	// Applying rotations for Ω (Long. Ascending Node), i (Inclination), and ω (Arg. Perihelion)
	const Omega = elements.ascendingNode * DEG_TO_RAD;
	const inclination = elements.inclination * DEG_TO_RAD;
	const argPerihelion = elements.argumentOfPerihelion * DEG_TO_RAD;

	const cosOmega = Math.cos(Omega);
	const sinOmega = Math.sin(Omega);
	const cosI = Math.cos(inclination);
	const sinI = Math.sin(inclination);
	const cosOmegaP = Math.cos(argPerihelion);
	const sinOmegaP = Math.sin(argPerihelion);

	// Standard transformation matrix applied to (P, Q, 0)
	const x = (cosOmega * cosOmegaP - sinOmega * sinOmegaP * cosI) * P +
	          (-cosOmega * sinOmegaP - sinOmega * cosOmegaP * cosI) * Q;
	const y = (sinOmega * cosOmegaP + cosOmega * sinOmegaP * cosI) * P +
	          (-sinOmega * sinOmegaP + cosOmega * cosOmegaP * cosI) * Q;
	const z = (sinOmegaP * sinI) * P + (cosOmegaP * sinI) * Q;

	// Invert Y and adjust axis to match Three.js (Y as Vertical Axis)
	return new THREE.Vector3(x, z, -y);
}

/**
 * Generates points for the orbital path line.
 */
export function getOrbitPath(elements: OrbitalElements, distanceScale: number = 100, segments: number = 256): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const period = elements.periodDays;
  for (let i = 0; i <= segments; i++) {
    const time = (i / segments) * period;
    points.push(calculateOrbitalPosition(elements, time, distanceScale));
  }
  return points;
}
