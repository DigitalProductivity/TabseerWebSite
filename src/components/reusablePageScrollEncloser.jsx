import React from 'react'

const ReusablePageScrollEncloser = (props) => {
  return (
    <div className='d-flex flex-column justify-content-between ' style={{height:props.variableHeight||"79vh"}} >

    <div className='mb-3' style={{ overflowY: 'auto', height: '90%' }}>
        {props.children && props.children[0]}
    </div>

    <div style={{width:"100%", height:"20%", backgroundColor:"white"}} className='d-flex justify-content-center align-items-start mt-2'>
        {props.children && props.children[1]}
    </div>
</div>
  )
}

export default ReusablePageScrollEncloser