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
    public class QuestionsController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuestionsController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Questions/
        [HttpGet]
        public IEnumerable<Question> GetQuestion()
        {
            return _context.Question;
        }

        // GET: api/Questions/CategoryLevel/{category}/{level}
        [HttpGet("CategoryLevel/{categoryId}/{levelId}")]
        public async Task<IEnumerable<Question>> GetQuestionByCategryAndLevel([FromRoute] int categoryId, [FromRoute] int levelId)
        {
            var question = await _context.Question
                .Where(item => (item.CategoryId == categoryId) && (item.LevelId == levelId))
                 .Include(nameof(Answer)).Include(nameof(Category)).Include(nameof(Level))
                .ToListAsync();

            return question;
        }

        // GET: api/Questions/Category/{category}/
        [HttpGet("Category/{categoryId}")]
        public async Task<IEnumerable<Question>> GetQuestionByCategory([FromRoute] int categoryId)
        {
            var question = await _context.Question
                .Where(item => item.CategoryId == categoryId)
                .Include(nameof(Answer)).Include(nameof(Category)).Include(nameof(Level))
                .ToListAsync();

            return question;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Question
                .Where(item => item.Id == id)
                .Include(nameof(Answer)).Include(nameof(Category)).Include(nameof(Level))
                .FirstOrDefaultAsync();


            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.Id)
            {
                return BadRequest();
            }


            _context.Entry(question).State = EntityState.Modified;
            

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(id);
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Question.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Question.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Question.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Question.Any(e => e.Id == id);
        }
    }
}