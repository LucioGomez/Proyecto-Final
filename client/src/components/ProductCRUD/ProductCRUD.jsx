import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getCarDetail, postProduct, getCategories} from '../../actions/index'
import {useDispatch,useSelector} from "react-redux";
import styleCrudPost from '../ProductCRUD/ProductCRUD.module.css';


function validate(input) {
    var valoresAceptados = /^[0-9]+$/;
    let errors = {};
    if(!input.model.match(valoresAceptados)){
        errors.model = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
    else if(!input.price.match(valoresAceptados)){
        errors.price = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
    else if(!input.features_doors.match(valoresAceptados)){
        errors.model = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
    else if(!input.features_engine_torque.match(valoresAceptados)){
        errors.model = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
     else if(!input.features_engine_torque.match(valoresAceptados)){
        errors.features_engine_torque = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
     else if(!input.features_mileage.match(valoresAceptados)){
        errors.features_mileage = '*SOLO SE PUEDEN AGREGAR NUMEROS*'
    }
    else{
        errors.ok = true; 
    }
    return errors
}


 function ProductCRUD(){

    const dispatch= useDispatch();
    
    const cars = useSelector(state => state.allcategories)
    useEffect(()=>{
        dispatch(getCategories());
    },[dispatch])

    const [errors,setErrors] = useState({})






    const [input, setInput]= useState({
        brand:"",
        name:"",
        model:"",
        img:"",
        category:"",
        description:"",
        features_doors :"",
        features_engine_name : "",
        features_engine_cv : "" ,
        features_engine_torque : "",
        features_engine_combustion : "",
        features_transmission_manual : "",
        features_transmission_automatic : "",
        features_traction: "",
        features_mileage: "",
        price:""
    });
    
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value  
        }))
        console.log(input)
    };

    function handleSubmit(e){
        console.log(input)
        e.preventDefault(e);
        dispatch(postProduct(input))
        alert("¡PRODUCT ADDED!")
        setInput({
            brand:"",
            name:"",
            model:"",
            img:"",
            category:"",
            description:"",
            features_doors :"",
            features_engine_name : "",
            features_engine_cv : "" ,
            features_engine_torque : "",
            features_engine_combustion : "",
            features_transmission_manual : "",
            features_transmission_automatic : "",
            features_traction: "",
            features_mileage: "",
            price:""
    })};
        
    function handleSelect(e) {
        setInput({
            ...input,
            category: e.target.value
        })
    }

    return(
        <div className={styleCrudPost.General}>

        <h1>Enter New Car information</h1>

        <form onSubmit= {(e)=> handleSubmit(e)}>
        <fieldset >
                <label className={styleCrudPost.label}>Brand: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                type="text"
                value= {input.brand}
                name= "brand"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                required
                placeholder="Marca"
                />
            </div>

            <label className={styleCrudPost.label}>Titulo/Nombre del auto: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                type="text"
                value= {input.name}
                name= "name"
                onChange= {(e)=> handleChange(e)}
                placeholder='Titulo Publicacion/Nombre del auto'
                className={styleCrudPost.inputActivity}
                required
                />
            </div>
            <label className={styleCrudPost.label}>Modelo: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                type="text"
                value= {input.model}
                name= "model"
                onChange= {(e)=> handleChange(e)}
                placeholder="Modelo"
                required
                className={styleCrudPost.inputActivity}
                />
                 { errors.model  && (
                     <p className="errors">{ errors.model }</p>   
                        )} 
            </div>
            
            <label className={styleCrudPost.label}>Image: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                type="text"
                value= {input.img}
                name= "img"
                onChange= {(e)=> handleChange(e)}
                required
                className={styleCrudPost.inputActivity}
                />
                
            </div>

            <label className={styleCrudPost.label}>Category: </label>
            <div className={styleCrudPost.subDiv}>
                <h5>Eliga una categoria</h5>
            <select required className={styleCrudPost.selectCategory} onChange={(e)=>handleSelect(e)}>
                {cars.map((el)=> (
                    <option value={el._id}>{el.name}</option>
                ))}
            
            </select>
            
            </div>

            <label className={styleCrudPost.label}>Description: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.description}
                name= "description"
                onChange= {(e)=> handleChange(e)}                   
                placeholder="Añada una pequeña descripcion del auto/Add a small description about the car"
                className={styleCrudPost.textarea}
                />
            </div>
            <label className={styleCrudPost.label}>Price: </label>
            <div className={styleCrudPost.subDiv}>
                <input
                required
                type="number"
                value= {input.price}
                name= "price"
                onChange= {(e)=> handleChange(e)}
                placeholder='$$$$$$$$'
                className={styleCrudPost.inputActivity}
                />
                {errors.price && (
                     <p className={styleCrudPost.errors}>{errors.price}</p>   
                        )}
            </div>
            </fieldset>
            
            <fieldset>
            <h2 className={styleCrudPost.label}>Features</h2>

            <label className={styleCrudPost.label}>Puertas</label>
            <div className={styleCrudPost.subDiv}>
                    
                <input
                required
                type="text"
                value= {input.features_doors}
                name= "features_doors"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                />
                {errors.features_doors && (
                     <p className={styleCrudPost.errors}>{errors.features_doors}</p>   
                     )}
                </div>
            <label className={styleCrudPost.label}>Nombre motor</label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_engine_name}
                name= "features_engine_name"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                />
                </div>

             <label className={styleCrudPost.label}>Cv </label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_engine_cv}
                name= "features_engine_cv"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                />
                {errors.features_engine_cv && (
                     <p className={styleCrudPost.errors}>{errors.features_engine_cv}</p>   
                        )}
                </div>

             <label className={styleCrudPost.label}>Torque</label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_engine_torque}
                name= "features_engine_torque"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                />
                {errors.features_torque && (
                     <p className={styleCrudPost.errors}>{input.features_engine_torque}</p>   
                        )}
                </div>
             <label className={styleCrudPost.label}>Combustion</label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_engine_combustion}
                name= "features_engine_combustion"
                onChange= {(e)=> handleChange(e)}
                className={styleCrudPost.inputActivity}
                />
                </div>
                
                <div className={styleCrudPost.subDiv}>
                <h3>Transmision:</h3>
                <h5>Manual</h5>
                <input
                required
                type="text"
                value= {input.features_transmission_manual}
                name= "features_transmission_manual"
                onChange= {(e)=> handleChange(e)}
                placeholder='Nro velocidades'
                className={styleCrudPost.inputActivity}
                />
                </div>

                <div className={styleCrudPost.subDiv}>
                <h5>Automatica</h5>
                <input
                required
                type="text"
                value= {input.features_transmission_automatic}
                name= "features_transmission_automatic"
                onChange= {(e)=> handleChange(e)}
                placeholder='Nro velocidades'
                className={styleCrudPost.inputActivity}
                />
                </div>

                <label className={styleCrudPost.label}>Traccion:</label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_traction}
                name= "features_traction"
                onChange= {(e)=> handleChange(e)}
                placeholder='Tipo de traccion'
                className={styleCrudPost.inputActivity}
                />
                </div>

                <label className={styleCrudPost.label}>Millage:</label>
                <div className={styleCrudPost.subDiv}>
                <input
                required
                type="text"
                value= {input.features_mileage}
                name= "features_mileage"
                onChange= {(e)=> handleChange(e)}
                placeholder='Nro de Km totales'
                className={styleCrudPost.inputActivity}/>
                {errors.features_mileage && (
                     <p className={styleCrudPost.errors}>{errors.features_mileage}</p>   
                        )}
                </div>
                </fieldset>
                {
               errors.ok && (
                   <button className={styleCrudPost.button3}type='submit' >Publicar</button>
                   ) 
                }
                <Link to= "/home">
                    <button className={styleCrudPost.button3}>Back</button>
                </Link>

            </form>
        </div>
    )
}

export default ProductCRUD;