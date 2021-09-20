
  var step = 1
  var instructions = document.getElementById("instructions")
  //~~~~~~~~~~solve maze~~~~~~~~~~~~~~~~~~~~~~~
  const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
  function pathFinder(maze){
    var start = [document.getElementById("start-cell").parentNode.rowIndex,document.getElementById("start-cell").cellIndex]
    var end = [document.getElementById("end-cell").parentNode.rowIndex,document.getElementById("end-cell").cellIndex]
    maze[start[0]][start[1]] = 0;
    var mazeLength = maze.length;
    checkIt(maze,mazeLength,end);
    if(maze[end[0]][end[1]] == "."){
        instructions.innerHTML = "this maze is unsolveable";
    }
    else{
      paintpath(maze,mazeLength,end[0],end[1])
      instructions.innerHTML = "this maze was solved in " + maze[end[0]][end[1]] + " moves";

return
    }
  }
  function paintpath(maze,length,i,j){
    document.getElementById('init-table').rows[i].cells[j].classList.add("maze-path");
    var nextValue = maze[i][j]-1;
    if(i+1<length){
      if(maze[i+1][j] == nextValue){
        document.getElementById('init-table').rows[i+1].cells[j].classList.add("maze-path");
        paintpath(maze,length,i+1,j)
        return
      }
    }
    if(i>0){
      if(maze[i-1][j] == nextValue){
        document.getElementById('init-table').rows[i-1].cells[j].classList.add("maze-path");
        paintpath(maze,length,i-1,j)
        return
      }
    }  
    if(j+1<length){
      if(maze[i][j+1] == nextValue){
        document.getElementById('init-table').rows[i].cells[j+1].classList.add("maze-path");
        paintpath(maze,length,i,j+1)
        return
      }
    }
    if(j>0){
      if(maze[i][j-1] == nextValue){
        document.getElementById('init-table').rows[i].cells[j-1].classList.add("maze-path");
        paintpath(maze,length,i,j-1)
        return
      }
    }
  }
  function checkIt(checkItMaze,length,end){
    var keepwhile=true;
        var valuecurrent = 0
  
    while(checkItMaze[end[0]][end[1]]=="." && keepwhile){
  
      var indexes = [];
      for (let i = 0; i < length; i++) {
        indexOfAll(checkItMaze[i],valuecurrent).forEach(element => {
          indexes.push([i,element]);
        });
      }
  if(indexes.length == 0){
    keepwhile = false
    break
  }
  indexes.forEach(index => {
  if(index[0]+1<length){
        var nextvalue1 = checkItMaze[index[0]+1][index[1]]
        if(nextvalue1=="." || nextvalue1>valuecurrent+1){
          checkItMaze[index[0]+1][index[1]] = valuecurrent +1
          // document.getElementById('init-table').rows[index[0]+1].cells[index[1]].innerText = valuecurrent +1;
      }}
        if(index[1]+1<length){
          var nextvalue2 = checkItMaze[index[0]][index[1]+1]
          if(nextvalue2=="." || nextvalue2>valuecurrent+1){
            checkItMaze[index[0]][index[1]+1] = valuecurrent +1
            // document.getElementById('init-table').rows[index[0]].cells[index[1]+1].innerText = valuecurrent +1;
      }   } 
      if(index[0]>0){
        var nextvalue3 = checkItMaze[index[0]-1][index[1]]
        if(nextvalue3=="." || nextvalue3>valuecurrent+1){
          checkItMaze[index[0]-1][index[1]] = valuecurrent +1
          // document.getElementById('init-table').rows[index[0]-1].cells[index[1]].innerText = valuecurrent +1;
      }}
        if(index[1]>0){
          var nextvalue4 = checkItMaze[index[0]][index[1]-1]
          if(nextvalue4=="." || nextvalue4>valuecurrent+1){
            checkItMaze[index[0]][index[1]-1] = valuecurrent +1
            // document.getElementById('init-table').rows[index[0]].cells[index[1]-1].innerText = valuecurrent +1;
      }}
  })
  valuecurrent++
  
  
    }
  }

 
  //~~~~~~~~~~create maze~~~~~~~~~~~~~~~~~~~~~~~
  function makeCellsClickable(){
  var cells = document.querySelectorAll("td");
  for (var cell of cells) {
    // cell.addEventListener('touchmove', cellhovered)
    cell.addEventListener('click', cellClick)
  }
  }

//   function cellhovered(){
//     if(step>2){
//     resetResults()
//     paintCell(this)
//     }
//   }

  function cellClick(){
    if(step==1){
      setStart(this)
      instructions.innerHTML = "set ending point";
    }
    if(step==2){
      setEnd(this)
      instructions.innerHTML = "set walls"

    }
    if(step>2){
    resetResults()
    paintCell(this)
    }
    step++
  }
  function setStart(cell){
  cell.innerText = "start"
  cell.id = "start-cell"
}
function setEnd(cell){
  cell.innerText = "end"
  cell.id = "end-cell"

}
  function paintCell(cell){
    cell.classList.toggle("maze-border");
  }
  function resetResults(){
    var table = document.getElementById("init-table");
    var rows = table.rows;
    var cells;
    for (var i=0; i<rows.length; i++) {
    cells = rows[i].cells;
    for (var j=0; j<cells.length; j++) {
      if(cells[j].classList.contains("maze-border") == false && cells[j].id!="start-cell" && cells[j].id!="end-cell"){
        cells[j].removeAttribute("class");
        cells[j].innerText=""

    }
  }
}
  }
  window.onload = (event) => {
  makeCellsClickable()
  }
  function convertTableToArr(){
    var result=[];
    var table = document.getElementById("init-table");
    var rows = table.rows;
    var cells, t;
    for (var i=0; i<rows.length; i++) {
    cells = rows[i].cells;
    t = [];
    for (var j=0; j<cells.length; j++) {
      if(cells[j].classList.contains("maze-border")){
      t.push("W");
      }
      else{
        t.push(".")
      }
    }
    result.push(t);
  }
  pathFinder(result) 
}

  