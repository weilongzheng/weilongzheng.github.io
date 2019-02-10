function deletesection(obj) {
	obj = obj.parentNode.parentNode.parentNode;
	obj.parentNode.removeChild(obj);
}

function addsection() {
	var obj = document.getElementById("majorDiv");
	var block = "<div class=\"templatemo_section_5\"><h2><img src=\"index_files/bird.jpg\" " +
			"onclick=\"addone(this.parentNode.parentNode.getElementsByTagName('ul')[0]);\" />&nbsp; <span " +
			"onclick=\"modify(this);\">xxxx</span></h2>" + 
			"<ul><li onclick=\"modify(this);\">xx</li></ul><br /></div>";
	obj.innerHTML += block;
}

function removelastsection() {
	var obj = document.getElementById("majorDiv");
	var divs = obj.getElementsByTagName("div");
	if (divs.length > 0) {
		obj.removeChild(divs[divs.length-1]);
	}
}

function removebuttons() {
	var obj = document.getElementById("toolbox");
	obj.innerHTML = "";
}

function sectionbutton() {
	var obj = document.getElementById("toolbox");
	var buttons = "<input type=\"button\" value=\"add new section\" onclick=\"addsection();\" />" +
		"<input type=\"button\" value=\"remove last section\" onclick=\"removelastsection();\" />" +
		"<input type=\"button\" value=\"remove all buttons\" onclick=\"removebuttons();\" />";
	obj.innerHTML += buttons;
}

function modifyTitle() {
	document.title = document.getElementById("name").innerHTML;
}

function turnA(obj) {
	var father = obj.parentNode;
	var val = obj.value;
	father.innerHTML = "<a class=\"grey\" href=\"./pdf/"+ val + "\">[pdf]</a>";
}

function addpubone(obj) {
	var oldtext = obj.innerHTML;
	obj.innerHTML ="<li><span onclick=\"pubmodify(this);\">xx</span>" +
			"<span>[<input type=\"file\" onchange=\"turnA(this);\"/>]</span>" +
			"</li>" + oldtext;
}

function addone(obj) {
	var oldtext = obj.innerHTML;
	obj.innerHTML ="<li onclick=\"modify(this);\">xx</li>" + oldtext;
}

function modify(obj) {
	changeContent(obj,10000,'','',false,true);
	modifyTime();
}

function changeContent(obj, strNum, oEvent, oWidth, oneLine, blurSave) {
	if (obj.getElementsByTagName("input").length > 0)
		return;
	function isChinese(s) {
		var p = /^[\u0391-\uFFE5]+$/;
		return p.test(s);
	}

	if (oneLine) {
		obj.innerHTML = "<input type='text' style='width:220px;' value='"
				+ obj.innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")
				+ "' />";
	} else {
		obj.innerHTML = "<textarea style='width:500px;height:250px;'>"
				+ obj.innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")
				+ " </textarea>";
	}

	var text;
	if (oneLine) {
		text = obj.getElementsByTagName("input")[0];
	} else {
		text = obj.getElementsByTagName("textarea")[0];
	}
	if (typeof oWidth == "number") {
		text.style.width = oWidth + "px";
	}
	text.select();
	text.onclick = function(oevent) {
		if (document.all)
			window.event.cancelBubble = true;
		else
			oevent.stopPropagation();
	};

	text.onblur = function() {
		if (text.value.replace(/^\s*/, "").replace(/\s*$/, "") == "") {
			obj.parentNode.removeChild(obj);
		} else {
			obj.innerHTML = text.value;
//			obj.innerHTML = obj.innerHTML.replace(/</ig, "&lt;");
//			obj.innerHTML = obj.innerHTML.replace(/>/ig, "&gt;");
			if (strNum) {
				for ( var i = 0; i < strNum; i++) {
					if (isChinese(obj.innerHTML.charAt(i)))
						strNum--;
				}
				obj.innerHTML = obj.innerHTML.substring(0, strNum);
			}
			obj.style.background = "transparent";
		}
	};
}

function pubmodify(obj) {
	pubchangeContent(obj,10000,'','',false,true);
	modifyTime();
}

function pubchangeContent(obj, strNum, oEvent, oWidth, oneLine, blurSave) {
	if (obj.getElementsByTagName("input").length > 0)
		return;
	function isChinese(s) {
		var p = /^[\u0391-\uFFE5]+$/;
		return p.test(s);
	}

	if (oneLine) {
		obj.innerHTML = "<input type='text' style='width:220px;' value='"
				+ obj.innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")
				+ "' />";
	} else {
		obj.innerHTML = "<textarea style='width:500px;height:250px;'>"
				+ obj.innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")
				+ " </textarea>";
	}

	var text;
	if (oneLine) {
		text = obj.getElementsByTagName("input")[0];
	} else {
		text = obj.getElementsByTagName("textarea")[0];
	}
	if (typeof oWidth == "number") {
		text.style.width = oWidth + "px";
	}
	text.select();
	text.onclick = function(oevent) {
		if (document.all)
			window.event.cancelBubble = true;
		else
			oevent.stopPropagation();
	};

	text.onblur = function() {
		if (text.value.replace(/^\s*/, "").replace(/\s*$/, "") == "") {
			obj.parentNode.parentNode.removeChild(obj.parentNode);
		} else {
			obj.innerHTML = text.value;
//			obj.innerHTML = obj.innerHTML.replace(/</ig, "&lt;");
//			obj.innerHTML = obj.innerHTML.replace(/>/ig, "&gt;");
			if (strNum) {
				for ( var i = 0; i < strNum; i++) {
					if (isChinese(obj.innerHTML.charAt(i)))
						strNum--;
				}
				obj.innerHTML = obj.innerHTML.substring(0, strNum);
			}
			obj.style.background = "transparent";
		}
	};
}

function modifyTime() {
	var date = document.getElementById("date");
	date.innerHTML = new Date().toDateString();
}