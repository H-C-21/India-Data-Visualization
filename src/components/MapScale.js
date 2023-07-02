import { Fragment,memo } from "react";
import classes from './MapScale.module.css'




function Scale(props){

    function scaleRatio(num,k){
        if( Math.floor(num/k) === 0){
            return num - num%(k/100)
        }

        else{
           return scaleRatio(num,k*10)
        }

    }

    
    let flag = true;

    let max = Math.floor(Math.max(...props.range))
    let min = Math.floor(Math.min(...props.range))
    
    max = scaleRatio(max,1)
    min = min - min%10
    let scale = [min,(max+min)/2,max]
    // console.log(range)

    if(props.attribute === 'pop' || props.attribute === 'den'){
        flag=false
    }

    if(props.attribute === 'sratio' || props.attribute === 'lit'){
        flag = true
    }

    return(
        <Fragment>
            <div className={classes.scale}>
                <div className={`${classes.scaleBar} ${flag ? classes.scalebg1 : classes.scalebg2}`}>
            </div>
            <div className={classes.marking}>
                <div>{scale[0]}</div>
                <div>{scale[1]}</div>
                <div>{scale[2]}+</div>
            </div>
        </div>
        </Fragment>
    )
}


export default memo(Scale);