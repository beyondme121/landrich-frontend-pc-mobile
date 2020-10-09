import React from 'react'
import './footer.less'

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <h2 className="title">About the Web</h2>
      <div className="container">
        <section>
          <h4>What I do</h4>
          <div className="footer-text">Trying to build a portal to connect a number of weather and ocean wave forecasts we have in NMEFC, for the convenience of we hard-working forecasters</div>
        </section>
        <section>
          <h4>About next</h4>
          <div className="footer-text">Import more products of FCST or observations as possible, as I wish...</div>
        </section>
        <section>
          <h4>Work in progress</h4>
          <div className="footer-text">Trying to make the web attractive, as the low level web pages are still ugly...besides the Chinese-Support Issue...</div>
        </section>
        <div className="copyright">&copy; 2016 Department of the Marine Disaster Early Warning and Forecasting. NMEFC. Right now, No Rights Reserved</div>
      </div>
    </div>
  )
}
