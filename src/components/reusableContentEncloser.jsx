import React , {useState , useEffect} from 'react'
import { iconAudio, iconFile, iconPause } from '../assets/images'
import colors from '../assets/constants/colors'

const ReusableContentEncloser = (props) => {
 const  audioFormats = ["mp3","wav","aiff","flac","aac","ogg","wma","m4a","alac","ape","opus","amr","midi","au","pcm","mp2","dsd"]
 const [isPlaying, setIsPlaying] = useState(false);
 const [audioElement, setAudioElement] = useState(null);

 const handleAudioClick = () => {
   setIsPlaying(!isPlaying);

   if (isPlaying) {
    audioElement?.pause();
   } else {
    audioElement?.play();
   }
 };


 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(props.fileLink);
      const url =response.url
      const audioLink = audioFormats.find(ext => url.includes(ext));

      if (audioLink) {
       
          const audio = new Audio(url); 
          setAudioElement(audio); 
      } else {
      
          return
      }
      
    } catch (error) {
     
      return
    }
  };

  fetchData();
}, [props.fileLink]);








const handleClick = () =>{
  const fileLink = props.fileLink
  window.open(fileLink, '_blank');
}

  return (

    <div  style={{height:"60px",borderRadius:"5px", backgroundColor:colors.secondaryColorLighterShade,}} className='d-flex align-items-center justify-content-between gap-2'>

        <div  className='d-flex justify-content-center align-items-center h-100'>
            {audioFormats.includes(props.fileType.toLowerCase()) ? (
              <div onClick={handleAudioClick}>
                    <img src={isPlaying ? iconPause :iconAudio} style={{height:"auto", width:props.iconWidth || isPlaying?  "30px" :"50px"}}/>
              </div>
            ):(
          <div style={{paddingLeft:"10px"}}>
            <img src={iconFile} style={{height:"auto", width:props.iconWidth || "30px"}}/>

            </div>

       
            )
}
        </div>

          <div className='w-100'>

            <div className='d-flex justify-content-center align-items-center' style={{maxWidth:"90%",overflowX:"scroll", fontSize:"15px",cursor:"pointer"}} onClick={handleClick}>

              {props.fileName}
            </div>
        </div>

       

    </div>
  )
}

export default ReusableContentEncloser