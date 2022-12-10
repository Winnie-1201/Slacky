import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeMain.css';

export default function HomeMain() {
  return (
    <div className='home-main-div'>
        <h1>Welcome</h1>
        <img alt='main-view' src="https://previews.us-east-1.widencdn.net/preview/48045879/assets/asset-view/a57a6ee3-fb80-45b4-8b0e-c84837ec5649/thumbnail/eyJ3IjoyMDQ4LCJoIjoyMDQ4LCJzY29wZSI6ImFwcCJ9?Expires=1670788800&Signature=hYtfOYqF4Bf68tSHrI3oxXyd5M~liqCBs9aE2Ch6CUXcIoo2Sv5eaPJSnkDfPW5kzuOFWUn-m1iMFfRG5z0Zvf7Rs3ZG7t4E5e7wmJAjGsmDafHvpkolDgb4ULARMcKaFcWLdTpDgnz69E2thz1Z59nZB2ioVDkMIJK5Cz8LhRBHRLLAh6bfEkG4sKuw8tmv9TG5gkm88GWSe~ktZlpIzGc-EcMyABKYyGD0I51e2VOCvR7KNvUMNTUJNcCKZ-A2QSyh7wV~SxaNOmGDwKzJG9AD1HVlpUqeKNxXCZjZC7TU-4EOu1t0e5EofABUaEWoiLXaFuFFtczJz4gEQeq-iA__&Key-Pair-Id=APKAJM7FVRD2EPOYUXBQ"></img>
        <h3>Make work life simpler, more pleasant and more productive.</h3>
        <NavLink to='/login'>
          <button>Try for free</button>
        </NavLink>
    </div>
  )
}
