
const swapiApp = (async function() 
{
    const SWApIURL = "https://swapi.dev/api";
    const navBar = document.querySelector("#nav-bar");
    const cardContrainer = document.querySelector(".card-container");
    const buttonNextPrec = document.querySelector(".button-next-prev");
    let next = "";
    let previous = "";

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
        navButton();
        deleteCard();
        data.results.forEach(dataItem =>{
            let card = document.createElement("div");
            card.className = "card";
            next = data.next;
            previous = data.previous;
            for(let [k, v] of Object.entries(dataItem))
            {
                card.insertAdjacentHTML("beforeend", `<span class="key">${k}:</span> <span class="value">${v}</span><br><hr>`)
            }
            cardContrainer.appendChild(card);
        })
    }

    async function getData(url)
    {
        try
        {
            const response = await fetch(url);
            return await response.json();
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
        nextButton.className = "button-next-prev";
        prevButton.className = "button-next-prev";
        nextButton.innerText = "Next";
        prevButton.innerText = "Prev";
        nextButton.href = next;
        prevButton.href = previous;
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