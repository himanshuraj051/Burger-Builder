// This component is used to load the data when needed asynchronously. The technique of downloading only what you need
// is known as code splitting or lazy loading

import React from 'react';

const asyncComponent = (importComponent) =>
{
    return class Posts extends React.Component
    {
        state =
        {
            component: null
        }

        componentDidMount()
        {
            importComponent()
                .then(cmp =>
                {
                    this.setState(
                    {
                        component: cmp.default
                    })
            })
        }

        render()
        {
            const C = this.state.component;
            return  C ? <C { ...this.props } /> : null;
        }
    }
}

export default asyncComponent;