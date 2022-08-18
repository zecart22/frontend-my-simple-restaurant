import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ImageSlider = ({ slides }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={6000}
      showIndicators={false}
      showStatus={false}
      stopOnHover={false}
      width={"100vw"}
      animationHandler={"fade"}
    >
      {slides.map((slide) => {
        return <Image src={slide.image} height="1100px" width="200px" />;
      })}
    </Carousel>
  );
};

export const ClientsSlider = ({ slides }) => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={8000}
      width="100%"
      dynamicHeight
      centerMode
      centerSlidePercentage={60}
      showStatus={false}
      showIndicators={false}
    >
      {slides.map((slide) => {
        return <Image src={slide.image} height="120px" />;
      })}
    </Carousel>
  );
};

export const ImageSliderMobile = ({ slides }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={8000}
      width="100%"
      dynamicHeight
      centerMode
      centerSlidePercentage={100}
      showStatus={false}
      showIndicators={false}
    >
      {slides.map((slide) => {
        return <Image src={slide.image} height="320px" />;
      })}
    </Carousel>
  );
};
