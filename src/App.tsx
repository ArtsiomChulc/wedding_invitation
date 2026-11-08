import styled from 'styled-components';
import { Hero } from './sections/Hero';

function App() {
  return (
    <AppWrapper>
      {/* 1. Главный экран */}
      <Hero />

      {/* 2. Секция Таймера (Placeholder) */}
      <SectionPlaceholder>
        <h2>Здесь будет Таймер обратного отсчета</h2>
      </SectionPlaceholder>

      {/* 3. Секция Программы дня (Placeholder) */}
      <SectionPlaceholder>
        <h2>Здесь будет Программа дня (Таймлайн)</h2>
      </SectionPlaceholder>

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
