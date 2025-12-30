fetch("http://localhost:5000/api/tts/generate",{
  method:"POST",
  headers:{
    "Authorization":"Bearer "+token,
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    text: text,
    voice: "en-US-premium"
  })
})
.then(res=>res.json())
.then(data=>{
  new Audio(data.audio).play();
});
