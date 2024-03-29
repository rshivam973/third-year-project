import React,{useReducer} from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import LoginLayout from './components/LoginLayout';
import axios from 'axios';
var store = require('store');

 
const steps = [
    {
        id: '0',
        message: 'Hey Foodie!',
 
        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',
 
        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 
        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
             
            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },
 
        ],
        end: true
    }
];
 
// Creating our own theme
const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: "https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=",
    floating: true,
};

export const itemContext = React.createContext();
const initialState={  
  id: 0,
  loggedIn:store.get('loggedIn') ?? false,
  list:store.get('orderedItems')??[],
  totalItems:store.get("totalitems") ?? 0,
  totalCost:store.get("totalCost") ?? 0
}
const myReducer= (state=initialState, action)=>{
  const {type} =action; 
  switch(type){
            case 'set_id':
              return {...state, id:action.payload}
              case 'addItem':
                let {list} =state ;
                let {payload}=action;
               
              if(list===undefined || list.length===0){
                let newList = {...state,  list:[{...payload, quantity:1}]};
                store.set("orderedItems", newList["list"]);
                return newList;
                }
                else if(list.filter(item => item.id === payload.id ).length === 0){
                  let newList = {...state,  list:[...list, {...payload, quantity:1}]};
                  store.set("orderedItems", newList["list"]);
                  return newList;
                  }
                else{
                  let newList =  {...state, list :list.map(item => item.id === payload.id ? {...item, quantity: item.quantity +1} :item) };
                  store.set("orderedItems", newList["list"]);
                  return newList;
                } 
              case 'deleteItem':
                 let pll=action.payload;         
               //console.log("in delete");           
              const t=state.list.map((item) => 
            (item.id === pll.id) ? 
            {...item,quantity:item.quantity-1}: item );
            let newList =  {...state, list: t.filter(a=> a.quantity !== 0) };
              store.set("orderedItems",newList["list"])  ;
              if(store.get("orderedItems").length===0){
                store.set("totalitems",0);
                store.set("totalCost",0);
              }
              return newList;    
              
                case 'getTotalItems':
                  if(state.list.length>0){
                  let totalitems = {...state, totalItems:state.list.map(a=>a.quantity).reduce((a,b)=>a+b)};
                 store.set("totalitems", totalitems["totalItems"]);
                return totalitems;
              }
                  else return {...state, totalItems:0 }

                case 'clearCart':
                  store.remove("orderedItems");
                  store.remove("totalitems");
                  return {...state, list:[]}
                  case 'totalCost':
                    if(state.list.length>0){
                      store.set('totalCost', state.list.map(l=> (l.quantity*l.price)).reduce((a,b)=>a+b));
                    return {...state, totalCost: state.list.map(l=> (l.quantity*l.price)).reduce((a,b)=>a+b)}
                    }
                    break;
                    case 'checkUser':
                      const pl=action.payload, u=action.user;
                      if(pl.length){
                        const user =  pl.filter(p=> (
                          p.mail === u.mail && p.psd===u.psd ))
                          if(user.length){
                            axios.put(`https://my-json-yumito-server.herokuapp.com/users/${user[0].id}`,{...user[0],loggedIn:true})
                            .then(res =>{ 
                              store.set('user',user[0]);
                              store.set('loggedIn' ,true);
                            } )
                            .catch(e=>alert("Something gone wrong"))
                            
                        return {...state, loggedIn:true}          
                          }            
                        else{ 
                          alert("Please enter valid credentials");
                          store.set('loggedIn' ,false);
                         return {...state, loggedIn:false}
                      }
                    }
                    else{
                      console.log("User data not found");
                    }
                      break;
                      
                   case 'logOut':
                    
                    store.clearAll();
                    return {...initialState, loggedIn:false, list:[],totalItems:0,totalCost:0}
                    
                     //return {...state,}
                       
        default:
       return state;
  }
}

function App() {
  const [myState, dispatch] = useReducer(myReducer, initialState);
  return (
    <div className="App">   
    <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="GeekBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
      <itemContext.Provider value={{state: myState, method:dispatch}}>
      <Router>
        <Switch>
               <Route exact path='/' render={props => <DashboardLayout {...props}/>}/>
               <Route path='/login'  render={props => <LoginLayout {...props}/>}/>
               <Route path='/register' render={props => <LoginLayout {...props}/>}/>
               <Route path='/menu' render={props => <DashboardLayout data={myState} {...props}/>}/>
               <Route path='/editProfile' render={props => <DashboardLayout {...props}/>}/>
               <Route path='/checkout' render={props => <DashboardLayout {...props}/>}/>
               {/* <Route children={props=><Footer {...props}/>}/> */}
               {/* <Route children={props=><Navbar {...props}/>}/> */}
              </Switch>           
      </Router>
     </itemContext.Provider>
    </div>
  );
}

export default App;
