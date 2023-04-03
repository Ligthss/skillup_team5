import { Link, useParams } from "react-router-dom";
import { useDataUser } from "../hooks/useDataUser";
import { useAuth } from "../context/AuthContext";

function PaginaUsuario(){
    let { id: uid } = useParams();
    const {cargando, datosUsuario} = useDataUser(uid);
    const { usuario } = useAuth();

    // Si está cargando se muestra el texto
    if(cargando) return <h2 className="contenedor titulo">Cargando perfil...</h2>

    // Si los datos de ese perfil no existen o si el rol no es empresa
    if(!datosUsuario || datosUsuario.rol != "empresa") return <h2 className="contenedor titulo">Perfil de empresa no existente</h2>

    return(
        <div className="usuario contenedor">
            <div className="usuario__datos">
                <img src="https://i.pravatar.cc/100" className="usuario__img" alt="Foto de perfil del usuario" />
                <div className="usuario__informacion">
                    {
                        // Si es dueño del perfil, se muestra el boton para editar
                        usuario != null && uid == usuario.id && (
                            <Link to="/editar-perfil" className="usuario__editar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil usuario__editar-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                    <path d="M13.5 6.5l4 4"></path>
                                </svg>
                                Editar perfil
                            </Link>
                        )
                    }
                    <h2 className="usuario__nombre">{datosUsuario.nombre}</h2>
                    <p className="usuario__direccion">{datosUsuario.direccion}</p>
                </div>
            </div>
            <div className="usuario__textos">
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Descripción</h2>
                    <p className="usuario__parrafo">{datosUsuario.descripcion}</p>
                </div>
                <div className="usuario__texto">
                    <h2 className="usuario__titulo">Ofertas o cursos</h2>
                    <p className="usuario__parrafo">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa vitae illo dicta eum eaque, eligendi molestiae maiores! Maxime, earum esse nulla cum, repellendus magni optio sed suscipit autem sint sapiente?</p>
                </div>
            </div>
        </div>
    )
}

export default PaginaUsuario;