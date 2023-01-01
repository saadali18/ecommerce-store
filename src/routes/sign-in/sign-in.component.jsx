import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const LogGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={LogGoogleUser}>Sign In with google</button>
        </div>
    )
}

export default SignIn;