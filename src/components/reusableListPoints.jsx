import React from 'react'

const ReusableListPoints = (props) => {
   
    const pointsList = props.contents.map((content, index) => (

        <div key={index} className='d-flex gap-4'>

            <div>
                {index+1}
            </div>

            <div>

                <span style={{fontWeight:"bold"}}>
                    {content.heading}  
                </span>

                <span>  :  </span>

                <span>
                        {content.contents}
                </span>

            </div>

        </div>
    ));
  
    return (
      <div>
          <h5>{props.heading}</h5>
          <ul>{pointsList}</ul>
      </div>
    )
  }

export default ReusableListPoints