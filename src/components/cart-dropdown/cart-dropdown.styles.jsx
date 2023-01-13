import styled from 'styled-components'; 
import { BaseButton, WhiteButton, BlueButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${BlueButton},
  ${WhiteButton}
  {
    margin-top:auto;
  }
`

export const EmptyMessage = styled.span`
  .empty-message {
    font-size: 18px;
    margin: 50px auto;
  }
` 
 export const CartItems = styled.div`
  .cart-items {
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
 
`