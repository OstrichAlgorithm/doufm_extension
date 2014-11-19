var v=document.getElementById("media");
var count = 0;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	if(message=="play"){
		v.play();
	}else if(message=="pause"){
		v.pause();
	}else if(message=="clear"){
		$("#media").html("");
		sendResponse("clear list ok");	
	}else if(message=="download"){
		var s =document.getElementsByTagName("source");
		
		var src =s[count-1].src;
		var title =s[count-1].dataset.title;
		var artist =s[count-1].dataset.artist;
		
		
		chrome.downloads.download({
		    url: src,
		    filename: title+"-"+artist+".mp3",
		    saveAs:true,
			},
			function(){
				
				
			});
		sendResponse("download "+ title+"-"+artist+".mp3");	
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
							node.dataset.title=message[i].title;
							node.dataset.artist =message[i].artist;
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

