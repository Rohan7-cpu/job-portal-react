import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './Home/Home'
import JsRegistration from './Pages/JsRegistration'
import JsLogin from './Pages/JsLogin'
import Eregistration from './Pages/Eregistration'
import Elogin from './Pages/Elogin'
import ResetPassword from './Pages/ResetPassword';
import Eresetpass from './Pages/Eresetpass'
import Postjobs from './Pages/Postjobs'
import Userform from './Pages/Jsprofile'
import Postedjobs from './Pages/Postedjob'
import Jobseekerapplypage from './Pages/jobseekerapplypage'

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/JsRegistration" element={<JsRegistration/>} />
        <Route path="/JsLogin" element={<JsLogin  />} />
        <Route path="/Eregistration" element={<Eregistration  />} />
        <Route path="/Elogin" element={<Elogin  />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/Eresetpass" element={<Eresetpass />} />
        <Route path="/Postjobs" element={<Postjobs/>} />
        <Route path="/Jsprofile" element={<Userform/>} />
        <Route path="/Jobsposted" element={<Postedjobs/>} />
        <Route path="/Jsapply" element={<Jobseekerapplypage/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

export default App