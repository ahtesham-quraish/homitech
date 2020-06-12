import React from "react";
import logo from "../../assets/img/logo.png";
import ROUTES, { RenderRoutes } from "../../routes/routes";

function App() {
  return (
    <div id='site-wrap'>
      <header id='header'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <img src={logo} alt='logo' />
            </div>
          </div>
        </div>
      </header>
      <div id='main'>
        <div id='content-area'>
          <div className='container-fluid'>
            <div className='row'>
              <RenderRoutes routes={ROUTES} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
