import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {LandingPage}  from './components/LandingPage/LandingPage';
import { Home } from './components/Home/Home';
import { RecipeCreate } from './components/RecipeCreate/RecipeCreate'
import { Detail } from './components/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/createRecipe' component={RecipeCreate}></Route>
        <Route exact path='/home/:recipeId' component={Detail}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
