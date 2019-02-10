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
    public class AnswersController : ControllerBase
    {
        private readonly QuizContext _context;

        public AnswersController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet]
        public IEnumerable<Answer> GetAnswer()
        {
            return _context.Answer;
        }

        // GET: api/Answers/Question/5
        [HttpGet("Question/{questionId}")]
        public async Task<IEnumerable<Answer>> GetAnswerByQuestionId([FromRoute] int questionId)
        {

            var answer = await _context.Answer
                .Where(item => item.QuestionId==questionId)
                .ToListAsync();

            return answer;
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnswer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var answer = await _context.Answer.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return Ok(answer);
        }

        // PUT: api/Answers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer([FromRoute] int id, [FromBody] Answer answer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != answer.Id)
            {
                return BadRequest();
            }

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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

        // PUT: api/Answers
        // Update multiple rows
        [HttpPut]
        public async Task<IActionResult> PutAnswers([FromBody] IEnumerable<Answer> answers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
             
           foreach(var answer in answers){
                if (!_context.Answer.Any(i=> i.Id == answer.Id)){
                    return NotFound();
                }
            }

            foreach (var answer in answers)
            {
                _context.Entry(answer).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }

            return NoContent();
        }

        // POST: api/Answers
        [HttpPost]
        public async Task<IActionResult> PostAnswer([FromBody] IEnumerable<Answer> answers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Answer.AddRange(answers);
            await _context.SaveChangesAsync();

            return Ok(answers);
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var answer = await _context.Answer.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            _context.Answer.Remove(answer);
            await _context.SaveChangesAsync();

            return Ok(answer);
        }

        // DELETE: api/Answers
        [HttpDelete]
        public async Task<IActionResult> DeleteAnswers([FromBody] IEnumerable<Answer> answers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (var answer in answers)
            {
                if (!_context.Answer.Any(i => i.Id == answer.Id))
                {
                    return NotFound();
                }
            }

            _context.Answer.RemoveRange(answers);
            await _context.SaveChangesAsync();

            return Ok(answers);
        }

        private bool AnswerExists(int id)
        {
            return _context.Answer.Any(e => e.Id == id);
        }
    }
}