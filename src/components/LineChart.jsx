import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

//historicalData which is coming from API
function LineChart({ historicalData }) {
  const [data, setData] = useState([["Date", "Prices"]]);

// jb jb histiricalData chnage hoga tb tb useEffect run hoga
  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if(historicalData.prices){
        historicalData.prices.map((item) =>{
            dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}` , item[1]])
        })

        // dataCopy k data ko setData m daal rhe h
        setData(dataCopy);

    }//10/08
    
   
  }, [historicalData])
  
  return (
    <Chart chartType="LineChart" data={data} height="100%" legendToggle>
        
    </Chart>
  )
  ;
}

export default LineChart;
