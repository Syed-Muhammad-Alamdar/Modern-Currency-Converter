const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");

for( let select of dropdowns){
    for (Currcode in countryList){
    let newOption = document.createElement("option")
    newOption.innerText = Currcode;
    newOption.value = Currcode;
    select.append(newOption);
}

select.addEventListener("change", (evt)=> {
    updateFlag(evt.target);
} );
}

const updateFlag =(element)=>{
  let Currcode = element.value;
  let countryCode = countryList[Currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval<1){
     amtval = 1;
     amount.value="1";
    }
   const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    console.log(rate);

    let finalAmount = amtval * rate;

    const msg = document.querySelector(".msg");
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
})


