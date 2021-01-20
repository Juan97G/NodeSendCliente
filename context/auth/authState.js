import React, {useReducer} from 'react';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "../../types/authTypes";



const AuthState = (props) => {

    // STATE INICIAL
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    // USE REDUCER
    const [state, dispatch] = useReducer(authReducer, initialState);


    // FUNCIONES
    /* Registrar nuevos usuarios */
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch(error){
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    /* Autenticación de usuarios para iniciar sesión */
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post("/api/auth", datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })

        } catch(error){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    /* Retornar el usuario autenticado en base al JWT */
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token");

        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get("/api/auth");

            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            })
        } catch(error){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    /* Cerrar sesión */
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }



    // RETURN
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;

