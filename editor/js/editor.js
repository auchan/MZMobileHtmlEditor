
function setEditorContent(content) {
    $("#input").SetEditorContent(content);
}

function upload(input) {
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function() {
            setEditorContent(this.result);
        }
        reader.readAsText(file);
    }
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined') {
        //var stream = new ActiveXObject('ADOB.Stream');
        var fso = new ActiveXObject('Scripting.FileSystemObject');
        function readFile(path, fso) {
            var f1 = fso.GetFile(path);
            var fh = fso.OpenTextFile(f1, 1/*reading*/)
            var content = "";
            while (!fh.AtEndOfStream) {
                content += fh.ReadLine();
            }
            fh.close();
            return content;
        }
        var content = readFile(input.value, fso);
        setEditorContent(content)
    }
    else {
        alert("Can not get file content!");
    }
}

       //复制到剪切板js代码
function copyToClipBoard(s) {
    //alert(s);
    if (window.clipboardData) {
        window.clipboardData.setData("Text", s);
        alert("已经复制到剪切板！"+ "\n" + s);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = s;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = s;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("已经复制到剪切板！" + "\n" + s);
	}
	else {
		alert("浏览器不支持！点击编辑器工具栏最右边的“√”按钮，然后手动进行复制");
	}
}

$("#BtnSave").bind("click", function (e) {
	if (typeof Blob != "undefined") {
		var content = $("#input").GetEditorContent();
		var blob = new Blob([content], {type: "text/html;charset=utf-8"});
		saveAs(blob, "");
	}
	else{
		alert("你的浏览器不支持该操作!");
	}
})
$("#BtnFile").bind("click", function (e) {
	this.value = "";
})
$("#BtnCopy").bind("click", function (e) {
	var content = $("#input").GetEditorContent();
	copyToClipBoard(content);
})