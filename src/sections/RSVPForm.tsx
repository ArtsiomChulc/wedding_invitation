import { type SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { useGuest } from '../hooks/useGuest.ts';

interface RSVPState {
  name: string;
  attending: 'yes' | 'no' | '';
  alcohol: string[];
  transport: boolean;
}

const ALCOHOL_OPTIONS = [
  'Вино красное',
  'Вино белое',
  'Игристое',
  'Крепкий алкоголь',
  'Безалкогольные напитки',
];

export const RSVPForm = () => {
  const [formData, setFormData] = useState<RSVPState>({
    name: '',
    attending: '',
    alcohol: [],
    transport: false,
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const { guest } = useGuest();

  useEffect(() => {
    if (guest) {
      setFormData((prev) => ({ ...prev, name: guest.names }));
    }
  }, [guest]);

  const handleAlcoholChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      alcohol: prev.alcohol.includes(option)
        ? prev.alcohol.filter((item) => item !== option)
        : [...prev.alcohol, option],
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Формируем объект данных в соответствии с заголовками листа `responses`
    // Stein ожидает массив объектов, даже если мы отправляем одну строку
    const responseData = [
      {
        name: formData.name,
        attending: formData.attending === 'yes' ? 'Придет ✅' : 'Не придет ❌',
        alcohol:
          formData.attending === 'yes' ? formData.alcohol.join(', ') : '—',
        transport:
          formData.attending === 'yes'
            ? formData.transport
              ? 'Нужен 🚌'
              : 'Не нужен'
            : '—',
      },
    ];

    try {
      // Вставляем реальный fetch-запрос к листу responses
      const response = await fetch(
        'https://api.steinhq.com/v1/storages/6af0bb5b92b1163e976018e3/responses',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responseData),
        }
      );

      // Если сервер Stein ответил успешно (статус 200-299)
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Ошибка при отправке RSVP:', error);
      setStatus('error');
    }
  };

  return (
    <RSVPSection>
      <Container>
        <FormCard onSubmit={handleSubmit}>
          <Title>Подтверждение присутствия</Title>
          <Subtitle>
            Пожалуйста, ответьте на вопросы анкеты до 1 июля 2027 года
          </Subtitle>

          {status === 'success' ? (
            <SuccessMessage>
              Спасибо! Ваш ответ успешно отправлен и сохранен. ✨
            </SuccessMessage>
          ) : (
            <>
              {/* Поле: Имя */}
              <FormGroup>
                <Label>Ваше имя и фамилия</Label>
                <Input
                  type="text"
                  required
                  placeholder="Имя Фамилия"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormGroup>

              {/* Поле: Присутствие */}
              <FormGroup>
                <Label>Сможете ли вы присутствовать?</Label>
                <ButtonGroup>
                  <StatusButton
                    type="button"
                    $active={formData.attending === 'yes'}
                    onClick={() =>
                      setFormData({ ...formData, attending: 'yes' })
                    }
                  >
                    Да, с удовольствием!
                  </StatusButton>
                  <StatusButton
                    type="button"
                    $active={formData.attending === 'no'}
                    onClick={() =>
                      setFormData({ ...formData, attending: 'no' })
                    }
                  >
                    К сожалению, не смогу
                  </StatusButton>
                </ButtonGroup>
              </FormGroup>

              {/* Динамический блок, если гость идет */}
              {formData.attending === 'yes' && (
                <DynamicBlock>
                  {/* Поле: Алкоголь */}
                  <FormGroup>
                    <Label>
                      Ваши предпочтения по напиткам (можно несколько)
                    </Label>
                    <CheckboxGrid>
                      {ALCOHOL_OPTIONS.map((option) => (
                        <CheckboxLabel key={option}>
                          <HiddenCheckbox
                            type="checkbox"
                            checked={formData.alcohol.includes(option)}
                            onChange={() => handleAlcoholChange(option)}
                          />
                          <StyledCheckbox
                            $checked={formData.alcohol.includes(option)}
                          />
                          <CheckboxText>{option}</CheckboxText>
                        </CheckboxLabel>
                      ))}
                    </CheckboxGrid>
                  </FormGroup>

                  {/* Поле: Трансфер */}
                  <FormGroup>
                    <CheckboxLabel>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={formData.transport}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            transport: e.target.checked,
                          })
                        }
                      />
                      <StyledCheckbox $checked={formData.transport} />
                      <CheckboxText>
                        Мне понадобится трансфер до локации
                      </CheckboxText>
                    </CheckboxLabel>
                  </FormGroup>
                </DynamicBlock>
              )}

              {status === 'error' && (
                <ErrorMessage>
                  Произошла ошибка. Попробуйте еще раз.
                </ErrorMessage>
              )}

              <SubmitButton
                type="submit"
                disabled={status === 'loading' || !formData.attending}
              >
                {status === 'loading' ? 'Отправка...' : 'Отправить ответ'}
              </SubmitButton>
            </>
          )}
        </FormCard>
      </Container>
    </RSVPSection>
  );
};

/* --- Styled Components --- */

const RSVPSection = styled.section`
  padding: 100px 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FormCard = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid rgba(140, 98, 57, 0.1);
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);

  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  padding: 14px;
  border: 1px solid rgba(140, 98, 57, 0.2);
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textMain};
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StatusButton = styled.button<{ $active: boolean }>`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  padding: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'rgba(140, 98, 57, 0.2)')};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.white)};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.textMain)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DynamicBlock = styled.div`
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CheckboxGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(140, 98, 57, 0.4);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-right: 12px;
  position: relative;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors.primary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMain};
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  text-align: center;
  color: #2e7d32;
  background-color: #edf7ed;
  padding: 20px;
  border-radius: 6px;
`;

const ErrorMessage = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  text-align: center;
  color: #c62828;
  margin-bottom: 15px;
  font-size: 14px;
`;
