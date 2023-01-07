import { useState } from 'react';

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component'
import './sign-up.styles.scss';

import {UserContext} from '../../contexts/user.context'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) 
        {
            console.log(password)
            console.log(confirmPassword)
            alert("password and confirm password do not match")
            return
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName, email})
            

        } catch(error){
            console.log("Error encountered at user sign-up:  ", error.message)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({ ...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>

    )
};

export default SignUp;