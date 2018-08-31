alert("Incoming Opportunities to Get Active!")

walk(document.body);

var BLM = true;

function walk(node) 
{
	// I stole this function from Cloud-to-butt who stole it from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
                handleText(node);
			break;
	}
}


function handleText(textNode) 
{
	var v = textNode.nodeValue;

	console.log(v);

	v = v.replace(/#(B|b)lack(L|l)ives(M|m)atter/g, "#BlackLivesMatter (Get Active Now!)");
	v = v.replace(/(B|b)lack(L|l)ives(M|m)atter/g, "BlackLivesMatter (Get Active Now!)");
	v = v.replace(/(B|b)lack (L|l)ives (M|m)atter/g, "Black Lives Matter (Get Active Now!)");
	v = v.replace(/(B|b)(L|l)(M|m)/g, "BLM (Get Active Now!");

	if (BLM != true) {
		if (v.includes("Black Lives Matter") || v.includes("black lives matter") || v.includes("blm") 
			|| v.includes("BLM")  || v.includes("#BlackLivesMatter") || v.includes("#blacklivesmatter")) {
			BLM = true;
			console.log(BLM);
		}
	}
	
	textNode.nodeValue = v;
}
console.log(BLM);
if (BLM == true) {
	chrome.runtime.sendMessage({greeting: true}, function(response) {
	  console.log(response.farewell);
	});
	// chrome.browserAction.setBadgeText({text: "IRL"});
	// chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
} else {
	chrome.runtime.sendMessage({greeting: false}, function(response) {
	  console.log(response.farewell);
	});
}