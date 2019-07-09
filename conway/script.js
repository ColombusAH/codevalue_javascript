const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width_input = document.querySelector("#width_input");
const height_input = document.querySelector("#height_input");
const start_button = document.querySelector("#start_button");
const random_check = document.querySelector("#random");
let global_interval_id = -1;
//constants
const cell_radius = 5;
const diamter = 2 * cell_radius;
const width = 1000;
const height = 600;
const number_cells_inline = width / diamter; // must be integer (without .)
const number_of_lines = height / diamter;
const cells_data_matrix = [];
let random_option = false;
// set dimension
canvas.width = width;
canvas.height = height;

// adding click event to canvas to handle a 'make alive a cell'.
canvas.addEventListener("click", event => {
  const canvas_frame = canvas.getBoundingClientRect();
  const mouse_position = {
    x: event.clientX - canvas_frame.left,
    y: event.clientY - canvas_frame.top
  };
  const index = getIndexOfCell(mouse_position);
  cells_data_matrix[index.i][index.j].alive = true;
  drawCell(cells_data_matrix[index.i][index.j]);
});

window.onload = init();

// event listener to start the game.
start_button.addEventListener("click", () => {
  global_interval_id = startGame();
});

//listen to width change.
width_input.onchange = event => {
  canvas.width = width_input.value;
  init();
};

//listen to height change.
height_input.onchange = event => {
  canvas.height = height_input.value;
  init();
};

random_check.onchange = () => {
  const is_checked = random_check.checked;
  random_option = is_checked;
  if (global_interval_id !== -1) {
    clearInterval(global_interval_id);
  }
  init();
};

/*
    desc: recieve a cell information and draw a cell 
    params: cell that include coordinate {x,y} and alive boolean flag
*/
function drawCell(cell) {
  let color = Math.floor(Math.random() * 16777216).toString(16);
  color = "#000000".slice(0, -color.length) + color;
  ctx.beginPath();
  ctx.arc(cell.x, cell.y, cell_radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

// function that draw all the cell.
const drawAllCell = () => {
  for (let i = 0; i < cells_data_matrix.length; i++) {
    for (let j = 0; j < cells_data_matrix[i].length; j++) {
      const cell = cells_data_matrix[i][j];
      cells_data_matrix[i][j].alive = getVitalityOfCell(cell, i, j);
      if (cell.alive) {
        drawCell(cell);
      }
    }
  }
};

/*
    function that recive the mouse position after the user click and return the index of the cell in the global cell_data_matrix.
    params: mouse position on the screen.
*/
const getIndexOfCell = mouse_position => {
  const position =
    Math.floor(mouse_position.x / diamter) +
    Math.floor(mouse_position.y / diamter) * number_cells_inline;

  return {
    i: Math.floor(position / number_cells_inline),
    j: Math.floor(position % number_cells_inline)
  };
};

/*
    function that return how much alive neighbors a certain cell have.
    params : i,j : indexes of the cell in the global cell_data_matrix
*/
const getNumberOfAliveNeighbors = (i, j) => {
  let neighbors_indexes = [];
  let number_of_alive_cells = 0;
  neighbors_indexes.push({
    i: i - 1,
    j: j - 1
  });

  neighbors_indexes.push({
    i: i - 1,
    j: j
  });

  neighbors_indexes.push({
    i: i - 1,
    j: j + 1
  });

  neighbors_indexes.push({
    i: i,
    j: j + 1
  });

  neighbors_indexes.push({
    i: i + 1,
    j: j + 1
  });

  neighbors_indexes.push({
    i: i + 1,
    j: j
  });

  neighbors_indexes.push({
    i: i + 1,
    j: j - 1
  });

  neighbors_indexes.push({
    i: i,
    j: j - 1
  });

  neighbors_indexes = neighbors_indexes.filter(
    index =>
      index.i > -1 &&
      index.j > -1 &&
      index.i < number_of_lines &&
      index.j < number_cells_inline
  );

  for (let index = 0; index < neighbors_indexes.length; index++) {
    const cell_position = neighbors_indexes[index];
    const cell = cells_data_matrix[cell_position.i][cell_position.j];
    if (cell.alive === true) {
      number_of_alive_cells++;
    }
  }
  return number_of_alive_cells;
};

/*
    function that return if a cell need to be alive or not respecting the rules of Game Of Life. 
    params: cell: the cell to check
            i, j: the position of the cell in the globl cell_data_matrix 
*/
const getVitalityOfCell = (cell, i, j) => {
  const num_of_neighbors = getNumberOfAliveNeighbors(i, j);
  let is_alive = cell.alive;
  if (is_alive === true && (num_of_neighbors < 2 || num_of_neighbors > 3)) {
    return false;
  }
  if (is_alive === false && num_of_neighbors === 3) {
    return true;
  }
  return is_alive;
};

//initialize data for canvas.
function init() {
  let y;
  let x;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (y = cell_radius; y < canvas.height; y += diamter) {
    const cell_array = [];
    for (x = cell_radius; x < canvas.width; x += diamter) {
      const cell_info = {
        x: x,
        y: y,
        alive: false
      };
      cell_array.push(cell_info);
      //drawCell(cell_info);
    }
    cells_data_matrix.push(cell_array);
  }
  if (random_option === true) {
    let random_number =
      Math.floor(Math.random() * (number_cells_inline * number_of_lines)) / 7;
    for (x = 0; x < random_number; x++) {
      const i = Math.floor(Math.random() * number_of_lines);
      const j = Math.floor(Math.random() * number_cells_inline);
      cells_data_matrix[i][j].alive = true;
      drawCell(cells_data_matrix[i][j]);
    }
  }
}

// function that start the game.
function startGame() {
  const fill_interval_id = window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllCell();
  }, 70);
  return fill_interval_id;
}
