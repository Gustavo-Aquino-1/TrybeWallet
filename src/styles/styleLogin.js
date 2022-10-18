import styled from 'styled-components';

const LoginArea = styled.div`
  background-color: rgba(0, 94, 117, 0.72);
  height: 100vh;
  width: 100%;

  p {
    margin: 0;
    margin-bottom: 130px;
    color: royalblue;
  }

  section {
    display: flex;
    justify-content: center;
    width: 80%;
    height: 600px;
    margin: auto;
    article {
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      width: 50%;
      background-image: url('https://img.freepik.com/free-vector/composed-particles-swirling-abstract-graphics_456031-137.jpg?w=740&t=st=1664929336~exp=1664929936~hmac=e9abd673ef479ce2bc57a63299af3769948d4314d9e987a661d4ee519f4978e3');
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h2 {
        color: white;
        text-align: center;
      }
    }
   .loginArea {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 80px;
      background-color: white;
      width: 28%;
      padding: 0 0 60px 0;
      span {
        font-size: 60px;
        color: rgba(0, 94, 117, 0.72);
        margin-top: 100px;
      }
    }
  }

  input {
    padding: 10px;
    width: 40%;
    outline: none;
    border: none;
    border-bottom: 2px solid gray;
    background-color: rgb(211, 206, 209);
    &::placeholder {
      color: rgba(0, 0, 0, 0.55);
    }
  }

  button {
    padding: 10px;
    width: 25%;
    &:disabled {
      opacity: 0.7;
    }
    background-color: rgba(0, 94, 117, 0.72);
    border: 1px solid rgb(211, 206, 209) ;
    color: white;
    letter-spacing: 1px;
    &:not(:disabled) {
      background-color: rgba(0, 94, 117, 0.72);
      color: white;
      font-weight: 600;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default LoginArea;
