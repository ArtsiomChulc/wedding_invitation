import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { getDeclension } from '../utils/declension';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  const timerItems = [
    {
      value: timeLeft.days,
      labels: ['день', 'дня', 'дней'] as [string, string, string],
    },
    {
      value: timeLeft.hours,
      labels: ['час', 'часа', 'часов'] as [string, string, string],
    },
    {
      value: timeLeft.minutes,
      labels: ['минута', 'минуты', 'минут'] as [string, string, string],
    },
    {
      value: timeLeft.seconds,
      labels: ['секунда', 'секунды', 'секунд'] as [string, string, string],
    },
  ];

  return (
    <CountdownSection>
      <Container>
        <Title>До торжества осталось</Title>
        <TimerGrid>
          {timerItems.map((item, index) => (
            <Card key={index}>
              <Number>{String(item.value).padStart(2, '0')}</Number>
              <Label>{getDeclension(item.value, item.labels)}</Label>
            </Card>
          ))}
        </TimerGrid>
      </Container>
    </CountdownSection>
  );
};

const CountdownSection = styled.section`
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 40px;
  letter-spacing: 1px;
`;

const TimerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 500px) {
    gap: 8px;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid rgba(140, 98, 57, 0.15); /* Легкая рамка в цвет primary */
  border-radius: 8px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 14px 8px;
  }
`;

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 32px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: 6px;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: 400px) {
    font-size: 9px;
  }
`;
