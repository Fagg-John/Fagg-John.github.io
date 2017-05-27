var movies = [];
retrieveItem();

function retrieveItem()
{
  if (localStorage.moviesList)
  {
    items = JSON.parse(localStorage.getItem('moviesList'));
    AddRows(items);
  }
}//retrieveItem

function AddRows(items)
{
  for (var i in items)
    {
      var item = items[i];
      var table = document.getElementById("data_table");
      var table_len = (table.rows.length) - 1;
      var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='movieTitle_row" + table_len + "'>" + item.Product + "</td><td id='genre_row" + table_len + "'>" + item.Genre + "</td><td id='submittedBy_row" + table_len + "'>" + item.Submitted + "</td><td><input type='button' value='Delete' class='smallbutton' onclick='delete_row(" + table_len + ")'></td></tr>";
    }
} //AddRows

function delete_row(no)
{
  document.getElementById("row" + no + "").outerHTML = "";
}//delete row

function add_row()
{
  var new_movieTitle = document.getElementById("new_movieTitle").value;
  var new_genre = document.getElementById("new_genre").value;
  var new_submittedBy = document.getElementById("new_submittedBy").value;

  if (validate())
  {
    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='movieTitle_row" + table_len + "'>" + new_movieTitle + "</td><td id='genre_row" + table_len + "'>" + new_genre + "</td><td id='submittedBy_row" + table_len + "'>" + new_submittedBy + "</td><td><input type='button' value='Delete' class='smallbutton' onclick='delete_row(" + table_len + ")'></td></tr>";

    document.getElementById("new_movieTitle").value = "";
    document.getElementById("new_genre").value = "";
    document.getElementById("new_submittedBy").value = "";

    var item = { Product: new_movieTitle, Genre: new_genre, Submitted: new_submittedBy };
    if (localStorage.moviesList && movies.length == 0)
    {
      items = JSON.parse(localStorage.getItem('moviesList'));
      for (var i in items)
      {
        var item1 = items[i];
        var itemnew = { Product: item1.Product, Genre: item1.Genre, Submitted: item1.Submitted };
        movies.push(itemnew);
      }
    }

    movies.push(item);
    saveMoviewList();

    console.log(movies);
  }
}//Save Movies List to Local Storage

function saveMoviewList()
{
  localStorage.moviesList = JSON.stringify(movies);
}//saveMovieList

function ClearLocalStorage()
{
  localStorage.removeItem("moviesList");
} //ClearLocalStorage

function validate()
{
  var txts = document.querySelectorAll("input[type='text']");
  var is_error = 0;
  for (var i = 0; i < txts.length; i++)
  {
    if (!txts[i].value)
    {
      txts[i].parentNode.classList.add('invalid');
      is_error = 1;
    }
    else
    {
      txts[i].parentNode.classList.remove('invalid');
    }
  }

  if (is_error == 1)
  return false;
  else
  return true;
}//validate

function GetViaAJAX()
{
  if (window.XMLHttpRequest)
  {
    HR = new XMLHttpRequest();
    HR.onreadystatechange = GotData;
    HR.open("GET", "movieslist.JSON");
    HR.send();
  }
} //GetViaAJAX

function GotData(data)
{
  if (HR.readyState === XMLHttpRequest.DONE)
  {
    var items = JSON.parse(data.target.response)
    AddRows(items);
  }
} //GotData
