import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliay';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate()
        {
            // console.log('[OrderSummary] WillUpdate');
        }
    render()
    {
        
        const ingredientSummary = Object.keys(this.props.ingredient)
            .map(igkey =>{
            return( <li key = {igkey}><span>{igkey}</span>: {this.props.ingredient[igkey]}</li>)});

            return(
                <Aux>
                    <h3>Your Order</h3> 
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                    {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType = "Success" clicked = {this.props.purchaseContinued}>CONTINUE</Button>
                </Aux>
            )

    }
}

export default OrderSummary;