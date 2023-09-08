import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";
import { CountryImageItem } from "./CountryImageItem";
import { ICountryImage, IImage } from "./CountryImage.types";

export function CountryImage({ countryName, countryFlag }: ICountryImage) {
  const router = useRouter();

  const [images, setImages] = useState<IImage[]>();

  async function getImages() {
    const request = await fetch(
      `https://pixabay.com/api/?key=36926984-47feaf73cc5c85ee4b48d79b1&orientation=horizontally&per_page=5&orientation=horizontal&q=${countryName}`
    );

    const data = await request.json();

    setImages([{ largeImageURL: countryFlag }, ...data.hits]);
  }
  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!images) {
    return null;
  }

  return (
    <Carousel navButtonsAlwaysVisible autoPlay={false}>
      {images.map((item, i) => (
        <CountryImageItem key={i} item={item.largeImageURL} />
      ))}
    </Carousel>
  );
}
