import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum ,sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit CRA demo',
    infuraId: process.env.REACT_APP_INFURA_ID,
    //alchemyId:  process.env.REACT_APP_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
  })
);

// import {configureChains,mainnet,WagmiConfig,createClient}  from "wagmi";
// import {publicProvider} from "wagmi/providers/public";


// const {provider, webSocketProvider} =configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// const client = createClient(
//   {
//     autoConnect:true ,
//     provider,
//     webSocketProvider

//   }
// )
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
