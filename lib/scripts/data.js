import { drawShares } from './share_tracking.js';
import { drawDistributions } from './distributions.js';
import {
  loading,
  activeButton,
  infoToggle,
} from './util.js';

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
  activeButton();
  infoToggle();

  $(".fa-spinner").css("display", "none");

  const distributionsData = tabletop.sheets("InterestPurchases").elements;
  drawDistributions(distributionsData);

}
