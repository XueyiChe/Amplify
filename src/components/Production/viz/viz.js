import React from 'react'
import Sunburst from './sunburst/Sunburst' 
import Barchart from './Barchart/Barchart' 
export default class Viz extends React.Component{
    render(){
        return(
            <div className = 'viz'>
                <Sunburst />
            <Barchart />
            </div>
            
        )
    }
}
