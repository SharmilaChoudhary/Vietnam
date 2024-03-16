import React,{useEffect ,useState} from 'react'
import {Input, Popover, Radio ,Modal ,message,Button} from "antd";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined
} from "@ant-design/icons";
import "../App.css";
import tokenList from "../tokenList.json";
import axios from "axios";
import Erc20abi from "../abi/Erc20abi.json";
import Routerabi from "../abi/Routerabi.json";




function Stake() {
const [slippage ,setSlippage]= useState(2.5);
const [tokenOneAmount, setTokenOneAmount]=useState(null);
const [tokenTwoAmount, setTokenTwoAmount]=useState(null);
const [tokenOne, setTokenOne] =useState(tokenList[0]);
const [tokenTwo, setTokenTwo] =useState(tokenList[1]);
const [isOpen,setIsOpen] =useState(false);
const [changeToken, setChangeToken] = useState(1);
const [prices, setPrices] = useState(null);
function handleSlippageChange(e){
  setSlippage(e.target.value)
}
 



  function  openModal(asset){
    setChangeToken(asset);
    setIsOpen(true);
  }

 

//crossschain

const bridgeAssets = async (event) => {

    event.preventDefault();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const sourceRouter = new ethers.Contract(
      '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165',
      Routerabi,
      signer
    );
    const tokenAmounts = [
      {
        token: '0xb13Cfa6f8B2Eed2C37fB00fF0c1A59807C585810',
        amount: '100000000000000000',
      },
    ];
    const functionSelector = ethers.utils
      .id('CCIP EVMExtraArgsV1')
      .slice(0, 10);
    //  "extraArgs" is a structure that can be represented as [ 'uint256']
    // extraArgs are { gasLimit: 0 }
    // we set gasLimit specifically to 0 because we are not sending any data so we are not expecting a receiving contract to handle data
   
    const sourceRouterAddress = '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165';
    const destinationChainSelector = '16015286601757825753';
    const tokenAddress = "0xb13Cfa6f8B2Eed2C37fB00fF0c1A59807C585810";
    const amount = "1000000000000000000";
    const  correctAddress ="0xa896F0E2B1143739266FA605C7ec8ecAa090C91c";
    const extraArgs = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);

    const encodedExtraArgs = functionSelector + extraArgs.slice(2);

    const message = {
      receiver: ethers.utils.defaultAbiCoder.encode(
        ['address'],
        [correctAddress]
      ),
      data: '0x', // no data
      tokenAmounts: tokenAmounts,
      feeToken: ethers.constants.AddressZero, // If fee token address is provided then fees must be paid in fee token.
      extraArgs: encodedExtraArgs,
    };
    const fees = await sourceRouter.getFee('16015286601757825753', message);
    console.log('hey');
    console.log(`Estimated fee (wei) : ${fees}`);
    const erc20 = new ethers.Contract(
      '0xb13Cfa6f8B2Eed2C37fB00fF0c1A59807C585810',
      Erc20abi,
      signer
    );
    console.log(erc20);
    let sendTx, approvalTx;
    approvalTx = await erc20.approve(sourceRouterAddress, "100000000000000000" );
    await approvalTx.wait(); // wait for the transaction to be mined
    console.log(
      `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
    );

    sendTx = await sourceRouter.ccipSend(destinationChainSelector, message, {
      value: fees,
    });
    const receipt = await sendTx.wait();
    console.log(receipt)// fees are send as value since we are paying the fees in native
  };

 



const settings=(
  <>
<div>Slippage Tolerance</div>

  </>
);


  return (
   <>
   <center>
   <Modal 
   open={isOpen}
   footer={null}
   onCancel={()=> setIsOpen(false)}
   title="Select a token">
<div className='modalContent'>

</div>
   </Modal>
    <div className='tradeBox' >
      <div className='tradeBoxHeader '> 
      <h4> Stake </h4>
     
      <Popover 
       content={settings}
      title="Settings"
      trigger="click"
      placement="bottomRight"
     
      >
      <SettingOutlined className='cog'/>
      </Popover>

     </div>
   <div className='inputs'>
     
  
    <Button className='swapButton' onClick={bridgeAssets}>Stake 1 gho</Button>
    {/* <Input placeholder='0'/> */}
<Button className='swapButton'>Withdraw</Button>


   
   
</div>

    </div>
    </center>
    </>  
  )
}

export default Stake