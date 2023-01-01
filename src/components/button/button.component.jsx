import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${buttonType ? buttonType: ''}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;