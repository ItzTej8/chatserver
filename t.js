import { JSDOM } from 'jsdom';
import Excel from 'exceljs';


var cookie = "WMONID=V68A7zXvK4n; visid_incap_2651221=SZt5skd1SIy+gYroiVUG4p7A6WUAAAAAQUIPAAAAAAAJ31JCh/zEsdvYJ+2K1ZXE; ASOBGSPNSESSIONID=f40F5K8A1DgqhoZsZQe3Kf83D8NlbTilaZlZP688IOatmwMxTuEx!-1729266406!-287760250; dtPC=-";

var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";
var isRequestCompleted = false;
let IHFetchedCalls = [];
let IHData = [];

function getCurrentDateFormatted() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
}
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const todayDate = getCurrentDateFormatted();
console.log(todayDate)


const dt = [
    { callId: '4394585696', assign: false, pda: true, rc: true },
    { callId: '4394586303', assign: false, pda: true, rc: false },
    { callId: '4394586424', assign: false, pda: true, rc: true },
    { callId: '4394588111', assign: true, pda: true, rc: false },
    { callId: '4394588492', assign: true, pda: true, rc: true },
    { callId: '4394588533', assign: true, pda: true, rc: false },
    { callId: '4394588836', assign: true, pda: true, rc: false },
    { callId: '4394589557', assign: false, pda: true, rc: false },
    { callId: '4394590329', assign: true, pda: true, rc: true },
    { callId: '4394591237', assign: true, pda: false, rc: false },
    { callId: '4394591510', assign: true, pda: false, rc: true },
    { callId: '4394592542', assign: true, pda: true, rc: true },
    { callId: '4394593566', assign: true, pda: true, rc: false },
    { callId: '4394593770', assign: true, pda: true, rc: false },
    { callId: '4394594071', assign: true, pda: true, rc: false },
    { callId: '4394594522', assign: true, pda: true, rc: false },
    { callId: '4394595371', assign: true, pda: true, rc: true },
    { callId: '4394595803', assign: true, pda: true, rc: false },
    { callId: '4394595971', assign: true, pda: true, rc: true },
    { callId: '4394596549', assign: true, pda: false, rc: true },
    { callId: '4394596836', assign: true, pda: false, rc: true },
    { callId: '4394597887', assign: true, pda: true, rc: false },
    { callId: '4394598786', assign: true, pda: false, rc: false },
    { callId: '4394599376', assign: true, pda: true, rc: false },
    { callId: '4394600270', assign: true, pda: true, rc: false },
    { callId: '4394601552', assign: true, pda: true, rc: true },
    { callId: '4394602754', assign: true, pda: true, rc: true },
    { callId: '4394602886', assign: true, pda: true, rc: false },
    { callId: '4394604518', assign: true, pda: true, rc: false },
    { callId: '4394605692', assign: true, pda: true, rc: false },
    { callId: '4394607057', assign: true, pda: true, rc: false },
    { callId: '4394607997', assign: true, pda: true, rc: false },
    { callId: '4394608182', assign: true, pda: false, rc: false },
    { callId: '4394609631', assign: true, pda: false, rc: false },
    { callId: '4394609892', assign: true, pda: true, rc: false },
    { callId: '4394610389', assign: true, pda: true, rc: true },
    { callId: '4394610805', assign: true, pda: false, rc: false },
    { callId: '4394611380', assign: true, pda: true, rc: true },
    { callId: '4394613465', assign: true, pda: false, rc: false },
    { callId: '4394614814', assign: true, pda: false, rc: false },
    { callId: '4394616443', assign: true, pda: false, rc: false },
    { callId: '4394618053', assign: true, pda: false, rc: false },
    { callId: '4394618067', assign: true, pda: false, rc: false },
    { callId: '4394618882', assign: true, pda: false, rc: false },
    { callId: '4394619715', assign: true, pda: true, rc: false },
    { callId: '4394621101', assign: false, pda: false, rc: false },
    { callId: '4394622191', assign: false, pda: false, rc: false },
    { callId: '4394622459', assign: false, pda: false, rc: false },
    { callId: '4394623414', assign: false, pda: false, rc: false },
    { callId: '4394624008', assign: false, pda: false, rc: false }
  ]
  
  const assignTrueCount = dt.filter(item => item.assign === true).length;
  const percentage = ((assignTrueCount / dt.length) * 100).toFixed(2);

  console.log(assignTrueCount); // Count of objects where assign is true
  console.log(percentage);

