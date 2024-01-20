import styled from "styled-components";

const LoginPanelContainer = styled.div`
  width: 700px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`;

const LoginPanelBody = styled.div`
  display: flex;
  padding: 50px;
  gap: 10px;
`;

const LoginPanelControls = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const LoginPanelColumn = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const LoginPanelLabel = styled.span`
  width: 100%;
  color: var(--textPrimary);
  font-size: 14px;
`;

const LoginPanelLogo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPanelInput = styled.input`
  width: calc(100% - 14px);
  height: 35px;
  background-color: transparent;
  border: 1px solid var(--textSecondary);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--textPrimary);
  font-size: 14px;
  margin-top: 5px;
  padding-left: 10px;
`;

export {
  LoginPanelContainer,
  LoginPanelBody,
  LoginPanelColumn,
  LoginPanelLabel,
  LoginPanelInput,
  LoginPanelControls,
  LoginPanelLogo,
};
