import { drawShares } from './share_tracking.js';
import { drawDistributions } from './distributions.js';

const publicSpreadsheetUrl = '1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU';


// https://docs.google.com/spreadsheets/d/1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU/edit?usp=sharing


export const init = () => {
  loading();
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: draw,
    simpleSheet: false
  })
}



const draw = (data, tabletop) => {

  $(".fa-spinner").css("display", "none");
  const shareTracking = tabletop.sheets("John Copy of ShareTracking").elements;
  const distributions = tabletop.sheets("John Copy of InterestPurchases").elements;

  drawShares(shareTracking);

  // const displayData = [];
  // for (let i = 0; i < shareTracking.length; i++) {
  //   displayData.push(shareTracking[i]);
  //   // displayData.push(data[i]["TOTAL ACCOUNT VALUE"]);
  // }

}

const loading = () => {
  $(".fa-spinner").css("display", "inline-block");
}
