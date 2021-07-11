import React from "react";
import style from "./About.module.css";
import freezerImage from "./Freezer-Final.min.svg";
import plateImage from "./Plate-Finalv2.min.svg";
import rackImage from "./Rack-Final.min.svg";
import sampleImage from "./Sample-Tube-Final.min.svg";

function About() {
  return (
    <div className={style.about__container}>
      <h1 className={style.about__header}>Freezuh, Final Transformation</h1>
      <div className={style.content__container}>
        <img src={freezerImage} alt="freezer" className={style.image} />
        <p className={style.about__paragraph__left}>
          Freezuh, Final Transformation, is an inventory management system
          designed for the biotech industry. Due to the high volume of sample
          collection and the necessity to perform additional experiments on
          samples, inventory management is critical. My past two positions have
          ran into issues with sample retrieval and I designed this app with my
          former frustrations in mind.
        </p>
      </div>
      <div className={style.content__container}>
        <p className={style.about__paragraph__right}>
          The normal sample storage workflow for this application, and the
          industry, is:
          <ol>
            <li>Create a freezer.</li>
            <li>Create a rack, and store it in an available freezer.</li>
            <li>Create a plate.</li>
            <li>
              Accession a sample, conduct any necessary experiments, and store
              it in a plate.
            </li>
            <li>
              After filling a plate with samples, store it in a rack to freeze.
            </li>
          </ol>
        </p>
        <img src={plateImage} alt="plate" className={style.image} />
      </div>
      <div className={style.content__container}>
        <img src={rackImage} alt="rack" className={style.image} />
        <p className={style.about__paragraph__left}>
          After experimentation and storage, sometimes assays have to be
          repeated. Using this app, any samples are easy to find through search,
          and through browsing through the appropriate views for freezers,
          racks, or plates.
        </p>
      </div>
      <div className={style.content__container}>
        <p className={style.about__paragraph__right}>
          I hope that you find this website a joy to use, with all of its unique
          icons and hopefully unique functionality. This app is being released
          under the MIT license and I would love to continue building on this
          site for the biotech industry as a whole.
        </p>
        <img src={sampleImage} alt="sample" className={style.image} />
      </div>
    </div>
  );
}

export default About;
