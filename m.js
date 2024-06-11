import { JSDOM } from 'jsdom';
import Excel from 'exceljs';


var cookie = "WMONID=V68A7zXvK4n; visid_incap_2651221=SZt5skd1SIy+gYroiVUG4p7A6WUAAAAAQUIPAAAAAAAJ31JCh/zEsdvYJ+2K1ZXE; ASOBGSPNSESSIONID=S6cGdlg_iRUGjWysfZdOa7XVL_mlBg2wtgUESxuuttAsYbh69JWa!-1729266406!-287760250; dtPC=-";

async function getEngInfo()
{

const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
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
    "body": "cmd=ENGMasterDetailCmd&numPerPage=100&currPage=0&ascCode=0002355819&ASC_CODE=0002355819&ENGINEER=8486145018&FIRST_NAME=&LAST_NAME=&WORK_STATUS=",
    "method": "POST"
  });

const res = await req.text();
console.log(res);



// Get current date
var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1


// Get table body
var tableBody = document.getElementById("educationTableBody");

// Iterate through table rows
for (var i = 0; i < tableBody.rows.length; i++) {
    var row = tableBody.rows[i];
    var validToDate = row.cells[3].innerText; // Index 3 corresponds to the "Valid To" column

    // Extract month from validToDate
    var validToMonth = parseInt(validToDate.split(".")[1]); // Assuming date format is dd.mm.yyyy

    // Check if validToMonth matches currentMonth
    if (validToMonth === currentMonth) {
        // Row matches current month, do something with it
        console.log("Row matches current month:", row);
    }
}


}

getEngInfo();