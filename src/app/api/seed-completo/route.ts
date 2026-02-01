import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { SISTEMA_SOLAR_COMPLETO } from '@/lib/sistemaSolarData';

/**
 * API Route para poblar Firebase con la base de datos educativa completa del Sistema Solar
 * GET: Pobla la base de datos
 * DELETE: Limpia la colección completa
 */

export async function GET() {
	try {
		const collectionRef = collection(db, 'sistemaSolar');
		const results = [];

		console.log('🌌 Iniciando carga de base de datos educativa completa...');

		for (const cuerpo of SISTEMA_SOLAR_COMPLETO) {
			const docRef = doc(collectionRef, cuerpo.id);
			
			// Limpiar cualquier campo undefined antes de guardar
			const cleanData = JSON.parse(JSON.stringify(cuerpo));
			
			await setDoc(docRef, cleanData);
			results.push(cuerpo.identificacion.nombre);
			console.log(`✅ ${cuerpo.identificacion.nombre} guardado correctamente`);
		}

		console.log('✨ Base de datos educativa cargada con éxito');

		return NextResponse.json({ 
			success: true, 
			message: 'Base de datos educativa del Sistema Solar cargada correctamente',
			cuerposGuardados: results,
			total: results.length
		});
	} catch (error: any) {
		console.error('❌ Error cargando datos:', error);
		return NextResponse.json({ 
			success: false, 
			error: error.message 
		}, { status: 500 });
	}
}

export async function DELETE() {
	try {
		const collectionRef = collection(db, 'sistemaSolar');
		const querySnapshot = await getDocs(collectionRef);
		
		const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
		await Promise.all(deletePromises);

		return NextResponse.json({ 
			success: true, 
			message: 'Colección sistemaSolar eliminada',
			documentosEliminados: querySnapshot.size
		});
	} catch (error: any) {
		console.error('❌ Error eliminando colección:', error);
		return NextResponse.json({ 
			success: false, 
			error: error.message 
		}, { status: 500 });
	}
}
