using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GOF.Models;

namespace GOF.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly GofContext _context;

        public TodoController(GofContext context)
        {
            _context = context;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetTodoItems()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetTodoItem(long id)
        {
            var todoItem = await _context.Comments.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
    }
}