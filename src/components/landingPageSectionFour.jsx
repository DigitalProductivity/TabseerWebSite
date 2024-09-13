import React from 'react'
import "../components/components.css"
import { nextButtonIcon, previousButtonIcon, sectorIcon } from '../assets/images';
import { useTranslation } from 'react-i18next';

function LandingPageSectionFour() {

  const {t,i18n}=useTranslation();
  const isRTL=i18n.dir() ==='rtl';

    const handleNextClick = () => {
        const myBox = document.querySelector('.carouselContainer')
    
          myBox.scrollLeft = myBox.scrollLeft + 400
      };
    
      const handlePrevClick = () => {
        const myBox = document.querySelector('.carouselContainer')
    
        myBox.scrollLeft = myBox.scrollLeft - 400;
    };

    const detailedValues=[
      {
          "id":"1",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Medical"),
          "details":t("SectorsDescription")
      },
      {
          "id":"2",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Judiciary"),
          "details":t("SectorsDescription")
      },
      {
          "id":"3",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Transport"),
          "details":t("SectorsDescription")
      },
      {
          "id":"4",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("MedicalMalpractice"),
          "details":t("SectorsDescription")
      },
      {
          "id":"5",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Administration"),
          "details":t("SectorsDescription")
      },
      {
          "id":"6",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Rights"),
          "details":t("SectorsDescription")
      },
      {
          "id":"7",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("commercial"),
          "details":t("SectorsDescription")
      },
      {
          "id":"8",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Economy"),
          "details":t("SectorsDescription")
      },
      {
          "id":"9",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("Mineral"),
          "details":t("SectorsDescription")
      },
      {
          "id":"10",
          "sectorIcon":"../../src/assets/images/landingPage/judge.png",
          "sectorName":t("HighCourt"),
          "details":t("SectorsDescription")
      }
  ]


  return (
     <div className="sectionFour d-flex flex-column ">
      <h6 className="text-center mb-3" style={{color:"#B48F5A",fontWeight:"bold"}}>{t("Sectors")}</h6>
      <h5 className="text-center mb-5" style={{fontWeight:"bolder", color:"GrayText"}}>{t("WeProvideLegalConsultations")}</h5>

      <div className=" d-flex gap-5 mb-5  container carouselContainer"  style={{ overflowX:"hidden", scrollBehavior:"smooth" }}>
        {detailedValues.map((item) => (
          <div key={item.id} className='bg-light p-3' style={{borderRadius:"20px"}}>
            <div  className="d-flex flex-column gap-3 widthPropControl">
                <div style={{height:"60px",width:"60px",background:"#ede5d8",display:"flex", justifyContent:"center",alignItems:"center",borderRadius:"20px"}}>
                    <img src={sectorIcon} style={{ height: "auto", width: "40px",backgroundColor:"transparent",borderRadius:"10px" }} />
                </div>
            <h6 className="mb-0">{item.sectorName}</h6>
            <p className="mb-0" style={{color:"gray", lineHeight:"28px"}}>{item.details}</p>
            </div>
            
          </div>
        ))}

      </div>

      <div className="d-flex justify-content-center mb-4">
      {isRTL ? (
        <>
          <button onClick={handleNextClick} id="nextButton" style={{ background: "transparent", border: "none" }}>
            <img src={nextButtonIcon} style={{ height: "auto", width: "40px" }} />
          </button>
          <button onClick={handlePrevClick} id="previousButton" style={{ background: "transparent", border: "none" }}>
            <img src={previousButtonIcon} style={{ height: "auto", width: "40px" }} />
          </button>
        </>
      ) : (
        <>
          <button onClick={handlePrevClick} id="previousButton" style={{ background: "transparent", border: "none" }}>
            <img src={previousButtonIcon} style={{ height: "auto", width: "40px" }} />
          </button>
          <button onClick={handleNextClick} id="nextButton" style={{ background: "transparent", border: "none" }}>
            <img src={nextButtonIcon} style={{ height: "auto", width: "40px" }} />
          </button>
        </>
      )}
    </div>
      
      
    </div>
  )
}

export default LandingPageSectionFour