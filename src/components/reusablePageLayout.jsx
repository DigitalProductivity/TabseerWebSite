import React from 'react'

const ReusablePageLayout = (props) => {
  return (
    <div className='d-flex flex-column justify-content-between'  >

    <div>
    {props.children && props.children[0]}
    </div>

    <div className='mb-3' style={{ overflowY: 'scroll',minHeight:"68vh" , maxHeight: '68vh' }}>
        {props.children && props.children[1]}
    </div>

    <div style={{width:"100%", backgroundColor:"white"}} className='d-flex justify-content-center align-items-center'>
        {props.children && props.children[2]}
    </div>
</div>
  )
}

export default ReusablePageLayout