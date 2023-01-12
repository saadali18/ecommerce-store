import {BaseButton, BlueButton, WhiteButton} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttoneType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: BlueButton,
        [BUTTON_TYPE_CLASSES.inverted]: WhiteButton,

    }[buttoneType]
)


const Button = ({children, buttonType, ...otherProps}) => {
    const Btn = getButton(buttonType) 
    return (
        <Btn {...otherProps}>{children}</Btn>
    )
}

export default Button;