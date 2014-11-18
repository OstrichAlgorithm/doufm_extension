chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	var v=document.getElementById("media");
	
	if(message=="play"){
		v.play();
	}else if(message=="pause"){
		v.pause();
	}else{
		$("#media").attr("src",message);
		v.reload();
	}
	
	
	
});