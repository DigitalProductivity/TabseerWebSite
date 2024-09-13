import { useEffect, useState } from 'react';
import HomePageChart from './components/HomePageChart';
import './css/Home.css'
import ContractReview from './components/ContractReview'
import TransactionHistroy from '../../components/TransactionsHistory'
import { back, next, nextButtonIcon } from '../../assets/images';
import colors from '../../assets/constants/colors';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getChart } from '../../core/reducer/User';

const HomeAdmin = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const {width , height}=useWindowDimensions()
  
    const dispatch=useDispatch();
  const monthlyIncome=useSelector(state=>state?.user?.monthlyIncome)
  const yearIncome=useSelector(state=>state?.user?.yearIncome)


  const[dataWithSar,setDataWithSar]=useState([]);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    dispatch(getChart(currentDate.getFullYear())); 
}, [currentDate.getFullYear()]);


  useEffect(() => {

    if(monthlyIncome){

      if (monthlyIncome?.length !==0 ) {
          const dataWithSAR = monthlyIncome[0]?.map(item => ({
              name: item.month?.split(" ")[0]?.substring(0, 3),
              pv: item.income 
          }));
          setDataWithSar(dataWithSAR);
          // console.log(monthlyIncome)
      } else{
        // console.log("not value")
          const staticData = [
              { name: "Jan", pv: 0 },
              { name: "Feb", pv: 0 },
              { name: "Mar", pv: 0 },
              { name: "Apr", pv: 0 },
              { name: "May", pv: 0 },
              { name: "Jun", pv: 0 },
              { name: "Jul", pv: 0 },
              { name: "Aug", pv: 0 },
              { name: "Sep", pv: 0 },
              { name: "Oct", pv: 0 },
              { name: "Nov", pv: 0 },
              { name: "Dec", pv: 0 }
          ];
          setDataWithSar(staticData);
  }
    }
    
}, [monthlyIncome]);


    
    useEffect(() => {
      setSelectedDate(new Date());
    }, []);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
    const handleDateClick = (day, year, month, isCurrentMonth,isPastDate) => {
      const currentDate = new Date();
      const selectedDate = new Date(year, month, day);

    if (!isCurrentMonth && !isPastDate) {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1,day);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
      }

      const yesterday = new Date(currentDate);  
      yesterday.setDate(currentDate.getDate() - 1); 
      

  if (selectedDate < yesterday || !isCurrentMonth) {
      return;
    } 

  setSelectedDate(selectedDate); 
    };
  
    const generateCalendar = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = getFirstDayOfMonth(year, month);
      const totalDays = daysInMonth(year, month);
  
      const days = [];
  
  
      const lastMonthDays = daysInMonth(year, month - 1);
      for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: lastMonthDays - i, isCurrentMonth: false });
      }
  
      
      for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, isCurrentMonth: true });
      }
  
      const rows = [];
      for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7));
      }
  
      return { rows, year, month };
    };
  
  
    const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
  
    const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };


    const formattedSelectedDate = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : null;
  
    const handleYearClick = () => {
      const newDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      setSelectedDate(new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), selectedDate.getDate()));
      setCurrentDate(newDate);
      // setDataIndex(prevIndex => prevIndex - 1);
  
      
    };
    
    
    const handleNextYearClick = () => {
      const newDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
      setSelectedDate(new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), selectedDate.getDate()));
      console.log("year",currentDate.toLocaleDateString('en-US', {  year: 'numeric' }));
      setCurrentDate(newDate);
      // setDataIndex(prevIndex => prevIndex + 1);
      
    
  }


const { t, i18n } = useTranslation(); 
const [currentLanguage, setCurrentLanguage] = useState('en-US');
const [isRTL,setIsRTL]=useState(false)


