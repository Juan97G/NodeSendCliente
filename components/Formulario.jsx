import React, {useState, useContext} from 'react';
import AppContext from "../context/app/appContext";

const Formulario = () => {

    // STATES
    const [tienePassword, setTienePassword] = useState(false);


    // HOOKS
    /* Use Context: Consumir datos del context de App */
    const appContext = useContext(AppContext);
    const { agregarPassword, agregarNumDescargas } = appContext;


    // RETURN
    return (
        <div className="w-full mt-10">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8
                                rounded leading-none focus:outline-none focus: border-gray-500"
                    onChange={ev => agregarNumDescargas(ev.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                    <input type="checkbox" onChange={() => setTienePassword(!tienePassword)}/>
                </div>

                { tienePassword
                    ? <input
                        type="password"
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8
                                rounded leading-none focus:outline-none focus: border-gray-500"
                        onChange={(ev) => agregarPassword(ev.target.value)}
                      />

                    : null
                }
            </div>
        </div>
    );
};

export default Formulario;
