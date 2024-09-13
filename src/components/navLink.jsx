import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import colors from '../assets/constants/colors'

function NavLinkComponent(props) {

  let matchingRoutes = useMatch(props.to)

  const imageSourceChange = matchingRoutes ? props.activeSrc : props.src
  const imageSizeChange = matchingRoutes ? "20px" :"30px"

  return (
        <NavLink to={props.to || null} className={props.className} activeclassname="active">

        <li className= {props.landingPageStyles} >
                <div className='d-flex gap-2 align-items-center'>
                  {
                    props.src ? (
                      <img src={imageSourceChange} style={{height:"auto", width:imageSizeChange}}/>

                    ): ""
                  }
                    <p className="mb-0">{props.linkName}</p>
                </div>
        </li>

    </NavLink>
  )
}

export default NavLinkComponent