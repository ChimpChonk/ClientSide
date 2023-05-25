
const swapiApp = (async function() 
{
    const SWApIURL = "https://swapi.dev/api"
    const navBar = document.querySelector("#nav-bar")

    try 
    {
        const response = await fetch(SWApIURL);
        const jsonData = await response.json();
        for(let key in jsonData)
        {
            let navItem = document.createElement("a");
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
})();