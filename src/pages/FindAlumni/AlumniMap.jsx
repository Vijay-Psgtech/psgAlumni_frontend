import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axiosInstance from '../../utils/axiosInstace';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const AlumniMap = ({ height = '400px' }) => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchAlumnis = async () => {
    try {
      const res = await axiosInstance.get('/api/alumni');
      setAlumni(res.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchAlumnis();
  }, []);

  useEffect(() => {
    const lower = searchText.toLowerCase();
    const filtered = alumni.filter(a =>
      a.name?.toLowerCase().includes(lower) ||
      a.city?.toLowerCase().includes(lower) ||
      a.country?.toLowerCase().includes(lower)
    );
    setFilteredAlumni(filtered);
  }, [searchText, alumni]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold"></h2>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, city, country..."
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none"
        />
      </div>
      <div className="rounded overflow-hidden" style={{ height }}>
        <MapContainer center={[20.5937, 78.9629]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='© OpenStreetMap, © CartoDB'
          />
          <MarkerClusterGroup>
            {filteredAlumni.map((a, idx) => (
              <Marker
                key={idx}
                position={[
                  a.location.coordinates[1],
                  a.location.coordinates[0]
                ]}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{a.first_name} {a.last_name || ''}</strong><br />
                    {a.email}<br />
                    {a.city}, {a.country}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default AlumniMap;
