// Akwa Ibom State and Nigerian Local Government Areas (LGAs) for review tracking

export interface LGAInfo {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

export const POPULAR_LGAS: LGAInfo[] = [
  { name: 'Uyo', state: 'Akwa Ibom', lat: 5.0377, lon: 7.9128 },
  { name: 'Ibesikpo Asutan', state: 'Akwa Ibom', lat: 4.9500, lon: 7.9500 },
  { name: 'Itu', state: 'Akwa Ibom', lat: 5.2016, lon: 7.9839 },
  { name: 'Uruan', state: 'Akwa Ibom', lat: 5.0167, lon: 8.0500 },
  { name: 'Abak', state: 'Akwa Ibom', lat: 4.9833, lon: 7.7833 },
  { name: 'Ikot Ekpene', state: 'Akwa Ibom', lat: 5.1800, lon: 7.7144 },
  { name: 'Eket', state: 'Akwa Ibom', lat: 4.6433, lon: 7.9300 },
  { name: 'Oron', state: 'Akwa Ibom', lat: 4.8250, lon: 8.2350 },
  { name: 'Etinan', state: 'Akwa Ibom', lat: 4.8436, lon: 7.8542 },
  { name: 'Nsit Ubium', state: 'Akwa Ibom', lat: 4.8000, lon: 7.9333 },
  { name: 'Nsit Ibom', state: 'Akwa Ibom', lat: 4.9000, lon: 7.8833 },
  { name: 'Onna', state: 'Akwa Ibom', lat: 4.6333, lon: 7.8500 },
  { name: 'Mkpat Enin', state: 'Akwa Ibom', lat: 4.7333, lon: 7.7500 },
  { name: 'Ibiono Ibom', state: 'Akwa Ibom', lat: 5.2833, lon: 7.8667 },
  { name: 'Essien Udim', state: 'Akwa Ibom', lat: 5.1333, lon: 7.6000 },
  { name: 'Ikono', state: 'Akwa Ibom', lat: 5.2167, lon: 7.8000 },
  { name: 'Oruk Anam', state: 'Akwa Ibom', lat: 4.8500, lon: 7.6500 },
  { name: 'Ukanafun', state: 'Akwa Ibom', lat: 4.9000, lon: 7.5500 },
  { name: 'Ika', state: 'Akwa Ibom', lat: 4.9833, lon: 7.5167 },
  { name: 'Nsit Atai', state: 'Akwa Ibom', lat: 4.8667, lon: 8.0167 },
  { name: 'Okobo', state: 'Akwa Ibom', lat: 4.8500, lon: 8.1167 },
  { name: 'Urue-Offong/Oruko', state: 'Akwa Ibom', lat: 4.7833, lon: 8.1833 },
  { name: 'Mbo', state: 'Akwa Ibom', lat: 4.6833, lon: 8.3000 },
  { name: 'Esit Eket', state: 'Akwa Ibom', lat: 4.6500, lon: 8.0500 },
  { name: 'Ibeno', state: 'Akwa Ibom', lat: 4.5667, lon: 7.9833 },
  { name: 'Eastern Obolo', state: 'Akwa Ibom', lat: 4.5167, lon: 7.7167 },
  { name: 'Ini', state: 'Akwa Ibom', lat: 5.4167, lon: 7.7500 },
  { name: 'Obot Akara', state: 'Akwa Ibom', lat: 5.3000, lon: 7.5833 },
];

/**
 * Calculate distance between two lat/lon coordinates in kilometers
 */
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find closest LGA based on lat/lon
 */
export function findClosestLGA(lat: number, lon: number): string {
  let closest = POPULAR_LGAS[0];
  let minDistance = getDistanceKm(lat, lon, closest.lat, closest.lon);

  for (let i = 1; i < POPULAR_LGAS.length; i++) {
    const dist = getDistanceKm(lat, lon, POPULAR_LGAS[i].lat, POPULAR_LGAS[i].lon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = POPULAR_LGAS[i];
    }
  }

  // If within 150km of Akwa Ibom
  if (minDistance < 150) {
    return closest.name;
  }
  return 'Uyo';
}

/**
 * Auto-detect user's location via device Geolocation or device IP/Locale
 */
export async function detectDeviceLocation(): Promise<{ lga: string; source: 'gps' | 'reverse' | 'fallback' }> {
  // Try HTML5 Geolocation
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 6000,
          enableHighAccuracy: true,
          maximumAge: 60000,
        });
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Try reverse geocoding via OpenStreetMap Nominatim with fast timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const address = data.address || {};
          const detectedCity =
            address.city ||
            address.county ||
            address.state_district ||
            address.town ||
            address.suburb ||
            address.municipality;

          if (detectedCity) {
            // Clean up name (e.g. "Uyo Urban" -> "Uyo")
            const clean = detectedCity.replace(/ Local Government Area| LGA| Urban/gi, '').trim();
            return { lga: clean, source: 'reverse' };
          }
        }
      } catch {
        // Fallback to geometric proximity calculation
      }

      // Proximity lookup to Akwa Ibom LGAs
      const lga = findClosestLGA(lat, lon);
      return { lga, source: 'gps' };
    } catch {
      // Permission denied or timed out
    }
  }

  // Fallback: Default to primary operational city
  return { lga: 'Uyo', source: 'fallback' };
}
