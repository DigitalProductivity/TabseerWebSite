import React from 'react'
import colors from '../assets/constants/colors'
import { paginationRangeInput } from './utils/pagination.utils'


function Pagination(props) {

    let array = paginationRangeInput(props.totalPage , props.page , props.limit , props.siblings)
  return (
    <>
    <div className='d-flex flex-row gap-2' style={{cursor:"pointer"}}>

        <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%" }} onClick={()=>props.onPageChange("dl")}>
            <p className='m-0' style={{fontSize:"25px", paddingBottom:"5px"}}>&laquo;</p>
        </div>

        <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%" }} onClick={()=>props.onPageChange("sl")}>
            <p className='m-0' style={{fontSize:"25px", paddingBottom:"5px"}}> &lsaquo;</p>
        </div>

        {
            array.map(value=>{

                if(value === props.page){
                    return (

                        <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%", backgroundColor:colors.primaryColor, color:"white" }}  onClick={()=> props.onPageChange(value)}>

                            <p className='m-0' style={{fontSize:"15px"}}>{value}</p>

                        </div>
                        

                        )
                    }else{
                        return(
                            
                           
                            <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%" }}  onClick={()=> props.onPageChange(value)}>

                            <p className='m-0' style={{fontSize:"15px", paddingBottom:"5px"}}>{value}</p>

                        </div>
                    )
                }
})
        }


                        <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%" }}  onClick={()=> props.onPageChange("sr")}>

                            <p className='m-0' style={{fontSize:"25px", paddingBottom:"5px"}}>&rsaquo;</p>

                        </div>

                        <div className='d-flex justify-content-center align-items-center' style={{height:"40px", width:"40px", border: `2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"50%" }}  onClick={()=> props.onPageChange("dr")}>

                            <p className='m-0' style={{fontSize:"25px"}}>&raquo;</p>

                        </div>
       
    </div>

    </>
  )
}

export default Pagination