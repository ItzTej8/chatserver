import { JSDOM } from 'jsdom';
import Excel from 'exceljs';


var cookie = "WMONID=M_oaIxU__Bt; dtPC=494880173_665#click%20on%20%22Search%22%232; ASOBGSPNSESSIONID=DuAIt61MVBg4ol1qnBV_s5jOj6fpC9Op4Wuy8Mo3zXBGlHqcrwCC!-348183271!-1219551079";


var currentMonthTrainingExpire = [];
var allEngDetails = [];
var engList = [];

async function getEngList()
{
const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
  "headers": {
    "accept": "text/javascript, text/html, application/xml, text/xml, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-prototype-version": "1.7.2",
    "x-requested-with": "XMLHttpRequest",
    "cookie": cookie,
    "Referer": "https://biz2.samsungcsportal.com/svctracking/common/ENGMasterList.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "cmd=ENGMasterListCmd&numPerPage=100&currPage=0&ascCode=&ASC_CODE=0002355819&ENGINEER=&FIRST_NAME=&LAST_NAME=&WORK_STATUS=W",
  "method": "POST"
});

const res = await req.json();
const dataLists = res.dataLists;

for (var datalist of dataLists)
{
var newData = {
engName : datalist.ENGINEER_NAME,
engCode: datalist.ENGINEER,
contact: datalist.TEL_NO

}
engList.push(newData);



}



}



async function getEngInfo(engCode, engName, contact)
{

const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "iframe",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": cookie,
    "Referer": "https://biz2.samsungcsportal.com/svctracking/common/ENGMasterList.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "cmd=ENGMasterDetailCmd&numPerPage=100&currPage=0&ascCode=0002355819&ASC_CODE=0002355819&ENGINEER="+engCode+"&FIRST_NAME=&LAST_NAME=&WORK_STATUS=W",
  "method": "POST"
});

const res = await req.text();
//console.log(res);

const dom = new JSDOM(res);
const document = dom.window.document;

// Get current date
var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
var currentYear = currentDate.getFullYear(); 


// Get table body
var tableBody = document.getElementById("educationTableBody"); 

// Iterate through table rows
for (var i = 0; i < tableBody.rows.length; i++) {
    var row = tableBody.rows[i];


var courseTitle = row.cells[1].textContent;
var validFromDate = row.cells[2].textContent;
    var validToDate = row.cells[3].textContent;
var svcProducts = row.cells[5].textContent;

var engData = {
engName,
engCode,
contact,
courseTitle,
validFromDate,
 validToDate ,
svcProducts

}

    // Extract month from validToDate
    var validToMonth = parseInt(validToDate.split(".")[1]);
var validToYear = parseInt(validToDate.split(".")[2]);
 
    if (validToMonth === currentMonth && validToYear  === currentYear ) {
 
        currentMonthTrainingExpire .push(engData );
    }

allEngDetails.push(engData );
console.log(allEngDetails);

}

console.log("Rows matching current month:", currentMonthTrainingExpire )


}

getEngInfo();
