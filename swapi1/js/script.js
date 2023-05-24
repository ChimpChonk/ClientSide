const baseurl = "https://swapi.dev/api"

const navBar = document.querySelector(".nav-bar")
const dataPrint = document.querySelector("#dataOutput")

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

    for(let item in data){
        for(let subItem in data.results){
            for(let subSubItem in data.results[subItem]){
                let itemDiv = document.createElement("p");
                itemDiv.innerText = `${subSubItem}: ${data.results[subItem][subSubItem]}`;
                dataPrint.appendChild(itemDiv);
            }
            // let itemDiv = document.createElement("p");
            // itemDiv.innerText = `${subItem}: ${data.results[subItem]}`;
            // dataPrint.appendChild(itemDiv);
            let line = document.createElement("hr");
            dataPrint.appendChild(line);
        }
        // let itemDiv = document.createElement("p");
        // itemDiv.innerText = `${item}: ${data[item]}`;
        // dataPrint.appendChild(itemDiv);
    }


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