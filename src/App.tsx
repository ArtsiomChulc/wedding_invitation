import styled from 'styled-components';
import { Hero } from './sections/Hero';
import { Countdown } from './sections/Countdown.tsx';
import { Timeline } from './sections/Timeline.tsx';

function App() {
  return (
    <AppWrapper>
      {/* 1. Главный экран */}
      <Hero />

      {/* 2. Секция Таймера (Placeholder) */}
      <Countdown targetDate="2027-01-08T16:00:00" />

      {/* 3. Секция Программы дня (Placeholder) */}
      <Timeline />

      {/* 4. Секция RSVP Формы (Placeholder) */}
      <SectionPlaceholder>
        <h2>Здесь будет Анкета гостя (RSVP)</h2>
      </SectionPlaceholder>
    </AppWrapper>
  );
}

export default App;

/* Стили-обертки для каркаса */
const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Временный компонент для наглядности структуры скролла
const SectionPlaceholder = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border-top: 1px dashed ${({ theme }) => theme.colors.accent};
  background-color: #fff;
  color: ${({ theme }) => theme.colors.textLight};

  h2 {
    font-size: 20px;
    font-weight: 400;
  }
`;
