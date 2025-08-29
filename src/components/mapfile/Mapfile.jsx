import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapfile.css";

import central from "../assets/central.jpg";
import tatvam from "../assets/tatvam.jpg";
import jmd from "../assets/jmd.jpg";
import dlf from "../assets/dlf.jpg";

// Fix default Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// ✅ Custom category icons (bigger size)
const categoryIcons = {
  Residential: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size:40px;">🏢</div>`, // bada marker
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
  }),
  Commercial: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size:40px; color:red;">🏬</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
  }),
  UnderConstruction: L.divIcon({
    className: "custom-icon",
    html: `<div style="font-size:40px; color:orange;">🚧</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
  }),
};

// ✅ Property data with category field
const properties = [
  {
    id: 1,
    name: "Central Park Resorts",
    lat: 28.425254,
    lng: 77.033376,
    details: "Ready to move-in | 1440-3980 sqft",
    img: central,
    price: "₹17K-21K PSF",
    emi: "₹2,68,000 /month",
    location: "Sector 48, Sohna Road, Gurgaon",
    category: "Residential",
  },
  {
    id: 2,
    name: "Tatvam Villas",
    lat: 28.4048,
    lng: 77.0414,
    details: "Ready to move-in | 2000-4500 sqft",
    img: tatvam,
    price: "₹20K-25K PSF",
    emi: "₹3,10,000 /month",
    location: "Sector 48, Sohna Road, Gurgaon",
    category: "Residential",
  },
  {
    id: 3,
    name: "JMD Megapolis",
    lat: 28.4195,
    lng: 77.0385,
    details: "Office & Commercial Spaces",
    img: jmd,
    price: "₹12K-15K PSF",
    emi: "₹1,90,000 /month",
    location: "Sector 48, Sohna Road, Gurgaon",
    category: "Commercial",
  },
  {
    id: 4,
    name: "DLF The Arbour",
    lat: 28.3971649,
    lng: 77.0819181,
    details: "Ultra Luxury Apartments | 4000+ sqft",
    img: dlf,
    price: "₹30K-35K PSF",
    emi: "₹6,00,000 /month",
    location: "Sector 63, Golf Course Ext. Road, Gurgaon",
    category: "UnderConstruction",
  },
];

const Mapfile = () => {
  return (
    <div className="property-map-container">
      <div className="map-container">
        <MapContainer
          center={[28.425254, 77.033376]} // ✅ Central Park as default center
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={categoryIcons[property.category]}
            >
              <Popup>
                <div className="property-card-popup">
                  {/* Close Button */}
                  <button
                    className="popup-close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.target
                        .closest(".leaflet-popup")
                        ?.querySelector(".leaflet-popup-close-button")
                        ?.click();
                    }}
                  >
                    &times;
                  </button>

                  {/* Image with tags */}
                  <div className="popup-image-container">
                    <img src={property.img} alt={property.name} />
                    <div className="popup-tags">
                      <span className="tag verified">✔ Verified</span>
                      <span className="tag">🎥 Virtual Tour</span>
                      <span className="tag">⏱ View in 15 mins</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="popup-body">
                    <h3>{property.name}</h3>
                    <p className="details">{property.details}</p>
                    <p className="location">📍 {property.location}</p>

                    <div className="price-box">
                      <p className="price">{property.price}</p>
                      <p className="emi">{property.emi}</p>
                      <button className="emi-btn">Calculate your EMI</button>
                    </div>

                    <button className="view-details">
                      View property details
                    </button>

                    <div className="popup-footer">
                      <button className="owner-btn">Owner Listings</button>
                      <button className="broker-btn">Broker Listings</button>
                    </div>
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
