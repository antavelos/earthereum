/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Verifier, VerifierInterface } from "../../contracts/Verifier";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "a",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "X",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "Y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct Pairing.G2Point",
            name: "b",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "c",
            type: "tuple",
          },
        ],
        internalType: "struct Verifier.Proof",
        name: "proof",
        type: "tuple",
      },
      {
        internalType: "uint256[4]",
        name: "input",
        type: "uint256[4]",
      },
    ],
    name: "verifyTx",
    outputs: [
      {
        internalType: "bool",
        name: "r",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611616806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063799afa7614610030575b600080fd5b61004a600480360381019061004591906113b8565b610060565b6040516100579190611415565b60405180910390f35b600080600467ffffffffffffffff81111561007e5761007d611096565b5b6040519080825280602002602001820160405280156100ac5781602001602082028036833780820191505090505b50905060005b6004811015610105578381600481106100ce576100cd611430565b5b60200201518282815181106100e6576100e5611430565b5b60200260200101818152505080806100fd9061148e565b9150506100b2565b506000610112828661012d565b03610121576001915050610127565b60009150505b92915050565b6000807f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000019050600061015d6102c4565b90508060800151516001865161017391906114d6565b1461017d57600080fd5b60006040518060400160405280600081526020016000815250905060005b865181101561023657838782815181106101b8576101b7611430565b5b6020026020010151106101ca57600080fd5b6102218261021c85608001516001856101e391906114d6565b815181106101f4576101f3611430565b5b60200260200101518a858151811061020f5761020e611430565b5b6020026020010151610830565b6108d2565b9150808061022e9061148e565b91505061019b565b5061026081836080015160008151811061025357610252611430565b5b60200260200101516108d2565b90506102a6856000015186602001516102788461099a565b856040015161028a8a6040015161099a565b876060015161029c896000015161099a565b8960200151610a3f565b6102b657600193505050506102be565b600093505050505b92915050565b6102cc610f62565b60405180604001604052807f204dc3d831eb1a19a08df235c7536e6878fd19a26a7f989c622e0c20f62836d481526020017f033895453a9eb37de7f67c991e0c4d35009c593a1277598b2042a20337c0d8a88152508160000181905250604051806040016040528060405180604001604052807f2424eea85624245183dd5b30047220d8507b512af696e27ef40ca76137630d9681526020017f05363c19b9750f6e066ba475f3ffa047cb5a0f2914d147bf944cc558da153bc8815250815260200160405180604001604052807f11ceb15d545b25cc13d7a05d646e544d822929b86c48fa8c9441c38e2271bb2881526020017f188023572be94281b08a4e90ce2772cdb5ca4b4d212275ced2ac7ef0d2173b928152508152508160200181905250604051806040016040528060405180604001604052807f22dbf462b0bced1446ece63ddaaf013bc801ce4e45dd5b4ef96f624aac73e49481526020017f084af8cbcf13136f900c78f14699fd6eaad9cd71a57cdbfb1f55cd4b80d7a0eb815250815260200160405180604001604052807f1ac44e6212d0d663378a1e52b8150a467ed8f092840bfd1b75bf0c96c8e0df4c81526020017f20582666d9416dcf8dd5ffca07f586ffef0af33a511a0447980442bd9a83624a8152508152508160400181905250604051806040016040528060405180604001604052807f03662fc3e139182b4e16add2a827cd513138399080572a9fb8f2bd1d9a106f4e81526020017f1c63e9cb99a0195c455d5c2e22912b85fe039f8fedecd3f5c1b6141e6c535234815250815260200160405180604001604052807f04bdc1268aa150a30ab927624ebd1f861dff892aa8b95faac0404a43efcf48cd81526020017f2d3f76a3e0dd8ebb58c3dd43b3e8f2ba5a6df231adbaef921f2acdd7c810e2f08152508152508160600181905250600567ffffffffffffffff81111561059357610592611096565b5b6040519080825280602002602001820160405280156105cc57816020015b6105b9610fa9565b8152602001906001900390816105b15790505b50816080018190525060405180604001604052807f0b8dd22d43aafa817ec3c9b6011e202ba2dab08078718439e53575200bee717f81526020017f102ba4276e045e4c0d2686880dc8339a2c64cfb947a32b711256a88f46220424815250816080015160008151811061064257610641611430565b5b602002602001018190525060405180604001604052807f2d9272b13c1085e989ca76704ffa855acf786236d568989fc3c765447e0d3dfa81526020017f28f315dd9dc02e0ac71bf539c30a0a032ef53c7ffbf0780322ecf8e26bf0c88781525081608001516001815181106106ba576106b9611430565b5b602002602001018190525060405180604001604052807f0587884de352b4c97b827e9ca993f55830a8f4eee0e00e33c49949b75ed330e181526020017f28273a3c21763fdde61d5fed06ff8fa6a9fb02f52a52759684646ba4d53d7393815250816080015160028151811061073257610731611430565b5b602002602001018190525060405180604001604052807f1b59033ac53038b3365f2c44aa33eb86466ee13299f87e3e430ca4ffda46484981526020017f170b4beb78e1b5d560820f7802e38af2efe230b1173fbb3319ede6552d81564d81525081608001516003815181106107aa576107a9611430565b5b602002602001018190525060405180604001604052807f2b3bdcf7c866c94247e7fcc56f4c19d5b2af02f8210020b59250904736373ac281526020017f2a7d28a94f01fcc176f084df02e74e6c48898def19f59beef1a8a886993ac307815250816080015160048151811061082257610821611430565b5b602002602001018190525090565b610838610fa9565b610840610fc3565b83600001518160006003811061085957610858611430565b5b60200201818152505083602001518160016003811061087b5761087a611430565b5b602002018181525050828160026003811061089957610898611430565b5b602002018181525050600060608360808460076107d05a03fa905080600081036108bf57fe5b50806108ca57600080fd5b505092915050565b6108da610fa9565b6108e2610fe5565b8360000151816000600481106108fb576108fa611430565b5b60200201818152505083602001518160016004811061091d5761091c611430565b5b60200201818152505082600001518160026004811061093f5761093e611430565b5b60200201818152505082602001518160036004811061096157610960611430565b5b602002018181525050600060608360c08460066107d05a03fa9050806000810361098757fe5b508061099257600080fd5b505092915050565b6109a2610fa9565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd479050600083600001511480156109df575060008360200151145b15610a03576040518060400160405280600081526020016000815250915050610a3a565b604051806040016040528084600001518152602001828560200151610a289190611539565b83610a33919061156a565b8152509150505b919050565b600080600467ffffffffffffffff811115610a5d57610a5c611096565b5b604051908082528060200260200182016040528015610a9657816020015b610a83610fa9565b815260200190600190039081610a7b5790505b5090506000600467ffffffffffffffff811115610ab657610ab5611096565b5b604051908082528060200260200182016040528015610aef57816020015b610adc611007565b815260200190600190039081610ad45790505b5090508a82600081518110610b0757610b06611430565b5b60200260200101819052508882600181518110610b2757610b26611430565b5b60200260200101819052508682600281518110610b4757610b46611430565b5b60200260200101819052508482600381518110610b6757610b66611430565b5b60200260200101819052508981600081518110610b8757610b86611430565b5b60200260200101819052508781600181518110610ba757610ba6611430565b5b60200260200101819052508581600281518110610bc757610bc6611430565b5b60200260200101819052508381600381518110610be757610be6611430565b5b6020026020010181905250610bfc8282610c0c565b9250505098975050505050505050565b60008151835114610c1c57600080fd5b6000835190506000600682610c31919061159e565b905060008167ffffffffffffffff811115610c4f57610c4e611096565b5b604051908082528060200260200182016040528015610c7d5781602001602082028036833780820191505090505b50905060005b83811015610f0257868181518110610c9e57610c9d611430565b5b602002602001015160000151826000600684610cba919061159e565b610cc491906114d6565b81518110610cd557610cd4611430565b5b602002602001018181525050868181518110610cf457610cf3611430565b5b602002602001015160200151826001600684610d10919061159e565b610d1a91906114d6565b81518110610d2b57610d2a611430565b5b602002602001018181525050858181518110610d4a57610d49611430565b5b602002602001015160000151600160028110610d6957610d68611430565b5b6020020151826002600684610d7e919061159e565b610d8891906114d6565b81518110610d9957610d98611430565b5b602002602001018181525050858181518110610db857610db7611430565b5b602002602001015160000151600060028110610dd757610dd6611430565b5b6020020151826003600684610dec919061159e565b610df691906114d6565b81518110610e0757610e06611430565b5b602002602001018181525050858181518110610e2657610e25611430565b5b602002602001015160200151600160028110610e4557610e44611430565b5b6020020151826004600684610e5a919061159e565b610e6491906114d6565b81518110610e7557610e74611430565b5b602002602001018181525050858181518110610e9457610e93611430565b5b602002602001015160200151600060028110610eb357610eb2611430565b5b6020020151826005600684610ec8919061159e565b610ed291906114d6565b81518110610ee357610ee2611430565b5b6020026020010181815250508080610efa9061148e565b915050610c83565b50610f0b61102d565b6000602082602086026020860160086107d05a03fa90508060008103610f2d57fe5b5080610f3857600080fd5b600082600060018110610f4e57610f4d611430565b5b602002015114159550505050505092915050565b6040518060a00160405280610f75610fa9565b8152602001610f82611007565b8152602001610f8f611007565b8152602001610f9c611007565b8152602001606081525090565b604051806040016040528060008152602001600081525090565b6040518060600160405280600390602082028036833780820191505090505090565b6040518060800160405280600490602082028036833780820191505090505090565b604051806040016040528061101a61104f565b815260200161102761104f565b81525090565b6040518060200160405280600190602082028036833780820191505090505090565b6040518060400160405280600290602082028036833780820191505090505090565b6000604051905090565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6110ce82611085565b810181811067ffffffffffffffff821117156110ed576110ec611096565b5b80604052505050565b6000611100611071565b905061110c82826110c5565b919050565b6000819050919050565b61112481611111565b811461112f57600080fd5b50565b6000813590506111418161111b565b92915050565b60006040828403121561115d5761115c611080565b5b61116760406110f6565b9050600061117784828501611132565b600083015250602061118b84828501611132565b60208301525092915050565b600080fd5b600067ffffffffffffffff8211156111b7576111b6611096565b5b602082029050919050565b600080fd5b60006111da6111d58461119c565b6110f6565b905080602084028301858111156111f4576111f36111c2565b5b835b8181101561121d57806112098882611132565b8452602084019350506020810190506111f6565b5050509392505050565b600082601f83011261123c5761123b611197565b5b60026112498482856111c7565b91505092915050565b60006080828403121561126857611267611080565b5b61127260406110f6565b9050600061128284828501611227565b600083015250604061129684828501611227565b60208301525092915050565b600061010082840312156112b9576112b8611080565b5b6112c360606110f6565b905060006112d384828501611147565b60008301525060406112e784828501611252565b60208301525060c06112fb84828501611147565b60408301525092915050565b600067ffffffffffffffff82111561132257611321611096565b5b602082029050919050565b600061134061133b84611307565b6110f6565b9050806020840283018581111561135a576113596111c2565b5b835b81811015611383578061136f8882611132565b84526020840193505060208101905061135c565b5050509392505050565b600082601f8301126113a2576113a1611197565b5b60046113af84828561132d565b91505092915050565b60008061018083850312156113d0576113cf61107b565b5b60006113de858286016112a2565b9250506101006113f08582860161138d565b9150509250929050565b60008115159050919050565b61140f816113fa565b82525050565b600060208201905061142a6000830184611406565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061149982611111565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036114cb576114ca61145f565b5b600182019050919050565b60006114e182611111565b91506114ec83611111565b92508282019050808211156115045761150361145f565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061154482611111565b915061154f83611111565b92508261155f5761155e61150a565b5b828206905092915050565b600061157582611111565b915061158083611111565b92508282039050818111156115985761159761145f565b5b92915050565b60006115a982611111565b91506115b483611111565b92508282026115c281611111565b915082820484148315176115d9576115d861145f565b5b509291505056fea2646970667358221220aa0bebf2309c60c0d8f79e0fcea7aa6f65ee8d3a098db0064d453864ae663a0a64736f6c63430008140033";

type VerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Verifier__factory extends ContractFactory {
  constructor(...args: VerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Verifier & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Verifier__factory {
    return super.connect(runner) as Verifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifierInterface {
    return new Interface(_abi) as VerifierInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Verifier {
    return new Contract(address, _abi, runner) as unknown as Verifier;
  }
}
