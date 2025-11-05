import Carousel from "../components/Carousel";
import PaintingsList from "../components/PaintingsList";
import EventsList from "../components/EventsList";
import Calendar from "../components/Calendar";

export default function Home() {
  return (
    <main>
      <section>
        <Carousel />
        <PaintingsList />
        <EventsList />
      </section>
      <aside className="calendar">
        <Calendar />
      </aside>
    </main>
  );
}
