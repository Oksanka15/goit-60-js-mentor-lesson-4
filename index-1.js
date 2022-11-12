const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
]

localStorage.setItem('books',JSON.stringify(books));
const rootEl = document.querySelector("#root");
const div1 = document.createElement("div");
div1.classList = "left";
const div2 = document.createElement("div");
div2.classList = "right";

rootEl.append(div1, div2);

const title = document.createElement("h1");
title.textContent = "My library";

const list = document.createElement("ul");
list.classList = "list";

const btn = document.createElement("button");
btn.textContent = "Add";
btn.classList = "button button-add";

div1.append(title, list, btn);

const renderList = () => {
  const books = JSON.parse(localStorage.getItem('books'));
  console.log(books);
  const renderElements = books
    .map(
      ({ title, id }) =>
        `
    <li id=${id} class='item' >
    <p class='item__title'>${title}</p> 
    <button class="button button-edit">Edit</button>
    <button class="button button-delete">Delete</button>
    `
    )
    .join("");
  // console.log(renderElements);
  list.innerHTML = renderElements;
  const itemTitle = document.querySelectorAll(".item__title");
  // console.log(itemTitle);
  itemTitle.forEach((item) => item.addEventListener("click", renderPreview));
  const btnEdit = document.querySelectorAll(".button-edit");
  const btnDelete = document.querySelectorAll(".button-delete");
  btnEdit.forEach((item) => item.addEventListener("click", editBook));
  btnDelete.forEach((item) => item.addEventListener("click", deleteBook));
};

const renderPreview = (e) => {
  // console.dir(e.target.parentElement.id);
  const books = JSON.parse(localStorage.getItem('books'));
  const objClick = books.find((el) => el.id === e.target.parentElement.id);
  console.log(objClick);
  div2.innerHTML = createPrevievMarkup(objClick);
};

const addBook = () => {
  const newObj = { id: `${Date.now()}`, title: "", author: "", img: "", plot: "" };
  div2.innerHTML = createFormMarkup(newObj);
  createNewBook(newObj);
  const newForm = document.querySelector('form');
  newForm.addEventListener('submit', onSubmit)
function onSubmit(event){
  event.preventDefault();
  if(newObj.title === '' || newObj.author === '' || newObj.plot === '' || newObj.img === ''){
     alert('pease, fill all the fields')
     return
  }
  const newObjSubmit = JSON.parse(localStorage.getItem('books'));
  newObjSubmit.push(newObj);
localStorage.setItem('books', JSON.stringify(newObjSubmit));
renderList();
}

};

const editBook = (e) => {
  console.log("editBook id: ", e.target.parentElement.id);
  const objClick = books.find((el) => el.id === e.target.parentElement.id);
  console.log(objClick);
};

const deleteBook = (e) => {
 
  const books = JSON.parse(localStorage.getItem('books'))
console.log(books)
  const delateBookIn = books.filter(book => book.id !== e.target.parentElement.id)
console.log(delateBookIn);
  console.log("deleteBook id: ", e.target.parentElement.id);
  localStorage.setItem('books',JSON.stringify(delateBookIn));
  renderList();
 const onVissible = document.querySelector('.onVissible');
  if(onVissible !== null && onVissible.dataset.id === e.target.parentElement.id){
    div2.innerHTML = "";

  }
};

const createPrevievMarkup = ({ id, title, author, img, plot }) => {
  return `
  <div class='onVissible' data-id=${id}>
    <h2>${title}</h2>
    <p>${author}</p>
    <img src="${img}"/>
    <p>${plot}</p>
  </div>
  `;
};
renderList();

const createFormMarkup = (bookObj) => {
  return `
  <form class="form">
      <label class="form__label">
      Title
        <input type="text" name="title" class="form__input" id="">
      </label>
      <label class="form__label">
      Author
        <input type="text" name="author" class="form__input" id="">
      </label>
      <label class="form__label">
      img-url
        <input type="text" name="img" class="form__input" id="">
      </label>
      <label class="form__label">
      Plot
        <input type="text" name="plot" rows=12 class="form__input" id=""></input>
      </label>
      <button type='submit' class="form__submit">Save</button>
    </form>
  `;
};

btn.addEventListener("click", addBook);

function createNewBook(book) {
const inputNev = document.querySelectorAll('input');
inputNev.forEach((item) => item.addEventListener("change", onChange));
function onChange(event){
  book[event.target.name] = event.target.value;

}}
