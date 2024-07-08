
const root = "http://127.0.0.1:8000/"



// url: `${root}search/movie?api_key=${apiKey}&language=en-US&query=${criteria}&page=1&include_adult=false`


export async function LoginMe (credentials) {

    let rawData = await fetch(`${root}auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
          username: credentials.name,
          password: credentials.password,
          expiresInMins: 30, // optional, defaults to 60
        })
      })
      
    let data = await rawData.json()
    console.log(data);
    return data;
}

export async function bringLocations() {

  let rawData = await fetch("http://localhost:8000/locations")

  let locationData = await rawData.json()
  console.log(locationData)

  return locationData

}

