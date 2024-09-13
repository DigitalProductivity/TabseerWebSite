import React from 'react'
import "../components/components.css"
import { avatarImage, nextButtonIcon, previousButtonIcon, starIcon } from '../assets/images';
import { useTranslation } from 'react-i18next';

function LawyerLandingPageSectionSix() {

    const StarRating = ({ rating }) => {
       
        return Array.from({ length: rating }, (_, index) => (
          <span key={index}><img src={starIcon}  style={{height:"auto",width:"20px"}}/></span>
        ));
      }

  const handleNextClick = () => {
      const myBox = document.querySelector('.ratingsContainer')
  
        myBox.scrollLeft = myBox.scrollLeft + 400
    };
  
    const handlePrevClick = () => {
      const myBox = document.querySelector('.ratingsContainer')
  
      myBox.scrollLeft = myBox.scrollLeft - 400;
  };
  const {t,i18n}=useTranslation();
  const isRTL=i18n.dir() === 'rlt';



  const data=[
    {
        "id":"1",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"4",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"2",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"3",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"3",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"1",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"4",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"4",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"5",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"2",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"6",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"4",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"7",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"3",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"8",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"2",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"9",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"1",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"10",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"4",
        "reviewPara":t("ClintReview")
    },
    {
        "id":"11",
        "image":"../../src/assets/images/avatar.png",
        "name":t("mohammed"),
        "starRatingValue":"4",
        "reviewPara":t("ClintReview")
    }

]
  return (
    <div className="container-fluid"  style={{position:"relative"}}>

            
                <div style={{clipPath: "polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)",backgroundColor:"#bb8d4f",minHeight:"55%",width:"25%",position:"absolute",right:0 ,bottom:0,transform:"translateY(-14%)",zIndex:"-1"}}>
                       
                </div>

            <div className='container'>

                <div className="d-flex justify-content-center flex-column gap-2">
                        <h6 className="text-center mb-3" style={{color:"#B48F5A",fontWeight:"bold"}}>{t("Testimonials")}</h6>
                        <h5 className="text-center mb-5" style={{fontWeight:"bolder", color:"GrayText"}}>{t("WhatClientSays")}</h5>

                </div>



                        <div className="d-flex justify-content-start mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                                <button onClick={handlePrevClick} id="previousButton" style={{ background: "transparent", border: "none" }}>
                                    <img src={previousButtonIcon} style={{ height: "auto", width: "40px" }} />
                                </button>
                                <button onClick={handleNextClick} id="nextButton" style={{ background: "transparent", border: "none" }}>
                                    <img src={nextButtonIcon} style={{ height: "auto", width: "40px" }} />
                                </button>
                         </div>

                <div className="row"  >

                    <div className="d-flex gap-5 mb-5  container ratingsContainer "  style={{ overflowX:"hidden", scrollBehavior:"smooth" }}>
                        {data.map((item) => (
                        <div key={item.id} className="col-md-6 col-lg-3 p-3 col-12" style={{borderRadius:"20px",backgroundColor:"#e9e2d7"}}>

                            <div className="d-flex gap-2">
                                <div className='d-flex align-items-center'>
                                    <img src={avatarImage} style={{height:"auto",width:"40px",borderRadius:"50%"}} />
                                </div>

                                <div>
                                    <h6 className='mb-0'>{item.name}</h6>
                                    <StarRating rating={item.starRatingValue} />
                                </div>
                            </div>

                            <p style={{fontSize:"14px",color:"gray"}} className='mt-2'>{item.reviewPara}</p>
                    
                    
                        </div>
                                ))}

                    </div>

                   

                </div>
                
            </div>
            
    </div>
  )
}

export default LawyerLandingPageSectionSix