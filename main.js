
let books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    isbn: '9781921479311',
    pageCount: 268
  }
];

let renderBooks = () => {
  // empty out the books div before filling it with book data. 
 document.querySelector('.books').replaceChildren();

  for (let i = 0; i < books.length; i++) {
    const template = `
    <div class="book col-md-6">
      <h4>${books[i].title}</h4>
      <div>Author: <strong>${books[i].author}</strong></div>
      <div>Pages: <strong>${books[i].pageCount}</strong></div>
      <div>ISBN: <strong>${books[i].isbn}</strong></div>
      <img src="${books[i].imageURL}" alt="">
    </div>`;

      document.querySelector('.books').insertAdjacentHTML('beforeend', template);
  }
}

renderBooks();

const addBooks = (data) => {
  books = [];

  for (let i = 0; i < data.items.length; i++) {
    const bookData = data.items[i];

     const book = {
      title: bookData.volumeInfo.title || null,
      author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0] : null,
      imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
      pageCount: bookData.volumeInfo.pageCount || null,
      isbn: bookData.volumeInfo.industryIdentifiers ?
        bookData.volumeInfo.industryIdentifiers[0].identifier : null
    };

    books.push(book);
  }
  renderBooks();
};

document.querySelector('.search').addEventListener('click', function () {
  const search = document.querySelector('#search-query').value;

  fetchBooks(search);

  document.querySelector('#search-query').value = '';
});

let fetchBooks = (query) => {
   const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addBooks(data));
}

