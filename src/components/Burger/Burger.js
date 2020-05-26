import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './Burgeringridient/Burgeringridient';

const burger = (props) =>
{
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
        // console.log(j);
        return [...Array(props.ingredients[igKey])].map((_,i) => //...Array(num) create array with num empty spaces .map(arg1,arg2) arg1=val,arg2=index
        {
            // console.log(i);
            return <BurgerIngredient key = {igKey+i} type = {igKey} />
        });
    })
    .reduce((arr, el)=>{
        return arr.concat(el);
    },[]); // starts here with empty array as in 2nd arg transform the given array 
           // console.log(transformedIngredients);
    if(transformedIngredients.length === 0)
    transformedIngredients = <p>Please start adding ingredients!</p>

    return (
       
        <div className = {classes.Burger}>
            {/* {console.log(classes)} */}
            <BurgerIngredient type = "bread-top"/>
           {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );

}
export default burger;