"use strict"
window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage==="undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();  
        saveLocalStorage();
        selectTable();
        delLocalStorage();
        allClearLocalStorage();
    }

},false
);
function saveLocalStorage(){
    const save = document.getElementById('save');
    save.addEventListener('click',
        function(e){
            e.preventDefault();
            const key = document.getElementById('textKey').value;
            const value = document.getElementById('textMemo').value;

            if(key==""||value==""){
                window.alert("Key, Memoはいずれも必須です。")
                return;
            }else{
                let w_confirm = window.confirm("LocalStorageに\n「"+key+" "+value +"」\nを保存しますか？");
                if(w_confirm=== true){
                    localStorage.setItem(key,value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key+" "+value+"保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value= "";
                    document.getElementById("textMemo").value="";
                }
            }
        },false
    );
};
function delLocalStorage(){
    const del = document.getElementById('del');
    del.addEventListener('click',
        function(e){
            e.preventDefault();
            let w_sel ="0";
            w_sel = selectCheckBox();
            if(w_sel==="1"){
                const key = document.getElementById('textKey').value;
                const value = document.getElementById('textMemo').value;
                let w_confirm = window.confirm("LocalStorageから\n「"+key+" "+value +"」\nを削除しますか？");
                if(w_confirm=== true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageから" + key+" "+value+"削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value= "";
                    document.getElementById("textMemo").value="";
                }
            }
        },false
    );
};
function allClearLocalStorage(){
    const allClear = document.getElementById('allClear');
    allClear.addEventListener('click',
        function(e){
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageのデータをすべて削除します。\nよろしいですか？");
            if(w_confirm=== true){
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value= "";
                document.getElementById("textMemo").value="";
            }
        },false
    );
};
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault;
        selectCheckBox();
    },false
    );
};
function selectCheckBox(){
    let W_sel ="0";
    let W_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let W_textKey = "";
    let W_textMemo = "";
   for(let i=0;i<chkbox1.length;i++){
       if(chkbox1[i].checked){
        if(W_cnt===0){
           W_textKey=table1.rows[i+1].cells[1].firstChild.data;
           W_textMemo=table1.rows[i+1].cells[2].firstChild.data;
        }
        W_cnt++;
       }
   }
   document.getElementById("textKey").value=  W_textKey;
   document.getElementById("textMemo").value=W_textMemo;
   if(W_cnt===1){
    return W_cnt="1";
   }else
   window.alert("一つ選択(select)してください。");
};

function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0])list.deleteRow(0);

    for(let i=0;i<localStorage.length;i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");
}