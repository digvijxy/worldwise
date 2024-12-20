import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContexts';
import Button from './Button';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../contexts/useUrlPosition';
export default function Map() {

  const {cities} = useCities();
  const [mapPosition , setMapPosition] = useState([40 , 10])
 const [mapLat , mapLang] = useUrlPosition();
   const {isLoading :isLoadingPosition,
    position: geolocationPosition,
    getPosition
   } = useGeolocation();
   
   useEffect(function(){
    if(mapLat && mapLang)
    setMapPosition([mapLat , mapLang])
   }, [mapLat , mapLang])

  useEffect(function(){
    if(geolocationPosition)
      setMapPosition([geolocationPosition.lat , geolocationPosition.lng])

  } , [geolocationPosition])

  return (

    <div className={styles.mapContainer}>
      {!geolocationPosition && (
  <Button type='position' onClick={getPosition}>
    {isLoadingPosition ? 'Loading' : "Use your Position"}
  </Button>
)}
    <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
   {cities.map((city)=> <Marker key = {city.id} position={[city.position.lat , city.position.lng]}>
      <Popup>
       <span>{city.emoji}</span>
       <span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    <ChangeCenter position = {mapPosition}/>
    <DetectClick/>
  </MapContainer>
    </div>
  )
}
function ChangeCenter({position}){
 const map =  useMap();
 map.setView(position);
 return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}