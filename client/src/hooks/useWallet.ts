import { connect, disconnect, fetchBalance, ConnectResult, PublicClient } from '@wagmi/core';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import { createConfig, configureChains, mainnet } from 'wagmi';


export const useWallet = () => {
    let client: ConnectResult<PublicClient>;

    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [mainnet],
        [publicProvider()]
    );
    
    const config = createConfig({
        autoConnect: true,
        connectors: [new MetaMaskConnector({ chains })],
        publicClient,
        webSocketPublicClient,
    });
    

    const connectTo = async () => {
        const result = await connect({
            chainId: mainnet.id,
            connector: new MetaMaskConnector({
                chains: [mainnet],
                options: {
                    shimDisconnect: true,
                    UNSTABLE_shimOnConnectSelectAccount: true,
                },
            }),
        });
        client = result
        return result;
    }

    const disconnectFrom = async () => {
        const result = await disconnect();
        return result;
    }

    const getBalance = async () => {
        const res = await fetchBalance({
            address: client.account,
            chainId: mainnet.id
        })
        return res
    }

    return {
        connectTo,
        disconnectFrom,
        getBalance
    }
}
