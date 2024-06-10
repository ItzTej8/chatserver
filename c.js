

var engData = [];
async function c ()
{

    const req = await fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
        "headers": {
          "accept": "text/javascript, text/html, application/xml, text/xml, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-prototype-version": "1.7.2",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "WMONID=V68A7zXvK4n; visid_incap_2651221=SZt5skd1SIy+gYroiVUG4p7A6WUAAAAAQUIPAAAAAAAJ31JCh/zEsdvYJ+2K1ZXE; ASOBGSPNSESSIONID=YRQA2NmCO8KgAFSbCbp3D3ztO-RcTVl9ZAEyPsMp7xgY8-fsh76B!-1219551079!818921347; dtPC=-",
          "Referer": "https://biz2.samsungcsportal.com/svctracking/common/ENGMasterList.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "cmd=ENGMasterListCmd&numPerPage=100&currPage=0&ascCode=&ASC_CODE=0002355819&ENGINEER=&FIRST_NAME=&LAST_NAME=&WORK_STATUS=W",
        "method": "POST"
      });

const res = await req.json();
console.log(res)



    }

    c();





    fetch("https://biz2.samsungcsportal.com/gspn/operate.do", {
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
          "cookie": "WMONID=V68A7zXvK4n; visid_incap_2651221=SZt5skd1SIy+gYroiVUG4p7A6WUAAAAAQUIPAAAAAAAJ31JCh/zEsdvYJ+2K1ZXE; ASOBGSPNSESSIONID=YRQA2NmCO8KgAFSbCbp3D3ztO-RcTVl9ZAEyPsMp7xgY8-fsh76B!-1219551079!818921347; dtPC=-",
          "Referer": "https://biz2.samsungcsportal.com/svctracking/common/ENGMasterList.jsp?search_status=&searchContent=&menuBlock=&menuUrl=&naviDirValue=",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "cmd=ENGMasterDetailCmd&numPerPage=100&currPage=0&ascCode=0002355819&ASC_CODE=0002355819&ENGINEER=8486179852&FIRST_NAME=&LAST_NAME=&WORK_STATUS=",
        "method": "POST"
      });