const pdaTrueCount = dt.filter(item => item.pda === true).length;
  const percentage2 = ((pdaTrueCount / dt.length) * 100).toFixed(2);

  console.log(pdaTrueCount); // Count of objects where assign is true
  console.log(percentage2);

const rcTrueCount = dt.filter(item => item.rc === true).length;
  const percentage3 = ((rcTrueCount / dt.length) * 100).toFixed(2);

  console.log(rcTrueCount); // Count of objects where assign is true
  console.log(percentage3);



proceedIHRequest().then(checkifget());



async function proceedIHRequest() {
  try {
    
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
      "Referer": "https://biz2.samsungcsportal.com/svctracking/svcorder/ServiceOrderListBatch.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
    "body": "cmd=SvcOrderListBatchCmd&objectID=&ascJobNo=&ascCode=&jspName=%2Fsvctracking%2Fsvcorder%2FServiceOrderListBatch.jsp&sSeq=&quickSearchYN=&asc_acctno=0002355819&asc_code=0002355819&cc_code=&status=&reason=&req_date_from1="+todayDate+"&req_date_to1="+todayDate+"&req_date_from="+todayDate+"&req_date_to="+todayDate+"&status2=&reason2=&DEALER_JOB_NO=&service_type=IH&model=&serial_no=&imei=&CONSUMER=&aedat_from=&aedat_to=&appt_date_from=&appt_date_to=&engineer=&voc_flag=&b2b_flag=&product=&LOCAL_PRODUCT=&billing_flag=&wty_flag=&wty_type=&OBJECT_ID_FROM=&OBJECT_ID_TO=&post_date_from=&post_date_to=&repair_comp_date_from=&repair_comp_date_to=&CC_APP_DT_FROM=&CC_APP_DT_TO=",
    "method": "POST"
  });

  const res = await req.text();
  //console.log(res);

} catch (error) {
    console.log(error)
}
}

async function checkifget() {
  await sleep(3000);
  console.log("in checkifget");

  await preRequestIH();


  while (isRequestCompleted == false) {
    try {

      if(isRequestCompleted == true)
        {
          break;
          return;
        }

      
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
          "Referer": "https://biz2.samsungcsportal.com/svctracking/svcorder/BatchJobDisplay.jsp",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
        "body": "cmd=BatchJobDisplayCmd&sSeq=&gubun=&searchOption=2",
        "method": "POST"
      });

      const res = await req.json();

      await postRequestIH();

      //console.log(res);
      console.log(`${res.svcList[0].batchStatus} >> ${res.svcList[0].rtnMsgName}`);

      if (res.svcList[0].batchStatus == "Completed") {
        console.log("COmpleted");
        isRequestCompleted = true;
        const seq = res.svcList[0].seq;
        await fetchIHCalls(seq);
        break;
        return;
      } else {
        console.log("Requesting again..");
        await checkifget();
      }
    } catch (e) {
      console.log("in catch >>>", e);
      break;
      return;
    }
  }

}



