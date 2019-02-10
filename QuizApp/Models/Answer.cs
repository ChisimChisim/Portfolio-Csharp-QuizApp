using System;
using System.Collections.Generic;

namespace QuizApp.Models
{
    public partial class Answer
    {
        public Answer()
        {
            GradeItemCorrectAnswer = new HashSet<GradeItem>();
            GradeItemYourAnswer = new HashSet<GradeItem>();
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }

        public Question Question { get; set; }
        public ICollection<GradeItem> GradeItemCorrectAnswer { get; set; }
        public ICollection<GradeItem> GradeItemYourAnswer { get; set; }
    }
}
