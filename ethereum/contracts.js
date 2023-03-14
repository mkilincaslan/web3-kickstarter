import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import Campaign from './build/Campaign.json';

export const factoryInstance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    'ADDRESS_OF_THE_CONTRACT'
);

export const getCampaignByAddress = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};
