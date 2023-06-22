import styled from 'styled-components'

export const SideSelectionContainer = styled.div`
  position: relative;
  height: 100vh;
  background-color: ${(props) => props.theme['gray-100']};
  padding: 0.375rem;
  width: 3rem;
  z-index: 9000;
  /* border-radius: 16px; */
  box-shadow: 0px 4px 4px ${(props) => props.theme.black};
  img {
    z-index: 9999;
  }
`
export const SideSelectionLink = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    padding-top: 1rem;
  }
  svg {
    cursor: pointer;
    padding-bottom: 1rem;
    height: 2rem;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme['blue-500']};

    &:hover {
      color: ${(props) => props.theme['blue-600']};
    }
  }
`

export const SideSelectionLinkFinal = styled.header`
  position: absolute;
  bottom: 10rem;
  z-index: 9999;
  img {
    height: 2.5rem;
    z-index: 9999;
  }
`
