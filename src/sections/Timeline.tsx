import styled from 'styled-components';
import { Container } from '../components/Container';
import { Clock, Heart, GlassWater, Cake, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    time: '15:30',
    title: 'Сбор гостей',
    description:
      'Приветственный фуршет, знакомство гостей и легкая музыка перед началом.',
    icon: <Clock size={20} />,
  },
  {
    time: '16:00',
    title: 'Торжественная церемония',
    description: 'Самый трогательный момент — наши клятвы у свадебной арки.',
    icon: <Heart size={20} />,
  },
  {
    time: '17:00',
    title: 'Свадебный банкет',
    description: 'Время поздравлений, вкусной еды, танцев и веселья.',
    icon: <GlassWater size={20} />,
  },
  {
    time: '21:30',
    title: 'Свадебный торт',
    description: 'Сладкий финал нашего вечера.',
    icon: <Cake size={20} />,
  },
  {
    time: '22:00',
    title: 'Завершение вечера',
    description: 'Праздничный фейерверк и бенгальские огни.',
    icon: <Sparkles size={20} />,
  },
];

export const Timeline = () => {
  return (
    <TimelineSection>
      <Container>
        <Title>Программа дня</Title>
        <Subtitle>
          План нашего свадебного дня, чтобы вы ничего не пропустили
        </Subtitle>

        <TimelineContainer>
          {TIMELINE_DATA.map((item, index) => (
            <TimelineItemRow key={index}>
              <IconWrapper>{item.icon}</IconWrapper>
              <ContentCard>
                <Time>{item.time}</Time>
                <EventTitle>{item.title}</EventTitle>
                <Description>{item.description}</Description>
              </ContentCard>
            </TimelineItemRow>
          ))}
        </TimelineContainer>
      </Container>
    </TimelineSection>
  );
};

const TimelineSection = styled.section`
  padding: 100px 0;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 60px;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 850px;
  margin: 0 auto;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 30px;
    width: 1px;
    background-color: rgba(140, 98, 57, 0.25);

    @media (min-width: 768px) {
      left: 50%;
    }
  }
`;

const TimelineItemRow = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding-left: 70px;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    padding-left: 0;
    width: 50%;

    &:nth-child(odd) {
      align-self: flex-start;
      justify-content: flex-end;
      padding-right: 45px;
      text-align: right;
    }

    &:nth-child(even) {
      align-self: flex-end;
      justify-content: flex-start;
      padding-left: 45px;
      text-align: left;
    }
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.bg};

  @media (min-width: 768px) {
    left: auto;
    ${TimelineItemRow}:nth-child(odd) & {
      right: -15px;
    }
    ${TimelineItemRow}:nth-child(even) & {
      left: -15px;
    }
  }
`;

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(140, 98, 57, 0.08);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Time = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-bottom: 6px;
`;

const EventTitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textLight};
`;
