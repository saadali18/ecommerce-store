import { Fragment, useContext } from 'react';
import {Outlet} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import {UserContext} from '../../contexts/user.context'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context'; 
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser()
  }

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'> 
                <Logo className='logo'/>
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'> 
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutHandler}> SIGN OUT</NavLink>)
                : (<NavLink to='/auth'>
                SIGN IN
                </NavLink>
              )
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer> 
      <Outlet />
      </Fragment>
    )
  }

  export default Navigation;