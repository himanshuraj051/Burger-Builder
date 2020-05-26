import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliay';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component 
{
    state = {
        // totalPrice: 4,
        // puchasable: false,
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey => ingredients[igkey])
        .reduce((sum,el)=> sum+el,0);
        // this.setState({purchasable: sum>0})
        return sum>0;
    }

    // addIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount>0)
    //     {
    //         const updatedCount = oldCount - 1;
    //         const updatedIngredients = {...this.state.ingredients};
    //         updatedIngredients[type] = updatedCount;
    //         const priceDeduction = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - priceDeduction;

    //         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated)
        this.setState({purchasing : true});

        else
        {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth'); //history props is coming from react-router
        }    
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render()
    {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        
        let orderSummary = null;

        let burger = this.props.error ?<p>Ingredients can't be loaded!!</p> : <Spinner/>

        // console.log(this.props.ings)
        if(this.props.ings)
        {
            burger = (
                <Aux>
                   <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved} // we are passing the args in buildcontols.js 
                    disabledInfo = {disabledInfo}
                    price = {this.props.price}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    purchasing = {this.purchaseHandler}
                    isAuth = {this.props.isAuthenticated}/>
                </Aux>
            );

            orderSummary = <OrderSummary
            ingredient = {this.props.ings}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            totalPrice = {this.props.price}
         />;
        }

        // if(this.state.loading)
        // orderSummary = <Spinner/>;
        
       
        return(
            <Aux>
                <Modal
                   show = {this.state.purchasing}
                   modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));