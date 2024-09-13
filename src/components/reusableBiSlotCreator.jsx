import React from 'react'
import { useWatch } from 'react-hook-form'
import ReusableDropdown from './reusableD';

const ReusableBiSlotCreator = (props) => {

    function useConditionalDropdown(control, watchedFieldName) {
        const watchedValue = useWatch({
          control,
          name: watchedFieldName,
        });
      

        const isDependentEnabled = !!watchedValue;
        return isDependentEnabled;
      }

      const isSessionOneEnabled = useConditionalDropdown(props.control, props.sessionStartName);

  return (
    <div className="row mb-3">

    <div className="d-flex flex-column gap-3">
                {/* <p className='m-0' style={{fontSize:"16px", color:colors.primaryColor, fontWeight:"bold"}}>Session One</p> */}
    
            <div className="d-flex flex-row  gap-2 w-100">
    
    
                  <div className="d-flex flex-column gap-2 w-50">
                    <ReusableDropdown labelName={props.sessionStartLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionStartName} control={props.control} mappingOptionValues={props.sessionStartMappingValues} />
                   
                  </div>
    
                  <div  className="d-flex flex-column gap-2 w-50">
                    <ReusableDropdown labelName={props.sessionEndLabelName} isDisabled={props.disabled} defaultValue={props.defaultValue} name={props.sessionEndName} control={props.control} mappingOptionValues={props.sessionEndMappingValues} rules={isSessionOneEnabled?{required:props.sessionEndRequiredRule}:""}/>
                  {
                    isSessionOneEnabled ?
                    <p className='m-0' style={{color:"red", fontSize:"12px"}}>{props.formsErrorState?.[props.sessionEndName]?.message}
                    </p>:""
                  }  
                  </div>
    
    
            </div>
    
    </div>
    
          </div>
  )
}

export default ReusableBiSlotCreator