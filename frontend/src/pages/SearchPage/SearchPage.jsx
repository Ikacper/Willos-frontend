import React, { useState }from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, Polygon, useMap } from 'react-leaflet'
import styles from './SearchPage.module.css'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import Searchbar from '../../components/Searchbar/Searchbar'

export default function SearchPage() {

    const [location, setLocation] = useState('')
    const [realEstates, setRealEstates] = useState([])
    const [polygon, setPolygon] = useState([])
    const [coords, setCoords] = useState([51,-0,4])

    const regExp = /\(([^)]+)\)/

    const fetchData = async () => { 
        axios.get(`http://localhost:8000/api/properties/?address=${location}`, {  
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
            }}).then(
            response => {

            setPolygon(response.data.cordinates[0].map( coord =>  [coord[1], coord[0]] ))
            setRealEstates([...response.data.properties])
             setCoords([response.data.cordinates[0][0][1],response.data.cordinates[0][0][0]])
            }
        )
    }

    const purpleOptions = { color: 'blue' }

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.flyTo(center, zoom);
        return null;
      }

    return (
        <>
            <Searchbar fetchData={fetchData} setLocation={setLocation}/>
            <div className={styles.wrapper}>
                <div className={styles.mapWrapper}>
                    <MapContainer className={styles.map} center={coords} zoom={13} scrollWheelZoom={true}>
                        <ChangeView center={coords} zoom={8} /> 
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polygon pathOptions={purpleOptions} positions={polygon} />
                        {realEstates.map( estate => (
                            <Marker 
                                key={estate.id} 
                                position={[regExp.exec(estate.cordinates)[1].split(" ")[1],regExp.exec(estate.cordinates)[1].split(" ")[0]]} 
                            >
                            <Tooltip className={styles.tooltip}>
                                <img className={styles.thumbnail} src={estate.thumbnail} alt='estate'></img>
                                <div className={styles.propertiesWrapper}>
                                    <span className={styles.price}>
                                        {estate.price} $
                                    </span>
                                    <span className={styles.rooms}>{estate.bedrooms} bd, {estate.bathrooms} ba</span>
                                    <span  className={styles.squareFeet}>{estate.squareFeet} sqft</span>
                                </div>
                            </Tooltip>
                            </Marker>
                        ))
                        }
                    </MapContainer>   
                </div>
                <Sidebar location={location} realEstates={realEstates}/>     
            </div>
        </>
    )
}