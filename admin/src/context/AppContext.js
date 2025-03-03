import { createContext } from "react";




 export const AppContext=createContext();



const AppContextProvider=(props)=>{


const calculateAge=(dob)=>{
    const today=new Date();
  
    const birthday=dob.split('/').reverse().join('/')
    const birthdate=new Date(birthday)
    
    
    let age=today.getFullYear() - birthdate.getFullYear()
 
    return age

}
 const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat=(slotDate)=>{

    const date_Array=slotDate.split('_');

    return date_Array[0]+"  "+month[Number(date_Array[1]-1)]+" " +date_Array[2]

   }


    const value={
        calculateAge,slotDateFormat

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider