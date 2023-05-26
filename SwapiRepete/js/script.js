import { ignore } from "./modules/filter.js";

const swapiApp = (async function() 
{
    const SWApIURL = "https://swapi.dev/api";
    const navBar = document.querySelector("#nav-bar");
    const cardContrainer = document.querySelector(".card-container");
    const buttonNextPrec = document.querySelector(".button-next-prev");
    let nextData = "";
    let previousData = "";

    try 
    {
        const response = await fetch(SWApIURL);
        const jsonData = await response.json();
        for(let key in jsonData)
        {
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick)
            navItem.className = "nav-item";
            navItem.innerText = key;
            navItem.href = jsonData[key];
            navBar.appendChild(navItem);
        }
        
        
    }
    catch (error) 
    {
        console.log(error);
    }

    async function navClick(e)
    {
        e.preventDefault();
        deleteNavButton();
        // cardContrainer.innerHTML = "";
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active");
        let data = await getData(this.href);
        deleteCard();
        if(data.previous == null){
            buttonNextPrec.removeChild(buttonNextPrec.firstChild);
        }
        previousData = data.previous;
        nextData = data.next;
        showData(data);

    }
    
    function showData(data) {
        data.results.forEach(dataItem => {
            let card = document.createElement("div");
            card.className = "card";
            for (let [k, v] of Object.entries(dataItem)) {
                if (ignore.includes(k)) {
                    continue;
                }
                card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}:</span> <span class="value">${v}</span><br><hr>`);
            }
            cardContrainer.appendChild(card);
        });
    }
    async function getData(url)
    {
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            previousData = data.previous; // Update previousData
            nextData = data.next; // Update nextData
            navButton(); // Move this line here
        return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    function deleteCard(){
        while(cardContrainer.firstChild)
        {
            cardContrainer.removeChild(cardContrainer.firstChild);
        }
    }

    function navButton(){
        let nextButton = document.createElement("button");
        let prevButton = document.createElement("button");
        nextButton.className = "button-nav";
        prevButton.className = "button-nav";
        nextButton.innerText = "Next";
        prevButton.innerText = "Prev";
        nextButton.href = nextData;
        prevButton.href = previousData;
        buttonNextPrec.appendChild(prevButton);
        buttonNextPrec.appendChild(nextButton);
        nextButton.addEventListener("click", navClick);
        prevButton.addEventListener("click", navClick);
    }

    function deleteNavButton(){
        while(buttonNextPrec.firstChild)
        {
            buttonNextPrec.removeChild(buttonNextPrec.firstChild);
        }
    }

})();