import styled from "styled-components";


export const WrapperType = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  transition: all 0.3s ease; /* Thêm hiệu ứng chuyển động cho smooth hover */
  
  &:hover {
    background-color: var(--primary-color);
    color: #FF6A6A;
    border-radius: 4px;
    font-weight: bold;
    transform: scale(1.1); /* Hiệu ứng scale */
  }
`
