import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliay';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {                            //componentDidMount here will called after the componentDidMount called in wrappedComponent,
                                                          // so we never set interceptors for them ...interceptors should be set at the beginning...so we can either use constructor or componentWillMount
                this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
                  
        }
        componentWillUnmount () {      // it runs when the component is removed; 
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
              
            return(
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmedHandler}>
                     {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler;