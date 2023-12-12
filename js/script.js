let form = document.querySelector("form");

form.addEventListener("submit", event=>{

  event.preventDefault();

  let rBName = document.querySelector("#radioName").checked;
  
  let rBLang = document.querySelector("#radioLang").checked;

  let textInput = document.querySelector("#textInput").value;

  if(rBName ===true){
    nameSearch(textInput);
  }else if(rBLang === true){
    langSearch(textInput);
  }else{
    alert("Please select name och language");
  }

  form.reset();
});

function nameSearch(countryName){
  const countryApi = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(countryApi).then(result => result.json()).then(countryObj=>{
    let container = document.querySelector("#resultDiv");
    container.innerHTML = "";
    countryObj.sort(compare);
    for(let i = 0; i<countryObj.length;i++){

    let h1El = document.createElement("h1");
    let h2El = document.createElement("h2");
    let h3El = document.createElement("h3");
    let h4El = document.createElement("h4");
    let imgEl = document.createElement("img");
    let box = document.createElement("div");
    box.classList.add("boxStyle");

    if(countryObj[i].capital === undefined){
      h3El.innerText = "none"
    }else{
    h3El.innerText = countryObj[i].capital[0];
    }
    h1El.innerText = countryObj[i].name.official;
    h2El.innerText = countryObj[i].subregion;
    h4El.innerText = "Population: " + countryObj[i].population;
    imgEl.src = countryObj[i].flags.png;

    box.append(h1El,h2El,h3El,h4El,imgEl);
    container.append(box);
    container.style.height = "fit-content";
    }
    }).catch(error=>{
      let errorH2 = document.createElement("h2");
      errorH2.innerText = error;
      let container = document.querySelector("#resultDiv");
      container.append(errorH2);
    })
  
}

function langSearch(language){
  let countryApi = `https://restcountries.com/v3.1/lang/${language}`;

  fetch(countryApi).then(result => result.json()).then(countryObj =>{
    let container = document.querySelector("#resultDiv");
    container.innerHTML = "";
    countryObj.sort(compare);
    for(let i = 0; i<countryObj.length; i++){
      
      
    
      let h1El = document.createElement("h1");
      let h2El = document.createElement("h2");
      let h3El = document.createElement("h3");
      let h4El = document.createElement("h4");
      let imgEl = document.createElement("img");
      let box = document.createElement("div");
      box.classList.add("boxStyle");
      if(countryObj[i].capital === undefined){
        h3El.innerText = "none"
      }else{
      h3El.innerText = countryObj[i].capital[0];
      }
      h1El.innerText = countryObj[i].name.official;
      h2El.innerText = countryObj[i].subregion;
      h4El.innerText = "Population: " + countryObj[i].population;
      imgEl.src = countryObj[i].flags.png;

        
      box.append(h1El,h2El,h3El,h4El,imgEl);
      container.append(box);
      container.style.height = "fit-content";    
      }
    }
  ).catch(error=>{
    let errorH2 = document.createElement("h2");
    errorH2.innerText = error;
    let container = document.querySelector("#resultDiv");
    container.append(errorH2);
  })
}

//Funktionen compare jämför två värden och tillsammans med sort så sortetar den utifrån högsta värdet

function compare(a,b){
  return b.population-a.population;
}