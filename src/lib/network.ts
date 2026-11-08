// The Kastoria bus network as SVG paths, read at build time from the data the passenger app publishes.
// Each line is drawn along the streets (its encoded polylines), in its own colour.

const TRANSIT_URL = "https://kastoria-dev-core.github.io/astiko-ktel-kastorias-app/data/transit.json";

export interface MapLine {
  id: string;
  number: string;
  name: { el: string; en: string };
  color: string;
  /** SVG path data, one subpath per direction and branch */
  d: string;
}

export interface NetworkMap {
  width: number;
  height: number;
  lines: MapLine[];
  /** Stops as [x, y] in the same space */
  stops: [number, number][];
  stopCount: number;
}

interface Bundle {
  stops: { id: string; lat: number; lng: number }[];
  lines: {
    id: string;
    number: string;
    name: { el: string; en: string };
    color: string;
    directions: { stops: { stop: string }[]; shape?: string; branches?: { shape?: string }[] }[];
  }[];
}

/** Google's encoded polyline format, 5 decimals */
function decode(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  const next = () => {
    let result = 0;
    let shift = 0;
    let b: number;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20 && index < encoded.length);
    return result & 1 ? ~(result >> 1) : result >> 1;
  };
  while (index < encoded.length) {
    lat += next();
    lng += next();
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

/** The part of the network the map shows: the town and the lake, with the lines running on out of frame */
const FRAME = { minLat: 40.486, maxLat: 40.556, minLng: 21.205, maxLng: 21.33 };

export async function loadNetwork(width = 1000): Promise<NetworkMap | null> {
  let bundle: Bundle;
  try {
    const res = await fetch(TRANSIT_URL);
    if (!res.ok) return null;
    bundle = await res.json();
  } catch {
    return null;
  }
  const stopById = new Map(bundle.stops.map((s) => [s.id, s]));
  const paths = bundle.lines.map((line) => {
    const parts: [number, number][][] = [];
    for (const d of line.directions) {
      parts.push(d.shape ? decode(d.shape) : d.stops.map((s) => stopById.get(s.stop)).filter(Boolean).map((s) => [s!.lat, s!.lng]));
      for (const b of d.branches ?? []) if (b.shape) parts.push(decode(b.shape));
    }
    return { line, parts };
  });

  // Fit the frame, with the longitude squeezed by the latitude so the town keeps its shape.
  // Lines outside it are still drawn, and the SVG's viewBox cuts them at the edge.
  const { minLat, maxLat, minLng, maxLng } = FRAME;
  const k = Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180));
  const pad = 0;
  const scale = (width - pad * 2) / ((maxLng - minLng) * k);
  const height = Math.round((maxLat - minLat) * scale + pad * 2);
  const xy = (lat: number, lng: number): [number, number] => [
    +(pad + (lng - minLng) * k * scale).toFixed(1),
    +(pad + (maxLat - lat) * scale).toFixed(1),
  ];

  const lines: MapLine[] = paths.map(({ line, parts }) => ({
    id: line.id,
    number: line.number,
    name: line.name,
    color: line.color,
    d: parts
      .filter((p) => p.length > 1)
      .map((p) => "M" + p.map(([lat, lng]) => xy(lat, lng).join(" ")).join("L"))
      .join(""),
  }));

  return {
    width,
    height,
    lines,
    stops: bundle.stops
      .filter((s) => s.lat > minLat && s.lat < maxLat && s.lng > minLng && s.lng < maxLng)
      .map((s) => xy(s.lat, s.lng)),
    stopCount: bundle.stops.length,
  };
}
