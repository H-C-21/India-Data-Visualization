

import Map, {Source, Layer, Popup, LngLatBounds} from 'react-map-gl';
import { useEffect,useState,Fragment,useMemo } from 'react';

import { dataLayer1,dataLayer2 } from './MapStyles';
import classes from './MainMap.module.css'
import AttributeSelector from './AttributeSelector.js';
import { updatePercentiles } from '../utils.ts';


const MAP_TOKEN = process.env.REACT_APP_MAPGLKEY
let style = dataLayer2

function MainMap(){

     const [district,setDistrict] = useState(null);
     const [popup,setPopup] = useState(false);
     const [attribute,setAttribute] = useState({prop:'lit',year:2011})
     const [allData,setAllData] = useState(localStorage.getItem('map'))
     if(!allData){
     setAllData(require('../Data/Map_fin.json'))
    }

    const data = useMemo(() => {
      let new_prop = attribute.prop + '_' + attribute.year
      let curr_prop = attribute.prop + '_' + '2011'
      let old_prop = attribute.prop + '_' + '1961'
      return allData && updatePercentiles(allData,f=>{
        if(f.properties[new_prop] === '-'){
          return ;
        }
        return Number(f.properties[new_prop])
      } 
      ,(f) => {
        if(f.properties[curr_prop] === '-'){
          return ;
        }
        return [Number(f.properties[curr_prop]),Number(f.properties[old_prop])]
      });
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

    function attributeChangeHandler(event){
        if(event.target.value === 'pop' || event.target.value === 'den'){
          style = dataLayer1
        }
        else{
          style = dataLayer2
        }
        setAttribute({prop:event.target.value,year:attribute.year})
      }
     
const bounds = [[52,-3],[116,45]]

  return(
    <Fragment>
      <div className={classes.mapContainer}>
        <div className={classes.map}>
        <Map 
        initialViewState={{
            longitude: 82.3,
            latitude: 23.2,
            zoom: 4,
            maxPitch: 1,
            dragRotate: false,  
            maxZoom: 6.5,
            minZoom: 3.5
     
        }}
        maxBounds={bounds}
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
     </div>
     <AttributeSelector onSelect = {setAttribute} attribute={attribute} ach={attributeChangeHandler}/>
   </Fragment>
  )   
}

export default MainMap;