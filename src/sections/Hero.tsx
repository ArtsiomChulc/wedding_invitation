import styled from 'styled-components';
import { Container } from '../components/Container';

export const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <HeroContent>
          <SubTitle>Приглашение на свадьбу</SubTitle>
          <Names>Никита & Вероника</Names>
          <Divider />
          <DateText>08.01.2027</DateText>
          <LocationText>Орша</LocationText>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

/* Стилизация секции */
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Занимает всю высоту экрана */
  background-color: ${({ theme }) => theme.colors.bg};
  position: relative;
  padding: 60px 0;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SubTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 24px;
`;

const Names = styled.h1`
  font-size: 48px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 72px;
  }
`;

const Divider = styled.div`
  width: 50px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  margin: 32px 0;
`;

const DateText = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 24px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const LocationText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;
