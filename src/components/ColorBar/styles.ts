import styled from 'styled-components'

export const ColorBarContainer = styled.div`
  padding: 0.375rem;
  z-index: 9000;
  display: block;
`

export const ColorBarItem = styled.div`
  padding: 0.375rem;
  p {
    opacity: 0;
    color: rbga(0, 0, 0, 0);
  }
`
