import { useState } from 'react';

import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component'
import './sign-in.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthWithEmailAndPassword(email, password)
            console.log(response)
            resetFormFields()
        } catch(error)
        {
            console.log("Something went wrong in sign-in process: ", error.message)
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({ ...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google-sign-in'>Google Sign in</Button>
                </div>
            </form>
        </div>

    )
};

export default SignIn;