
const swapiApp = (async function() 
{
    const SWApIURL = "https://swapi.dev/api"
    const navBar = document.querySelector("#nav-bar")
    const cardContrainer = document.querySelector(".card-container")

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
        let data = await getData(this.href);
        data.results.forEach(dataItem =>{
            let card = document.createElement("div");
            card.className = "card";
            // card.innerText = dataItem.name;
            for(let [k, v] of Object.entries(dataItem))
            {
                card.insertAdjacentHTML("beforeend", `<span class="key">${k}:</span> <span class="value">${v}</span><br>`)
            }
            cardContrainer.appendChild(card);
            // cardContrainer.appendChild(card);
        })
        // console.log(data);
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

})();