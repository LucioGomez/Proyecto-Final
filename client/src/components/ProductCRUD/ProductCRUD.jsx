import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


export default function CRUD() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <crud>
                <h1>Administracion de productos</h1>
                <ul>
                    <li>
                        <Link to='/ProductCRUD/CreateProduct'><h1>CREAR</h1></Link>
                    </li>
                    <li>
                        <Link to='/ProductCRUD/ReadProduct'><h1>LEER</h1></Link>
                    </li>
                    <li>
                        <Link to='/ProductCRUD/UpdateProduct'><h1>ACTUALIZAR</h1></Link>
                    </li>
                    <li>
                        <Link to='/ProductCRUD/DeleteProduct'><h1>BORRAR</h1></Link>
                    </li>
                </ul>
            </crud>
        </div>
    )
}