import React ,{useState , useRef} from 'react'
import colors from '../assets/constants/colors'
import { iconUpload } from '../assets/images';
import ReusableTooltip from './reusableTooltip';

const ReusableFileUpload = (props) => {
   
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
       
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
      
        const file = event.target.files[0];

        if (file) {
         
            
             props.setFileName([file.name]);
             props.setFileObject(file)
        }else{
            props.setFileName([])
        }
    };

    const handleClick = () =>{
       
        if(props.fileLink==null){
            return
        }else{
            const fileLink = props.fileLink
            window.open(fileLink, '_blank');

        }
       
    }

    const handleDeleteClick = (val , event) =>{
        props.fileName.pop(val)
        event.stopPropagation()
    }

  return (
         
    <div className='d-flex flex-column gap-2'>

        <div className="d-flex flex-row justify-content-start">

            <p className='m-0' style={{fontSize :props.labelFontSize || "15px" , color:props.color || "black"}}>{props.labelName}</p>

        </div>

        <div style={{height:"45px",borderRadius:"5px", border:`2px solid ${colors.secondaryColorLighterShade}`}} className='d-flex flex-row justify-content-between align-items-center'>

          <div style={{paddingLeft:"10px"}}>

                <ReusableTooltip onTextClick={handleClick} text={props.fileName} isDisabled={props.isDisabled} onDeleteClick={handleDeleteClick}/>

          </div>
                
             

          {
            !props.isDisabled && (

                <div>
                    <img src={iconUpload} style={{height:"auto" , width:"40px"}}  onClick={handleUploadClick}/>
                    <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                    </div>

            )
          }

        </div>

  </div>
  )
}

export default ReusableFileUpload