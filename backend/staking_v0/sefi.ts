const {
    EnigmaUtils, SigningCosmWasmClient, Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey,
} = require('secretjs');

require('dotenv').config();
// {
//     "send": {
//       "amount": "300000",
//       "recipient": "secret1y9z3ck449a46r4ku7klkhdxnlq07zh4shc7cuy",
//       "msg": "eyJkZXBvc2l0Ijp7fX0K"
//     }
//   }



// interface Deposit{
// send:{
//     amount:string, // variable
//     recipient: string
//     msg: {
//         deposit:{}
//     }
// }
// }



const main = async () => {


    const sefi = 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm'; // sefi-9
    const stake = 'secret1fvkjzcqqc8nj2utttxle6muer6ncpuavfk4j9p';// sefi-stake-12
    const mnemonic = process.env.MNEMONIC;
    const httpUrl = process.env.SECRET_REST_URL;

    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic)
        .catch((err) => { throw new Error(`Could not get signing pen: ${err}`); });
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const accAddress = pubkeyToAddress(pubkey, 'secret');

    // 1. Initialise client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    const fees = {
        send: {
            amount: [{ amount: '80000', denom: 'uscrt' }],
            gas: '80000',
        },
        exec: {
            amount: [{ amount: '800000', denom: 'uscrt' }],
            gas: '800000',
        },
    };
    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, fees,
    );

    // const transation = await client.execute(sefi,{set_viewing_key:{key:'manicmonday',padding:'rju'}})
    // console.log(JSON.parse(new TextDecoder().decode(transation.data)))
    //   const transation = await client.execute(stake,{set_viewing_key:{key:'manicmonday',padding:'rju'}})
    // console.log(JSON.parse(new TextDecoder().decode(transation.data)))



    const sefiBalance = await client.queryContractSmart(sefi, { balance: { address: accAddress, key: 'manicmonday' } })
    console.log('Sefi:', sefiBalance.balance.amount)


    // sending sefi from sefi contract to stake
    // todo : replace fixed amount with 100%: sefiBalance.balance.amount
    const staketxt = await client.execute(sefi, { send: { amount: (Math.round(Number.parseInt(sefiBalance.balance.amount) / 10)).toString(), recipient: stake, msg: 'eyJkZXBvc2l0Ijp7fX0K' } }) // eyJkZXBvc2l0Ijp7fX0K = {"deposit":{}}
    console.log('Send for staking', JSON.parse(new TextDecoder().decode(staketxt.data)))

    // query the current stake
    const stakeBalance = await client.queryContractSmart(stake, { balance: { address: accAddress, key: 'manicmonday' } })
    console.log('Stake Balance:', stakeBalance)

    console.log('Total SEFI',Number.parseInt(stakeBalance.balance.amount)+Number.parseInt(sefiBalance.balance.amount)-Math.round(Number.parseInt(sefiBalance.balance.amount) / 10))


    // ANALYSIS
    // Query chain height
    const height = await client.getHeight()
        .catch((err) => { throw new Error(`Could not get block height: ${err}`); });
    // console.log(height)

    const stakeRewards = await client.queryContractSmart(stake, { rewards: { address: accAddress, key: 'manicmonday', height: height } })
    const stakeRewardsIn1000 = await client.queryContractSmart(stake, { rewards: { address: accAddress, key: 'manicmonday', height: height + 1000 } })
    const staked = Number(stakeBalance.balance.amount)
    const stakeRewardsIn1000Nr = stakeRewardsIn1000.rewards.rewards

    console.log('staked now', staked, 'reward in 1000 blocks', stakeRewardsIn1000Nr, 'reward per staked token in 1000 blocks', stakeRewardsIn1000Nr / staked)
    // 
    console.log('Stake Rewards:', stakeRewards)

    // claim 
    if (stakeRewards.rewards.rewards !== '0') {

        const claimTxt = await client.execute(stake, { redeem: { amount: "0" } }) // eyJkZXBvc2l0Ijp7fX0K = {"deposit":{}}
        console.log(claimTxt)
    }

    // {
    //     "redeem": {
    //       "amount": "0"
    //     }
    //   }
    // excute stake
}


main().catch((err) => {
    console.error(err);
});
