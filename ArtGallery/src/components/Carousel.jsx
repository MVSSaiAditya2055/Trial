import { useEffect, useState } from "react";

const paintings = [
  {
    id: 1,
    title: "Sunset Over Mountains",
    image: "https://via.placeholder.com/600x320?text=Sunset+Over+Mountains",
  },
  {
    id: 2,
    title: "Morning Dew",
    image: "https://via.placeholder.com/600x320?text=Morning+Dew",
  },
  {
    id: 3,
    title: "Urban Rhythm",
    image: "https://via.placeholder.com/600x320?text=Urban+Rhythm",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % paintings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = paintings[index];
  return (
    <div className="carousel">
      <div className="carousel-stage">
        <img src={current.image} alt={current.title} />
        <div className="carousel-caption">{current.title}</div>
      </div>
    </div>
  );
}
