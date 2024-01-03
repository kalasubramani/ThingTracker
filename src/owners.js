import React from "react";

const Owners = ({owners})=>{

  const ownerList = owners.map((owner)=>{
       return <li>{owner.name}</li>
  })
   
  return(
    <div>
      <h4>Owners Club - {owners.length}</h4>
      <ul>
        {ownerList}
      </ul>
    </div>
  )
}

export default Owners;