import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Loading from './Loading';
import styles from './Login.module.css'
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap';



const Login = ({history}) => {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    setLoading(true)

    const { data } = await axios.post("http://localhost:3002/login", {
        mail,
        password
    },
    config
    );
    
    console.log(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
    setLoading(false)
   } catch(error) {
   setError(error.response.data.message)
        }

    }
    return(
        <div className={styles.loginContainer}>
            <div className={styles.login}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <form actions="/login" onSubmit={handleSubmit}>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Mail address</Form.Label>
                        <Form.Control
                        type='email'
                        value={mail}
                        placeholder='Enter your mail'
                        onChange={(e) => setMail(e.target.value)}
                        />  
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        />  
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </form>
                
                <Row className="py-3">
                    <Col>
                    New Customer ? <Link to="/user/register">Register Here</Link>
                    </Col>
                </Row>
                </div>
        </div>
        
    );
};

export default Login;