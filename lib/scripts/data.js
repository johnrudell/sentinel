import { drawChart } from './share_tracking.js';
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

  drawChart(shareTracking);



  const displayData = [];
  for (let i = 0; i < shareTracking.length; i++) {
    displayData.push(shareTracking[i]);
    // displayData.push(data[i]["TOTAL ACCOUNT VALUE"]);
  }
  //
  // console.log(displayData);
  // for (let i = 0; i < shareTracking.length; i++) {
  //   $("#root").append(shareTracking[i].TRANSACTIONS);
  // }


  // if (shareTracking) {
  //   let len = shareTracking.length;
  //   let txt = "";
  //
  //   if (len > 0) {
  //     for (let i = 0; i < len; i++) {
  //       // if (shareTracking[i].Name && shareTracking[i].Sign && shareTracking[i].Type) {
  //         txt +=
  //         "<tr><td>" + shareTracking[i].DATE +
  //         "</td><td>" + shareTracking[i].TRANSACTIONS +
  //         "</td><td>" + shareTracking[i]["TOTAL ACCOUNT VALUE"] +
  //         "</td><td>" + shareTracking[i].SHARES +
  //         "</td><td>" + shareTracking[i]["SHARE VALUE"] +
  //         "</td><td>" + shareTracking[i].NOTE +
  //         "</td><td>" + shareTracking[i].SUBNOTE +
  //         "</td></tr>";
  //       // }
  //     }
  //     if (txt !== "") {
  //       $("#table").append(txt).removeClass("hidden");
  //     }
  //   }
  // }

}

const loading = () => {
  $(".fa-spinner").css("display", "inline-block");
}
