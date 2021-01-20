import React, {useState, useContext} from 'react';
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import AppContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";
import process from "../../next.config";


export async function getStaticProps({params}) {

    const { enlace } = params;

    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    console.log(resultado)

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getStaticPaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: {
                enlace: enlace.url
            }
        })),
        fallback: false
    }
}


export default ({enlace}) => {

    // STATES
    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');


    // HOOKS
    /* Use Context */
    const appContext = useContext(AppContext);
    const { mensaje_archivo, mostrarAlerta } = appContext;


    // FUNCIONES
    const verificarPassword = async (ev) => {
        ev.preventDefault();

        const data = {
            password
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePassword(resultado.data.password);
        } catch(error){
            mostrarAlerta(error.response.data.msg);
        }
    }


    // RETURN
    return (
        <Layout>
            {
                tienePassword
                    ? (
                        <>
                            <p className="text-center">Este archivo está protegido con una contraseña, escribela a continuación:</p>

                            { mensaje_archivo && <Alerta /> }

                            <div className="flex justify-center mt-5">
                                <div className="w-full max-w-lg">
                                    <form
                                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                        onSubmit={ev => verificarPassword(ev)}
                                    >

                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                                            <input
                                                type="text"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"
                                                id="password"
                                                value={password}
                                                onChange={ev => setPassword(ev.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                            value="Validar Password"
                                        />
                                    </form>
                                </div>
                            </div>
                        </>
                    )

                    : (
                        <>
                            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>

                            <div className="flex items-center justify-center mt-10">
                                <a
                                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                    download
                                >
                                    Descargue aquí
                                </a>
                            </div>
                        </>
                    )
            }
        </Layout>
    )
}
