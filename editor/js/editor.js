
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

//复制到剪切板功能
{
    var clipboard = new Clipboard("#BtnCopy", {
        text: function() {
            return $("#input").GetEditorContent();
        }
    });

    clipboard.on('success', function(e) {
        alert("已经复制到剪切板！"+ "\n" + e.text);
    });

    clipboard.on('error', function(e) {
        alert("浏览器不支持！点击编辑器工具栏最右边的“√”按钮，然后手动进行复制");
    });
}