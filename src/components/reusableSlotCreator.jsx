import React from 'react'
import ReusableDropdown from './reusableD'
import { useWatch } from 'react-hook-form'


const ReusableSlotCreator = (props) => {


    function useConditionalDropdown(control, watchedFieldName) {
        const watchedValue = useWatch({
          control,
          name: watchedFieldName,
        });
      

        const isDependentEnabled = !!watchedValue;
        return isDependentEnabled;
      }

      const isSundayOneEnabled = useConditionalDropdown(props.control, props.sessionOneStartName);
      const isSundayThreeEnabled = useConditionalDropdown(props.control, props.sessionTwoStartName);

  return (
    <div className="row"  >

    <div className="col-lg-3">

      <div className="d-flex justify-content-center align-items-center h-100">
        <p className="m-0">{props.nameOfDay}</p>
      </div>

    </div>

    <div className="col-lg-9" style={{borderBottom:"2px dotted lightGray", padding:"20px 10px"}}>

      <div className="row mb-3">

<div className="d-flex flex-column gap-3">
            {/* <p className='m-0' style={{fontSize:"16px", color:colors.primaryColor, fontWeight:"bold"}}>Session One</p> */}

        <div className="d-flex flex-row  gap-2 w-100">


              <div className="d-flex flex-column gap-2 w-50">
                <ReusableDropdown labelName={props.sessionOneStartLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionOneStartName} control={props.control} mappingOptionValues={props.sessionOneStartMappingValues} />
               
              </div>

              <div  className="d-flex flex-column gap-2 w-50">
                <ReusableDropdown labelName={props.sessionOneEndLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionOneEndName} control={props.control} mappingOptionValues={props.sessionOneEndMappingValues} rules={isSundayOneEnabled?{required:props.sessionOneEndRequiredRule}:""}/>
              {
                isSundayOneEnabled ?
                <p className='m-0' style={{color:"red", fontSize:"12px"}}>{props.formsErrorState?.[props.sessionOneEndName]?.message}
                </p>:""
              }  
              </div>


        </div>

</div>

      </div>

       <div className="row">

<div className="d-flex flex-column gap-3">

    {/* <p className='m-0' style={{fontSize:"16px", color:colors.primaryColor, fontWeight:"bold"}}>Session Two</p> */}

            <div className="d-flex flex-row gap-2 w-100">

                  <div className="d-flex flex-column gap-2 w-50">

                    <ReusableDropdown labelName={props.sessionTwoStartLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionTwoStartName} control={props.control} mappingOptionValues={props.sessionTwoStartMappingValues}/>
                

                  </div>

                  <div  className="d-flex flex-column gap-2 w-50">

                    <ReusableDropdown labelName={props.sessionTwoEndLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionTwoEndName} control={props.control} mappingOptionValues={props.sessionTwoEndMappingValues} rules={isSundayThreeEnabled?{required:props.sessionTwoEndRequiredRule }:""}/>
                    {
                        isSundayThreeEnabled ?
                        <p className='m-0' style={{color:"red", fontSize:"12px"}}>{props.formsErrorState?.[props.sessionTwoEndName]?.message}</p>:""
                    }

                  </div>


            </div>
</div>


      </div> 


    </div>

  </div>
  )
}

export default ReusableSlotCreator