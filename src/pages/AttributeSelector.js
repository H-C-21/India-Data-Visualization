import { Fragment } from "react";
import { Slider } from "@mui/material";

import classes from "./AttributeSelector.module.css"

function AttributeSelector(props){

    function yearChangeHandler(event){
        props.onSelect({prop:props.attribute.prop,year:event.target.value})
    }
    
    return (
      <Fragment>
        <div className={classes.maincontainer}>
          <h2>Select your Parameter</h2>
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
          </select>
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


export default AttributeSelector;