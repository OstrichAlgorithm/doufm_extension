var player = {
	domain:"http://doufm.info",
	apiPalyList:"/api/playlist/",
	listSize:"/?num=10",
	getPalyLists:function(key){
		$.ajax({
		   type: "GET",
		   url: this.domain+this.apiPalyList+key+this.listSize,
		   success: function(msg){
		   	 console.log("lists");
		   		chrome.runtime.sendMessage(msg, function(response){
    				//document.write(response);
    				 console.log(response);
				});
		   }
		});
	},
	
	clearPlayList:function(){
		var msg = "clear";
		chrome.runtime.sendMessage(msg, function(response){
    				//document.write(response);
    				 console.log(response);
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
			  player.clearPlayList();
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
		
		
		$("#download").on("click",function(){
			var msg ="download";
			chrome.runtime.sendMessage(msg, function(response){
    				//document.write(response);
    				 console.log(response);
				});	
		});	
		
	}
}
player.init();