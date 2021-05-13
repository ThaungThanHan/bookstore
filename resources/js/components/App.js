import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter as Router,Route, Link, Switch} from 'react-router-dom';
import Homepage from './Homepage';
import ShopBook from './ShopBook';
import Header from './Header';
import DetailsBook from './DetailsBook';
import CartPage from './CartPage';
class App extends React.Component {
    render(){
        return(
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/books" component={ShopBook} />
                    <Route exact path="/books/:id" component={DetailsBook} />
                    <Route exact path="/cart" component={CartPage} />
                </Switch>
            </Router>
        )
    }
};

export default App;

ReactDOM.render(<App/> , document.getElementById('app'));
