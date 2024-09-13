import React from 'react'

const Status = (props) => {
    let color=""
    let backgroundColor=""
    let statusColor=""
    let statusBackgroundColor=""

    switch(props.status || null)
    {
        case "Pendding":
        color="#F2B134";
        backgroundColor="#FEF7EB";
    
        break;

        case "Approved":
            color="#3BB273";
            backgroundColor=" #EBF7F1";
            break;

         case "Rejected":
            color="#E14A3A";
            backgroundColor=" #FCEDEB";
            break;

        case "Active":
          color="#3BB273";
          backgroundColor=" #EBF7F1";
          break;
        
        case "Canceled":
          color="#8B0000";
          backgroundColor="rgba(139, 0, 0, 0.15)";
          break;
          
        case "Settled":
          color=" #008B8B" ;
          backgroundColor="rgba(0, 139, 139, 0.10)"; 
        break;

        case "Urgent":
          color='#FF0000';
          backgroundColor="rgba(255, 0, 0, 0.10)";
          break;

         case "institution":
          color="#B48F5A";
          backgroundColor="#E8DCCC";
          break; 

         case "Commercial":
          color="#B48F5A";
          backgroundColor="#E8DCCC";
          break; 

    }

    // if(props.status || null)
    // {
    //     switch(props.status){
    //         case "completed":
    //             statusColor="red";
    //             statusBackgroundColor="green";
    //             break;

    //     }
    // }
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <p className='d-flex justify-content-center align-items-center' style={{color:color,backgroundColor:backgroundColor,padding:"5px 15px",fontSize:"12px",borderRadius:"4px",width:'80%'}}>
    {
      props.status }

      {/* == null ?
      props.status : props.typeOfLawyer */}
      
      
        </p>
</div>
  )
}

export default Status