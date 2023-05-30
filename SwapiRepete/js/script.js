import { ignore } from "./modules/filter.js";

const swapiApp = (async function () {
    const SWApIURL = "https://swapi.dev/api";
    const navBar = document.querySelector("#nav-bar");
    const cardContrainer = document.querySelector(".card-container");
    const buttonNextPrec = document.querySelector(".button-next-prev");
    const itemDetail = document.querySelector(".item-detail");
    let nextData = "";
    let previousData = "";

    try {
        const response = await fetch(SWApIURL);
        const jsonData = await response.json();
        for (let key in jsonData) {
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick)
            navItem.className = "nav-item";
            navItem.innerText = key;
            navItem.href = jsonData[key];
            navBar.appendChild(navItem);
        }
        document.querySelectorAll(".nav-item")[0].click();

    }
    catch (error) {
        console.log(error);
    }

    async function navClick(e) {
        e.preventDefault();
        deleteNavButton();
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active");
        let data = await getData(this.href);
        deleteCard();
        showData(data);

    }
    async function pageChange(e) {
        e.preventDefault();
        deleteNavButton();
        let data = await getData(this.href);
        deleteCard();
        deleteDetailCard();
        showData(data);
    }



    function showData(data) {
        data.results.forEach(async dataItem => {
            deleteDetailCard();
            let card = document.createElement("div");
            card.className = "card";
            let clickable = document.createElement("a");
            clickable.href = dataItem.url;
            for (let [k, v] of Object.entries(dataItem)) {
                if (ignore.includes(k)) {
                    continue;
                }
                if (k == "homeworld") {
                    let homeworld = await getData(v);
                    //console.log(homeworld);
                    card.insertAdjacentHTML("beforeend", `<span class="key">${k}: </span> <span class="value">${homeworld.name}</span><br><hr>`);
                }
                else if (v == null) {
                    card.insertAdjacentHTML("beforeend", `<span class="key">Homeworld: </span> <span class="value">N/A</span><br><hr>`);
                    }
                else{
                    card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}: </span> <span class="value">${v}</span><br><hr>`);
                }
            }
            card.appendChild(clickable);
            cardContrainer.appendChild(card);
            card.addEventListener("click", async function (e) {
            await showCardDetail(clickable);});
        });
    }

    async function showCardDetail(url){
        deleteCard();
        deleteNavButton();
        deleteDetailCard();
        let cardData = await getData(url);
        console.log("show detail clicked");
        let detailCard = document.createElement("div");
        // let listItem = document.createElement("li");
        detailCard.className = "detail-card";
        console.log(cardData);
        for (let [key, value] of Object.entries(cardData)) {
            detailCard.insertAdjacentHTML("beforeend", `<span class="key">${key.replace("_", " ")}: </span>`);
            if (Array.isArray(value)) {          
                let list = document.createElement("ul");
                value.forEach(item => {
                    let listItem = document.createElement("li");
                    listItem.insertAdjacentHTML("beforeend", `<span class="value">${item}</span><br>`)
                    list.appendChild(listItem);
                });
                detailCard.appendChild(list);
                detailCard.insertAdjacentHTML("beforeend","<hr>")
            }
            else{
                detailCard.insertAdjacentHTML("beforeend", `<span class="value">${value}</span><br><hr>`);
            }
            
            console.log(key, value);
        }
        itemDetail.appendChild(detailCard);
    }


    async function getData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            previousData = data.previous; // Update previousData
            nextData = data.next; // Update nextData
            navButton(data); // Move this line here
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }

    function deleteCard() {
        while (cardContrainer.firstChild) {
            cardContrainer.removeChild(cardContrainer.firstChild);
        }
    }

    function deleteDetailCard() {
        while (itemDetail.firstChild) {
            itemDetail.removeChild(itemDetail.firstChild);
        }
    }

    function navButton(data) {
        if (data.previous != null) {
            let prevButton = document.createElement("button");
            prevButton.className = "button-nav";
            prevButton.innerText = "Prev";
            prevButton.href = previousData;
            buttonNextPrec.appendChild(prevButton);
            prevButton.addEventListener("click", pageChange);
        }
        if (data.next != null) {
            let nextButton = document.createElement("button");
            nextButton.className = "button-nav";
            nextButton.innerText = "Next";
            nextButton.href = nextData;
            buttonNextPrec.appendChild(nextButton);
            nextButton.addEventListener("click", pageChange);
        }
    }

    function deleteNavButton() {
        while (buttonNextPrec.firstChild) {
            buttonNextPrec.removeChild(buttonNextPrec.firstChild);
        }
    }

})();