const publicSpreadsheetUrl = '1gm0kcddbU9xLLBK7H8qfv-Y-v--tuUsdW416GYlWdDE';

export const init = () => {
  loading();
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  })
}




const showInfo = (data, tabletop) => {
  // alert('Successfully processed!');
  // console.log(data);
  const displayData = JSON.stringify(data);
  $("#root").html(displayData);
}

const loading = () => {
  $(".fa-spinner").css("display", "inline-block");
}
