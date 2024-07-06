
const root = "https://dummyjson.com/"
const movie_api_key = "210d6a5dd3f16419ce349c9f1b200d6d"

// url: `${root}search/movie?api_key=${apiKey}&language=en-US&query=${criteria}&page=1&include_adult=false`


export async function LoginMe (credentials) {

    let rawData = await fetch(`${root}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          
          username: credentials.name,
          password: credentials.password,
          expiresInMins: 30, // optional, defaults to 60
        })
      })
      
    let data = await rawData.json()
    return data;
}

export async function bringLocations() {

  let rawData = await fetch("http://localhost:8000/locations")

  let locationData = await rawData.json()
  console.log(locationData)

  return locationData

}