useEffect(() => {
  const isRTL = i18n.dir() === 'rtl';
  setIsRTL(isRTL);
  setCurrentLanguage(isRTL ? 'ar' : 'en-US');
}, [i18n.dir()]);





  return (
    <>
    <div className='container-fluid'>
    <div className='row' style={{height:"89vh"}}>
    
    <div className=' col-md-8 '>
          <div className='d-flex justify-content-between align-items-center' style={{padding:"15px 0px"}}>

            <p className='m-0' style={{fontSize:"18px", color:colors.primaryColor}}>{t("GrossIncome")}</p>
            <p className='m-0' style={{fontSize:"18px", color:colors.primaryColor}}>{t("TotalIncome :")} {yearIncome} SAR</p>

          </div>

      <div className="d-flex flex-column gap-5">



          <div className='mt-2 chart-container' style={{width:'100%',minHeight:'10vh',margin:'auto',padding:'16px',borderRadius:'8px',border:'1px #C5C5C5 solid'}}>

          <div className='d-flex flex-row justify-content-around align-items-center'>
      {isRTL ? (
        <>
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '32px', height: '32px', backgroundColor: ' #F8F4EF', borderRadius: '24px', cursor: 'pointer' }}
            onClick={handleNextYearClick}
          >
            <img src={next} style={{ height: '35%', width: '35%' }} />
          </div>

          <div style={{ color: '#B48F5A', fontSize: '20px' }}>
            {currentDate.getFullYear()}
          </div>

          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '32px', height: '32px', backgroundColor: ' #F8F4EF', borderRadius: '24px', cursor: 'pointer' }}
            onClick={handleYearClick}
          >
            <img src={back} style={{ height: '35%', width: '35%' }} />
          </div>
        </>
      ) : (
        <>
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '32px', height: '32px', backgroundColor: ' #F8F4EF', borderRadius: '24px', cursor: 'pointer' }}
            onClick={handleYearClick}
          >
            <img src={back} style={{ height: '35%', width: '35%' }} />
          </div>

          <div style={{ color: '#B48F5A', fontSize: '20px' }}>
            {currentDate.getFullYear()}
          </div>

          <div
            className='d-flex justify-content-center align-items-center'
            style={{ width: '32px', height: '32px', backgroundColor: ' #F8F4EF', borderRadius: '24px', cursor: 'pointer' }}
            onClick={handleNextYearClick}
          >
            <img src={next} style={{ height: '35%', width: '35%' }} />
          </div>
        </>
      )}
    </div>

              <div className='d-flex justify-content-center align-items-center chart-data' style={{minHeight:"27vh",paddingTop:'40px'}} >
              <HomePageChart  dataWithSAR={dataWithSar}/>
              </div>

          </div>



          <TransactionHistroy />

      </div>
    

    </div>


    <div className='col-md-4 home-right-container' style={{height:height}}>
    <div className='container-fluid'>
    <div className='row'>
    <div class='d-flex  align-items-center' style={{padding:"15px 0px"}}>
    <h6 style={{color:'black',fontSize: 18,fontWeight:800,}}>{t("UpcomingSessions")}</h6>
    </div>

        <div className='home-right-inner-container'>
            <div className='calander '>
       <div className='calalander-title d-flex flex-row justify-content-between' style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <span style={{ color: '#B48F5A', fontWeight: 700, fontFamily: 'Roboto' }}>
        {currentDate.toLocaleDateString(currentLanguage, { month: 'long', year: 'numeric' })}
      </span>
      <div style={{ gap: 10, display: 'flex' }}>
        {isRTL ? (
          <>
            <button onClick={handleNextMonth} style={{ width: '35px', height: '35px', backgroundColor: '#F8F4EF', borderRadius: '24px', cursor: 'pointer', border: 'none' }}>
              <img src={next} style={{ height: '35%', width: '35%' }} alt="Next Month" />
            </button>
            <button onClick={handlePrevMonth} style={{ width: '35px', height: '35px', backgroundColor: '#F8F4EF', borderRadius: '24px', cursor: 'pointer', border: 'none' }}>
              <img src={back} style={{ height: '40%', width: '40%' }} alt="Previous Month" />
            </button>
          </>
        ) : (
          <>
            <button onClick={handlePrevMonth} style={{ width: '35px', height: '35px', backgroundColor: '#F8F4EF', borderRadius: '24px', cursor: 'pointer', border: 'none' }}>
              <img src={back} style={{ height: '40%', width: '40%' }} alt="Previous Month" />
            </button>
            <button onClick={handleNextMonth} style={{ width: '35px', height: '35px', backgroundColor: '#F8F4EF', borderRadius: '24px', cursor: 'pointer', border: 'none' }}>
              <img src={next} style={{ height: '35%', width: '35%' }} alt="Next Month" />
            </button>
          </>
        )}
      </div>
    </div>

              <table class='table-light' style={{margin:'auto'}}>
                <thead>
                  <tr>
                    <th>{t("Sun")}</th>
                    <th>{t("Mon")}</th>
                    <th>{t("Tue")}</th>
                    <th>{t("Wed")}</th>
                    <th>{t("Thu")}</th>
                    <th>{t("Fri")}</th>
                    <th>{t("Sat")}</th>
                  </tr>
                </thead>
                <tbody>
                {generateCalendar().rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map(({ day, isCurrentMonth }, dayIndex) => {
              const isPastDate = !isCurrentMonth || new Date(generateCalendar().year, generateCalendar().month,day+1) < new Date();

              return (
                <td
                  className={`calendar-td ${selectedDate && isCurrentMonth && selectedDate.getDate() === day && selectedDate.getMonth() === generateCalendar().month ? 'selected-date' : ''} ${isPastDate ? 'past-date' : ''}`}
                  key={dayIndex}
                  onClick={() => handleDateClick(day, generateCalendar().year, generateCalendar().month, isCurrentMonth)}
                >
                  {day}
                </td>
              );
            })}
          </tr>
        ))}
                </tbody>
              </table>
              </div>

              <div className='mt-5'>

        <ContractReview
        formattedSelectedDate={formattedSelectedDate}
        />

        </div>

        </div>
 </div>
 </div>
    </div>
   
    
    
    </div>
    </div>
    </>
  )
}

export default HomeAdmin;