import styled from 'styled-components';

export const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  
  margin: {
    left:auto;
    right:auto;
  };
  
  padding: 16px;
  max-width: 500px;

  .profile{
    display:none;

    @media(min-width: 860px){
      display:block;
    }
  }
  
  @media(min-width: 860px){
    grid-template-areas: 'profile welcome communities';
    grid-template-columns: 160px 1fr 312px;
    display:grid;
    max-width: 1110px;
  }
`

export const DivArea = styled.div`
  grid-area: ${props => props.area};
`