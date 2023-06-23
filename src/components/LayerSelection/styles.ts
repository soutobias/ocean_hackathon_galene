import styled from 'styled-components'

export const LayerSelectionContainer = styled.div`
  width: max-content;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  padding: 0.375rem;
  z-index: 9000;
  box-shadow: -4px 0px 0px ${(props) => props.theme.black};
  display: block;
  h1 {
    text-align: center;
    color: ${(props) => props.theme['blue-500']};
    padding-bottom: 2rem;
  }
`

export const SelectButton = styled.button`
  width: 100%;
  color: ${(props) => props.theme.black};
  border-radius: 9px;
  padding: 0.375rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  box-shadow: 0px 4px 4px ${(props) => props.theme.black};
  cursor: pointer;
  text-align: center;
  &:hover {
    background: ${(props) => props.theme['blue-600']};
    color: ${(props) => props.theme['gray-500']};
  }
  p {
    font-weight: bold;
  }
`
