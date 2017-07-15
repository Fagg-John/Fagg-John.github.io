var score = [];
function createLocalStorageKey(name)
{
	//localStorage.setItem('player_name',name);
	localStorage.setItem('player_name','fortune_'+name);
}

function saveName(name)
{
	if(name=='')
	{
		alert("Name can't be blank");
		return 0;
	}
	var div_name = document.getElementById('div-name');
	var div_show_name = document.getElementById('div-show-name');
	div_name.style.display = 'none';
	div_show_name.style.display = 'block';
	document.getElementById("pname").value = name;
	document.getElementById("showname").innerHTML = name;
	createLocalStorageKey(name);
}
