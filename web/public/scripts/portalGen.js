function drawPortal(results,portalID){
    alert('drwaportal');
   // var x = result.rows[0].cat_name;

    var i, j, x = "";
    for (i in results.rows){
        x +="<ul class='cat'> <li><h3 id=" + results.rows[i].category_id + " > " + results.rows[i].cat_name + "</h3><div class='editTools'><button name='colDelete' type='submit' value=" + results.rows[i].category_id +">Delete</button><button onClick='catUpdateModeOn(" + results.rows[i].category_id +")'>Edit</button></div></li>";
        for(j in results){
            //x += "<li> <a href=" + links.rows[j].link_url + " target='_blank'>" + links.rows[j].link_name + "</a></h3><div class='editTools'><form action='webportal.php' method='post'><button name='linkDelete' type='submit' value="+ links.rows[j].link_id +">Delete</button></form> <button onClick='linkUpdateModeOn("+ links.rows[j].link_id +")'>Edit</button></div></li>";
        }
        x += "<li><div class='editTools' ><img class='editTools' src='images/add.png' alt='+' onClick='openLinkEditWin("+ results.rows[i].category_id +");'>Click Here To Add a Link</div></li></ul>";
    }



    document.getElementById("content").innerHTML = x;

}