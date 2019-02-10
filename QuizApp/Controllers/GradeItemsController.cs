using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeItemsController : ControllerBase
    {
        private readonly QuizContext _context;

        public GradeItemsController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/GradeItems
        [HttpGet]
        public IEnumerable<GradeItem> GetGradeItem()
        {
            return _context.GradeItem;
        }

        // GET: api/GradeItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGradeItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gradeItem = await _context.GradeItem.FindAsync(id);

            if (gradeItem == null)
            {
                return NotFound();
            }

            return Ok(gradeItem);
        }

        // PUT: api/GradeItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGradeItem([FromRoute] int id, [FromBody] GradeItem gradeItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gradeItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(gradeItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GradeItems
        [HttpPost]
        public async Task<IActionResult> PostGradeItem([FromBody]  IEnumerable<GradeItem> gradeItems)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GradeItem.AddRange(gradeItems);
            await _context.SaveChangesAsync();

            return Ok(gradeItems);
        }

        // DELETE: api/GradeItems/grade/2
        [HttpDelete("grade/{gradeId}")]
        public async Task<IActionResult> DeleteGradeItem([FromRoute] int gradeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gradeItem = await _context.GradeItem
                .Where(x => x.GradeId == gradeId).ToListAsync();
            if (gradeItem == null)
            {
                return NotFound();
            }

            _context.GradeItem.RemoveRange(gradeItem);
            await _context.SaveChangesAsync();

            return Ok(gradeItem);
        }

        private bool GradeItemExists(int id)
        {
            return _context.GradeItem.Any(e => e.Id == id);
        }
    }
}