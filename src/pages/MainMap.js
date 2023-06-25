

import Map, {Source, Layer, Popup} from 'react-map-gl';
import { useEffect,useState,Fragment,useMemo } from 'react';

import { dataLayer1,dataLayer2 } from './MapStyles';
import classes from './MainMap.module.css'
import AttributeSelector from './AttributeSelector.js';
import { updatePercentiles } from '../utils.ts';
let data1 = require('../Data/Map_fin.json');

const MAP_TOKEN = process.env.REACT_APP_MAPGLKEY
let style = dataLayer1

function MainMap(){
     console.log(process.env)
     const [district,setDistrict] = useState(null);
     const [popup,setPopup] = useState(false);
     const [attribute,setAttribute] = useState({prop:'lit',year:2011})
     const [allData,setAllData] = useState(data1)
      
   

    const data = useMemo(() => {
      let curr_prop = attribute.prop + '_' + attribute.year
      return allData && updatePercentiles(allData, f => {
        if(f.properties[curr_prop] === '-'){
          return ;
        }
        return Number(f.properties[curr_prop])});
    }, [allData, attribute]);

     function onChange(event){
      
        const { features,
                point: {x, y},
                lngLat: {lng,lat} } = event;

          if(features[0]){
            const hoveredFeatures = features[0].properties
            
            setDistrict({features : hoveredFeatures, x, y, lng,lat})
            setPopup(true)
          }
          else{
            setPopup(false)
            setDistrict(null)            
          }
      }
      
      useEffect(()=>{
        if(attribute.prop === 'pop' || attribute.prop === 'den'){
          style = dataLayer1
        }
        else
        {style = dataLayer2}
      },[attribute])

     
    return(

    <Fragment>
      
      <div className={classes.mapContainer}>
        
        <Map className={classes.map} reuseMaps
        initialViewState={{
            longitude: 75.10,
            latitude: 28.7,
            zoom: 4.5,
            maxZoom: 6.5,
            minZoom: 4,     
        }}
        onMouseMove = {onChange}
        mapboxAccessToken={MAP_TOKEN}
        interactiveLayerIds = {['MapData']}
      >

        {popup && <Popup longitude={district.lng} latitude={district.lat}
        anchor="top-left" closeButton = {false} closeOnClick = {false}>
        <p>{district.features[attribute.prop + '_' + attribute.year]}, {district.features.st_nm}</p>
        <p></p>
        </Popup>}

        <Source type="geojson" data={data}>
        <Layer {...style} />
        </Source>
        
       </Map>
     </div>
     <AttributeSelector onSelect = {setAttribute} attribute={attribute}/>
   </Fragment>
      
      )
    
}


export default MainMap;