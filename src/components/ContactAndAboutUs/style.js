import styled from 'styled-components';

export const WrapperContactAndAboutUs = styled.div`
  background-color: #186c91;
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 18px;
  color: #fff;
`;

export const ContactInfo = styled.div`
  flex: 1;
  padding-right: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }

  div {
    margin-bottom: 20px;
  }
`;

export const AboutUsInfo = styled.div`
  flex: 1;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`