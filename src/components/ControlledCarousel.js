import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../css/ControlledCarousel.module.css";
import tempImage1 from "../images/temp_image1.jpg";
import tempImage2 from "../images/temp_image2.jpg";
import tempImage3 from "../images/temp_image3.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className={styles.image} src={tempImage1} alt="임시 이미지1" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className={styles.image} src={tempImage2} alt="임시 이미지2" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className={styles.image} src={tempImage3} alt="임시 이미지3" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