async function preRequestIH(){
 //console.log("preRequestIH")

  try {

  const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
    "headers": {
      "accept": "text/javascript, text/html, application/xml, text/xml, */*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "x-prototype-version": "1.7.2",
      "x-requested-with": "XMLHttpRequest",
      "Referer": "https://biz2.samsungcsportal.com/svctracking/svcorder/ServiceOrderListBatch.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent": ua,
    },
    "body": "cmd=AuthCommandListCmd&menuUrl=%2Fsvctracking%2Fsvcorder%2FServiceOrderListBatch.jsp&subRegionCd=WA&aclId=STBUSER",
    "method": "POST"
  });

  const res = await req.text();

      
} catch (error) {
    //console.log(error)
}
}
async function postRequestIH()
{
//console.log("postRequestIH")

  try {
    
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
      "Referer": "https://biz2.samsungcsportal.com/svctracking/svcorder/BatchJobDisplay.jsp",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent": ua,
    },
    "body": "cmd=AuthCommandListCmd&menuUrl=%2Fsvctracking%2Fsvcorder%2FServiceOrderListBatch.jsp&subRegionCd=WA&aclId=STBUSER",
    "method": "POST"
  });

  const res = await req.text()

} catch (error) {
    //console.log(error)
}
}

async function fetchIHCalls(seq)
{
  console.log("In fetchIHCalls")
  try {
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
        "Referer": "https://biz2.samsungcsportal.com/svctracking/svcorder/ServiceOrderListBatch.jsp",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent":ua
      },
      "body": "cmd=SvcOrderListBatchResultCmd&objectID=&ascJobNo=&ascCode=&jspName=%2Fsvctracking%2Fsvcorder%2FServiceOrderListBatch.jsp&sSeq="+seq+"&quickSearchYN=&asc_acctno=0002355819&asc_code=0002355819&cc_code=&status=&reason=&req_date_from1=02.06.2024&req_date_to1=09.06.2024&req_date_from=&req_date_to=&status2=&reason2=&DEALER_JOB_NO=&service_type=&model=&serial_no=&imei=&CONSUMER=&aedat_from=&aedat_to=&appt_date_from=&appt_date_to=&engineer=&voc_flag=&b2b_flag=&product=&LOCAL_PRODUCT=&billing_flag=&wty_flag=&wty_type=&OBJECT_ID_FROM=&OBJECT_ID_TO=&post_date_from=&post_date_to=&repair_comp_date_from=&repair_comp_date_to=&CC_APP_DT_FROM=&CC_APP_DT_TO=",
      "method": "POST"
    });

    const res = await req.json();
    //console.log(res);

    const callsList = res.svcResultList;
    for (var call of callsList){
      IHFetchedCalls.push(call.objectId);
    } 
      console.log("Total IH Calls received Today :", IHFetchedCalls.length);
    
await proceedFetchingCallDetails();
      
    
  } catch (error) {
    //console.log("fetchIHCalls >>> ",error);
  }

}


var tempCallCount= 0;
async function proceedFetchingCallDetails(){
if (tempCallCount<IHFetchedCalls.length)
  {

    await fetchCallDetails(IHFetchedCalls[tempCallCount]);

  }
  else{
    console.log(IHData);
    await preparedata();
  }

}

async function fetchCallDetails(callId)
{
  console.log("Fetching call details >>", callId);

 try {
  const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do?cmd=ServiceOrderDetailLiteCmd&objectID="+ callId, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": cookie,
      "Referer": "https://biz2.samsungcsportal.com/svctracking/lite/ServiceOrderListLite.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent":ua
    },
    "body": null,
    "method": "GET"
  });

  const res = await req.text();

  const ASCAssigned = await get_ASCAssigned(res);
  const assignTime = await get_assignTime(res);
  const ASC1stApp = await get_ASC1stApp(res);
  const firstVisit = await get_1stVisit(res);
  const rc = await get_rc(res);
  const obj = {
    callId,
    ASCAssigned,
    assignTime,
    ASC1stApp,
    firstVisit,
    rc
  }
  IHData.push(obj);

  

tempCallCount+=1;
await proceedFetchingCallDetails();
await sleep(5000);

 } catch (error) {
  console.log(error)
 }

}






async function get_ASCAssigned(res)
{

const dom = new JSDOM(res);
const document = dom.window.document;

const rows = document.querySelectorAll("table tr");
let changedDate = "";

for (const row of rows) {
    const statusCell = row.cells[4];
    if (statusCell && statusCell.textContent.trim() === "Assigned to Service Center") {
        changedDate = row.cells[1].textContent.trim();
        break;
    }
}

if (changedDate) {
  changedDate = changedDate.replace(/\s+/g, '#');
}

return changedDate;

}

