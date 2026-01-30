"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CelestialBody } from "@/lib/constants";

/**
 * Custom hook to fetch celestial bodies from Firestore.
 * @returns { bodies: Record<string, CelestialBody>, loading: boolean, error: string | null }
 */
export function useCelestialBodies() {
  const [bodies, setBodies] = useState<Record<string, CelestialBody>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "celestial_bodies"));
        const data: Record<string, CelestialBody> = {};
        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data() as CelestialBody;
        });
        setBodies(data);
      } catch (err) {
        console.error("Error fetching celestial bodies:", err);
        setError("No se pudieron cargar los astros.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { bodies, loading, error };
}
