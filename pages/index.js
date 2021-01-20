import React, {useContext, useEffect} from 'react';
import Layout from "../components/Layout";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import Alerta from "../components/Alerta";

const Index = () => {

    // HOOKS
    /* Use Context: Consumir de Authorization */
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    const appContext = useContext(AppContext);
    const {mensaje_archivo, url} = appContext;

    /* Use Effect */
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            usuarioAutenticado();
        }
    }, [])


    // RETURN
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto">

                {url
                    ? (
                        <>
                            <p className="text-center text-2xl">
                                <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es: </span>
                                {`${process.env.frontendURL}/enlaces/${url}`}
                            </p>

                            <button
                                type="button"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                            >
                                Copiar Enlace
                            </button>
                        </>
                    )

                    : (
                        <>
                        {mensaje_archivo && <Alerta/>}

                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

                            <Dropzone />

                            <div className="md:flex-1 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                    Compartir archivos de forma sencilla y privada
                                </h2>
                                <p className="text-base leading-loose">
                                    <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado
                                    de extremos a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener
                                    lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
                                </p>
                                <Link href="/crearcuenta">
                                    <a className="text-red-500 font-bold text-base hover:text-red-700">
                                        Crea una cuenta para mayores beneficios
                                    </a>
                                </Link>
                            </div>
                        </div>
                        </>
                    )
                }

            </div>
        </Layout>
    );
};

export default Index;

