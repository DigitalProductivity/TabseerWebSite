import React from 'react'
import data from "../jsonData/requests.json"

function FilteredRequestPageData(props) {
    const desiredStatuses =  [props.status];

    const filteredDataByStatus = [];

    desiredStatuses.forEach((status )=> {
      
        filteredDataByStatus[status] = data.filter(item => item.status === status);
    });
    
   
  return (
     filteredDataByStatus
  )
}

export default FilteredRequestPageData