using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace booksAPI.AddControllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class bookController : ControllerBase
    {

        //define a list of books
        private static List<book> books = new List<book>()
        {
            new book() { id = 1, title = "The Great Gatsby", author = "F. Scott Fitzgerald", genre = "Fiction", publishedDate = new DateTime(1925, 4, 10), price = 19.99 },
            new book() { id = 2, title = "The Grapes of Wrath", author = "John Steinbeck", genre = "Fiction", publishedDate = new DateTime(1939, 4, 14), price = 9.99 },
            new book() { id = 3, title = "Nineteen Eighty-Four", author = "George Orwell", genre = "Fiction", publishedDate = new DateTime(1949, 6, 8), price = 70 },
            new book() { id = 4, title = "The Catcher in the Rye", author = "J. D. Salinger", genre = "Fiction", publishedDate = new DateTime(1951, 7, 16), price = 19.99 },
            new book() { id = 5, title = "The Lord of the Rings", author = "J. R. R. Tolkien", genre = "Fiction", publishedDate = new DateTime(1954, 7, 29), price = 19.99 },
            new book() { id = 6, title = "Lolita", author = "Vladimir Nabokov", genre = "Fiction", publishedDate = new DateTime(1955, 9, 15), price = 19.99 },
            new book() { id = 7, title = "To Kill a Mockingbird", author = "Harper Lee", genre = "Fiction", publishedDate = new DateTime(1960, 7, 11), price = 19.99 },
            new book() { id = 8, title = "Catch-22", author = "Joseph Heller", genre = "Fiction", publishedDate = new DateTime(1961, 11, 10), price = 19.99 },
            new book() { id = 9, title = "One Hundred Years of Solitude", author = "Gabriel García Márquez", genre = "Fiction", publishedDate = new DateTime(1967, 5, 30), price = 19.99 },
            new book() { id = 10, title = "The Hitchhiker's Guide to the Galaxy", author = "Douglas Adams", genre = "Fiction", publishedDate = new DateTime(1979, 10, 12), price = 19.99 },
            new book() { id = 11, title = "Beloved", author = "Toni Morrison", genre = "Fiction", publishedDate = new DateTime(1987, 9, 2), price = 19.99 },
            new book() { id = 12, title = "The Handmaid's Tale", author = "Margaret Atwood", genre = "Fiction", publishedDate = new DateTime(1985, 8, 1), price = 19.99 },
            new book() { id = 13, title = "Harry Potter and the Philosopher's Stone", author = "J. K. Rowling", genre = "Fiction", publishedDate = new DateTime(1997, 6, 26), price = 19.99 },
            new book() { id = 14, title = "The Da Vinci Code", author = "Dan Brown", genre = "Fiction", publishedDate = new DateTime(2003, 3, 18), price = 19.99 }

        };

        [HttpGet]
        public async Task<ActionResult<List<book>>> GetBooks()
        {
            //print to console if get a request
            Console.WriteLine("GetBooks() called");
            return Ok(books);
        }

        [HttpPost]
        public async Task<ActionResult<book>> AddBook(book newBook)
        {
            //print to console if post a request
            Console.WriteLine("AddBook() called");
            //validate the new book 
            if (newBook.title == "" || newBook.author == "" || newBook.genre == null || newBook.publishedDate == null || newBook.price < 0)
            {
                return BadRequest("Invalid book information");
            }
            //add the new book to the list with a unique id run from 1 to size of books + 1
            int i = 1;
            while (books.Exists(book => book.id == i))
            {
                i++;
            }
            newBook.id = i;
            
            books.Add(newBook);
            //return the new book
            return Ok(books);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            //print to console if delete a request
            Console.WriteLine("DeleteBook() called");
            //find the book with the id
            book bookToDelete = books.Find(book => book.id == id);
            //if the book is not found, return not found
            if (bookToDelete == null)
            {
                return BadRequest("Book not found");
            }
            //remove the book from the list
            books.Remove(bookToDelete);
            //return no content
            return Ok(books);
        }

        //update a book with a put request
        [HttpPut("{id}")]
        public async Task<ActionResult<book>> UpdateBook(int id, book updatedBook)
        {
            //print to console if put a request
            Console.WriteLine("UpdateBook() called");
            //find the book with the id
            book bookToUpdate = books.Find(book => book.id == id);
            //if the book is not found, return not found
            if (bookToUpdate == null)
            {
                return BadRequest("Book not found");
            }
            //validate the updated book 
            if (updatedBook.title == "" || updatedBook.author == "" || updatedBook.genre == null || updatedBook.publishedDate == null || updatedBook.price < 0)
            {
                return BadRequest("Invalid book information");
            }
            //print to console the updated book
            Console.WriteLine(updatedBook);

            //update the book
            bookToUpdate.title = updatedBook.title;
            bookToUpdate.author = updatedBook.author;
            bookToUpdate.genre = updatedBook.genre;
            bookToUpdate.publishedDate = updatedBook.publishedDate;
            bookToUpdate.price = updatedBook.price;
            //return the updated book
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<book>> GetBook(int id)
        {
            //print to console if get a request
            Console.WriteLine("GetBook() called");
            //find the book with the id
            book bookToReturn = books.Find(book => book.id == id);
            //if the book is not found, return not found
            if (bookToReturn == null)
            {
                return BadRequest("Book not found");
            }
            //return the book
            return Ok(bookToReturn);
        }
        

        //delete all books with a delete request
        [HttpDelete]
        public async Task<ActionResult> DeleteAllBooks()
        {
            //print to console if delete a request
            Console.WriteLine("DeleteAllBooks() called");
            //clear the list of books
            books.Clear();
            //return no content
            return Ok(books);
        }
    }
    
}