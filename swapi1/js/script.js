const baseurl = "https://swapi.dev/api"

async function getData(){
    try {
        const res = await fetch(baseurl)
        return await res.json()
    }
    catch(err){
        console.log(err)
    }
}