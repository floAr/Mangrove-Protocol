# <img src="https://user-images.githubusercontent.com/765387/119150548-d9400900-ba4e-11eb-908a-26abef802738.png" alt="drawing" width="200"/>Mangrove-Protocol 

Mangrove-Protocol is a platform protocol for incentivized collaborative applications of the secret network.
The whole protocol is composed from smaller building blocks, is governed by a DAO and is extensible and upgradeable by nature. 
At a high-level Mangrove-Protocol consists of pools and streams that accumulate and direct value through the protocol.

## Concept
Mangrove-Protocol is intended to become a self-sustaining eco-system which generates a surplus for its users and the platform itself by making use of trust-free-collaboration and large-number systems. It will generate a stable income for its users with the intention of yielding **at least** as much, as each user would get when executing the strategy on her/his own.

### Staking pool and staking stream:
The foundation of the protocol is a collaborative staking platform that allows for diverse strategies. Users deposit $SCRT into a secret contract and receive a snip20 token that validates their claim of ownership. $SCRT are directed into the staking pool and are staked according to current strategies. Governed by smart contract the staking strategies are executed and earnings are compounded. Tokens received on deposit can always be burned with the secret contract to receive the current equivalent share of the pool (including compounds and yields earned up to this moment in time)

### Growth pool and revenue stream:
As the staking pool is governed by a smart contract only a single transaction is required to compound the earning of all users. This produces a surplus of **#_of_users x transaction_fess**, which is directed into the growth pool. Contents of the growth pool are intended to accumulate over time and flow into different streams.

## Roadmap
> v0.1: **Concept** A simple staking strategy, using the secret swap $SEFI pool is implemented and controlled / compounded by a hot-wallet   
>> v0.2: **Decentralization** The hot-wallet is replaced by a secret contract that allows for deposit and withdraw of $SCRT. On deposit it will disperse snip20 tokens, for a price depending on the current pool size (_pool-value / number-of-snip20_) $SCRT per token). On withdraw the price is calculated again based on the pool value, paying out the dividends gained since the deposit event
>> 
>> v0.3: Capture saved transaction fees as revenue stream. Instead of compounding 100% of the gains the protocol will match the APY of the $SEFI pool. Any surplus generated due to reduced number of transactions and compounding effects will be delegated into a reward stream. Initially 50% of the reward pool are compounded in the initial strategy, maximizing the gain of the protocol. The other 50% are left to accumulate.
>>
>>> v0.4 **DAO** Building up an API for reward flows, that allows to redirect parts of the reward flow to alternative strategies (like $SCRT staking) and to connect applications that can make use of funds in the reward pool in their secret contracts. All those parametric changes are to be resolved on-chain in a decentralized governance process.
>>> ...



## Outlook


<div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
