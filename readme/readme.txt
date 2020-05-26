==>React
Declarative
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

==> Mounting
 These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

1.constructor()
2.static getDerivedStateFromProps()
3.render()
4.componentDidMount()

==> Error Handling
These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

1.static getDerivedStateFromError()
2.componentDidCatch()


=============================
forceUpdate()
component.forceUpdate(callback)
By default, when your component’s state or props change, your component will re-render. If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate().

Calling forceUpdate() will cause render() to be called on the component, skipping shouldComponentUpdate(). This will trigger the normal lifecycle methods for child components, including the shouldComponentUpdate() method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render().
