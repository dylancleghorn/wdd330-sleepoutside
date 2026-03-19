const todo = document.getElementById("todo-output");

async function getTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/77",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    todo.textContent = json.title;
    console.log(json);
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  }
}

todo.textContent = "Loading...";
getTodo();

const todo2 = document.getElementById("todo-output2");
async function getTodo2() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    // const userNames = json.map((user) => user.name).join(",");
    const userNames = json.map((user) => user.name);
    listHolder = document.createElement("ul");
    userNames.forEach((name) => {
      const listItem = document.createElement("li");
      listItem.textContent = name;
      listHolder.appendChild(listItem);
    });
    // todo2.textContent = listHolder.textContent;
    todo2.textContent = "";
    todo2.appendChild(listHolder);
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  }
}
getTodo2();
