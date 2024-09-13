import React from 'react'


export const getUsers = (page , limit , data) =>{


        let array =[]

        if(data){

            for (let i =(page - 1) * limit ; i < (page* limit) && data[i] ; i++){
                array?.push(data[i])
            }
        
            return array 
        }else{
            return []
        }
    
           
        }
            
         

      

export const getLength = (data) =>{

    return data?.length 
}





  
  

