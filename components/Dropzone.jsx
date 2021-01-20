import React, {useCallback, useContext} from 'react';
import {useDropzone} from "react-dropzone";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";
import Formulario from "./Formulario";

const Dropzone = () => {

    // FUNCIONES
    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir el archivo, limite: 1MB... Obtén una cuenta para tener limite de 10MB');
    }


    const onDropAccepted = useCallback( async (acceptedFiles) => {

        // Crear un form data
        const formData =  new FormData();
        formData.append('archivo', acceptedFiles[0]);

        subirArchivo(formData, acceptedFiles[0].path);
    }, []);



    // HOOKS
    /* Use Dropzone: Para extraer el contenido de dropzone */
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

    /* Use Context: Consumiendo context de App */
    const appContext = useContext(AppContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = appContext;

    const authContext = useContext(AuthContext);
    const { autenticado, usuario } = authContext;


    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-lg">{archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))


    // RETURN
    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed
                        border-gray-400 border-2 bg-gray-100 px-4">

            {acceptedFiles.length > 0
                ? (
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>
                            {archivos}
                        </ul>

                        {
                            autenticado ? <Formulario /> : null
                        }

                        { cargando
                            ? <p>Subiendo archivo...</p>
                            : <button
                                type="button"
                                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                onClick={() => crearEnlace()}
                              >
                                Crear enlace
                              </button>
                        }

                    </div>
                )

                : (
                    <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                        <input className="h-100" {...getInputProps()}/>

                        { isDragActive
                            ? <p className="text-2xl text-center text-gray-600">Suelta aquí el archivo</p>
                            : (
                                <div className="text-center">
                                    <p className="text-2xl text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                                    <button type="button" className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                                        Selecciona archivo para subir
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Dropzone;
