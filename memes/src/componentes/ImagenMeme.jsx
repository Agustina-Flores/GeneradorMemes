import React , {useEffect, useState} from "react";
 import html2canvas from 'html2canvas'
 
const ImagenMeme = () =>
{
    const[colorbutton,setColorButton] = useState(false);

 
   
   const[meme,setMemes] = useState({
    textS: "",
    textI: "",
    randImg: "http://i.imgflip.com/1bij.jpg",
   });

   const [img,setImg] = useState([]);

    useEffect(() =>{
      fetch("https://api.imgflip.com/get_memes")
       .then((response) => response.json())
       .then((data) =>{
        setImg(data.data.memes)
       })
      },[]);
      
    
       function getRamdonInt()
       {
        const memeImg= img[Math.floor(Math.random() * img.length)];
        let url = memeImg.url;

        setMemes((prevMeme) =>({
          ...prevMeme,
          randImg: url,
        }));
      }

      function handleChange(e) {
      
        const { name, value } = e.target;
        setMemes((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }
 

    const descarga = () => 
    {
      setColorButton(true)
      html2canvas(document.getElementById("exportar"),{

        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: true 
      }).then(canvas =>{
        let img = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "memepropio.png";
        link.href = img;
       link.click();
      })
       
    } 
        
      
    return(
      <div> 
     <div className="bg-[#009929] flex flex-col justify-center items-center">
        <br></br>
        <br></br>
 
        <input 
        value={meme.textS} 
        className="rounded-lg w-60 h-10 text-center font-serif font-bold text-black"
        name="textS" 
        placeholder="Ingresa texto superior "
        onChange={handleChange}
        />
        <br></br> 
        <br></br>
        <input 
        value={meme.textI} 
        className="rounded-lg w-60 h-10 text-center font-serif font-bold text-black "
        name="textI" 
        placeholder="Ingresa texto inferior"
        onChange={handleChange}
        />
                <br></br>
                <br></br> 
                <br></br> 
                <button 
       onClick={getRamdonInt}
       type='button'
        className="rounded-full w-48 h-10 font-serif font-bold text-gray-400 text-center bg-white"> Otro Meme</button>
         <br></br> 
         <br></br> 
         <br></br>
         <div class="grid flex flex-col justify-center items-center" > 
         <div className=" shadow-lg cursor-pointer" id="exportar"   >
         <div class="meme">
          <img  src={meme.randImg} className="meme-image" alt="meme" />
      
          <h1 className="meme-text top"  >{meme.textS}</h1>
          <h2 className="meme-text bottom"   >{meme.textI}</h2>
         </div>
         </div>
         </div>
         <br></br>
         <br></br>
         <br></br>
       <button 
        
       type='button'
       onClick={() => descarga()}
        className={`rounded-full w-48 h-10 font-serif font-bold text-gray-400 text-center ${colorbutton ? "bg-emerald-300" : "bg-white"}`}>Descargar Meme</button>
          <br></br> 
         <br></br> 
         </div>
        
        
         <br></br>
         <br></br>
       </div>
       
        );
        
    }
export default ImagenMeme;