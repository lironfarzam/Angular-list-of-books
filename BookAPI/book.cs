using static System.Runtime.InteropServices.JavaScript.JSType;

namespace booksAPI
{
    public class book
    {
        public int id { get; set; }
        public string title { get; set; } = string.Empty;
        public string author { get; set; } = string.Empty;
        public string genre { get; set; } = string.Empty;
        public DateTime publishedDate { get; set; } = new DateTime(2000, 1, 1);
        public double price { get; set; } = 0.0;
    }
}