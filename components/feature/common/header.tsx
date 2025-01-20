"use client";

import NavContainer from "@/components/ui/nav-container";
import { ConnectBtn } from "../wallet/connect-button";
import Logo from "./logo";

function Headers() {
  return (
    <>
      <NavContainer>
        <Logo />
        <ConnectBtn />
      </NavContainer>
    </>
  );
}

export default Headers;
