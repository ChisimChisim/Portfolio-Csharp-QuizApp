using System;
using System.Collections.Generic;

namespace QuizApp.Models
{
    public partial class GradeItem
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int YourAnswerId { get; set; }
        public int CorrectAnswerId { get; set; }
        public int GradeId { get; set; }

        public Answer CorrectAnswer { get; set; }
        public Grade Grade { get; set; }
        public Question Question { get; set; }
        public Answer YourAnswer { get; set; }
    }
}
