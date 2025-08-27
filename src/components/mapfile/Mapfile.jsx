import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapfile.css";
import central from '../assets/central.jpg'
import tatvam from '../assets/tatvam.jpg'
import jmd from '../assets/jmd.jpg'
import dlf from '../assets/dlf.jpg'

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

// Custom property icon
const PropertyIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <path fill="#2c5aa0" d="M16 0a11 11 0 0 0-11 11c0 9 11 21 11 21s11-12 11-21a11 11 0 0 0-11-11z"/>
      <circle cx="16" cy="11" r="5" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Dummy property data
const properties = [
  {
    id: 1,
    name: "Central Park Resorts",
    lat: 28.4105,
    lng: 77.0395,
    details: "Ready to move-in | 1440-3980 sqft",
    img: central,
    price: "₹17K-21K PSF",
    emi: "₹2,68,000 Per month",
    location: "Sector 48, Sohna Road, Gurgaon",
  },
   {
    id: 2,
    name: "Tatvam Villas",
     lat: 28.4048,
    lng: 77.0414,
    details: "Ready to move-in | 1440-3980 sqft",
    img: tatvam,
    price: "₹17K-21K PSF",
    emi: "₹2,68,000 Per month",
    location: "Sector 48, Sohna Road, Gurgaon",
  },
   {
    id: 3,
    name: "JMD Megapolis",
    lat: 28.4195,
    lng: 77.0385,
    details: "Ready to move-in | 1440-3980 sqft",
    img: jmd,
    price: "₹17K-21K PSF",
    emi: "₹2,68,000 Per month",
    location: "Sector 48, Sohna Road, Gurgaon",
  },
   {
    id: 4,
    name: "DLF The Arbour",
    lat: 28.2553,
    lng: 77.0822,
    details: "Ready to move-in | 1440-3980 sqft",
    img: dlf,
    price: "₹17K-21K PSF",
    emi: "₹2,68,000 Per month",
    location: "Sector 48, Sohna Road, Gurgaon",
  },
];

const Mapfile = () => {
  return (
    <div className="property-map-container">
      <div className="map-container">
        <MapContainer
          center={[28.4105, 77.0395]}
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
              icon={PropertyIcon}
            >
              <Popup>
                <div className="property-card-popup">
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
                  <img src={property.img} alt={property.name} />
                  <div className="popup-body">
                    <h3>{property.name}</h3>
                    <p className="details">{property.details}</p>
                    <p className="location">📍 {property.location}</p>

                    <div className="price-box">
                      <p className="price">{property.price}</p>
                      <p className="emi">💰 {property.emi}</p>
                      <button className="emi-btn">Calculate your EMI</button>
                    </div>

                    <button className="view-details">
                      View property details
                    </button>

                    <div className="popup-footer">
                      <button className="owner-btn">View Owner Listings</button>
                      <button className="broker-btn">
                        View Broker Listings
                      </button>
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
