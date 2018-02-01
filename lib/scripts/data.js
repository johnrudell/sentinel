import { drawShares } from './share_tracking.js';
import { drawDistributions } from './distributions.js';

const publicSpreadsheetUrl = '1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU';

export const render = () => {
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
  const distributionsData = tabletop.sheets("TestInterestPurchases").elements;

  // drawShares(shareTracking);
  drawDistributions(distributionsData);

}

const loading = () => {
  $(".fa-spinner").css("display", "inline-block");
}
