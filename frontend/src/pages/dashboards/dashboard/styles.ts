import Box from 'antd';
import styled from 'styled-components';

export const SelectColors = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, 40px);
  justify-content: center;
  place-items: center;
  padding-top: 10px;
`;

type BackgroundColorRoundedProps = {
  color: string;
  selected: boolean;
};
const StyledButton = styled.button`
  background-color: black;
  font-size: 32px;
  color: white;
`;
export const BackgroundColorRounded = styled('div')<BackgroundColorRoundedProps>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  input[type='radio'] {
    position: relative;
    width: 20px;
    height: 20px;
    outline: none;
    -webkit-appearance: none;
    border-radius: 50%;
    cursor: pointer;
  }
  input:checked[type='radio'] {
    outline: 1px solid #000;
    cursor: pointer;
  }
`;

export type ColorsCard = {
    backgroundColor: string;
    textColor: string;
  };
  
  export const ListColorsCard: ColorsCard[] = [
    { backgroundColor: '#d50000', textColor: '#ffffff' },
    { backgroundColor: '#33b679', textColor: '#ffffff' },
    { backgroundColor: '#f6bf26', textColor: '#ffffff' },
    { backgroundColor: '#039be5', textColor: '#ffffff' },
    { backgroundColor: '#616161', textColor: '#ffffff' },
  ];