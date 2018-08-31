console.log("I am out herrrrreeeee");

var BLM = true;


const getDomain = url => {
  const a = document.createElement('a');
  a.href = url;

  if (typeof(a.hostname) === 'string') {
    return a.hostname.toLowerCase().replace(/^www\./, '');
  }

  return '';
}

const renderNoActivity = (sourceUrl) => {
  return `
    <h2>No Topics on This Page</h2>
    <div class='no-data'>
      Get active IRL by finding a page with a subject!
    </div>
  `;
}

const renderBLM = (sourceUrl) => {
  return `
    <h2>Black Lives Matter</h2>
    <div class="info">
      <img src="BLM.png" alt="BLM" width="30"> 
      Black Lives Matter <a href="https://blacklivesmatter.com/">(BLM)</a> is an international activist movement, 
      originating in the African-American community, that campaigns against 
      violence and systemic racism towards black people. 
      In 2013, the movement began with the use of the hashtag #BlackLivesMatter
      IRL on social media after the acquittal of George Zimmerman in the shooting 
      death of African-American teen Trayvon Martin the preceding February.
    </div>
    <div class="senators">
      <strong> Contact Your Senators in New York! </strong>
      <br/>
      <a href="www.gillibrand.senate.gov/contact/email-me">Kirsten E. Gillibrand </a>- (D - NY)
      <br/>
      (202) 224-4451
      <br/>
      <a href="www.schumer.senate.gov/contact/email-chuck">Charles E. Schumer </a> - (D - NY)
      <br/>
      (202) 224-6542
    </div>
  `;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    var html;
    if (request.greeting == true) {
      BLM =true;
      sendResponse({farewell: "Black and Proud"});
    } else {
      sendResponse({farewell: "All white..."});
    }
  });

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0].url;


      if (!BLM) {
        html = renderNoActivity("hello");
      } else if (BLM) {
        html = renderBLM("hello");
      }

      document.getElementById('mainPopup').innerHTML = html;

});

