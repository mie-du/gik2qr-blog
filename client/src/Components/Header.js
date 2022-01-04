import React from 'react';
import styled from 'styled-components';
const breakpoints = {
  md: '50rem',
  lg: '105rem'
};
const InsideContainer = styled.div`
  background: rgb(156, 156, 201);
  background: linear-gradient(
    52deg,
    rgba(156, 156, 201, 0) 0%,
    rgba(156, 156, 201, 1) 22%,
    rgba(189, 219, 199, 1) 45%,
    rgba(189, 219, 199, 0) 100%
  );
  border-bottom-left-radius: 50%;
  @media (min-width: ${breakpoints.md}) {
    border-radius: 0 50% 0 50%;
    padding: 3rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 7rem;
  }
`;
const Container = styled.div`
  background: linear-gradient(
    45deg,
    rgba(156, 156, 201, 0.5) 25%,
    rgba(68, 68, 126, 1) 100%
  );
  box-shadow: 2px 1px 66px -13px rgba(68, 68, 126, 1);
  border-bottom-left-radius: 50%;
`;
const Title = styled.h1`
  font-family: var(--font-script);
  font-size: 3.3rem;
  margin: 0;
  margin-left: 2rem;
  padding: 1rem;
  color: hsl(var(--color-main-h), var(--color-main-s), 50%);
  position: relative;

  @media (min-width: ${breakpoints.md}) {
    font-size: 7rem;

    padding: 0;
    color: hsl(var(--color-main-h), var(--color-main-s), 60%);
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 11.4rem;
    margin-left: 20rem;
    padding: 0;
  }
`;
const Subtitle = styled.p`
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 35%;
  top: 55%;
  color: hsl(150, 10%, 30%);

  @media (min-width: ${breakpoints.md}) {
    font-size: 3rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 4rem;
    left: 65%;
  }
`;

export default function Header() {
  return (
    <Container>
      <InsideContainer>
        <Title>
          Om korkade hundar,<Subtitle> och sån't</Subtitle>
        </Title>
      </InsideContainer>
    </Container>
  );
}
