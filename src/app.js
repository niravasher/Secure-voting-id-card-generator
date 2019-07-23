App = {
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const voting = await $.getJSON('Voting.json')
        // console.log(voting);
        App.contracts.Voting = TruffleContract(voting)
        App.contracts.Voting.setProvider(App.web3Provider)
    
        // Hydrate the smart contract with values from the blockchain
        App.voting = await App.contracts.Voting.deployed()
    },

    render: async () => {
        // Render account
        $("#account").html(App.account);
    },
}

function saveData() {
    var firstName = $("#firstName").val();
    var fathersName = $("#fathersName").val();
    var lastName = $("#lastName").val();
    if ($('#male').is(":checked"))
    {
        var gender = "male";
    } else {
        var gender = "female";
    }
    var date =  $("#DD").val();
    var address = $("#address").val();
    var photo = $("#photo").val();
    var proof = $("#proof").val();
    console.log(firstName, fathersName, lastName, gender, date, address);

    const detail = await App.voting.details(0);
    detail[0] = firstName;
    detail[1] = fathersName;
    detail[2] = lastName;
    detail[3] = gender;
    detail[4] = date;
    detail[5] = address;
    detail[6] = photo;
    detail[7] = proof;
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})