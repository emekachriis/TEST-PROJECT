var web3 = new Web3(Web3.givenProvider);

var contractAddress = '0x...'; // Replace with your contract address
var contractAbi = [ // Replace with your contract ABI
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      }
    ],
    "name": "contribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      }
    ],
    "name": "getCampaignDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "raised",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      },
      {
        "internalType": "enum Crowdfunding.Status",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

var contract = new web3.eth.Contract(contractAbi, contractAddress);

function createCampaign() {
  event.preventDefault();
  var goal = document.getElementById("goal").value;
  var deadline = document.getElementById("deadline").value;
  var beneficiary = document.getElementById("beneficiary").value;
  var options = {
    from: web3.eth.accounts[0],
    value: 0,
    gas: 3000000
  };
  contract.methods.createCampaign(goal, deadline, beneficiary).send(options)
    .then(function() {
      alert("Campaign created!");
    })
    .catch(function(error) {
      console.log(error);
      alert("Error creating campaign");
    });
}

function getCampaigns() {
  contract.methods.getNumCampaigns().call()
    .then(function(numCampaigns) {
      for (var i = 0; i < numCampaigns; i++) {
        contract.methods.getCampaignDetails(i).call()
          .then(function(campaignDetails) {
            var campaignId = i;
            var goal = campaignDetails[0];
            var raised = campaignDetails[1];
            var deadline = campaignDetails[2];
            var beneficiary = campaignDetails[3];
            var status = campaignDetails[4];
           
