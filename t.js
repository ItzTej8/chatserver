import { JSDOM } from 'jsdom';



var cookie = "WMONID=M_oaIxU__Bt; dtPC=-; ASOBGSPNSESSIONID=9C7-sftUaDUM9xQj_pWmUvyNkJMvLSNXAyIwIcT1VIXa8GShfon-!-348183271!-1219551079";
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

  console.log(myData)


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
