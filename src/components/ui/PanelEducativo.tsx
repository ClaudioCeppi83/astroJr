"use client";

import { X, Info, Orbit, Gauge, Thermometer, Mountain, History, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUniverseStore } from "@/lib/store";

/**
 * Panel educativo mejorado con información completa del cuerpo celeste
 */
export default function PanelEducativo() {
	const selectedBody = useUniverseStore((state) => state.selectedBody);
	const universeData = useUniverseStore((state) => state.universeData);
	const resetSelection = useUniverseStore((state) => state.resetSelection);

	if (!selectedBody) return null;

	// Obtener los datos completos del cuerpo seleccionado
	const currentData = universeData[selectedBody];
	if (!currentData) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, x: 300 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 300 }}
				transition={{ type: "spring", damping: 25, stiffness: 200 }}
				className="fixed top-20 right-4 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar z-50 pointer-events-auto"
			>
				<div className="glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
					{/* Header */}
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<span className="text-3xl">{(currentData as any).simbolo || "🌍"}</span>
								<h2 className="text-2xl font-black bg-linear-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
									{currentData.name}
								</h2>
							</div>
							<p className="text-xs text-cyan-300/70 font-medium">{currentData.type}</p>
						</div>
						<button
							onClick={resetSelection}
							className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all"
						>
							<X className="w-5 h-5 text-white" />
						</button>
					</div>

					{/* Descripción */}
					<p className="text-sm text-white/90 leading-relaxed mb-4">
						{currentData.desc}
					</p>

					{/* Grid de Datos Técnicos */}
					<div className="grid grid-cols-2 gap-3 mb-4">
						<DataCard
							icon={<Orbit className="w-4 h-4" />}
							label="Órbita"
							value={currentData.orbit}
							color="cyan"
						/>
						<DataCard
							icon={<Gauge className="w-4 h-4" />}
							label="Gravedad"
							value={currentData.grav}
							color="purple"
						/>
						{(currentData as any).temperaturaMedia && (
							<DataCard
								icon={<Thermometer className="w-4 h-4" />}
								label="Temperatura"
								value={`${(currentData as any).temperaturaMedia}°C`}
								color="orange"
							/>
						)}
						{(currentData as any).satelites && (
							<DataCard
								icon={<Sparkles className="w-4 h-4" />}
								label="Satélites"
								value={`${(currentData as any).satelites}`}
								color="pink"
							/>
						)}
					</div>

					{/* Descubrimiento */}
					{(currentData as any).descubrimiento && (
						<div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
							<div className="flex items-center gap-2 mb-2">
								<History className="w-4 h-4 text-amber-400" />
								<span className="text-xs font-black uppercase text-amber-400">Descubrimiento</span>
							</div>
							<p className="text-xs text-white/80">
								{(currentData as any).descubrimiento.quien}
								{(currentData as any).descubrimiento.fecha !== "Prehistoria" && 
									(currentData as any).descubrimiento.fecha !== "Conocida desde siempre" && 
									` (${(currentData as any).descubrimiento.fecha})`
								}
							</p>
						</div>
					)}

					{/* Relieve Notable */}
					{(currentData as any).relieveNotable && (currentData as any).relieveNotable.length > 0 && (
						<div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
							<div className="flex items-center gap-2 mb-2">
								<Mountain className="w-4 h-4 text-emerald-400" />
								<span className="text-xs font-black uppercase text-emerald-400">Geografía</span>
							</div>
							<ul className="space-y-1">
								{(currentData as any).relieveNotable.slice(0, 3).map((item: string, idx: number) => (
									<li key={idx} className="text-xs text-white/80 flex items-start gap-2">
										<span className="text-emerald-400 mt-0.5">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Datos Curiosos */}
					{(currentData as any).datosCuriosos && (currentData as any).datosCuriosos.length > 0 && (
						<div className="p-4 bg-linear-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20">
							<div className="flex items-start gap-3">
								<Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
								<div>
									<div className="text-[10px] font-black uppercase text-cyan-400 mb-2">¿Sabías que?</div>
									<ul className="space-y-2">
										{(currentData as any).datosCuriosos.slice(0, 2).map((dato: string, idx: number) => (
											<li key={idx} className="text-xs font-medium leading-normal text-cyan-100 flex items-start gap-2">
												<span className="text-cyan-400 shrink-0">✨</span>
												<span>{dato}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

interface DataCardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	color: "cyan" | "purple" | "orange" | "pink";
}

function DataCard({ icon, label, value, color }: DataCardProps) {
	const colorClasses = {
		cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
		purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
		orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
		pink: "bg-pink-500/10 border-pink-500/20 text-pink-400"
	};

	return (
		<div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
			<div className="flex items-center gap-2 mb-1">
				{icon}
				<span className="text-[10px] font-black uppercase opacity-70">{label}</span>
			</div>
			<div className="text-sm font-bold text-white">{value}</div>
		</div>
	);
}
