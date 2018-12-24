using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SolenyaStarter.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        [Route("{page1}")]
        [Route("{page1}/{page2}")]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        [HttpPost ("PostFile")]        
        public IActionResult PostFile (PostFileArgs args)
        {
            Console.WriteLine(args.Avatar.Length);
            return Content("");
        }
    }
}

public class PostFileArgs
{
    public IFormFile Avatar { get; set; }
}
