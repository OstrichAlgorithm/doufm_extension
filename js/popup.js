var player = {
	domain:"http://doufm.info",
	apiPalyList:"/api/playlist/",
	getPalyLists:function(key){
		$.ajax({
		   type: "GET",
		   url: this.domain+this.apiPalyList+key+"/?num=1",
		   success: function(msg){	   
		   	 console.log("lists");
		   	 console.log(player.domain+msg[0].audio);
		   		chrome.runtime.sendMessage(player.domain+msg[0].audio, function(response){
    				//document.write(response);
				});
		   }
		});
	},
	
	init:function(){
		$.ajax({
		   type: "GET",
		   url: this.domain+this.apiPalyList,
		   success: function(msg){	   		
				 for (var i = 0; i < msg.length; i++) {
					$("select").append("<option value='"+msg[i].key+"'>"+msg[i].name+"</option>");
				}
		   }
		});
		
		$("select").change(function(){
			   var key =$("select").val();	
			  console.log(key);
			  player.getPalyLists(key);
			
		});
		
		$("#con").on("click",function(){
			var f=$(this).attr("value");
			var msg="";			
			if (f==1) {
				msg="play";
				$(this).attr("value","2");
			}else{
				msg="pause";
				$(this).attr("value","1");
			}
			chrome.runtime.sendMessage(msg, function(response){
 		
				});
		});
		
		
		
		$("#next").on("click",function(){
			var key =$("select").val();	
			  console.log(key);
			  player.getPalyLists(key);
		});
		
		
		
	}
}


player.init();