import React, { Fragment, useState } from "react";
import { Tabs,Tab,Box} from "@mui/material";

import classes from './GraphTab.module.css'
import TabContent from "./TabContent";
import Graph from "./Graph";

function dataConvertor(data){
    const pop = [
                {name: '1951', val: data.pop_1951},
                {name: '1961', val: data.pop_1961},
                {name: '1971', val: data.pop_1971},
                {name: '1981', val: data.pop_1981},
                {name: '1991', val: data.pop_1991},
                {name: '2001', val: data.pop_2001},
                {name: '2011', val: data.pop_2011}]
    const den = [
            {name: '1951', val: data.den_1951},
            {name: '1961', val: data.den_1961},
            {name: '1971', val: data.den_1971},
            {name: '1981', val: data.den_1981},
            {name: '1991', val: data.den_1991},
            {name: '2001', val: data.den_2001},
            {name: '2011', val: data.den_2011}
        ] 

    const sratio = [
        {name: '1951', val: data.sratio_1951},
        {name: '1961', val: data.sratio_1961},
        {name: '1971', val: data.sratio_1971},
        {name: '1981', val: data.sratio_1981},
        {name: '1991', val: data.sratio_1991},
        {name: '2001', val: data.sratio_2001},
        {name: '2011', val: data.sratio_2011}
    ]

    const lit = [
        {name: '1951', val: data.lit_1951},
        {name: '1961', val: data.lit_1961},
        {name: '1971', val: data.lit_1971},
        {name: '1981', val: data.lit_1981},
        {name: '1991', val: data.lit_1991},
        {name: '2001', val: data.lit_2001},
        {name: '2011', val: data.lit_2011}
    ]

            return {pop,den,lit,sratio};
}

function GraphTab(props){


    
    
    const [currentTab, setCurrentTab] = useState(0)
    function handleChange(e,tabIndex){
        setCurrentTab(tabIndex)
    }

    let {pop,den,lit,sratio} = dataConvertor(props.info)
   

    return(
        <Fragment>
            <div className={classes.mainTab}>
            
            <Tabs onChange={handleChange} value = {currentTab} centered>
                <Tab label="Population Density" id="den"/>
                <Tab label="Population" id = 'pop'/>
                <Tab label="Sex Ratio" id = 'sratio'/>
                <Tab label = "Literacy Rate" id = 'lit'/>
            </Tabs>

            <TabContent value={currentTab} index = {0}>
                <div>
                    <Graph name='Population Density' data={den}></Graph>
                </div>
            </TabContent>

            <TabContent value={currentTab} index = {1}>
                <div>
                    <Graph name='Population' data={pop}></Graph>
                </div>
            </TabContent>
                
            <TabContent value={currentTab} index = {2}>
                <div>
                    <Graph name='Sex Ratio' data={sratio}></Graph>
                </div>
            </TabContent>

            <TabContent value={currentTab} index={3}>
                <div>
                    <Graph name='Literacy Rate' data={lit}/>
                </div>
            </TabContent>


            </div>
        </Fragment>
    )
}

export default GraphTab