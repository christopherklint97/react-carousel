import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card, { CardProps } from "./Card";

interface CarouselProps {
  cardData: CardProps[],
  title: string,
}

function Carousel(props: CarouselProps): JSX.Element {
  const [cardIdx, setCardIdx] = useState(0);
  const card: CardProps = props.cardData[cardIdx];
  const total: number = props.cardData.length;
  const goForward = (): void => setCardIdx(cardIdx + 1);
  const goBackward = (): void => setCardIdx(cardIdx - 1);

  function LeftArrow(): JSX.Element | null {
    if (cardIdx === 0) { return null };
    return (
      <i
          className="fas fa-chevron-circle-left fa-2x"
          onClick={goBackward}
          data-testid="left-arrow"
        /> 
    );
  }

  function RightArrow(): JSX.Element | null {
    if (cardIdx === 2) { return null };
    return (
      <i
          className="fas fa-chevron-circle-right fa-2x"
          onClick={goForward}
          data-testid="right-arrow"
        />
    );
  }

  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        <LeftArrow />
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        <RightArrow />
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
