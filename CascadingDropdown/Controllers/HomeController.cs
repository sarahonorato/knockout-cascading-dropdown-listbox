using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CascadingDropdown.Models;
using CascadingDropdown.Data;
using Microsoft.EntityFrameworkCore;

namespace CascadingDropdown.Controllers
{
    public class HomeController : Controller
    {
        private readonly MovieDbContext _context;

        public HomeController(MovieDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IEnumerable<Movie> GetMovieListByGenreId(string genre)
        {
            Enum.TryParse(genre, out Genre movieGenre);
            return _context.Movie.Where(x => x.Genre == movieGenre).ToList();
        }

        public IEnumerable<string> GetGenreList()
        {
            return Enum.GetValues(typeof(Genre)).Cast<Genre>().Select(x => x.ToString());
        }
    }
}
