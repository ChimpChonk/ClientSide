
const url = "https://dog.ceo/api/breeds/image/randomm";

const obj = [
    {
    firstName: "John",
    lastName: "Doe",
    profession: "Developer"
    },
    {
    firstName: "Anna",
    lastName: "Smith",
    profession: "Designer"
    },
    {
    firstName: "Peter",
    lastName: "Jones",
    profession: "Photographer"
    }
];
//console.log(typeof obj);
console.log(Array.isArray(obj));

// for (let key in obj) {
//     console.log(key + ": " + obj[key]);
// }


for(let [key, value] of Object.entries(obj)) {
    console.log(key + ": " + value);
}

// function dataFetch(){
//     fetch(url)
//     .then(function(response) {
//         if(response.status == 200){
//             return response.json()
//         }

//         // something went wrong
//         document.querySelector("#errMsg").style.display = "block";
//         document.querySelector("#errMsg").innerHTML = new Error(response.status + " " + response.statusText);
    
//         throw new Error(response.statusText);

//     }) 
//     .then( function(json) {
//         console.log((json))
//         // document.querySelector("#pict").src = json.message;
//         const img = document.createElement("img");
//         const picContainer = document.querySelector("#picContainer");
//         img.src = json.message;
//         picContainer.appendChild(img);
            
//     })
//     .catch(function(error) {
//         console.log(error);
// }

async function dataFetch(){
    try {

        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    catch(error) {
        console.log(error);
    }
}


 document.querySelector("#nextImg").addEventListener("click", async () => {
    const data = await dataFetch()
    const img = document.createElement("img");
    const picContainer = document.querySelector("#picContainer");

    img.src = data.message;
    picContainer.appendChild(img);
    console.log(data)
});

// setInterval(dataFetch, 5000);
        