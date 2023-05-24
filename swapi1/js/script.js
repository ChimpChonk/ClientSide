const baseurl = "https://swapi.dev/api"

const navBar = document.querySelector(".nav-bar")

fetch(baseurl)
    .then(res => {
        return res.json()
    })
    .then(menuData => {
        for(let menuItem in menuData){
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick);
            navItem.className = "nav-item";
            navItem.innerText = menuItem;
            navItem.href = menuData[menuItem];
            navBar.appendChild(navItem);
        }
})

async function navClick(e){
    e.preventDefault();
    const data = await getData(this.href);
    console.log(data);
    // alert(this.href);
}

async function getData(url){
    try {
        const res = await fetch(url)
        return await res.json()
    }
    catch(err){
        console.log(err)
    }
}



// async getData().then(data => console.log(data))