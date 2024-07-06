import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import MovieDetail from "../MovieDetail/MovieDetail";

import { myContext } from "../../app/context";
import { useContext } from "react";

function Body() {
  const { state } = useContext(myContext);
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {state.auth.token !== "" ? (
          <Route path="/profile" element={<Profile />} />
        ) : null}
      </Routes>
    </>
  );
}

export default Body;



{/* <Route path="/admin" element={<AdminRoute Component={Admin} />} />  código en el Body de enrutado */}



// import { useSelector } from "react-redux"
// import { Navigate } from "react-router-dom"
// import { amIAdmin } from "../../app/slices/userSlice"


// export const AdminRoute = ({Component}) => {

//     //Ruta privada que recibe un componente por props (una vista). Si eres admin, te devuelve el componente recibido, y si no te envía a home
//     //de esta manera podemos definir rutas de acceso restringido que directamente no intenten cargar el componente si no tienes acceso.
//     const isAdmin = useSelector(amIAdmin)

//     return isAdmin ? <Component /> : <Navigate to="/" /> 
// }
// código del AdminRoute.jsx, el componente de enrutado privado (sólo para admins)
// 5:48
// // método que nos dice si el usuario logeado es admin o no para uso en rutas de admins
// export const amIAdmin =(state) => state.user.decodificado.role === "ADMIN"
// export default userSlice.reducer
// método que creamos para que redux nos devuelva un booleano para checkear si somos admins y así depaso repasar redux
// 5:51
// también tenemos una vista legacy con el fetch a los personajes de rick & morty en la que añadimos un buscador con debounce