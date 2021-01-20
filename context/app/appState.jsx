import React, {useReducer} from 'react';
import AppContext from "./appContext";
import AppReducer from "./appReducer";
import clienteAxios from "../../config/axios";

import {
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_CANTIDAD_DESCARGAS
} from "../../types/appTypes";


const AppState = (props) => {

    // STATE INICIAL
    const stateInicial = {
        mensaje_archivo: "",
        nombre: "",
        nombre_original: "",
        cargando: null,
        descargas: 1,
        password: "",
        autor: "",
        url: ""
    }


    // HOOKS
    /* Use Reducer */
    const [state, dispatch] = useReducer(AppReducer, stateInicial);


    // FUNCIONES
    /* Activa el type para mostrar una alerta */
    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000)
    }

    /* Sube los archivos al servidor */
    const subirArchivo = async (formData, nombreOriginal) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })

        try {
            const resultado = await clienteAxios.post("/api/archivos", formData);
            console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreOriginal
                }
            })

        } catch(error){
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    /* Crea los enlaces de los archivos una vez dan click */
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post("/api/enlaces", data);

            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch(error){
            console.log(error);
        }
    }

    /* Limpiar el state para que no queden datos antiguos guardados */
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    /* Agregar el password */
    const agregarPassword = (password) => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    /* Agregar la cantidad de descargas de un archivo */
    const agregarNumDescargas = (cantidad) => {
        dispatch({
            type: AGREGAR_CANTIDAD_DESCARGAS,
            payload: Number(cantidad)
        })
    }


    // RETURN
    return (
        <AppContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarNumDescargas
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
