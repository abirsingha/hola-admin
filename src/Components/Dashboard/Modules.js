import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import ModuleCard from "./ModuleCard";
import OwlCarousel from "react-owl-carousel";
import "../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css";
import "../../../node_modules/owl.carousel/dist/owl.carousel";

const options = {
  margin: 30,
  responsiveClass: true,
  nav: false,
  autoplay: false,
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 1,
      },
      767: {
          items: 1,
      },
      768: {
          items: 2,
      }
  },
};



const Modules = (props) => {
  const moduleList = props.modules.map((module) => (<ModuleCard src={module.src} heading={module.title} desc={module.description} percent={module.percent} btntext={module.buttontext} id={module.id} key={module.id} />))

  return (
    <Card className={props.className}>
      <div className="moduleHead">
        <h4>Modules</h4>
      </div>
      <div id="moduleCardWrap">
        <OwlCarousel
          className="owl-theme"
          nav={true}
          dots={false}
          autoplaySpeed={1000}
          loop={true}
          margin={10}
          items={2}
          {...options}
        >
          {moduleList}
        </OwlCarousel>
      </div>
    </Card>
  );
};

export default Modules;
