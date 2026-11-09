import styled from 'styled-components';
import { Container } from '../components/Container';
import type { GoogleGuest } from '../types';

interface HeroProps {
  guest: GoogleGuest | null;
  isOpened: boolean;
}

export const Hero = ({ guest, isOpened }: HeroProps) => {
  const isPlural = guest?.isPlural.toUpperCase() === 'TRUE';

  return (
    <HeroSection $isOpened={isOpened}>
      {/* Сцена анимации конверта (работает первые 3.5 секунды) */}
      <StageWrapper>
        <EnvelopeContainer>
          <TopFlap />
          <Letter>
            <LetterTitle>Приглашение</LetterTitle>
            <LetterGuest>{guest ? guest.names : 'Дорогие гости'}</LetterGuest>
          </Letter>
          <FrontFlaps />
        </EnvelopeContainer>
      </StageWrapper>

      {/* Главный экран сайта, который остается после завершения анимации */}
      <Container>
        <HeroContent $visible={isOpened}>
          <SubTitle>
            {guest ? guest.names : 'Дорогие друзья и близкие'}
          </SubTitle>
          <Title>
            {isPlural
              ? 'Приглашаем вас на свадьбу!'
              : 'Приглашаем тебя на свадьбу!'}
          </Title>
          <Divider />
          <WeddingCouple>НИКИТА & ВЕРОНИКА</WeddingCouple>
          <DateText>09.01.2027</DateText>
          <LocationText>ОРША</LocationText>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

/* --- Styled Components & CSS-Анимации --- */

const HeroSection = styled.section<{ $isOpened: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  position: ${({ $isOpened }) => ($isOpened ? 'relative' : 'fixed')};
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
`;

/* Оболочка для анимации конверта */
const StageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f3ede2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  /* Плавное исчезновение всей сцены в конце */
  animation: fadeStage 0.8s ease-in-out forwards 3s;

  @keyframes fadeStage {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const EnvelopeContainer = styled.div`
  position: relative;
  width: 320px;
  height: 220px;
  background-color: #e6dfd3;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 50px;

  @media (min-width: 480px) {
    width: 420px;
    height: 280px;
  }
`;

/* Верхний клапан конверта */
const TopFlap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 160px solid transparent;
  border-right: 160px solid transparent;
  border-top: 110px solid #dcd4c3; /* Цвет клапана */
  transform-origin: top;
  z-index: 23;
  /* Анимация откидывания вверх */
  animation: openFlap 0.8s ease-in-out forwards 0.5s;

  @media (min-width: 480px) {
    border-left-width: 210px;
    border-right-width: 210px;
    border-top-width: 140px;
  }

  @keyframes openFlap {
    100% {
      transform: rotateX(180deg);
      z-index: 21; /* Уходит назад за письмо */
      border-top-color: #e6dfd3;
    }
  }
`;

/* Передние боковые клапаны конверта (кармашек) */
const FrontFlaps = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 24;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 160px solid #e1d8c7;
    border-top: 220px solid transparent;
    @media (min-width: 480px) {
      border-left-width: 210px;
      border-top-width: 280px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-right: 160px solid #e1d8c7;
    border-top: 220px solid transparent;
    @media (min-width: 480px) {
      border-right-width: 210px;
      border-top-width: 280px;
    }
  }
`;

/* Письмо, которое выезжает из конверта */
const Letter = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15px;
  right: 15px;
  height: 90%;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  z-index: 22;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* Анимация плавного выдвижения вверх */
  animation: slideOut 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards 1.3s;

  @keyframes slideOut {
    100% {
      transform: translateY(-130px);
    }
  }
`;

const LetterTitle = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #7a7571;
  margin-bottom: 12px;
  display: block;
`;

const LetterGuest = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 400;
  color: #8c6239;
  line-height: 1.3;

  @media (min-width: 480px) {
    font-size: 24px;
  }
`;

/* Элементы основного экрана сайта */
const HeroContent = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '20px')});
  transition:
    opacity 1s ease-out,
    transform 1s ease-out;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  font-style: italic;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.3;
  max-width: 750px;
  @media (min-width: 768px) {
    font-size: 54px;
  }
`;

const WeddingCouple = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 24px;
`;

const Divider = styled.div`
  width: 50px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  margin: 24px 0;
`;

const DateText = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

const LocationText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;
