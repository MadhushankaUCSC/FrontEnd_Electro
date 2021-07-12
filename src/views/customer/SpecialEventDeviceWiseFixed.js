import React,{useState}from 'react';


import SpecialEventFixed   from "../../components/Customer/SpecialEventFixed";







export default function SpecialEventDeviceUsage() {

  
  const[displayModel,setModel]=useState(
    {
      isAgree : false,
      model:"DeviceWiseFixed1",

    }
  )

  
  const handleChange = event =>{
    const target=event.target
    const name= target.name
    const value=target.value
    setModel({
      ...displayModel,
      [name]:value
    })
  }
  console.log(displayModel);

  
  return( 
  <div className="device-wise-usage">
  <div className="title-heading">
     <label className="tou-headline">DEVICE WISE USAGE</label>
        
        
      
  </div>
  
    <SpecialEventFixed/>
</div>
  );
        
        
   
  }
  
  
 


