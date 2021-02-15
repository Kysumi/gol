import styled, { css } from 'styled-components';

interface ButtonProps {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${(p) => p.theme.colors.alt};

  border-radius: 3px;
  border: 2px solid ${(p) => p.theme.colors.trim};

  margin: 0 1em;
  padding: 0.25em 1em;

  ${(props) =>
    props.primary &&
    css`
      background: ${(p) => p.theme.colors.secondary};
      color: white;
    `}

  :hover {
    background: ${(p) => p.theme.colors.focus};
  }

  :focus {
    outline: none;
    box-shadow: none;
  }
`;
