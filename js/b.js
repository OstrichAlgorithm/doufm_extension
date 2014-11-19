var v=document.getElementById("media");
var count = 0;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	if(message=="play"){
		v.play();
	}else if(message=="pause"){
		v.pause();
	}else{
		var domain="http://doufm.info";
		var s =document.getElementsByTagName("source");
		var len =s.length;
		sendResponse(len);	
		if (count>9||len==0){
			$("#media").html("");
			v.src="";
			count=0;
			 for (var i = 0; i < message.length; i++) {
						//$("#media").append("<source src='"+domain+message[i].audio+"' type='audio/mp3'>");
							var node = document.createElement("source");	
							node.src = domain+message[i].audio;
							node.type = "audio/mp3";	
							v.appendChild(node);
			 }
		}
		 play();
		//sendResponse($("#media").html());	
	}
});

function play(){
		var s =document.getElementsByTagName("source");
		var len =s.length;
		v.src = s[count%len].src;
		console.log("paly"+count%len);
		count++;
		v.load();		
		console.log("count"+count);		
}
v.addEventListener("ended",function(){
	play();
	
});

