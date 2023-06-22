import styled from 'styled-components'

export const RangeSelectionContainer = styled.div`
  position: relative;
  width: 80vw;
  z-index: 9000;
  input[type='range'] {
    :focus {
      box-shadow: none;
    }
    /* margin-top: 20px; */
    width: 100%;
    -webkit-appearance: none;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 12px;
      cursor: pointer;
      box-shadow: none;
      border-radius: 0px;
      border: 1px solid #82cfd0;
    }
    &::-moz-range-track {
      width: 100%;
      height: 12px;
      cursor: pointer;
      box-shadow: none;
      background: #ffffff;
      border-radius: 0px;
      border: 1px solid #82cfd0;
    }

    &::-webkit-slider-thumb {
      box-shadow: none;
      border: 0px solid #ffffff;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
      height: 2rem;
      width: 2rem;
      border-radius: 22px;
      background: rgba(255, 255, 255, 1);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -0.65rem;
    }
    &::-moz-range-thumb {
      box-shadow: none;
      border: 0px solid #ffffff;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
      height: 2rem;
      width: 2rem;
      border-radius: 22px;
      background: rgba(255, 255, 255, 1);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -20px;
    }
    &::-moz-focus-outer {
      border: 0;
    }
  }
`
