
const root = "http://127.0.0.1:8000/"
import { jwtDecode } from "jwt-decode";





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
    return data;
}

export async function bringLocations() {

  let rawData = await fetch(`${root}locations`)

  let locationData = await rawData.json()

  return locationData

}

export async function bringLocation(id) {

  let rawData = await fetch(`${root}location/${id}`)

  let locationData = await rawData.json()

  return locationData

}

export async function RegisterMe (credentials) {

  let rawData = await fetch(`${root}auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.name,
        password: credentials.password,
        email: credentials.email,
      })
    })
    
  let data = await rawData.json()
  console.log(data);
  return data;
}


export async function ValidateUser (token) {
  let decoded = jwtDecode(token)

  let rawData = await fetch(`${root}auth/validate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apitoken: token,
        username: decoded?.firstName
      })
    })
    
  let data = await rawData.json()
  return data;
}


export async function bringUser(id) {

  let rawData = await fetch(`${root}auth/profile/${id}`)

  let userData = await rawData.json()

  return userData

}

export async function Like (token, id) {
  let decoded = jwtDecode(token)
  console.log(token,id)
  let rawData = await fetch(`${root}location/like`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: decoded?.firstName,
        id: id
      })
    })
    
  let data = await rawData.json()
  return data;
}

export async function Liked (token, id) {
  console.log(token,id)
  let decoded = jwtDecode(token)
  let rawData = await fetch(`${root}location/liked`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: decoded?.firstName,
        id: id
      })
    })
    
  let data = await rawData.json()
  return data;
}