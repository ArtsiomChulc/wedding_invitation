import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Hero } from './sections/Hero';
import { Countdown } from './sections/Countdown';
import { Timeline } from './sections/Timeline';
import { RSVPForm } from './sections/RSVPForm';
import { useGuest } from './hooks/useGuest';

function App() {
  const { guest, loading } = useGuest();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      // Даем 3.5 секунды на красивую автоматическую анимацию конверта,
      // после чего плавно проявляем остальной контент сайта
      const timer = setTimeout(() => {
        setIsOpened(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderText>Загрузка приглашения...</LoaderText>
      </LoaderWrapper>
    );
  }

  return (
    <AppWrapper>
      {/* Секция анимации конверта и главного экрана */}
      <Hero guest={guest} isOpened={isOpened} />

      {/* Программа и анкета проявляются снизу */}
      <MainContent $show={isOpened}>
        <Countdown targetDate="2027-01-09T16:00:00" />
        <Timeline />
        <RSVPForm />
      </MainContent>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const MainContent = styled.div<{ $show: boolean }>`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  height: ${({ $show }) => ($show ? 'auto' : '0px')};
  transition:
    opacity 1s ease-in-out,
    visibility 1s ease-in-out;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f6f0;
`;

const LoaderText = styled.p`
  font-family: sans-serif;
  font-size: 14px;
  color: #7a7571;
  letter-spacing: 1px;
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;
