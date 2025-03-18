import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import fs from "fs";
import path from "path";
import exifr from "exifr";
import ImagesContainer from "@/components/ImagesContainer/ImagesContainer";
import { LatLngExpression } from "leaflet";

// Dynamically import MapContainer and other components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

export default function Home({ positions }: { positions: { position: LatLngExpression; images: string[] }[] }) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null); // State to hold the dynamically imported Leaflet module
  const [selectedPosition, setSelectedPosition] = useState<(LatLngExpression & { images: string[] }) | null>(null); // Track the clicked marker

  useEffect(() => {
    // Dynamically import Leaflet
    (async () => {
      const leaflet = await import("leaflet");

      // Configure default marker icons
      leaflet.Icon.Default.mergeOptions({
        iconUrl: "/images/marker-icon.png",
        iconRetinaUrl: "/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setL(leaflet); // Set the Leaflet module in state
    })();
  }, []);

  if (!L) {
    // Render a loading state or fallback if Leaflet is not ready
    return <div>Loading Map...</div>;
  }

  return (
    <>
      <Head>
        <title>Talia and Lior Map</title>
      </Head>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer
          center={[30.609817, 34.777436]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map((pos: { position: LatLngExpression }, index: number) => (
            <Marker
              key={index}
              position={pos.position}
              eventHandlers={{
                click: () => setSelectedPosition(pos as unknown as any), // Set the selected position
              }}
            />
          ))}
        </MapContainer>

        {/* Modal with images */}
        <AnimatePresence>
          {selectedPosition && (
            <ImagesContainer images={selectedPosition.images} onClose={() => setSelectedPosition(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // 1. Log metadata of /images/cake.jpeg using exifr
  const cakePath = path.join(process.cwd(), "public", "images", "cake.jpeg");
  try {
    const exifData = await exifr.parse(cakePath);
    console.log("EXIF Data for cake.jpeg:", exifData);
  } catch (error) {
    console.error("Error parsing cake.jpeg EXIF data:", error);
  }

  // 2. Dynamically build positions from public/images/positionImages
  const positionImagesPath = path.join(process.cwd(), "public/images/positionImages");
  const positions: any = [];

  const folders = fs.readdirSync(positionImagesPath);
  folders.forEach((folder) => {
    const folderPath = path.join(positionImagesPath, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      const images = fs.readdirSync(folderPath).map((file) => `/images/positionImages/${folder}/${file}`);
      positions.push({
        position: folder.split(",").map(Number), // Convert folder name to [latitude, longitude]
        images,
      });
    }
  });

  return { props: { positions } };
}
