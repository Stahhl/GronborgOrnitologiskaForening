using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GOF.Models;
using System;

namespace GOF.Controllers
{
    [Route("api/birdwatch")]
    [ApiController]
    public class BirdWatchController : ControllerBase
    {
        private readonly GofContext _context;

        public BirdWatchController(GofContext context)
        {
            _context = context;

            //var comments = new List<Comment>();

            //var birdWatch = new BirdWatch
            //{
            //    PersonName = "Micke",
            //    BirdName = "Talgoxe",
            //    BirdFamily = "Parus",
            //    Location = "Sidsjön",
            //    DateAndTime = "00/00/00 00:00"
            //};
            //comments.Add(new Comment
            //{
            //    Text = "111",
            //    MyBirdWatch = birdWatch,
            //    //BirdWatchId = birdWatch.Id,
            //});
            //comments.Add(new Comment
            //{
            //    Text = "222",
            //    MyBirdWatch = birdWatch,
            //    //BirdWatchId = birdWatch.Id,
            //});


            //_context.BirdWatchs.Add(birdWatch);
            //_context.Comments.AddRange(comments);
            //_context.SaveChanges();
        }
        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BirdWatch>>> GetGofItems()
        {
            return await _context.BirdWatchs.Include(x => x.MyComments).ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BirdWatch>> GetGofItem(int id)
        {
            var gofItem = await _context.BirdWatchs
                .Include(i => i.MyComments)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (gofItem == null)
            {
                return NotFound();
            }

            return gofItem;
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<BirdWatch>> PostGofItem(BirdWatch item)
        {
            _context.BirdWatchs.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGofItem), new { id = item.Id }, item);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGofItem(int id, BirdWatch item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGofItem(int id)
        {
            var gofItem = await _context.BirdWatchs.FindAsync(id);

            if (gofItem == null)
            {
                return NotFound();
            }

            _context.BirdWatchs.Remove(gofItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
