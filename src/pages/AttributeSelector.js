import { Slider } from "@mui/material";

import classes from "./AttributeSelector.module.css"
import { useEffect,useState,Fragment,memo } from "react";


function AttributeSelector(props){

    const [index,setIndex] = useState("Literacy Rate")
    function yearChangeHandler(event){
        props.onSelect({prop:props.attribute.prop,year:event.target.value})
    }

    useEffect(()=>{
        if(props.attribute.prop === 'sratio'){
          setIndex('Sex Ratio')
        }
        else if(props.attribute.prop === 'lit'){
          setIndex('Literacy Rate')
        }
        else if(props.attribute.prop === 'den'){
            setIndex('Population Density')
        }
        else{
          setIndex('Population')
        }
    },[props.attribute.prop])
    
    return (
      <Fragment>
        <div className={classes.maincontainer}>
          <h2>Select Index</h2>
          <div className={classes.info}>Indian Map showing {index} by state in the year {props.attribute.year}. 
          Hover over a state to see the details.</div>
          <div className={classes.select}>
          <select
            name="attribute"
            onChange={props.ach}
            value={props.attribute.prop}
            id = 'attri'
          >
            <option value="lit">Literacy Rate</option>
            <option value="pop">Population</option>
            <option value="den">Population Density</option>
            <option value="sratio">Sex Ratio</option>
          </select></div>
          <div className={classes.slider1}>
          <Slider min = {1951} max ={2011}
            defaultValue={2011} step = {10}
            aria-label="Custom marks"            
            valueLabelDisplay="auto"
            onChange={yearChangeHandler}
            marks 
          />
        </div>
        <div className={classes.labels}>
          <p>1951</p>
          <p>1981</p>
          <p>2011</p>
          
        </div>
        </div>
        
      </Fragment>
    );
}


export default memo(AttributeSelector);