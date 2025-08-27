import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapfile.css"; // We'll create this CSS file

// Fix for default Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom icon for properties
const PropertyIcon = L.icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <path fill="#2c5aa0" d="M16 0a11 11 0 0 0-11 11c0 9 11 21 11 21s11-12 11-21a11 11 0 0 0-11-11z"/>
      <circle cx="16" cy="11" r="5" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Default icon for other markers (if needed)
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const properties = [
  {
    id: 1,
    name: "Central Park Resorts",
    lat: 28.4105,
    lng: 77.0395,
    details: "Luxury apartments in Sector 48, Gurugram",
    img: "https://www.centralpark.in/images/resorts3.jpg",
    price: "₹2.5 Cr - ₹4.5 Cr",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Park"]
  },
  {
    id: 2,
    name: "Tatvam Villas",
    lat: 28.4048,
    lng: 77.0414,
    details: "Premium Villas, Sector 48, Gurugram",
    img: "	https://www.tatvamvillasgurgaon.com/content/images/tatvam-villas-gurgaon.webp",
    price: "₹4.2 Cr - ₹6.8 Cr",
    amenities: ["Garden", "Club House", "Power Backup", "Parking"]
  },
  {
    id: 3,
    name: "JMD Megapolis",
    lat: 28.4195,
    lng: 77.0385,
    details: "Commercial IT Park, Sector 48, Gurugram",
    img: "https://img.staticmb.com/mbimages/project/Photo_h240_w0/Project-Photo-18-JMD-Megapolis-IT-Park-Gurgaon-5028922_488_1366_240_0.jpg",
    price: "₹8,500/sq.ft",
    amenities: ["Food Court", "Conference Rooms", "Parking", "Security"]
  },
  {
    id: 4,
    name: "DLF The Arbour",
    lat: 28.2553,
    lng: 77.0822,
    details: "Luxury residences, Sector 63, Gurugram",
    img: "https://www.dlfhomes.co.in/dlf-arbour-sector-63-gurgaon/images/features/2.jpg",
    price: "₹3.8 Cr - ₹7.2 Cr",
    amenities: ["Swimming Pool", "Kids Play Area", "Jogging Track", "Green Spaces"]
  },
];

const Mapfile = () => {
  // const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="property-map-container">
      
      
      <div className="map-container">
        <MapContainer
          center={[28.4105, 77.0395]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {properties.map(property => (
            <Marker 
              key={property.id} 
              position={[property.lat, property.lng]} 
              icon={PropertyIcon}
             
            >
              <Popup>
                <div className="property-popup">
                  <img src={property.img} alt={property.name} />
                  <h3>{property.name}</h3>
                  <p>{property.details}</p>
                  <p className="price-tag">{property.price}</p>
                  <div className="amenities">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapfile;