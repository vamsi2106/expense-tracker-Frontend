import React from "react";
import DownloadCSV from "./ExportFeauture";

export const DownloadFile = ()=>{
    let jsonData = [
        {
            name:"sritha",
            age:20
        },
        {
            name:"vishnu priya",
            age:30
        },
        {
            name:"kamal",
            age:40
        }
    ]
    return <DownloadCSV jsonData = {jsonData}/>
}