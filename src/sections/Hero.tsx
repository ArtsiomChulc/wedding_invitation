import styled from 'styled-components';
import { Container } from '../components/Container';
import { useGuest } from '../hooks/useGuest';

export const Hero = () => {
  const { guest, loading } = useGuest();

  // Пока данные грузятся, плавно мигает аккуратный лоадер
  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderText>Загрузка приглашения...</LoaderText>
      </LoaderWrapper>
    );
  }

  // Приводим строковое "TRUE"/"true" из Google Таблиц к полноценному boolean
  const isPlural = guest?.isPlural.toUpperCase() === 'TRUE';

  return (
    <HeroSection>
      <Container>
        <HeroContent>
          <SubTitle>
            {guest ? guest.names : 'Дорогие друзья и близкие'}
          </SubTitle>
          <Names>
            {isPlural
              ? 'Приглашаем вас на свадьбу!'
              : 'Приглашаем тебя на свадьбу!'}
          </Names>
          <Divider />
          <WeddingCouple>Никита & Вероника</WeddingCouple>
          <DateText>09.01.2027</DateText>
          <LocationText>Орша</LocationText>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

/* --- Styled Components --- */

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 60px 0;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  font-style: italic;
  max-width: 600px;
  line-height: 1.4;
`;

const Names = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.3;
  max-width: 800px;

  @media (min-width: 768px) {
    font-size: 54px;
  }
`;

const WeddingCouple = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 300;
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

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const LoaderText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
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
