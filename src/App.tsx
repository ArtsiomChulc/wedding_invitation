import styled from 'styled-components';
import { Hero } from './sections/Hero';
import { Countdown } from './sections/Countdown.tsx';
import { Timeline } from './sections/Timeline.tsx';
import { RSVPForm } from './sections/RSVPForm.tsx';

function App() {
  return (
    <AppWrapper>
      {/* 1. Главный экран */}
      <Hero />

      {/* 2. Секция Таймера (Placeholder) */}
      <Countdown targetDate="2027-01-09 T15:00:00" />

      {/* 3. Секция Программы дня (Placeholder) */}
      <Timeline />

      {/* 4. Секция RSVP Формы (Placeholder) */}
      <RSVPForm />
    </AppWrapper>
  );
}

export default App;

/* Стили-обертки для каркаса */
const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`;
