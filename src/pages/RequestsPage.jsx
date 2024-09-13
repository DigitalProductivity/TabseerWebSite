import React , {useEffect, useState} from 'react'
import RequestsNav from '../components/requestsNav'
import "../pages/Pages.css"
import RequestCard from '../components/requestCard'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../core/reducer/User'
import ReusablePageLayout from '../components/reusablePageLayout'
import { getLength, getUsers } from '../components/utils/usersUtils'
import Pagination from '../components/pagination'
import Loader from '../components/loaders/loader'
import { useTranslation } from 'react-i18next'




function RequestsPage() {

  const [updatedValue, setUpdatedValue] = useState([]);
  const orders = useSelector(state => state?.user?.orders)
  const loading =useSelector(state=>state?.user?.isLoading)
  const dispatch = useDispatch()
  const [page , setPage] = useState(1)
  const [limit , setLimit] = useState(8)
  const [activeButton , setActiveButton]=useState(100)
  let totalPage = Math.ceil (getLength(updatedValue)/ limit)
  let pageNo

  if (updatedValue?.length > 0) {
    if (page <= totalPage) {
      pageNo = page;
    } else {
      setPage(totalPage);
      pageNo = page;
    }
  } else {
    
    pageNo = 0; 
  }


  const updateValueInRequestCard = (newValue) => {
    setUpdatedValue(newValue);
  };

  const handlePageChange = (value) =>{
    if(value === "dl" || value === "... "){
      setPage(1)
    }else if (value === "sl"){
  
      if(page !== 1){
        setPage(page-1)
      }
      }else if (value === "sr"){
        if(page !== totalPage){
          setPage(page + 1)
        }
    }else if (value === "dr" || value === " ..."){
      setPage(totalPage) 
    }else {
      setPage(value)
    }
  }

  useEffect(()=>{
    if(activeButton==100){

      setUpdatedValue(orders)
    }else{
      const filteredData = orders?.filter(button => button.orderStatus == activeButton);
      setUpdatedValue(filteredData);
    }
  
  },[orders])

 useEffect(()=>{
  dispatch(fetchOrders())
 },[activeButton])


  useEffect(()=>{
  dispatch(fetchOrders())

  },[])
 
  const {t}=useTranslation()
  return (
    <>
           <p style={{fontWeight:'700',fontSize:'18px'}}>{t("Requests")}</p>

{
  loading && <Loader/>
}
          <ReusablePageLayout>

            <div  style={{ paddingBottom:"25px", paddingTop:"25px"}} >
              <RequestsNav updateValue={updateValueInRequestCard} activeButton={activeButton} setActiveButton={setActiveButton}/>
            </div>

            <div>
              <RequestCard dataValues={getUsers(page , limit ,updatedValue)}/>
            </div>

            <Pagination totalPage ={totalPage} page={pageNo} limit={limit} siblings={1} onPageChange ={handlePageChange}/>

          

          </ReusablePageLayout>
    
    </>
 
  )
}

export default RequestsPage