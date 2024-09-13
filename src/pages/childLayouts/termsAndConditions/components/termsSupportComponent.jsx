import React from 'react'

const TermsSupportComponent = (props) => {
  return (

    <div>
        <p style={{fontWeight:"bold", lineHeight:"32px"}}>
            {props.boldText}

            <span> : </span>
            <span style={{fontWeight:"normal"}}>
              {props.nonBoldContent}
            </span>
          </p>
    </div>

  )
}

export default TermsSupportComponent