async function get_assignTime(res)
{

const dom = new JSDOM(res);
const document = dom.window.document;

const rows = document.querySelectorAll("table tr");
let changedDate = "";

for (const row of rows) {
    const statusCell = row.cells[4];
    if (statusCell && statusCell.textContent.trim() === "Engineer Assigned") {
        changedDate = row.cells[1].textContent.trim();
        break;
    }
}

if (changedDate) {
  changedDate = changedDate.replace(/\s+/g, '#');
}

return changedDate;

}

async function get_ASC1stApp(res)
{

const dom = new JSDOM(res);

const asc1stAppElements = dom.window.document.querySelectorAll("td.ser_ti");
let asc1stAppValue = null;
asc1stAppElements.forEach((element) => {
  if (element.textContent.trim() === "ASC 1st App") {
    asc1stAppValue = element.nextElementSibling.textContent.trim();
  }
});

if (asc1stAppValue) {
  asc1stAppValue = asc1stAppValue.replace(/\s+/g, '#');
}

return asc1stAppValue;
}

async function get_1stVisit(res)
{

const dom = new JSDOM(res);

const asc1stAppElements = dom.window.document.querySelectorAll("td.ser_ti");
let asc1stAppValue = null;
asc1stAppElements.forEach((element) => {
  if (element.textContent.trim() === "1st Visit") {
    asc1stAppValue = element.nextElementSibling.textContent.trim();
  }
});

if (asc1stAppValue) {
  asc1stAppValue = asc1stAppValue.replace(/\s+/g, '#');
}

return asc1stAppValue;
}

async function get_rc(res)
{

const dom = new JSDOM(res);

const asc1stAppElements = dom.window.document.querySelectorAll("td.ser_ti");
let asc1stAppValue = null;
asc1stAppElements.forEach((element) => {
  if (element.textContent.trim() === "Repair Completed") {
    asc1stAppValue = element.nextElementSibling.textContent.trim();
  }
});

if (asc1stAppValue) {
  asc1stAppValue = asc1stAppValue.replace(/\s+/g, '#');
}

return asc1stAppValue;
}



let myData = [];
async function preparedata(){

for ( var data of IHData)
  {
    let callId = data.callId;

    if (data.assignTime =='')
      {
        let assign = false;
        let pda = false;
        let rc = false;

        const obj = {
          callId,
          assign,
          pda,
          rc
        }
        myData.push(obj);
      }
      else
      {
let assign = await isWithinOneHour(data.ASCAssigned, data.assignTime);
let pda = await isWithinOneHour(data.ASC1stApp, data.firstVisit);
let rc = await isRc(data.rc);

    const obj = {
      callId,
      assign,
      pda,
      rc
    }
    myData.push(obj);
  }
  }

  console.log(myData);
  await generateExcel();


}


async function isWithinOneHour(ASCAssigned, assignTime) {
  const parseDateTime = (dateTimeStr) => {
      const [date, time] = dateTimeStr.split('#');
      const [day, month, year] = date.split('.').map(Number);
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const ASCAssignedDate = parseDateTime(ASCAssigned);
  const assignTimeDate = parseDateTime(assignTime);

  const timeDifference = assignTimeDate - ASCAssignedDate;

  return Math.abs(timeDifference) <= 3600000; // 3600000 ms = 1 hour
}

async function isRc(rcTime){
 if (rcTime!="00.00.0000#00:00:00")
  {
return true;
  }else{
    return false;
  }

}


async function generateExcel() {
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('Sheet1');

  
  var assignTrueCount = 0;
  var assignFalseCount = 0;
  var assignPercentage = 0;
  
  var pdaTrueCount = 0;
  var pdaFalseCount = 0;
  var pdaPercentage = 0;
  
  var rcTrueCount = 0;
  var rcFalseCount = 0;
  var rcPercentage = 0;
  
  assignTrueCount = myData.filter(item => item.assign === true).length;
  assignFalseCount = myData.filter(item => item.assign === false).length;
  assignPercentage = ((assignTrueCount / myData.length) * 100).toFixed(2);
  
  console.log(assignTrueCount, assignFalseCount); // Count of objects where assign is true
  console.log(assignPercentage);
  
  pdaTrueCount = myData.filter(item => item.pda === true).length;
  pdaFalseCount = myData.filter(item => item.pda === false).length;
  pdaPercentage = ((pdaTrueCount / myData.length) * 100).toFixed(2);
  
  console.log(pdaTrueCount, pdaFalseCount); // Count of objects where assign is true
  console.log(pdaPercentage);
  
  rcTrueCount = myData.filter(item => item.rc === true).length;
  rcFalseCount = myData.filter(item => item.rc === false).length;
  rcPercentage = ((rcTrueCount / myData.length) * 100).toFixed(2);
  
  console.log(rcTrueCount, rcFalseCount); // Count of objects where assign is true
  console.log(rcPercentage);


  // Add column headers
  sheet.columns = [
    { header: '#', key: 'index', width: 5 },
    { header: 'Today register and appoinment calls(First visit call)', key: 'callId', width: 30 },
    { header: 'Engineer asign within 1 hr', key: 'assign', width: 30 },
    { header: 'Engineer visited (1 hr before & after first apt time)', key: 'pda', width: 30 },
    { header: 'Rc on appt date', key: 'rc', width: 30 }
  ];

  // Add data rows
  myData.forEach((row, index) => {
    sheet.addRow({
      index: index + 1,
      callId: row.callId,
      assign: row.assign ? 'Yes' : 'No',
      pda: row.pda ? 'Yes' : 'No',
      rc: row.rc ? 'Yes' : 'No'
    });
  });

  
// Add totals row
sheet.addRow(['Total YES', '', assignTrueCount, pdaTrueCount, rcTrueCount]);
sheet.mergeCells('A'+(myData.length+2)+':B'+(myData.length+2)); 

sheet.addRow(['Total NO', '', assignFalseCount, pdaFalseCount, rcFalseCount]);
sheet.mergeCells('A'+(myData.length+3)+':B'+(myData.length+3)); 


sheet.addRow(['Service Assuarance Adherence', '', assignPercentage, pdaPercentage, rcPercentage ]);
sheet.mergeCells('A'+(myData.length+4)+':B'+(myData.length+4)); 


// Set cell alignment
sheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
});

  // Save the workbook to a file
  await workbook.xlsx.writeFile('output.xlsx');
  console.log('Excel file generated successfully!');
}


async function generateExcel3() {

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Report');

// Set header row
worksheet.addRow(['#', 'Today register and appoinment calls (First visit call)', 'Engineer asign within 1 hr', 'Engineer visited (1 hr before & after first apt time)', 'Rc on appt date']);

data.forEach(row => {
  worksheet.addRow(row);
});

// Add totals row
worksheet.addRow(['Total YES', '', '21', '', '']);
worksheet.mergeCells('A'+(data.length+2)+':B'+(data.length+2)); 

worksheet.addRow(['Total NO', '', '5', '', '']);
worksheet.mergeCells('A'+(data.length+3)+':B'+(data.length+3)); 


worksheet.addRow(['Service Assuarance Adherence', '80.77%', '57.69%', '34.62%']);
worksheet.mergeCells('A'+(data.length+4)+':B'+(data.length+4)); 

worksheet.addRow(['Target', '85%', '60%', '40%']);
worksheet.mergeCells('A'+(data.length+5)+':B'+(data.length+5)); 

worksheet.addRow(['Variance', '-4.23%', '-2.31%', '-5.38%']);
worksheet.mergeCells('A'+(data.length+6)+':B'+(data.length+6)); 

// Set cell alignment
worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
});

// Set column widths
worksheet.columns.forEach(column => {
  column.width = 10;
});

// Save the workbook
workbook.xlsx.writeFile('report.xlsx')
  .then(() => {
    console.log('Excel file saved!');
  })
  .catch(error => {
    console.error('Error saving file:', error);
  });
  
}



